// Configuration file for Zentrium website
// Update these settings as needed

const CONFIG = {
    // Google Apps Script Web App URL
    // Replace this with your actual deployed script URL
    GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzlcV6-ahDDcBU0Qm8EWnR4xXfaAM-qAesEy-dRO_6Yq1qU9ApZOi7v0vXtSEYh7LTU/exec',
    
    // Contact form settings
    CONTACT_FORM: {
        // Minimum message length
        MIN_MESSAGE_LENGTH: 10,
        
        // Success message
        SUCCESS_MESSAGE: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
        
        // Error message
        ERROR_MESSAGE: 'Sorry, there was an error sending your message. Please try again or contact us directly.',
        
        // Validation messages
        VALIDATION_MESSAGES: {
            NAME_REQUIRED: 'Please enter your name',
            EMAIL_REQUIRED: 'Please enter your email address',
            EMAIL_INVALID: 'Please enter a valid email address',
            SUBJECT_REQUIRED: 'Please enter a subject',
            MESSAGE_REQUIRED: 'Please enter your message',
            MESSAGE_TOO_SHORT: 'Message must be at least 10 characters'
        }
    },
    
    // Slider settings
    SLIDER: {
        AUTO_SLIDE_DURATION: 5000, // 5 seconds
        TRANSITION_DURATION: 500   // 0.5 seconds
    },
    
    // Animation settings
    ANIMATIONS: {
        SCROLL_THRESHOLD: 0.1,
        FADE_IN_DURATION: 800
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 