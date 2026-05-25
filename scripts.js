// scripts.js — Tripify website interactions

let currentSlide = 0;
let slideInterval = null;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    if (!slides.length) return;

    currentSlide = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(index) {
    showSlide(index);
}

function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    showSlide(0);
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => moveSlide(1), 5000);

    const container = document.querySelector('.slider-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(slideInterval));
        container.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => moveSlide(1), 5000);
        });
    }
}

// Search function for Home Page
function searchEvents() {
    const searchInput = document.getElementById('eventSearch');
    const messageElement = document.getElementById('searchMessage');
    if (!searchInput || !messageElement) return;

    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        messageElement.textContent = `Showing events matching "${searchTerm}"…`;
        messageElement.style.color = '#2A9D8F';
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    } else {
        messageElement.textContent = 'Please enter a search term.';
        messageElement.style.color = '#e76f51';
    }
}

// Contact Form Handling
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Basic validation
    const firstName = formData.get('firstName');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!firstName || !email || !subject || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you within 24 hours.');
    form.reset();
}

// Feedback Form Handling
function handleFeedbackForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const output = document.getElementById('formOutput');
    
    // Reset output
    output.textContent = '';
    output.style.color = '#e76f51';
    
    // Validate required fields
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const services = form.querySelectorAll('input[name="services"]:checked');
    const rating = form.rating.value;
    const experience = form.experience.value.trim();
    const recommend = form.recommend.value;
    const contactAgreement = form.contact.checked;
    
    if (!fullName) {
        output.textContent = 'Please enter your full name.';
        return;
    }
    
    if (!email || !isValidEmail(email)) {
        output.textContent = 'Please enter a valid email address.';
        return;
    }
    
    if (services.length === 0) {
        output.textContent = 'Please select at least one service you used.';
        return;
    }
    
    if (!rating) {
        output.textContent = 'Please rate your overall satisfaction.';
        return;
    }
    
    if (!experience) {
        output.textContent = 'Please tell us about your experience.';
        return;
    }
    
    if (!recommend) {
        output.textContent = 'Please indicate if you would recommend us.';
        return;
    }
    
    if (!contactAgreement) {
        output.textContent = 'Please agree to be contacted for follow-up.';
        return;
    }
    
    // Form is valid - show success message
    output.textContent = 'Thank you for your valuable feedback!';
    output.style.color = '#2A9D8F';
    
    // Show thank you message
    showThankYouMessage();
    
    // Reset form after delay
    setTimeout(() => {
        form.reset();
        output.textContent = '';
    }, 3000);
}

// Newsletter Form Handling
function handleNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    alert('Thank you for subscribing to our newsletter!');
    form.reset();
}

// Show Thank You Message
function showThankYouMessage() {
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.classList.remove('hidden');
    
    // Add to history to handle back button
    window.history.pushState({ thankYou: true }, '');
}

// Close Thank You Message
function closeThankYou() {
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.classList.add('hidden');
    window.location.href = 'index.html';
}

// Handle browser back button
window.addEventListener('popstate', function(event) {
    const thankYouMessage = document.getElementById('thankYouMessage');
    if (thankYouMessage && !thankYouMessage.classList.contains('hidden')) {
        thankYouMessage.classList.add('hidden');
    }
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Star rating interaction
function setupStarRating() {
    const starInputs = document.querySelectorAll('.rating-stars input');
    starInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            // Update visual state of stars
            const labels = document.querySelectorAll('.rating-stars label');
            labels.forEach((label, labelIndex) => {
                if (labelIndex <= index) {
                    label.style.color = '#E9C46A';
                } else {
                    label.style.color = '#ccc';
                }
            });
        });
    });
}

function setupMobileNav() {
    const navCont = document.querySelector('.nav-cont');
    const navMenu = document.querySelector('.nav-menu');
    if (!navCont || !navMenu || document.querySelector('.nav-toggle')) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
    toggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.textContent = isOpen ? '✕' : '☰';
    });
    navCont.appendChild(toggle);

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = '☰';
        });
    });
}

function setActiveNavLink() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === page);
    });
}

function setupBookButtons() {
    document.querySelectorAll('.book-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.event-card');
            const title = card?.querySelector('h3')?.textContent || 'this tour';
            window.location.href = `contact.html?interest=${encodeURIComponent(title)}`;
        });
    });
}

function applyEventSearchFilter() {
    const params = new URLSearchParams(window.location.search);
    const term = params.get('search')?.trim().toLowerCase();
    if (!term) return;

    const cards = document.querySelectorAll('.event-card');
    let visible = 0;
    cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        const match = text.includes(term);
        card.style.display = match ? '' : 'none';
        if (match) visible += 1;
    });

    const heading = document.querySelector('.events-container h2');
    if (heading && visible > 0) {
        heading.textContent = `Featured Events & Tours (${visible} match "${term}")`;
    }
}

function prefillContactInterest() {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get('interest');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    if (!interest) return;

    if (subject) subject.value = 'booking';
    if (message && !message.value.trim()) {
        message.value = `I would like to learn more about: ${interest}`;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (typeof initTripifyImages === 'function') {
        initTripifyImages();
    }

    initSlider();
    setupMobileNav();
    setActiveNavLink();
    setupBookButtons();
    applyEventSearchFilter();
    prefillContactInterest();
    
    // Search functionality
    const searchInput = document.getElementById('eventSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchEvents();
            }
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Feedback form handling
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackForm);
        setupStarRating();
    }
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form reset functionality
    const resetButtons = document.querySelectorAll('button[type="reset"]');
    resetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const output = document.getElementById('formOutput');
            if (output) {
                output.textContent = '';
            }
            
            // Reset star ratings
            const starLabels = document.querySelectorAll('.rating-stars label');
            starLabels.forEach(label => {
                label.style.color = '#ccc';
            });
        });
    });
});

// Make functions global for HTML onclick attributes
window.searchEvents = searchEvents;
window.moveSlide = moveSlide;
window.goToSlide = goToSlide;
window.closeThankYou = closeThankYou;

// Utility function for external links
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Page analytics (basic)
function trackPageView(page) {
    console.log(`Page viewed: ${page}`);
    // In a real implementation, this would send data to Google Analytics
}

// Initialize page tracking
if (typeof trackPageView === 'function') {
    trackPageView(document.title);
}

// Form validation helper
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e76f51';
        } else {
            field.style.borderColor = '#E9C46A';
        }
    });
    
    return isValid;
}












