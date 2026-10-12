/**
 * The Core Mall, Ghaziabad - Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Spaces Showcase Tab Switching
  const spacesData = {
    retail: {
      title: "Retail Shops & High-Street Galleria",
      badge: "High Footfall Commercial",
      desc: "Designed for premium global and regional retail brands, high-street fashion, electronics, and lifestyle outlets with double-height storefronts and expansive pedestrian walkways.",
      image: "images/exterior_facade.svg",
      features: [
        "Double-height glass frontages with maximum visibility",
        "Direct access from wide arterial central corridors",
        "Dedicated loading bays & efficient back-end logistics",
        "Ideal for lifestyle, fashion, electronics & convenience stores"
      ]
    },
    galleria: {
      title: "Designer Galleria & Boutique Spaces",
      badge: "Exclusive Brand Experience",
      desc: "Curated boutique spaces crafted for specialty retail, luxury accessories, jewelry, cosmetics, and artisanal merchandise nestled around an airy, skylit atrium.",
      image: "images/retail_atrium.svg",
      features: [
        "High-density footfall zone facing multi-tier escalators",
        "Intimate boutique layouts customized for modern retailers",
        "Climate-controlled central atrium atmosphere",
        "Strong rental yields and prompt retail leasing appeal"
      ]
    },
    offices: {
      title: "Corporate & Business Office Suites",
      badge: "Professional Workspaces",
      desc: "Contemporary, efficient office suites designed for modern corporations, consultancy firms, IT enterprises, and business incubators looking for a prestigious address on NH-24.",
      image: "images/office_suites.svg",
      features: [
        "Separate dedicated high-speed business passenger elevators",
        "24/7 power backup, fiber optic connectivity, and security",
        "Professional reception lobbies and executive meeting suites",
        "Proximity to Noida Sector 62 and major NCR commercial hubs"
      ]
    },
    foodcourt: {
      title: "Gourmet Food Court & Fine Dining Deck",
      badge: "Culinary Destination",
      desc: "A sprawling gastronomy hub featuring top quick-service restaurants (QSRs), specialty cafes, open-air terrace dining, and family restaurants to cater to shoppers and professionals alike.",
      image: "images/food_court.svg",
      features: [
        "Large common seating capacity with ambient luxury decor",
        "Full kitchen exhaust, gas bank, and hygiene drainage provisions",
        "Open terrace dining options with panoramic highway vistas",
        "Captive audience from surrounding Crossings Republik residents"
      ]
    },
    entertainment: {
      title: "Family Entertainment & Gaming Arena",
      badge: "Vibrant Leisure Zone",
      desc: "A premier entertainment destination featuring modern interactive gaming zones, VR attractions, kids play arenas, and social gathering zones for weekend rushes.",
      image: "images/entertainment_zone.svg",
      features: [
        "High ceiling heights configured for experiential activities",
        "Multi-generation appeal attracting family footfalls consistently",
        "Integrated ticketing and visitor hospitality desk",
        "Synergistic positioning adjacent to the gourmet food court"
      ]
    }
  };

  const tabButtons = document.querySelectorAll('.tab-btn');
  const spaceBadge = document.getElementById('spaceBadge');
  const spaceTitle = document.getElementById('spaceTitle');
  const spaceDesc = document.getElementById('spaceDesc');
  const spaceVisual = document.getElementById('spaceVisualImg');
  const spaceFeatures = document.getElementById('spaceFeaturesList');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const spaceKey = btn.getAttribute('data-space');
      const data = spacesData[spaceKey];

      if (data) {
        spaceBadge.textContent = data.badge;
        spaceTitle.textContent = data.title;
        spaceDesc.textContent = data.desc;
        spaceVisual.src = data.image;

        spaceFeatures.innerHTML = data.features
          .map(item => `
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${item}</span>
            </li>
          `).join('');
      }
    });
  });

  // 3. Investment & Rental Income Calculator
  const investSlider = document.getElementById('investSlider');
  const sliderDisplay = document.getElementById('sliderDisplay');
  const returnAmountDisplay = document.getElementById('returnAmountDisplay');
  const monthlyRentalDisplay = document.getElementById('monthlyRentalDisplay');
  const assetValueDisplay = document.getElementById('assetValueDisplay');

  function updateCalculator() {
    if (!investSlider) return;
    const lakhs = parseFloat(investSlider.value);

    // Display investment amount
    if (lakhs >= 100) {
      const crVal = (lakhs / 100).toFixed(2);
      sliderDisplay.textContent = `₹${crVal} Cr`;
    } else {
      sliderDisplay.textContent = `₹${lakhs} Lakhs`;
    }

    // Rental yield: Baseline is ₹25 Lakhs gives ₹1.80 Lakhs/annum (~7.2% per annum)
    const annualRental = (lakhs * 0.072);
    const monthlyRental = (annualRental * 100000) / 12;

    if (annualRental >= 1) {
      returnAmountDisplay.textContent = `₹${annualRental.toFixed(2)} Lakhs`;
    } else {
      returnAmountDisplay.textContent = `₹${(annualRental * 100000).toLocaleString('en-IN')}`;
    }

    monthlyRentalDisplay.textContent = `₹${Math.round(monthlyRental).toLocaleString('en-IN')}`;
    assetValueDisplay.textContent = `₹${lakhs} Lakhs`;
  }

  if (investSlider) {
    investSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 4. Lead Form Submissions
  const leadForms = document.querySelectorAll('.lead-form-submit');
  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || 'Investor';
      const phone = form.querySelector('[name="phone"]')?.value || '';

      alert(`Thank you, ${name}! Your inquiry for The Core Mall has been received. Our sales executive will call you at ${phone || 'your number'} shortly with the complete brochure and pricing details.`);
      form.reset();
    });
  });

  // Restrict phone inputs to digits and plus sign only
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9+]/g, '');
    });
  });

  // 5. Smooth scroll for anchor links & mobile drawer closing
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');

  function openMobileMenu() {
    if (mobileNavDrawer) mobileNavDrawer.classList.add('active');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('active');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Smooth scroll with navbar offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        closeMobileMenu();

        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight + 5;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. Dynamic Navbar Scrollspy
  const watchedSectionIds = ['hero', 'retail-shop', 'food-court-shop', 'location', 'blog', 'contact'];
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  function updateScrollspy() {
    const scrollPos = window.scrollY + 120;

    for (let i = watchedSectionIds.length - 1; i >= 0; i--) {
      const secId = watchedSectionIds[i];
      const section = document.getElementById(secId);
      if (section && section.offsetTop <= scrollPos) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        break;
      }
    }
  }

  window.addEventListener('scroll', updateScrollspy);
  updateScrollspy();
});
