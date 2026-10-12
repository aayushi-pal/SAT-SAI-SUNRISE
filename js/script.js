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
   CONTACT ENQUIRY FORM SUBMISSION
========================================================= */

const contactEnquiryForm = document.getElementById("contactEnquiryForm");

if (contactEnquiryForm) {

    contactEnquiryForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const btn = this.querySelector(".contact-cta-btn");
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `<i class="bi bi-check2-circle"></i> <span>Enquiry Sent!</span>`;
        btn.style.backgroundColor = "#2e7d32";

        setTimeout(() => {
            this.reset();
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = "";
        }, 3000);

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
   WHATSAPP CONTACT FORM INTEGRATION
========================================================= */
const contactPageForm = document.getElementById("contactPageForm");

if (contactPageForm) {
    contactPageForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("waName").value.trim();
        const phone = document.getElementById("waPhone").value.trim();
        const email = document.getElementById("waEmail").value.trim();
        const message = document.getElementById("waMessage").value.trim();

        // Target WhatsApp Number
        const whatsappNumber = "919953755303"; 

        // Construct message
        const text = `Hi SAT-SAI-SUNRISE REALITY,%0A%0AI have an enquiry from your website.%0A%0A*Name:* ${name}%0A*Mobile:* ${phone}%0A*Email:* ${email}%0A%0A*Message:*%0A${message}`;

        // Create WhatsApp API URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, "_blank");

        // Show Success Feedback
        const btn = this.querySelector(".btn-submit-custom");
        const originalHTML = btn.innerHTML;
        const originalColor = btn.style.backgroundColor;

        btn.innerHTML = `<i class="bi bi-whatsapp"></i> Redirecting...`;
        btn.style.backgroundColor = "#25D366";

        setTimeout(() => {
            this.reset();
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = originalColor;
        }, 3000);
    });
}
