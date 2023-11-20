//#region Data

// List of objects containing link information
let navLinks = [
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
//#region Functions

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

formatNavList(navLinks);

let hamburgerMenuOpen = false;
let hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", openNav);

// Makes sure the hamburger menu closes after we click a link
// in case the link leads to the same page that the user is already on
let hamburgerLinks = document.querySelectorAll("#nav-block ul li a");
for (const element of hamburgerLinks) {
    element.addEventListener("click", openNav);
}