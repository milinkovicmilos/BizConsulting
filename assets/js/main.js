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
let slidersData = [];
let currentSlide = 0;
const sliderTimer = 5000;
let sliderTimeout;
function getSliderObj(sliderNode) {
    for (let i = 0; i < slidersData.length; i++) {
        if (slidersData[i].sliderNode == sliderNode) return slidersData[i];
    }
    return null;
}
function resetSliderTimeout(sliderObj) {
    let nextBtn = sliderObj.sliderNode.querySelector(".slider-btn-right");
    clearTimeout(sliderObj.sliderTimeout);
    sliderObj.sliderTimeout = setTimeout(() => $(nextBtn).click(), sliderTimer);
}
function previousSlide() {
    // Gets the appropriate slider object from the list
    sliderObj = getSliderObj(this.parentNode);
    let sliderIndicators = sliderObj.sliderNode.querySelectorAll(".slider-indicator");

    if (sliderObj.currentSlide == 0) {
        $(sliderObj.sliderSlides[sliderObj.currentSlide]).hide();
        $(sliderIndicators[sliderObj.currentSlide]).addClass("slider-indicator-inactive");
        sliderObj.currentSlide = sliderObj.sliderSlides.length - 1;
        $(sliderObj.sliderSlides[sliderObj.currentSlide]).fadeIn("slow");
        $(sliderIndicators[sliderObj.currentSlide]).removeClass("slider-indicator-inactive");
    } else {
        $(sliderObj.sliderSlides[sliderObj.currentSlide]).hide();
        $(sliderIndicators[sliderObj.currentSlide]).addClass("slider-indicator-inactive");
        sliderObj.currentSlide--;
        $(sliderObj.sliderSlides[sliderObj.currentSlide]).fadeIn("slow");
        $(sliderIndicators[sliderObj.currentSlide]).removeClass("slider-indicator-inactive");
    }
    resetSliderTimeout(sliderObj);
}
function nextSlide() {
    // Gets the appropriate slider object from the list
    sliderObj = getSliderObj(this.parentNode);
    let sliderIndicators = sliderObj.sliderNode.querySelectorAll(".slider-indicator");

    // Gets the current slide and makes it invisible, makes next one visible
    // Also does the same with slider indicators
    if (sliderObj.currentSlide == sliderObj.sliderSlides.length - 1) {
        $(sliderObj.sliderSlides[sliderObj.currentSlide]).hide();
        $(sliderIndicators[sliderObj.currentSlide]).addClass("slider-indicator-inactive");
        sliderObj.currentSlide = 0;
        $(sliderObj.sliderSlides[sliderObj.currentSlide]).fadeIn("slow");
        $(sliderIndicators[sliderObj.currentSlide]).removeClass("slider-indicator-inactive");
    } else {
        $(sliderObj.sliderSlides[sliderObj.currentSlide]).hide();
        $(sliderIndicators[sliderObj.currentSlide]).addClass("slider-indicator-inactive");
        sliderObj.currentSlide++;
        $(sliderObj.sliderSlides[sliderObj.currentSlide]).fadeIn("slow");
        $(sliderIndicators[sliderObj.currentSlide]).removeClass("slider-indicator-inactive");
    }
    resetSliderTimeout(sliderObj);
}
function initializeSlider(sliderNode) {
    let slides = sliderNode.querySelectorAll(".slider-slide");

    // Making sure inactive slides can't be seen
    for (let i = 1; i < slides.length; i++) {
        $(slides[i]).hide();
    }

    // Adding button event listeners
    let buttonLeft = $(sliderNode.querySelector(".slider-btn-left"));
    buttonLeft.click(previousSlide);

    let buttonRight = $(sliderNode.querySelector(".slider-btn-right"));
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
    $(sliderNode).append(container);
    let timeout = setTimeout(() => buttonRight.click(), sliderTimer);

    slidersData.push({
        "sliderNode" : sliderNode,
        "sliderSlides" : slides,
        "currentSlide" : 0,
        "sliderTimeout" : timeout
    });
}
//#endregion
//#region Dynamic HTML Elements
// Called for main slider only
function fillSliderImages(sliderObj) {
    for (let i = 0; i < sliderObj.sliderSlides.length; i++) {
        let sliderImg = sliderObj.sliderSlides[i].querySelector(".slider-background-image");
        $(sliderImg).css("background-image", `url("assets/img/main-slide-${i}.jpg")`);
    }
}

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

function fillSlider(sliderObj) {
    for (let i = 0; i < sliderObj.sliderSlides.length; i++) {
        let text = `<p>${slidesTexts[i]}</p>`;
        sliderObj.sliderSlides[i].querySelector(".slider-text-wrapper").innerHTML = text;
    }
}

// Called on main page only
function fillAboutUs() {
    $("#about-us #image-holder").css("background-image", "url('assets/img/about-us-image.jpg'");
    let textHTML = `
        <p>
            At BizConsulting, we understand that navigating the complex landscape 
            of modern business can be challenging. That's why we're here to guide you every step of 
            the way. With a commitment to excellence and a passion for helping businesses thrive, we offer 
            unparalleled consulting services tailored to meet your unique needs.
        </p>
    `;
    $("#about-us-text").append(textHTML);
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

const statsData = [
    {
        "statName" : "Average Revenue Growth",
        "statValue" : "18",
        "statDesc" : "Our clients experience an average annual revenue growth of 18%"
    },
    {
        "statName" : "Implementation Success Rate",
        "statValue" : "90",
        "statDesc" : "Our practical approaches are made to be implemented seamlessly into your business"
    },
    {
        "statName" : "Cost Savings Achieved",
        "statValue" : "22",
        "statDesc" : "Our clients, on average, experience 22% cost reduction thanks to our strategies"
    }
];
function fillStatistics() {
    let statHolder = document.createElement("div");
    for (const element of statsData) {
        let elementHTML = "";
        elementHTML += `<h3>${element.statName}</h3>`;
        elementHTML += `<p class="stat-value"><span class="counter">${element.statValue}</span>%</p>`;
        elementHTML += `<p>${element.statDesc}</p>`;
        let statElement = document.createElement("div");
        statElement.innerHTML = elementHTML;
        statHolder.appendChild(statElement);
    }
    document.querySelector("#statistics").appendChild(statHolder);
}

const testimonialsImgUrls = [
    "assets/img/testimonial-1.jpg", "assets/img/testimonial-2.jpg", 
    "assets/img/testimonial-3.jpg", "assets/img/testimonial-4.jpg",
];
const testimonialsTexts = [
    `I can't express enough gratitude for the incredible support we 
    received from BizConsulting. Their team demonstrated unparalleled 
    expertise in streamlining our business processes and optimizing our 
    operations. I highly recommend BizConsulting to any business 
    looking to elevate its performance and achieve sustainable success.`,
    `BizConsulting truly exceeded our expectations in every aspect. 
    Their team not only provided valuable insights into market trends 
    but also tailored their consulting services to align perfectly with 
    our business goals. Working with BizConsulting was a game-changer for 
    our company, and I wholeheartedly endorse their services.`,
    `Choosing BizConsulting was the best decisions we made for 
    our startup. Their knowledgeable consultants guided us through the 
    intricacies of business development, helping us navigate challenges 
    and capitalize on opportunities. Thanks to BizConsulting's dedication 
    we are now on a trajectory for long-term prosperity.`,
    `BizConsulting stands out as a beacon of excellence in the world of 
    business consultancy. Their team's commitment to understanding our 
    unique needs and challenges set them apart. I highly recommend their services to any company 
    seeking not just advice, but a genuine partnership for sustained growth.`
];
const testimonialsNames = ["Sarah Thompson", "James Rodriguez", "Emily Chen", "Michael Davis"];

function fillTestimonials() {
    let testimonialSlides = document.querySelectorAll("#testimonials .slider-slide");
    for (let i = 0; i < testimonialSlides.length; i++) {
        let imgHolderHTML = `<img src="${testimonialsImgUrls[i]}" alt="testimonial-image-${i}"/>`;
        testimonialSlides[i].querySelector(".testimonial-img-holder").innerHTML = imgHolderHTML;
        let textHTML = `<p>${testimonialsTexts[i]}</p>`;
        testimonialSlides[i].querySelector(".testimonial-text-holder").innerHTML = textHTML;
        let nameHTML = `<p class="testimonial-name">${testimonialsNames[i]}</p>`;
        testimonialSlides[i].querySelector(".testimonial-name-holder").innerHTML = nameHTML;
    }
}
//#endregion

// jQuery plugin Counter-Up
const counterUp = window.counterUp.default;

window.addEventListener("load", function () {
    // Dynamically writing out header and footer
    formatHeaderLinks(navLinks);
    formatSocials(socialsNames);
    formatFooterLinks(navLinks);
    if ($("#about-us").length != 0) {
        fillServices();
        $(document).ready(() => {
            $('#services-holder').waypoint(() => {
                if ($("#to-top-btn").is(":hidden")) $("#to-top-btn").fadeIn();
            }, {
                offset: '100%' 
            });
            $('#about-us-text').waypoint(function () {
                if ($("#to-top-btn").is(":visible")) $("#to-top-btn").fadeOut();
            }, {
                offset : '100%'
            });
        });
    }
    if ($("#statistics").length != 0) {
        fillStatistics();
        // jQuery plugin Counter-Up
        let elements = $(".counter");
        for (const el of elements) {
            counterUp(el, {
                duration: 1000,
				delay: 10,
            });
        }
    }
    if ($("#testimonials").length != 0) fillTestimonials();
    if ($("#about-us").length != 0) fillAboutUs();
    $("#to-top-btn").hide();

    let hamburger = document.querySelector("#hamburger");
    hamburger.addEventListener("click", openNav);
    
    // Makes sure the hamburger menu closes after we click a link
    // in case the link leads to the same page that the user is already on
    let hamburgerLinks = document.querySelectorAll("#nav-block ul li a");
    for (const element of hamburgerLinks) {
        element.addEventListener("click", openNav);
    }

    // Check if there is a slider on page
    let sliders = document.querySelectorAll(".slider");
    if (sliders.length != 0) {
        for (let index = 0; index < sliders.length; index++) {
            initializeSlider(sliders[index]);
        }
        // Writing out texts for first slider
        fillSlider(slidersData[0]);
        fillSliderImages(slidersData[0]);
    }

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