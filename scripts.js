// script.js  Complete Integrated JavaScript for Tripify Website

// Search function for Home Page
function searchEvents() {
    const searchTerm = document.getElementById('eventSearch').value;
    const messageElement = document.getElementById('searchMessage');

    if (searchTerm) {
        messageElement.textContent = `Searching for: "${searchTerm}". This is a demo.`;
        messageElement.style.color = "#2A9D8F";
    } else {
        messageElement.textContent = 'Please enter a search term.';
        messageElement.style.color = "#e76f51";
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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tripify website loaded successfully!');
    
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
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
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












