document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year Update
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Typed.js Initialization
    if (document.querySelector('.auto-input') && typeof Typed !== 'undefined') {
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

    // 3. EmailJS Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
            }

            // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with actual keys from EmailJS dashboard
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(() => {
                    alert('Message sent successfully!');
                    contactForm.reset();
                })
                .catch((error) => {
                    alert('Failed to send message: ' + JSON.stringify(error));
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                });
        });
    }
});

// 4. WhatsApp Integration Handler
function sendWhatsAppMessage(e) {
    e.preventDefault();
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const message = document.getElementById('message')?.value || '';

    const phoneNumber = "923432512522";

    const formattedText = `*New Portfolio Contact Message*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Message:* ${encodeURIComponent(message)}`;

    window.open(`https://wa.me/${phoneNumber}?text=${formattedText}`, '_blank');
}
