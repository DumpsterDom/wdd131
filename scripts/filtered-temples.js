// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Albuquerque New Mexico",
        location: "Albuquerque, New Mexico, United States",
        dedicated: "2000, March, 5",
        area: 34245,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/albuquerque-new-mexico-temple/albuquerque-new-mexico-temple-56335-main.jpg"
    },
    {
        templeName: "Oakland California",
        location: "Oakland, California, United States",
        dedicated: "1964, November, 17",
        area: 80157,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/oakland-california-temple/oakland-california-temple-2654-main.jpg"
    },
    {
        templeName: "Concepción Chile",
        location: "Concepción, Chile",
        dedicated: "2018, October, 28",
        area: 23095,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/concepcion-chile-temple/concepcion-chile-temple-273-main.jpg"
    },
    {
        templeName: "Manhattan New York",
        location: "Manhattan, New York, United States",
        dedicated: "2004, June, 13",
        area: 20630,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manhattan-new-york-temple/manhattan-new-york-temple-40080-main.jpg"
    },
    {
        templeName: "Seoul Korea",
        location: "Seoul Korea",
        dedicated: "1985, December, 14",
        area: 28057,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/seoul-korea-temple/seoul-korea-temple-22305-main.jpg"
    }
];

// DOM 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const gallery = document.querySelector('.gallery');

// Validate 
function validateTempleData(temples) {
    return temples.every(temple => 
        temple.templeName && 
        temple.location && 
        temple.dedicated && 
        typeof temple.area === 'number' && 
        temple.imageUrl
    );
}

function getTempleYear(dedicated) {
    const [year] = dedicated.split(', ');
    return parseInt(year, 10);
}

// Display temples 
function displayTemples(templeList) {
    if (!gallery) {
        console.error('Gallery element not found');
        if (document.querySelector('main')) {
            document.querySelector('main').innerHTML += '<p style="color: red;">Error: Gallery not found. Please check the HTML structure.</p>';
        }
        return;
    }

    gallery.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-style: italic;">Loading temples...</p>';

    setTimeout(() => {
        gallery.innerHTML = '';
        if (templeList.length === 0) {
            gallery.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No temples match the selected filter. <a href="#" data-filter="all" style="color: #007bff;">Show all temples</a></p>';
            return;
        }

        templeList.forEach(temple => {
            const figure = document.createElement('figure');
            figure.setAttribute('role', 'article');
            figure.setAttribute('aria-labelledby', `temple-${temple.templeName.replace(/\s+/g, '-').toLowerCase()}`);
            figure.innerHTML = `
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple exterior" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/400x250?text=Image+Not+Available';">
                <figcaption id="temple-${temple.templeName.replace(/\s+/g, '-').toLowerCase()}">
                    <strong>${temple.templeName}</strong><br>
                    <span>Location:</span> ${temple.location}<br>
                    <span>Dedicated:</span> ${temple.dedicated}<br>
                    <span>Size:</span> ${temple.area.toLocaleString()} sq ft
                </figcaption>
            `;
            gallery.appendChild(figure);
        });

        console.log(`Displayed ${templeList.length} temples`);
    }, 300); 
}

// Filters
function filterTemples(filter) {
    console.log('Applying filter:', filter);
    let filteredTemples = temples;

    try {
        switch (filter) {
            case 'old':
                filteredTemples = temples.filter(temple => getTempleYear(temple.dedicated) < 1900);
                break;
            case 'new':
                filteredTemples = temples.filter(temple => getTempleYear(temple.dedicated) > 2000);
                break;
            case 'large':
                filteredTemples = temples.filter(temple => temple.area > 90000);
                break;
            case 'small':
                filteredTemples = temples.filter(temple => temple.area < 10000);
                break;
            case 'all':
            default:
                filteredTemples = temples;
                break;
        }
        displayTemples(filteredTemples);
    } catch (error) {
        console.error('Error filtering temples:', error);
        if (gallery) {
            gallery.innerHTML = '<p style="color: red; text-align: center;">Error loading temples. Please refresh the page.</p>';
        }
    }
}

// Hamburger 
function initHamburger() {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.textContent = isOpen ? '✖' : '☰';
        hamburger.setAttribute('aria-expanded', isOpen);
        console.log('Hamburger toggled:', isOpen ? 'open' : 'closed');
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            hamburger.textContent = '☰';
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

//  Nav links
function initNavLinks() {
    const navLinks = document.querySelectorAll('nav a[data-filter]');
    if (navLinks.length === 0) {
        console.error('No navigation links with data-filter found');
        return;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const filter = link.getAttribute('data-filter') || 'all';
            filterTemples(filter);
            // Close mobile menu after selection
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburger.textContent = '☰';
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    console.log(`Initialized ${navLinks.length} nav links`);
}

// footer 
function updateFooter() {
    const currentYearEl = document.getElementById('current-year');
    const lastModifiedEl = document.getElementById('last-modified');
    const footer = document.querySelector('footer');

    if (!currentYearEl || !lastModifiedEl || !footer) {
        console.error('Footer elements not found');
        return;
    }

    currentYearEl.textContent = new Date().getFullYear();
    lastModifiedEl.textContent = document.lastModified || new Date().toLocaleDateString();

    console.log('Footer updated:', { year: new Date().getFullYear(), modified: document.lastModified });
}

// Main
function initApp() {
    console.log('Initializing Temple Gallery App');

    if (!validateTempleData(temples)) {
        console.error('Invalid temple data detected');
        if (gallery) {
            gallery.innerHTML = '<p style="color: red; text-align: center;">Error: Invalid temple data. Please check the data source.</p>';
        }
        return;
    }

    initHamburger();
    initNavLinks();
    updateFooter();


    filterTemples('all');
}

document.addEventListener('DOMContentLoaded', initApp);