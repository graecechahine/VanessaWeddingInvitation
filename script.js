
    // Set the wedding date
const weddingDate = new Date("May 10, 2026 15:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const gap = weddingDate - now;

    // Time calculations
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculate remaining units
    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    // Update DOM
    document.getElementById("days").innerText = d < 10 ? '0' + d : d;
    document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
    document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
    document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;

    // If date is passed
    if (gap < 0) {
        clearInterval(interval);
        document.getElementById("countdown").innerHTML = "<h3>Happily Ever After!</h3>";
    }
};

// Update every second
const interval = setInterval(updateCountdown, 1000);
updateCountdown(); // Call once immediately to avoid 00 display



/*
const form = document.getElementById('weddingForm');
const statusDiv = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const method = document.getElementById('method').value;
    const weddingPhoneNumber = "96171505436"; // REPLACE WITH THE COUPLE'S PHONE (International format)

    const attendanceText = attendance === 'yes' ? "Joyfully Accepts" : "Regretfully Declines";
    const message = `Hi! This is ${name}. I am writing to RSVP for the wedding. I ${attendanceText}.`;

    if (method === 'whatsapp') {
        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/${weddingPhoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        statusDiv.innerHTML = "Redirecting to WhatsApp...";
    } else {
        // Handle Email via Formspree or similar
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerText = "Sending Email...";
        
        try {
            const response = await fetch('https://formspree.io/f/mqedkajd', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, attendance, message: "RSVP via Website" })
            });

            if (response.ok) {
                statusDiv.innerHTML = "✨ Confirmation sent via Email!";
                form.reset();
            }
        } catch (error) {
            statusDiv.innerHTML = "❌ Error sending email. Try WhatsApp instead!";
        }
    }

});*/



const form = document.getElementById('weddingForm');
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl-i0J1C7PMZAdcBRru2RrsEYbr0FB7XVpo12eXIjyOO5MYUHfE95wGDdAUEncUixM/exec'; // Paste your URL here

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const phone = document.getElementById('whatsappTarget').value

    const attendanceText = attendance === 'yes' ? "Joyfully Accepts" : "Regretfully Declines";
    const message = `Hi! This is ${name}. I am writing to RSVP. I ${attendanceText}.`;

    
    // 2. Open WhatsApp immediately
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    document.getElementById('formStatus').innerHTML = "Recording response and opening WhatsApp...";

    
});


const attendanceSelect = document.getElementById('attendance');
const guestWrapper = document.getElementById('guest-count-wrapper');

// 1. Show/Hide Guest Count
attendanceSelect.addEventListener('change', (e) => {
    if (e.target.value === 'yes') {
        guestWrapper.classList.remove('hidden');
    } else {
        guestWrapper.classList.add('hidden');
        document.getElementById('guests').value = 0; // Set to 0 if declining
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const guestCount = document.getElementById('guests').value;
    const phone = document.getElementById('whatsappTarget').value;
    
    const attendanceText = attendance === 'yes' ? `Accept (Total: ${guestCount} person/s)` : "Decline";
    const message = `Hi! This is ${name}. I am writing to RSVP. I/We ${attendanceText}.`;

    // 2. Send data to Google Sheets
    // Note: Make sure your Apps Script 'appendRow' has a column for guests!
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: JSON.stringify({ name, attendance, guests: guestCount })
    });

    // 3. WhatsApp Redirect
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});
