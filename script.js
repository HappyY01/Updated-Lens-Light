/**
 * LENS & LIGHT CONTEST 2025 - MAIN SCRIPT
 * Professional Photography Contest Website
 */

// Configuration
const CONFIG = {
    contactEmail: 'avanishhh0111@gmail.com',
    validation: {
        nameRegex: /^[A-Za-z\s]{2,50}$/,
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        phoneRegex: /^\d{10}$/
    }
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize all app functionality
 */
function initializeApp() {
    initMobileNav();
    initScrollAnimations();
    initFAQ();
    initContactForm();
    initRegistrationForm();
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');

    if (!navToggle || !nav) return;

    navToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        navToggle.classList.toggle('open');
    });

    // Close nav when clicking nav links
    const navLinks = nav.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            navToggle.classList.remove('open');
        });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('open');
            navToggle.classList.remove('open');
        }
    });
}

/**
 * Scroll Animations with Intersection Observer
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    // Add real-time validation
    addRealTimeValidation(inputs.name, 'nameError', validateName);
    addRealTimeValidation(inputs.email, 'emailError', validateEmail);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const nameValid = validateName(inputs.name.value, 'nameError');
        const emailValid = validateEmail(inputs.email.value, 'emailError');
        const messageValid = validateRequired(inputs.message.value, 'messageError');

        if (!nameValid || !emailValid || !messageValid) {
            showToast('Please fix the errors in the form', 'error');
            return;
        }

        // Prepare email
        const emailData = {
            subject: inputs.subject.value || 'Contact Form Submission - Lens & Light 2025',
            body: `
Contact Form Submission
Lens & Light Photography Contest 2025

Name: ${inputs.name.value}
Email: ${inputs.email.value}
Subject: ${inputs.subject.value || 'N/A'}

Message:
${inputs.message.value}

---
This email was sent via the Lens & Light Contest website contact form.
            `.trim()
        };

        sendEmail(emailData);
        form.reset();
    });
}

/**
 * Registration Form Handling
 */
function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    const inputs = {
        name: document.getElementById('reg-name'),
        email: document.getElementById('reg-email'),
        phone: document.getElementById('reg-phone'),
        department: document.getElementById('reg-department'),
        category: document.getElementById('reg-category'),
        title: document.getElementById('reg-title'),
        description: document.getElementById('reg-description'),
        agreeRules: document.getElementById('agree-rules')
    };

    // Add real-time validation
    addRealTimeValidation(inputs.name, 'regNameError', validateName);
    addRealTimeValidation(inputs.email, 'regEmailError', validateEmail);
    addRealTimeValidation(inputs.phone, 'regPhoneError', validatePhone);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const nameValid = validateName(inputs.name.value, 'regNameError');
        const emailValid = validateEmail(inputs.email.value, 'regEmailError');
        const phoneValid = inputs.phone.value ? validatePhone(inputs.phone.value, 'regPhoneError') : true;
        const deptValid = validateRequired(inputs.department.value, 'regDeptError');
        const categoryValid = validateRequired(inputs.category.value, 'regCategoryError');
        const titleValid = validateRequired(inputs.title.value, 'regTitleError');

        if (!inputs.agreeRules.checked) {
            showToast('Please agree to the contest rules', 'error');
            document.getElementById('agreeError').textContent = 'You must agree to the rules';
            return;
        } else {
            document.getElementById('agreeError').textContent = '';
        }

        if (!nameValid || !emailValid || !phoneValid || !deptValid || !categoryValid || !titleValid) {
            showToast('Please fix the errors in the form', 'error');
            return;
        }

        // Prepare email
        const emailData = {
            subject: `Contest Registration: ${inputs.title.value} - ${inputs.name.value}`,
            body: `
Contest Registration
Lens & Light Photography Contest 2025

PARTICIPANT INFORMATION:
-------------------------
Name: ${inputs.name.value}
Email: ${inputs.email.value}
Phone: ${inputs.phone.value || 'Not provided'}
Department: ${inputs.department.value}

SUBMISSION DETAILS:
------------------
Category: ${inputs.category.value}
Photo Title: ${inputs.title.value}
Description: ${inputs.description.value || 'Not provided'}

IMPORTANT: Please attach your photograph(s) to this email.
- Maximum 3 photos per participant
- Format: JPEG or PNG
- Maximum file size: 10MB per image
- Theme: Nature Through the Lens

The participant has agreed to the contest rules and confirmed that the submitted work is original.

---
Registration submitted via Lens & Light Contest website on ${new Date().toLocaleDateString()}
            `.trim()
        };

        showToast('Redirecting to email client...', 'success');
        
        setTimeout(() => {
            sendEmail(emailData);
            showToast('Please attach your photo(s) and send the email', 'success');
            form.reset();
        }, 1500);
    });
}

/**
 * Validation Functions
 */
function validateName(value, errorId) {
    const errorElement = document.getElementById(errorId);
    const input = document.querySelector(`#${errorId.replace('Error', '')}`);
    
    if (!value || value.trim().length < 2) {
        setError(input, errorElement, 'Name must be at least 2 characters');
        return false;
    }
    
    if (!CONFIG.validation.nameRegex.test(value.trim())) {
        setError(input, errorElement, 'Name should contain only letters and spaces');
        return false;
    }
    
    clearError(input, errorElement);
    return true;
}

function validateEmail(value, errorId) {
    const errorElement = document.getElementById(errorId);
    const input = document.querySelector(`#${errorId.replace('Error', '')}`);
    
    if (!value) {
        setError(input, errorElement, 'Email is required');
        return false;
    }
    
    if (!CONFIG.validation.emailRegex.test(value.trim())) {
        setError(input, errorElement, 'Please enter a valid email address');
        return false;
    }
    
    clearError(input, errorElement);
    return true;
}

function validatePhone(value, errorId) {
    const errorElement = document.getElementById(errorId);
    const input = document.querySelector(`#${errorId.replace('Error', '')}`);
    
    if (value && !CONFIG.validation.phoneRegex.test(value.trim())) {
        setError(input, errorElement, 'Phone number must be 10 digits');
        return false;
    }
    
    clearError(input, errorElement);
    return true;
}

function validateRequired(value, errorId) {
    const errorElement = document.getElementById(errorId);
    const input = document.querySelector(`#${errorId.replace('Error', '')}`);
    
    if (!value || value.trim().length === 0) {
        setError(input, errorElement, 'This field is required');
        return false;
    }
    
    clearError(input, errorElement);
    return true;
}

function setError(input, errorElement, message) {
    if (input) input.classList.add('error');
    if (errorElement) errorElement.textContent = message;
}

function clearError(input, errorElement) {
    if (input) input.classList.remove('error');
    if (errorElement) errorElement.textContent = '';
}

/**
 * Real-time Validation
 */
function addRealTimeValidation(input, errorId, validationFn) {
    if (!input) return;

    input.addEventListener('blur', function() {
        if (this.value) {
            validationFn(this.value, errorId);
        }
    });

    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this, document.getElementById(errorId));
        }
    });
}

/**
 * Send Email via mailto
 */
function sendEmail(data) {
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(data.body);
    const mailtoLink = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'success') {
    // Create container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' 
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    
    toast.innerHTML = `${icon}<span>${message}</span>`;
    container.appendChild(toast);

    // Remove after 4 seconds
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/**
 * Header Scroll Effect
 */
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});
