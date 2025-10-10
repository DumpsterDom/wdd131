const topAnime = [
  { title: 'Black Clover', desc: 'Swords and Magic', rank: 7, genre: 'Action', year: '2017', image: 'images/blackclover.png' },
  { title: 'Bluelock', desc: 'Stunning visuals and soccer', rank: 10, genre: 'Sports', year: '2022', image: 'images/bluelock.png' },
  { title: 'Dan Da Dan', desc: 'Ghost and Aliens', rank: 4, genre: 'Action', year: '2024', image: 'images/dandadan.png' },
  { title: 'Dragon Ball Super', desc: 'Galatic sized battles', rank: 3, genre: 'Fantasy', year: '2015', image: 'images/dbz.png' },
  { title: 'Dr. Stone', desc: 'Scientific adventures', rank: 9, genre: 'Fantasy', year: '2019', image: 'images/drstone.png' },
  { title: 'Gundam', desc: 'Giant robots', rank: 8, genre: 'Action', year: '1979', image: 'images/gundam.png' },
  { title: 'My Hero Academia', desc: 'Young heroes learn their powers', rank: 5, genre: 'Action', year: '2018', image: 'images/mha.png' },
  { title: 'Naruto', desc: 'Ninjas fighting for survival', rank: 2, genre: 'Action', year: '2002', image: 'images/naruto.png' },
  { title: 'One Piece', desc: 'Pirates on a grand adventure', rank: 1, genre: 'Action', year: '1999', image: 'images/onepiece.png' },
  { title: 'Pokemon', desc: 'Catch them all', rank: 6, genre: 'Adventure', year: '1997', image: 'images/pokemon.png' },
];

function displaySeries(series, container) {
  container.innerHTML = '';
  if (series.length === 0) {
    container.innerHTML = `<p>No series found.</p>`;
  } else {
    series.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('series-card');
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="series-image">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <p>Rank: ${item.rank}</p>
        <p>Genre: ${item.genre}</p>
        <p>Year: ${item.year}</p>
      `;
      container.appendChild(card);
    });
  }
}

function setupTopSeries() {
  const container = document.querySelector('.gallery');
  if (container) {
    const sortedAnime = [...topAnime].sort((a, b) => a.rank - b.rank);
    displaySeries(sortedAnime, container);
  }
}
// Filter
function filterSeries(filter) {
  let filtered = [...topAnime];
  const currentYear = new Date().getFullYear();
  const tenYearsAgo = currentYear - 10;

  switch (filter) {
    case 'old':
      filtered = filtered.filter(item => parseInt(item.year) < tenYearsAgo);
      break;
    case 'new':
      filtered = filtered.filter(item => parseInt(item.year) >= tenYearsAgo);
      break;
    case 'large':
      filtered = filtered.filter(item => item.rank <= 3);
      break;
    case 'small':
      filtered = filtered.filter(item => item.rank > 7);
      break;
    case 'all':
    default:
      filtered = filtered;
      break;
  }

  filtered.sort((a, b) => a.rank - b.rank);
  const container = document.querySelector('.gallery');
  displaySeries(filtered, container);
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  }
}

function updateLastModified() {
  const lastModified = document.getElementById('last-modified');
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
}

function updateCurrentYear() {
  const currentYear = document.getElementById('current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  setupTopSeries();
  updateLastModified();
  updateCurrentYear();

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.textContent = navMenu.classList.contains('open') ? '✖' : '☰';
  });

  const filterLinks = document.querySelectorAll('[data-filter]');
  filterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      filterLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const filter = link.getAttribute('data-filter');
      filterSeries(filter);
    });
  });
});