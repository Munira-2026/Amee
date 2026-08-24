// Time zone configurations
const timezones = [
    { id: 'nyc-clock', timezone: 'America/New_York', name: 'New York' },
    { id: 'london-clock', timezone: 'Europe/London', name: 'London' },
    { id: 'india-clock', timezone: 'Asia/Kolkata', name: 'India' },
    { id: 'iceland-clock', timezone: 'Atlantic/Reykjavik', name: 'Iceland' },
    { id: 'tokyo-clock', timezone: 'Asia/Tokyo', name: 'Tokyo' },
    { id: 'sydney-clock', timezone: 'Australia/Sydney', name: 'Sydney' },
    { id: 'berlin-clock', timezone: 'Europe/Berlin', name: 'Berlin' },
    { id: 'dubai-clock', timezone: 'Asia/Dubai', name: 'Dubai' },
    { id: 'sao-paulo-clock', timezone: 'America/Sao_Paulo', name: 'São Paulo' }
];

/**
 * Format time as HH:MM:SS AM/PM
 * @param {Date} date - The date object to format
 * @returns {string} - Formatted time string
 */
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes}:${seconds} ${ampm}`;
}

/**
 * Format date as Day, Month Date, Year
 * @param {Date} date - The date object to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get current time in a specific timezone
 * @param {string} timezone - IANA timezone string
 * @returns {Date} - Date object in the specified timezone
 */
function getTimeInTimezone(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const parts = formatter.formatToParts(now);
    const result = {};

    parts.forEach(({ type, value }) => {
        result[type] = value;
    });

    const date = new Date(
        result.year,
        parseInt(result.month) - 1,
        result.day,
        result.hour,
        result.minute,
        result.second
    );

    return date;
}

/**
 * Update all clock displays
 */
function updateClocks() {
    // Update timezone clocks
    timezones.forEach(({ id, timezone }) => {
        const clockElement = document.getElementById(id);
        if (clockElement) {
            const time = getTimeInTimezone(timezone);
            clockElement.textContent = formatTime(time);
        }
    });

    // Update local time
    const localClock = document.getElementById('local-clock');
    const localDate = document.getElementById('local-date');
    const now = new Date();

    if (localClock) {
        localClock.textContent = formatTime(now);
    }

    if (localDate) {
        localDate.textContent = formatDate(now);
    }
}

// Update clocks immediately on load
updateClocks();

// Update clocks every 1 second
setInterval(updateClocks, 1000);

// Add animation on page load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.clock-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});
