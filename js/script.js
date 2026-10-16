// Automatically remove /index.html from browser URL address bar
if (window.location.pathname.endsWith('/index.html')) {
    const cleanPath = window.location.pathname.replace(/\/index\.html$/, '/') || '/';
    window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
}

/* =========================================================
   PROPERTY SEARCH TABS
========================================================= */

const searchTabs = document.querySelectorAll(".search-tab");


searchTabs.forEach((tab) => {

    tab.addEventListener("click", function () {

        searchTabs.forEach((item) => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const searchType = this.dataset.searchType;

        console.log("Selected:", searchType);

    });

});



/* =========================================================
   PROPERTY SEARCH FORM
========================================================= */


const searchForm = document.getElementById("searchForm") || document.querySelector(".search-form");

if (searchForm) {

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const activeTab = document.querySelector(".search-tab.active");
        const locationInput = document.getElementById("searchLocation");
        const typeSelect = document.getElementById("searchType");
        const budgetSelect = document.getElementById("searchBudget");

        const searchData = {
            type: activeTab ? activeTab.dataset.searchType : "buy",
            location: locationInput ? locationInput.value.trim() : "",
            propertyType: typeSelect ? typeSelect.value : "all",
            budget: budgetSelect ? budgetSelect.value : ""
        };

        console.log("Searching properties with parameters:", searchData);

        // Smooth notification / action
        alert(`Searching ${searchData.type.toUpperCase()} properties in "${searchData.location || "All Locations"}" (${searchData.propertyType})`);

    });

}



/* =========================================================
   STICKY NAVBAR SCROLL STATE
========================================================= */

const mainHeader = document.querySelector(".main-header");

if (mainHeader) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 25) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }
    });
}



/* =========================================================
   NAVBAR ACTIVE LINK
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");


navLinks.forEach((link) => {

    link.addEventListener("click", function () {

        navLinks.forEach((item) => {

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});



/* =========================================================
   WISHLIST BUTTON TOGGLE
========================================================= */

const wishlistBtns = document.querySelectorAll(".wishlist-btn");

wishlistBtns.forEach((btn) => {

    btn.addEventListener("click", function (e) {

        e.preventDefault();

        this.classList.toggle("active");
        const icon = this.querySelector("i");

        if (this.classList.contains("active")) {
            icon.classList.remove("bi-suit-heart");
            icon.classList.add("bi-suit-heart-fill");
            this.style.color = "#d9383a";
        } else {
            icon.classList.remove("bi-suit-heart-fill");
            icon.classList.add("bi-suit-heart");
            this.style.color = "#99968f";
        }

    });

});



/* =========================================================
   TESTIMONIALS SLIDER CONTROLS
========================================================= */

const testimonialPrev = document.querySelector(".testimonial-nav-btn.prev-btn");
const testimonialNext = document.querySelector(".testimonial-nav-btn.next-btn");
const testimonialCards = document.querySelectorAll(".testimonial-card");

if (testimonialPrev && testimonialNext && testimonialCards.length > 0) {

    let activeIndex = 0;

    const highlightCard = (idx) => {
        testimonialCards.forEach((c, i) => {
            if (i === idx) {
                c.style.borderColor = "rgba(154, 106, 36, 0.6)";
                c.style.transform = "translateY(-4px)";
                c.style.boxShadow = "0 14px 34px rgba(30, 34, 28, 0.08)";
            } else {
                c.style.borderColor = "";
                c.style.transform = "";
                c.style.boxShadow = "";
            }
        });
    };

    testimonialNext.addEventListener("click", () => {
        activeIndex = (activeIndex + 1) % testimonialCards.length;
        highlightCard(activeIndex);
    });

    testimonialPrev.addEventListener("click", () => {
        activeIndex = (activeIndex - 1 + testimonialCards.length) % testimonialCards.length;
        highlightCard(activeIndex);
    });

}



/* =========================================================
   CONTACT INQUIRY FORM SUBMISSION
========================================================= */

const contactInquiryForm = document.getElementById("contactInquiryForm");

if (contactInquiryForm) {

    contactInquiryForm.addEventListener("submit", async function (e) {

        const btn = this.querySelector(".contact-cta-btn");
        const originalHTML = btn.innerHTML;

        // If viewed directly via file://, fallback to native form POST so FormSubmit handles it
        if (window.location.protocol === "file:") {
            return;
        }

        e.preventDefault();

        btn.disabled = true;
        btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> <span>Sending...</span>`;

        const formData = new FormData(contactInquiryForm);
        const dataObj = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://formsubmit.co/ajax/satsaisunrisereality@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(dataObj)
            });

            const result = await response.json();

            if (result && (result.success === "false" || result.success === false)) {
                if (result.message && result.message.toLowerCase().includes("activation")) {
                    btn.innerHTML = `<i class="bi bi-envelope-exclamation"></i> <span>Activate in Gmail!</span>`;
                    btn.style.backgroundColor = "#d97706";
                    alert("FormSubmit Activation Required:\n\nFormSubmit has sent an activation email to satsaisunrisereality@gmail.com. Please open your Gmail (check Inbox or Spam) and click 'Activate Form' once. After that, all inquiries will arrive directly!");
                } else {
                    btn.innerHTML = `<i class="bi bi-info-circle"></i> <span>Check Info</span>`;
                    btn.style.backgroundColor = "#d97706";
                }
            } else {
                btn.innerHTML = `<i class="bi bi-check2-circle"></i> <span>Inquiry Sent to Mail!</span>`;
                btn.style.backgroundColor = "#2e7d32";
                this.reset();
            }

            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalHTML;
                btn.style.backgroundColor = "";
            }, 6000);

        } catch (error) {
            console.warn("Home form email submission error:", error);
            contactInquiryForm.submit();
        }

    });

}




/* =========================================================
   PROPERTIES SLIDER CONTROLS
========================================================= */
const propSlider = document.getElementById("propSlider");
const propPrevBtn = document.getElementById("propPrevBtn");
const propNextBtn = document.getElementById("propNextBtn");

if (propSlider && propPrevBtn && propNextBtn) {
    const getScrollStep = () => {
        const firstCard = propSlider.querySelector(".prop-slider-item") || propSlider.firstElementChild;
        if (firstCard) {
            // Gap is 1.5rem (24px)
            const cardGap = parseFloat(window.getComputedStyle(propSlider).gap) || 24;
            // On responsive screens (<= 768px), scroll exactly one card width + gap
            if (window.innerWidth <= 768) {
                return firstCard.offsetWidth + cardGap;
            }
        }
        return propSlider.clientWidth / 2;
    };

    propNextBtn.addEventListener("click", () => {
        propSlider.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });

    propPrevBtn.addEventListener("click", () => {
        propSlider.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });
}



/* =========================================================
   HERO BACKGROUND SLIDER (AUTO & MANUAL)
========================================================= */
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

if (heroSlides.length > 0) {
    let currentHeroIndex = 0;
    const heroSlideIntervalTime = 3000; // Changes image every 2 seconds
    let heroAutoTimer = null;

    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        heroDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        currentHeroIndex = index;
    }

    function nextHeroSlide() {
        const nextIndex = (currentHeroIndex + 1) % heroSlides.length;
        showHeroSlide(nextIndex);
    }

    function startHeroSlider() {
        if (!heroAutoTimer) {
            heroAutoTimer = setInterval(nextHeroSlide, heroSlideIntervalTime);
        }
    }

    function resetHeroSliderTimer() {
        if (heroAutoTimer) {
            clearInterval(heroAutoTimer);
        }
        heroAutoTimer = setInterval(nextHeroSlide, heroSlideIntervalTime);
    }

    // Dot click controls
    heroDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showHeroSlide(index);
            resetHeroSliderTimer();
        });
    });

    // Start auto slideshow
    startHeroSlider();
}


/* =========================================================
   CONTACT PAGE FORM SUBMISSION (CONNECT TO EMAIL VIA AJAX)
========================================================= */
const contactPageForm = document.getElementById("contactPageForm");

if (contactPageForm && !contactPageForm.dataset.listenerAttached) {
    contactPageForm.dataset.listenerAttached = "true";
    contactPageForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formSuccessMessage = document.getElementById("formSuccessMessage");
        const inquiryRefId = document.getElementById("inquiryRefId");
        const btn = this.querySelector(".btn-luxury-submit, .btn-submit-custom");

        if (btn) {
            const originalHTML = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Inquiry to Email...`;

            const randomNum = Math.floor(10000 + Math.random() * 90000);
            const refCode = "SSS-" + new Date().getFullYear() + "-" + randomNum;

            if (inquiryRefId) {
                inquiryRefId.textContent = refCode;
            }

            const hiddenRef = document.getElementById("hiddenInquiryRef");
            if (hiddenRef) {
                hiddenRef.value = refCode;
            }

            const formSubject = document.getElementById("formSubject");
            if (formSubject) {
                formSubject.value = `New Property Inquiry [${refCode}] - SAT SAI SUNRISE REALITY`;
            }

            const formData = new FormData(contactPageForm);
            const dataObj = Object.fromEntries(formData.entries());

            try {
                await fetch("https://formsubmit.co/ajax/satsaisunrisereality@gmail.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(dataObj)
                });

                if (formSuccessMessage) {
                    formSuccessMessage.style.display = "block";
                    formSuccessMessage.classList.remove("d-none");
                    formSuccessMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }

                contactPageForm.reset();
                btn.disabled = false;
                btn.innerHTML = `<i class="bi bi-envelope-check-fill"></i> Inquiry Sent to Mail!`;
                btn.style.backgroundColor = "#2e7d32";
                btn.style.color = "#ffffff";

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.backgroundColor = "";
                    btn.style.color = "";
                }, 5000);

            } catch (error) {
                console.warn("Email API submission fallback:", error);

                if (formSuccessMessage) {
                    formSuccessMessage.style.display = "block";
                    formSuccessMessage.classList.remove("d-none");
                    formSuccessMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }

                contactPageForm.reset();
                btn.disabled = false;
                btn.innerHTML = `<i class="bi bi-check2-circle"></i> Inquiry Received!`;
                btn.style.backgroundColor = "#2e7d32";
                btn.style.color = "#ffffff";

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.backgroundColor = "";
                    btn.style.color = "";
                }, 4000);
            }
        }
    });
}
