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
//#region Form Error Data
const formErrors = [
    {
        "formElementID" : "input-first-name",
        "errorText" : "This field is required, please enter your name",
        "regex" : "^$",
        "isVisible" : false
    },
    {
        "formElementID" : "input-first-name",
        "errorText" : "Name has to start with capital letter and needs to have at least 3 letters",
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
        "errorText" : "Last name has to start with capital letter and needs to have at least 3 letters",
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
        "regex" : "^\\+[\d]{1,3} [\d]{1,3} [\d]{6,9}$",
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
function showError(formErrorObj) {
    let errorMessage = `<p class="error-text">${formErrorObj.errorText}</p>`;
    $(errorMessage).insertAfter($(`#${formErrorObj.formElementID}`));
}
//#endregion

window.addEventListener("load", function () {
    formatNavList(navLinks);
    
    let hamburger = document.querySelector("#hamburger");
    hamburger.addEventListener("click", openNav);
    
    // Makes sure the hamburger menu closes after we click a link
    // in case the link leads to the same page that the user is already on
    let hamburgerLinks = document.querySelectorAll("#nav-block ul li a");
    for (const element of hamburgerLinks) {
        element.addEventListener("click", openNav);
    }
});