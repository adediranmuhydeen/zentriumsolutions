document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing components...');
    
    // Initialize all functionality
    initNavbar();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffects();
    initLoadingAnimations();
    initParticleEffects();
    initTypingEffect();
    initCardHoverEffects();
    initFormEnhancements();
    initScrollProgress();
    
    // Initialize hero slider last to ensure DOM is ready
    setTimeout(() => {
        initHeroSlider();
    }, 100);
    
    // Add test button for debugging (remove in production)
    setTimeout(() => {
        addTestButton();
    }, 2000);
});

// Navbar functionality with enhanced effects
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar nav a');
    const logo = document.querySelector('.logo img');
    
    // Navbar scroll effect with enhanced transitions
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
            logo.style.transform = 'scale(0.9)';
        } else {
            navbar.classList.remove('scrolled');
            logo.style.transform = 'scale(1)';
        }
        
        // Parallax effect for navbar background
        const opacity = Math.min(scrollY / 500, 0.98);
        navbar.style.background = `rgba(26, 26, 26, ${opacity})`;
    });
    
    // Active link highlighting with smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Add ripple effect
            createRippleEffect(this, e);
        });
        
        // Hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Update active link on scroll with smooth transitions
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Create ripple effect for buttons and links
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 214, 0, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Enhanced scroll animations with intersection observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('testimonial-card') || 
                    entry.target.classList.contains('course-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                    entry.target.style.animationDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Add floating animation to specific elements
    const floatingElements = document.querySelectorAll('.service-card img, .course-card img');
    floatingElements.forEach(el => {
        el.style.animation = 'float 3s ease-in-out infinite';
    });
}

// Smooth scrolling with enhanced easing
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Hero Slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide
    
    // Initialize slider
    function initSlider() {
        if (slides.length === 0) {
            console.log('No slides found');
            return;
        }
        
        console.log(`Found ${slides.length} slides`);
        showSlide(currentSlide);
        startAutoSlide();
        setupEventListeners();
    }
    
    // Show specific slide
    function showSlide(index) {
        console.log(`Showing slide ${index}`);
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Start auto-sliding
    function startAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, slideDuration);
        console.log('Auto-slide started');
    }
    
    // Stop auto-sliding
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
            console.log('Auto-slide stopped');
        }
    }
    
    // Restart auto-sliding
    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                showSlide(index);
                restartAutoSlide();
            });
        });
        
        // Arrow navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
                restartAutoSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide();
                restartAutoSlide();
            });
        }
        
        // Pause on hover
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', stopAutoSlide);
            heroSlider.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                restartAutoSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                restartAutoSlide();
            }
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (heroSlider) {
            heroSlider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            heroSlider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                restartAutoSlide();
            }
        }
    }
    
    // Initialize the slider
    initSlider();
}

// Enhanced parallax effects
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    const heroSlider = document.querySelector('.hero-slider');
    
    if (heroSection && heroSlider) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSlider.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
            }
        });
    }
}

// Loading animations with enhanced transitions
function initLoadingAnimations() {
    document.body.classList.add('loading');
    
    // Add loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <img src="assets/logo.png" alt="Zentrium">
            </div>
            <div class="loading-spinner"></div>
            <p>Loading Zentrium...</p>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            document.body.classList.remove('loading');
            setTimeout(() => loadingScreen.remove(), 500);
        }, 1000);
    });
}

// Particle effects for hero section
function initParticleEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        pointer-events: none;
    `;
    
    hero.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 214, 0, 0.3);
        border-radius: 50%;
        animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
    `;
    
    container.appendChild(particle);
}

// Typing effect for hero text - Updated for slider
function initTypingEffect() {
    // Remove typing effect for slider as it conflicts with multiple slides
    // The slider now handles content transitions automatically
    console.log('Typing effect disabled for slider compatibility');
}

// Enhanced card hover effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .course-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
            
            // Add glow effect
            this.style.boxShadow += ', 0 0 30px rgba(255, 214, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add click effect
        card.addEventListener('click', function(e) {
            if (this.classList.contains('coming-soon')) return;
            
            createRippleEffect(this, e);
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Enhanced form interactions
function initFormEnhancements() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Floating label effect
            input.addEventListener('focus', function() {
                group.classList.add('focused');
                label.style.color = 'var(--primary-yellow)';
                label.style.transform = 'translateY(-25px) scale(0.85)';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    group.classList.remove('focused');
                    label.style.color = '';
                    label.style.transform = '';
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                validateField(this);
            });
        }
    });
}

// Field validation with visual feedback
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    
    let isValid = true;
    let message = '';
    
    if (fieldType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        message = isValid ? '' : 'Please enter a valid email address';
    } else if (fieldType === 'text' && field.name === 'name') {
        isValid = value.length >= 2;
        message = isValid ? '' : 'Name must be at least 2 characters';
    } else if (field.tagName === 'TEXTAREA') {
        isValid = value.length >= 10;
        message = isValid ? '' : 'Message must be at least 10 characters';
    }
    
    // Visual feedback
    if (value) {
        field.style.borderColor = isValid ? 'var(--accent-green)' : '#f44336';
        field.style.boxShadow = isValid ? 
            '0 0 0 4px rgba(76, 175, 80, 0.1)' : 
            '0 0 0 4px rgba(244, 67, 54, 0.1)';
    } else {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }
    
    // Show/hide validation message
    let messageEl = field.parentNode.querySelector('.validation-message');
    if (message && !messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'validation-message';
        messageEl.style.cssText = `
            color: #f44336;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            transition: all 0.3s ease;
        `;
        field.parentNode.appendChild(messageEl);
    }
    
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.style.opacity = message ? '1' : '0';
    }
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Enhanced contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form, #contactForm');
    
    if (contactForm) {
        console.log('Contact form found:', contactForm);
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted, processing...');
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            const title = formData.get('title') || 'General Inquiry';
            
            console.log('Form data extracted:', { name, email, title, message });
            
            if (validateForm(name, email, message)) {
                submitForm(name, email, title, message);
            } else {
                showNotification('Please fill in all fields correctly.', 'error');
            }
        });
    } else {
        console.log('Contact form not found. Available forms:', document.querySelectorAll('form'));
    }
}

// Enhanced form validation
function validateForm(name, email, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name || !email || !message) {
        return false;
    }
    
    if (!emailRegex.test(email)) {
        return false;
    }
    
    if (message.length < 10) {
        return false;
    }
    
    return true;
}

// Enhanced form submission with Google Sheets integration
function submitForm(name, email, title, message) {
    const submitBtn = document.querySelector('.contact-form button[type="submit"], #contactForm button[type="submit"]');
    
    if (!submitBtn) {
        console.error('Submit button not found');
        showNotification('Error: Submit button not found', 'error');
        return;
    }
    
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.style.background = 'var(--accent-green)';
    
    // Add loading animation
    submitBtn.innerHTML = `
        <span>Sending...</span>
        <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    // Prepare form data for Google Sheets
    const formData = {
        name: name,
        email: email,
        title: title || 'General Inquiry',
        message: message
    };
    
    console.log('Submitting form data:', formData);
    
    // Google Apps Script Web App URL
    const scriptURL = CONFIG.GOOGLE_APPS_SCRIPT_URL;
    
    console.log('Using script URL:', scriptURL);
    
    // Method 1: Try with fetch and no-cors
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        console.log('Fetch response:', response);
        console.log('Response type:', response.type);
        
        // Since we're using no-cors, we can't read the response
        // We'll assume success if no network error occurs
        console.log('Form submitted successfully via fetch');
        
        // Show success message
        showNotification(CONFIG.CONTACT_FORM.SUCCESS_MESSAGE, 'success');
        
        // Reset form
        const form = document.querySelector('.contact-form form, #contactForm');
        if (form) form.reset();
        
        // Reset form styles
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, #contactForm input, #contactForm textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
    })
    .catch(error => {
        console.error('Fetch error:', error);
        
        // Method 2: Fallback to XMLHttpRequest
        console.log('Trying XMLHttpRequest fallback...');
        submitWithXMLHttpRequest(scriptURL, formData, submitBtn, originalText);
    });
}

// Fallback method using XMLHttpRequest
function submitWithXMLHttpRequest(scriptURL, formData, submitBtn, originalText) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', scriptURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
        console.log('XHR response status:', xhr.status);
        console.log('XHR response text:', xhr.responseText);
        
        if (xhr.status === 200 || xhr.status === 0) {
            console.log('Form submitted successfully via XHR');
            showNotification(CONFIG.CONTACT_FORM.SUCCESS_MESSAGE, 'success');
            
            // Reset form
            const form = document.querySelector('.contact-form form, #contactForm');
            if (form) form.reset();
            
            // Reset form styles
            const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, #contactForm input, #contactForm textarea');
            inputs.forEach(input => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            });
        } else {
            console.error('XHR error status:', xhr.status);
            showNotification(CONFIG.CONTACT_FORM.ERROR_MESSAGE, 'error');
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
    };
    
    xhr.onerror = function() {
        console.error('XHR network error');
        showNotification(CONFIG.CONTACT_FORM.ERROR_MESSAGE, 'error');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
    };
    
    xhr.ontimeout = function() {
        console.error('XHR timeout');
        showNotification(CONFIG.CONTACT_FORM.ERROR_MESSAGE, 'error');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
    };
    
    xhr.timeout = 10000; // 10 second timeout
    
    try {
        xhr.send(JSON.stringify(formData));
    } catch (error) {
        console.error('XHR send error:', error);
        showNotification(CONFIG.CONTACT_FORM.ERROR_MESSAGE, 'error');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
    }
}

// Test Google Apps Script connection
function testGoogleAppsScript() {
    console.log('Testing Google Apps Script connection...');
    
    const scriptURL = CONFIG.GOOGLE_APPS_SCRIPT_URL;
    console.log('Script URL:', scriptURL);
    
    // Test with a simple GET request first
    fetch(scriptURL + '?test=true', {
        method: 'GET',
        mode: 'no-cors'
    })
    .then(response => {
        console.log('Test GET response:', response);
        showNotification('Google Apps Script is accessible!', 'success');
    })
    .catch(error => {
        console.error('Test GET error:', error);
        showNotification('Google Apps Script connection failed. Check the URL and deployment.', 'error');
    });
}

// Add test button to page for debugging
// function addTestButton() {
//     const testButton = document.createElement('button');
//     testButton.textContent = 'Test Google Apps Script';
//     testButton.style.cssText = `
//         position: fixed;
//         bottom: 20px;
//         left: 20px;
//         background: #FFD600;
//         color: #000;
//         border: none;
//         padding: 10px 15px;
//         border-radius: 5px;
//         cursor: pointer;
//         z-index: 10000;
//         font-size: 12px;
//     `;
    
//     testButton.addEventListener('click', testGoogleAppsScript);
//     document.body.appendChild(testButton);
    
//     // Remove after 30 seconds
//     setTimeout(() => {
//         if (testButton.parentNode) {
//             testButton.remove();
//         }
//     }, 30000);
// }

// Enhanced notification system
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icon}</div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 6000);
}

// Add enhanced CSS for new features
const enhancedStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loading-screen .loading-content {
        text-align: center;
        color: white;
    }
    
    .loading-screen .loading-logo img {
        width: 80px;
        height: 80px;
        margin-bottom: 2rem;
        animation: pulse 2s ease-in-out infinite;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255, 214, 0, 0.3);
        border-top: 3px solid var(--primary-yellow);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .form-group.focused label {
        color: var(--primary-yellow);
        transform: translateY(-25px) scale(0.85);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .loading-dots {
        display: inline-flex;
        gap: 4px;
        margin-left: 8px;
    }
    
    .loading-dots span {
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        animation: dots 1.4s ease-in-out infinite both;
    }
    
    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes dots {
        0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        font-size: 1.2rem;
        font-weight: bold;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .navbar nav a.active {
        color: var(--primary-yellow);
        background: var(--primary-yellow-glow);
    }
    
    .navbar nav a.active::before {
        width: 80%;
    }
    
    .validation-message {
        color: #f44336;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        transition: all 0.3s ease;
    }
`;

// Inject enhanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);