document.addEventListener('DOMContentLoaded', () => {
    // year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // last mod date
    document.getElementById('last-modified').textContent = document.lastModified;

    // Wind chill
    const temp = parseFloat(document.getElementById('temperature').textContent);
    const windSpeed = parseFloat(document.getElementById('wind-speed').textContent);
    const windChillElement = document.getElementById('wind-chill');

    function calculateWindChill(temp, windSpeed) {
        return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1);
    }

    // Check wind chill 
    if (temp <= 10 && windSpeed > 4.8) {
        windChillElement.textContent = calculateWindChill(temp, windSpeed) + '°C';
    } else {
        windChillElement.textContent = 'N/A';
    }
});