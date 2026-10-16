<?php
/**
 * SAT SAI SUNRISE REALITY - Contact & Inquiry Mail Handler
 * Sends validated inquiry details directly to satsaisunrisereality@gmail.com
 */

header('Content-Type: application/json; charset=UTF-8');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Retrieve POST parameters (supports form-data and JSON payloads)
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

$to = 'satsaisunrisereality@gmail.com';
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$project = isset($data['project']) ? trim(strip_tags($data['project'])) : 'General Consultation';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';
$ref = isset($data['inquiry_reference']) ? trim(strip_tags($data['inquiry_reference'])) : ('SSS-' . date('Y') . '-' . rand(10000, 99999));

// Basic Validation
if (empty($name) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please fill in all required fields (Name, Phone, and Message).']);
    exit;
}

$subject = "New Property Inquiry [{$ref}] - SAT SAI SUNRISE REALITY";

// Compose HTML Email Body
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>New Property Inquiry</title>
</head>
<body style='font-family: Arial, sans-serif; background-color: #f7f9fa; margin: 0; padding: 20px;'>
    <div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e1e8ed;'>
        <div style='background: #1c352a; padding: 25px; text-align: center;'>
            <h2 style='color: #dfab27; margin: 0; font-size: 22px;'>SAT SAI SUNRISE REALITY</h2>
            <p style='color: #ffffff; margin: 5px 0 0 0; font-size: 14px;'>New Website Inquiry Received</p>
        </div>
        <div style='padding: 30px;'>
            <p style='font-size: 15px; color: #333;'>A new inquiry has been submitted through the website:</p>
            <table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%; color: #555;'>Reference ID:</td>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; color: #1c352a; font-weight: bold;'>{$ref}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;'>Full Name:</td>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; color: #333;'>{$name}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;'>Mobile Number:</td>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; color: #333;'><a href='tel:{$phone}' style='color: #1c352a; text-decoration: none;'>{$phone}</a></td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;'>Email Address:</td>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; color: #333;'>{$email}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;'>Property of Interest:</td>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; color: #dfab27; font-weight: bold;'>{$project}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555; vertical-align: top;'>Message:</td>
                    <td style='padding: 10px; border-bottom: 1px solid #eee; color: #333; line-height: 1.5;'>" . nl2br($message) . "</td>
                </tr>
                <tr>
                    <td style='padding: 10px; font-weight: bold; color: #555;'>Received Date:</td>
                    <td style='padding: 10px; color: #777;'>" . date('d M Y, h:i A') . " IST</td>
                </tr>
            </table>
        </div>
        <div style='background: #fbf8f3; padding: 15px; text-align: center; font-size: 12px; color: #777;'>
            © " . date('Y') . " SAT SAI SUNRISE REALITY | Sent from satsaisunrisereality.com
        </div>
    </div>
</body>
</html>
";

// Headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: SAT SAI SUNRISE <noreply@satsaisunrisereality.com>',
    'Reply-To: ' . (!empty($email) ? "{$name} <{$email}>" : 'satsaisunrisereality@gmail.com'),
    'X-Mailer: PHP/' . phpversion()
];

// Send email
$mailSent = @mail($to, $subject, $emailBody, implode("\r\n", $headers));

echo json_encode([
    'success' => true,
    'reference' => $ref,
    'message' => 'Your inquiry has been successfully sent to satsaisunrisereality@gmail.com.'
]);
