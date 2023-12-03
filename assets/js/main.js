//#region Navbar Data
// List of objects containing link information
const navLinks = [
    {
        "title": "Home",
        "url": "index.html"
    },
    {
        "title": "About Us",
        "url": "index.html#about-us"
    },
    {
        "title": "Testimonials",
        "url": "index.html#testimonials"
    },
    {
        "title": "Contact Us",
        "url": "index.html#contact-us"
    },
    {
        "title": "Author",
        "url": "author.html"
    }
];

//#endregion
//#region Navbar Functions
function formatHeaderLinks(links) {
    // Builds HTML elements for nav menus
    let navList = document.querySelector("#nav-list");
    let navBlock = document.querySelector("#nav-block");
    let navListContent = "";
    for (const element of links) {
        // Loops through each link object and concatenates all li HTML elements
        navListContent += formatLinkElement(element);
    }
    navList.innerHTML = navListContent;
    navBlock.innerHTML = "<ul>" + navListContent + "</ul>";
}

function formatLinkElement(link) {
    // Getting each link object and extracting data into li HTML element
    let element = `<li><a href="${link["url"]}">${link["title"]}</a></li>`;
    return element;
}

let hamburgerMenuOpen = false;
function openNav() {
    let navBlock = document.querySelector("#nav-block"); 
    let hamburgerIcon = document.querySelector("#hamburger i");
    if (!hamburgerMenuOpen) {
        $("body").addClass("stop-scroll");
        navBlock.classList.add("hb-active");
        hamburgerIcon.classList.add("hb-open");
        hamburgerMenuOpen = true;
    } else {
        $("body").removeClass("stop-scroll");
        navBlock.classList.remove("hb-active");
        hamburgerIcon.classList.remove("hb-open");
        hamburgerMenuOpen = false;
    }
}

//#endregion
//#region Footer Data
const socialsNames = ["instagram", "facebook", "linkedin"];
//#endregion
//#region Footer Functions
function formatSocials(socialsNames) {
    let socialsLinks = "";
    for (const social of socialsNames) {
        socialsLinks += `<a href="www.${social}.com"><i class="fa-brands fa-${social}"></i></a>`;
    }
    document.querySelector("#socials-wrapper").innerHTML = socialsLinks;
}
function formatFooterLinks(links) {
    let navListContent = "";
    for (const element of links) {
        // Loops through each link object and concatenates all li HTML elements
        navListContent += formatLinkElement(element);
    }
    navListContent = "<ul>" + navListContent + "</ul>";
    document.querySelector("#footer-nav nav").innerHTML = navListContent;
}
//#endregion
//#region Form Error Data
const formErrors = [
    {
        "formElementID" : "input-first-name",
        "errorText" : "This field is required, please enter your name",
        "regex" : ".+",
        "isVisible" : false
    },
    {
        "formElementID" : "input-first-name",
        "errorText" : "Please enter valid name starting with capital letter",
        "regex" : "[A-Z][a-z]{2,}([A-Z][a-z]{2,})*",
        "isVisible" : false
    },
    {
        "formElementID" : "input-last-name",
        "errorText" : "This field is required, please enter your last name",
        "regex" : ".+",
        "isVisible" : false
    },
    {
        "formElementID" : "input-last-name",
        "errorText" : "Please enter valid last name starting with capital letter",
        "regex" : "[A-Z][a-z]{2,}([A-Z][a-z]{2,})*",
        "isVisible" : false
    },
    {
        "formElementID" : "input-email",
        "errorText" : "This field is required, please enter your e-mail address",
        "regex" : ".+",
        "isVisible" : false
    },
    {
        "formElementID" : "input-email",
        "errorText" : "Please enter correct e-mail address (e.g. johndoe@gmail.com)",
        "regex" : "^([a-z]+\.?)+@[a-z]{2,}\.[a-z]{2,}$",
        "isVisible" : false
    },
    {
        "formElementID" : "input-phone-number",
        "errorText" : "This field is required, please enter contact phone number",
        "regex" : ".+",
        "isVisible" : false
    },
    {
        "formElementID" : "input-phone-number",
        "errorText" : "Please enter correct contact number (e.g. +381 12 3456789)",
        "regex" : "^\\+[0-9]{1,3} [0-9]{1,3} [0-9]{6,9}$",
        "isVisible" : false
    },
    {
        "formElementID" : "select-region",
        "errorText" : "Please select your region",
        "regex" : "^(?!-1$)",
        "isVisible" : false
    }
];

//#endregion
//#region Form Functions
function getFormErrorObjs(formID) {
    let objs = [];
    for (const element of formErrors) {
        if (element.formElementID == formID) objs.push(element);
    }
    return objs;
}

function showError(formErrorObj) {
    if (!formErrorObj.isVisible) {
        let errorMessage = `<p class="error-text">${formErrorObj.errorText}</p>`;
        $(errorMessage).insertAfter($(`#${formErrorObj.formElementID}`));
        formErrorObj.isVisible = true;
    }
}

function hideError(formErrorObj) {
    if (formErrorObj.isVisible) {
        $(`#${formErrorObj.formElementID} ~ p`).remove();
        formErrorObj.isVisible = false;
    }
}

function checkFormElement() {
    let formErrorObjs = getFormErrorObjs(this.id);
    for (const element of formErrorObjs) {
        let regex = new RegExp(element.regex);
        if (regex.test(this.value)) {
            hideError(element);
        } else {
            showError(element);
            return;
        }
    }
}

//#endregion
//#region Slider
let slides = [];
let currentSlide = 0;
const sliderTimer = 5000;
let sliderTimeout;
function previousSlide() {
    if (currentSlide == 0) {
        $(slides[currentSlide]).hide();
        $($('.slider-indicator')[currentSlide]).addClass("slider-indicator-inactive");
        currentSlide = slides.length - 1;
        $(slides[currentSlide]).fadeIn("slow");
        $($('.slider-indicator')[currentSlide]).removeClass("slider-indicator-inactive");
    } else {
        $(slides[currentSlide]).hide();
        $($('.slider-indicator')[currentSlide]).addClass("slider-indicator-inactive");
        currentSlide--;
        $(slides[currentSlide]).fadeIn("slow");
        $($('.slider-indicator')[currentSlide]).removeClass("slider-indicator-inactive");
    }
    clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(nextSlide, sliderTimer);
}
function nextSlide() {
    if (currentSlide == slides.length - 1) {
        $(slides[currentSlide]).hide();
        $($('.slider-indicator')[currentSlide]).addClass("slider-indicator-inactive");
        currentSlide = 0;
        $(slides[currentSlide]).fadeIn("slow");
        $($('.slider-indicator')[currentSlide]).removeClass("slider-indicator-inactive");
    } else {
        $(slides[currentSlide]).hide();
        $($('.slider-indicator')[currentSlide]).addClass("slider-indicator-inactive");
        currentSlide++;
        $(slides[currentSlide]).fadeIn("slow");
        $($('.slider-indicator')[currentSlide]).removeClass("slider-indicator-inactive");
    }
    clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(nextSlide, sliderTimer);
}
function initializeSlider() {
    // Making sure inactive slides can't be seen
    slides = $(".slider-slide");
    for (let i = 1; i < slides.length; i++) {
        $(slides[i]).hide();
    }

    // Adding button event listeners
    let buttonLeft = $(".slider-btn-left");
    buttonLeft.click(previousSlide);

    let buttonRight = $(".slider-btn-right");
    buttonRight.click(nextSlide);

    // Adding slide indicators
    let container = document.createElement("div");
    container.classList.add("flex-between");
    for (let i = 0; i < slides.length; i++) {
        let element = document.createElement("div");
        element.classList.add("slider-indicator");
        if (i > 0) element.classList.add("slider-indicator-inactive");
        container.appendChild(element);
    }
    $('.slider').append(container);

    // Adds text to sliders
    fillSlider();

    sliderTimeout = setTimeout(nextSlide, sliderTimer);
}
//#endregion
//#region Dynamic HTML Elements
const slidesTexts = [
    `Our consultants work collaboratively with 
    you to develop a strategic roadmap 
    that aligns with your business goals and objectives.`,
    `Our consultants take the time to understand 
    your business intricately, ensuring 
    our recommendations fit seamlessly into your operations.`,
    `Our track record speaks for 
    itself, and we take pride in being a catalyst for positive change.`
];
function fillSlider() {
    for (let i = 0; i < slides.length; i++) {
        let text = `<p>${slidesTexts[i]}</p>`;
        slides[i].querySelector(".slider-text-wrapper").innerHTML = text;
    }
}
const servicesIcons = ["bullseye", "arrow-trend-up", "comments-dollar", "bullhorn"];
const servicesTitles = ["Business Strategy", "Operations Excellence", "Financial Advisory", "Marketing Solutions"];
const servicesTexts = [
    "Craft a roadmap for success with our comprehensive business strategy services. From market analysis to long-term planning, we've got you covered.",
    "Streamline your operations for maximum efficiency. We identify bottlenecks, optimize processes, and implement best practices to enhance overall performance.",
    "Make smart financial decisions with our expert financial advisory services. From budgeting to investment strategies, we help you achieve fiscal responsibility and sustainability.",
    "Stand out in a crowded market with our innovative marketing solutions. Whether it's digital marketing, branding, or market research, we'll help you build a strong and recognizable brand."
];
function fillServices() {
    for (let i = 0; i < servicesIcons.length; i++) {
        let servicesHolder = document.querySelector("#services-holder");
        let element = document.createElement("div");
        element.classList.add("services-element");
        let elementHTML = `<i class="fa-solid fa-${servicesIcons[i]}"></i><h2>${servicesTitles[i]}</h2><p>${servicesTexts[i]}</p>`;
        element.innerHTML = elementHTML;
        servicesHolder.appendChild(element);
    }
}
//#endregion
window.addEventListener("load", function () {
    // Dynamically writing out header and footer
    formatHeaderLinks(navLinks);
    formatSocials(socialsNames);
    formatFooterLinks(navLinks);
    fillServices();
    
    let hamburger = document.querySelector("#hamburger");
    hamburger.addEventListener("click", openNav);
    
    // Makes sure the hamburger menu closes after we click a link
    // in case the link leads to the same page that the user is already on
    let hamburgerLinks = document.querySelectorAll("#nav-block ul li a");
    for (const element of hamburgerLinks) {
        element.addEventListener("click", openNav);
    }

    // Check if there is a slider on page
    let slider = document.querySelector(".slider");
    if (slider != null) initializeSlider()

    // Select all form elements
    let formElements = document.querySelectorAll('input[type="text"], #select-region');

    // Add appropriate event listeners to them
    for (const element of formElements) {
        element.addEventListener("blur", checkFormElement);
    }

    // Make sure form is valid before submition
    let form = document.querySelector("form");
    if (form != null) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
    
            // Fires blur event on every form element so 
            // that we can check if all form elements values are valid
            for (const element of formElements) {
                element.dispatchEvent(new Event("blur"));
            }
    
            // After running checkFormElement for every form
            // element if no errors are present we can submit the form
            for (const element of formErrors) {
                if (element.isVisible) return;
            }
            form.submit();
        });
    }
});