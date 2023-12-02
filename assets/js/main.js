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
function formatNavList(links) {
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
        navBlock.classList.add("hb-active");
        hamburgerIcon.classList.add("hb-open");
        hamburgerMenuOpen = true;
    } else {
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

window.addEventListener("load", function () {
    formatNavList(navLinks);
    formatSocials(socialsNames);
    formatFooterLinks(navLinks);
    
    let hamburger = document.querySelector("#hamburger");
    hamburger.addEventListener("click", openNav);
    
    // Makes sure the hamburger menu closes after we click a link
    // in case the link leads to the same page that the user is already on
    let hamburgerLinks = document.querySelectorAll("#nav-block ul li a");
    for (const element of hamburgerLinks) {
        element.addEventListener("click", openNav);
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