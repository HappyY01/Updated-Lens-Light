document.addEventListener("DOMContentLoaded", function() {

    // --- Config ---
    const contactEmail = "lenslightcontest@gmail.com";
    const nameRegex = /^[A-Za-z\s]+$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // --- Helper: Toast Notification ---
    // Creates a smooth popup instead of alert()
    window.showToast = function(message, type = 'success') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '<i class="fa-solid fa-check-circle"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';
        
        toast.innerHTML = `${icon} <span>${message}</span>`;
        container.appendChild(toast);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease forwards';
            toast.addEventListener('animationend', () => toast.remove());
        }, 4000);
    };

    // --- Helper: Input Error Handling ---
    function setInputError(input, hasError) {
        if (hasError) {
            input.classList.add("error");
            input.style.borderColor = "#d9534f";
        } else {
            input.classList.remove("error");
            input.style.borderColor = "#ddd"; // Reset to default
        }
    }

    // --- Logic: Add Live Validation Listeners ---
    // Removes the red border immediately when user types
    function attachLiveValidation(inputs) {
        inputs.forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.addEventListener('input', () => setInputError(el, false));
            }
        });
    }

    // --- FAQ Logic ---
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const q = item.querySelector(".faq-question");
        const a = item.querySelector(".faq-answer");
        if(q && a) {
            q.addEventListener("click", () => {
                // Toggle active class for Chevron rotation
                const isActive = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    $(i.querySelector(".faq-answer")).slideUp(); // Requires jQuery? No, let's use Vanilla JS below
                    i.querySelector(".faq-answer").style.display = "none";
                });

                if(!isActive) {
                    item.classList.add('active');
                    a.style.display = "block";
                }
            });
        }
    });

    // --- Registration Validation ---
    const regForm = document.getElementById("registrationForm");
    if (regForm) {
        // Attach live listeners
        attachLiveValidation(['reg-name', 'reg-email', 'reg-phone']);

        regForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("reg-name");
            const email = document.getElementById("reg-email");
            const phone = document.getElementById("reg-phone");
            const dept = document.getElementById("reg-department");
            const title = document.getElementById("reg-title");
            const agree = document.getElementById("agree-rules");

            let valid = true;
            let firstError = null;

            if (!nameRegex.test(name.value.trim())) { 
                valid = false; setInputError(name, true); 
                if(!firstError) firstError = name; 
            }
            if (!emailRegex.test(email.value.trim())) { 
                valid = false; setInputError(email, true); 
                if(!firstError) firstError = email;
            }
            if (phone.value.trim() !== "" && !phoneRegex.test(phone.value.trim())) { 
                valid = false; setInputError(phone, true); 
                if(!firstError) firstError = phone;
            }
            if (!agree.checked) { 
                valid = false; 
                showToast("Please agree to the contest rules", "error");
                return; // Stop here if rules aren't checked
            }

            if (!valid) { 
                showToast("Please correct the highlighted errors.", "error");
                if(firstError) firstError.focus();
                return; 
            }

            // Success logic
            const subject = encodeURIComponent(`Registration: ${title.value} - ${name.value}`);
            const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\nPhone: ${phone.value}\nDept: ${dept.value}\nTitle: ${title.value}\n\n(Attach photo)`);
            
            showToast("Redirecting to email client...", "success");
            
            setTimeout(() => {
                window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
                regForm.reset();
            }, 1500);
        });
    }

    // --- Contact Validation ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        attachLiveValidation(['name', 'email']);

        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const subject = document.getElementById("subject");
            const message = document.getElementById("message");

            let valid = true;
            let firstError = null;

            if (!nameRegex.test(name.value.trim())) { 
                valid = false; setInputError(name, true); 
                firstError = name;
            }
            if (!emailRegex.test(email.value.trim())) { 
                valid = false; setInputError(email, true); 
                if(!firstError) firstError = email;
            }

            if (!valid) { 
                showToast("Please fix the errors in the form.", "error");
                if(firstError) firstError.focus();
                return; 
            }

            const mailSubject = encodeURIComponent(`Query: ${subject.value}`);
            const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\nMessage:\n${message.value}`);
            
            showToast("Opening email client...", "success");
            
            setTimeout(() => {
                window.location.href = `mailto:${contactEmail}?subject=${mailSubject}&body=${body}`;
                contactForm.reset();
            }, 1500);
        });
    }
});