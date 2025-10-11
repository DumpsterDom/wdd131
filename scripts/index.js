document.addEventListener('DOMContentLoaded', () => {
    // Date & Time
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});