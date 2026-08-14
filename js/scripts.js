document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year Updates
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Typed.js Initialization
    if (document.querySelector('.auto-input')) {
        new Typed('.auto-input', {
            strings: [
                'IT Application Support Engineer',
                'Project Management Professional',
                'Senior IT Officer',
                'Full Stack & SQA Specialist'
            ],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true
        });
    }
});

// WhatsApp Integration Form Handler
function sendWhatsAppMessage(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const phoneNumber = "923432512522"; // Updated to your resume contact number
    
    const formattedText = `*New Portfolio Contact Message*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Message:* ${encodeURIComponent(message)}`;

    window.open(`https://wa.me/${phoneNumber}?text=${formattedText}`, '_blank');
}
