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
    }
];

// DOM elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const gallery = document.querySelector('.gallery');

// Validate temple data
function validateTempleData(temples) {
    return temples.every(temple => 
        temple.templeName && 
        temple.location && 
        temple.dedicated && 
        typeof temple.area === 'number' && 
        temple.imageUrl
    );
}

// Parse dedication year
function getTempleYear(dedicated) {
    const [year] = dedicated.split(', ');
    return parseInt(year);
}

// Display temples
function displayTemples(templeList) {
    if (!gallery) {
        console.error('Gallery element not found');
        document.querySelector('main').innerHTML += '<p style="color: red;">Error: Gallery not found.</p>';
        return;
    }
    gallery.innerHTML = '<p>Loading temples...</p>';
    setTimeout(() => {
        gallery.innerHTML = '';
        if (templeList.length === 0) {
            gallery.innerHTML = '<p>No temples match the selected filter. <a href="#" data-filter="all">Show all temples</a></p>';
            return;
        }
        templeList.forEach(temple => {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <figcaption>
                    <strong>${temple.templeName}</strong><br>
                    Location: ${temple.location}<br>
                    Dedicated: ${temple.dedicated}<br>
                    Size: ${temple.area.toLocaleString()} sq ft
                </figcaption>
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" onerror="this.src='https://via.placeholder.com/400x250?text=Image+Not+Available';">
            `;
            gallery.appendChild(figure);
        });
    }, 500);
}

// Filter temples
function filterTemples(filter) {
    let filteredTemples = temples;
    try {
        if (filter === 'old') {
            filteredTemples = temples.filter(temple => getTempleYear(temple.dedicated) < 1900);
        } else if (filter === 'new') {
            filteredTemples = temples.filter(temple => getTempleYear(temple.dedicated) > 2000);
        } else if (filter === 'large') {
            filteredTemples = temples.filter(temple => temple.area > 90000);
        } else if (filter === 'small') {
            filteredTemples = temples.filter(temple => temple.area < 10000);
        } else if (filter === 'all') {
            filteredTemples = temples;
        }
        displayTemples(filteredTemples);
    } catch (error) {
        console.error('Error filtering temples:', error);
        gallery.innerHTML = '<p style="color: red;">Error loading temples.</p>';
    }
}

// Initialize hamburger menu
function initHamburger() {
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            hamburger.textContent = navMenu.classList.contains('open') ? '✖' : '☰';
            hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
        });
    } else {
        console.error('Hamburger button not found');
    }
}

// Initialize navigation links
function initNavLinks() {
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const filter = link.getAttribute('data-filter') || 'all';
                filterTemples(filter);
            });
        });
    } else {
        console.error('No navigation links found');
    }
}

// Update footer
function updateFooter() {
    try {
        document.getElementById('current-year').textContent = new Date().getFullYear();
        document.getElementById('last-modified').textContent = document.lastModified || 'Unknown';
    } catch (error) {
        console.error('Error updating footer:', error);
        document.querySelector('footer').innerHTML += '<p style="color: red;">Error updating footer dates.</p>';
    }
}

// Initialize application
function init() {
    if (!validateTempleData(temples)) {
        console.error('Invalid temple data detected');
        gallery.innerHTML = '<p style="color: red;">Error: Invalid temple data.</p>';
        return;
    }
    initHamburger();
    initNavLinks();
    updateFooter();
    displayTemples(temples);
}

init();