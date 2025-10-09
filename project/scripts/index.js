document.addEventListener('DOMContentLoaded', () => {
    // Update footer with current year and last modified date
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});