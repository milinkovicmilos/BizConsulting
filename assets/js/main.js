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
    if (!hamburgerMenuOpen) {
        navBlock.classList.add("d-block");
        hamburgerMenuOpen = true;
    } else {
        navBlock.classList.remove("d-block");
        hamburgerMenuOpen = false;
    }
}

//#endregion

formatNavList(navLinks);

let hamburgerMenuOpen = false;
let hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", openNav)