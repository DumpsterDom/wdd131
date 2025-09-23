document.addEventListener('DOMContentLoaded', () => {
    // Temple data
    const temples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },
        // Additional temples
        {
            templeName: "Rome Italy",
            location: "Rome, Italy",
            dedicated: "2019, March, 10",
            area: 41000,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/1-Rome-Italy-Temple-2160343.jpg"
        },
        {
            templeName: "Salt Lake",
            location: "Salt Lake City, Utah, United States",
            dedicated: "1893, April, 6",
            area: 253015,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-1079441-wallpaper.jpg"
        },
        {
            templeName: "San Diego California",
            location: "San Diego, California, United States",
            dedicated: "1993, April, 25",
            area: 72000,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/400x250/san-diego-temple-765109-wallpaper.jpg"
        }
    ];

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const gallery = document.querySelector('.gallery');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.textContent = navMenu.classList.contains('open') ? '✖' : '☰';
    });

    // Function to display temples
    function displayTemples(templeList) {
        gallery.innerHTML = ''; // Clear existing content
        templeList.forEach(temple => {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <figcaption>
                    <strong>${temple.templeName}</strong><br>
                    Location: ${temple.location}<br>
                    Dedicated: ${temple.dedicated}<br>
                    Size: ${temple.area.toLocaleString()} sq ft
                </figcaption>
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
            `;
            gallery.appendChild(figure);
        });
    }

    // Filter temples based on category
    function filterTemples(filter) {
        let filteredTemples = temples;
        if (filter === 'old') {
            filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() < 1900);
        } else if (filter === 'new') {
            filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() > 2000);
        } else if (filter === 'large') {
            filteredTemples = temples.filter(temple => temple.area > 90000);
        } else if (filter === 'small') {
            filteredTemples = temples.filter(temple => temple.area < 10000);
        }
        displayTemples(filteredTemples);
    }

    // Navigation link event listeners
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const filter = link.getAttribute('data-filter');
            filterTemples(filter);
        });
    });

    // Initial display
    displayTemples(temples);

    // Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});