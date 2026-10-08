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
    propNextBtn.addEventListener("click", () => {
        const scrollAmount = propSlider.clientWidth / 2;
        propSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    propPrevBtn.addEventListener("click", () => {
        const scrollAmount = propSlider.clientWidth / 2;
        propSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}



