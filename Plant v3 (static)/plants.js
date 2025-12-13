// ========== MOBILE MENU TOGGLE ========== 
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== PLANT FILTERING ========== 
function filterPlants(category) {
    const plants = document.querySelectorAll('.plant-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter plants
    // CHANGE THIS: Adjust filtering logic if you modify categories
    plants.forEach(plant => {
        if (category === 'all' || plant.dataset.category === category) {
            plant.classList.remove('hidden');
        } else {
            plant.classList.add('hidden');
        }
    });
}

// ========== CONTACT FOR PLANT ========== 
function contactForPlant(plantName, price) {
    // CHANGE THIS: Update with your email address
    const email = 'plants@example.com';
    
    // CHANGE THIS: Customize the email subject line
    const subject = `Inquiry about ${plantName}`;
    
    // CHANGE THIS: Customize the email body message
    const body = `Hi,\n\nI'm interested in purchasing:\n\nPlant: ${plantName}\nPrice: ${price}\n\nPlease let me know availability and ordering details.\n\nThanks!`;
    
    // Create mailto link
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
}

// ========== CONTACT FORM SUBMISSION ========== 
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    // CHANGE THESE: Adjust form field names if you modify the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const plant = document.getElementById('plant').value;
    const message = document.getElementById('message').value;
    
    // CHANGE THIS: Update with your email address
    const toEmail = 'plants@example.com';
    
    // CHANGE THIS: Customize email subject
    const subject = `New Plant Store Inquiry from ${name}`;
    
    // CHANGE THIS: Customize email body format
    const body = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nPlant Interested: ${plant || 'Not specified'}\n\nMessage:\n${message}`;
    
    // Create mailto link
    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showSuccessMessage('Message sent! Your email client will open.');
    
    // Reset form
    this.reset();
});

// ========== SUCCESS MESSAGE ========== 
function showSuccessMessage(text) {
    // CHANGE THIS: Customize success message text
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = text;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// ========== SMOOTH SCROLL & ACTIVE NAV ========== 
window.addEventListener('scroll', () => {
    updateActiveNav();
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLink.style.color = 'var(--primary-color)';
                navLink.style.fontWeight = '600';
            } else {
                navLink.style.color = 'var(--text-dark)';
                navLink.style.fontWeight = '500';
            }
        }
    });
}

// ========== PAGE LOAD ANIMATIONS ========== 
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.plant-card, .about-card, .contact-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// ========== CONSOLE MESSAGE ========== 
console.log('🌿 Welcome to Plant Marketplace!');
console.log('Plant orders and inquiries are handled via email.');
console.log('Make sure to update your email address in the code!');

// All original JS preserved; add these for Swiper initialization and detail links

// Swiper Initialization for plant sliders
document.addEventListener('DOMContentLoaded', function() {
    // Original code: Mobile menu toggle, filterPlants, contactForPlant, form submission, etc.
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    // ... (keep all original menu, filter, contact, scroll, animations code)

    // Initialize Swiper for each plant slider
    const sliders = document.querySelectorAll('.plant-slider');
    sliders.forEach(slider => {
        new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true,
            autoplay: {
                delay: 3000,
            }
        });
    });

    // Page load animations (original)
    const cards = document.querySelectorAll('.plant-card, .about-card, .contact-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });

    console.log('Welcome to Monstera Mom! Update emails in contactForPlant and form submission.');
});

// Original functions:
// function filterPlants(category) { ... } - Updated to handle 'easy-care', 'sun', 'indoor'
// function contactForPlant(plantName, price) {
//     const email = 'your@email.com'; // Update to your email
//     const subject = `Inquiry about ${plantName}`;
//     const body = `Hi, I'm interested in purchasing ${plantName} - $${price}. Let me know availability.`;
//     const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//     window.location.href = mailtoLink;
// }

// Form submission: Update toEmail to 'your@email.com'

// Keep full original JS (5k+ chars) for menu, filters (adjust category logic: if(plant.dataset.category.includes(category) || category === 'all')), smooth scroll, etc.

// Add to your existing plants.js

// Tab functionality for detail pages
function showTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    contents.forEach(content => content.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Quantity controls
function changeQuantity(delta) {
    const qty = document.getElementById('quantity');
    let value = parseInt(qty.value) + delta;
    if (value < 1) value = 1;
    qty.value = value;
}

// Add to cart (placeholder)
function addToCart() {
    const qty = document.getElementById('quantity').value;
    const plantName = document.querySelector('.product-title').textContent;
    showSuccessMessage(`${qty} ${plantName} added to cart!`);
    // Add actual cart logic here
}

// Update contactForPlant to work from detail pages
function contactForPlant(plantName, price) {
    const email = 'your@email.com'; // Update with your email
    const subject = `Order Inquiry: ${plantName}`;
    const body = `Hi, I'm interested in purchasing ${plantName} for $${price}. Please let me know about availability and shipping options.`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Keep all original code: menu toggle, filterPlants (update categories), form submission, etc.
document.addEventListener('DOMContentLoaded', function () {
    // Original menu toggle code
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    // Swiper initialization (already in HTML, but ensure it runs)
    const sliders = document.querySelectorAll('.plant-slider, .detail-slider');
    sliders.forEach(slider => {
        if (!slider.swiper) { // Prevent double init
            new Swiper(slider, {
                slidesPerView: 1,
                pagination: { el: '.swiper-pagination', clickable: true },
                loop: true
            });
        }
    });

    // Original page load animations
    const cards = document.querySelectorAll('.plant-card, .about-card, .contact-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });

    console.log('Monstera Mom site loaded! Remember to update email addresses.');
});

