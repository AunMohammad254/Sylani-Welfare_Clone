// Self-executing function to avoid polluting global namespace and improve performance
// (function() {
    // Cache DOM elements for better performance
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn svg');
    const dropdown_menu = document.querySelector('.dropdown_menu');

// Toggle menu functionality with improved error handling
toggleBtn?.addEventListener('click', function(event) {
    if (!dropdown_menu || !toggleBtnIcon) {
        console.error('null pointer reference: cannot toggle menu');
        return;
    }
    
    event.stopPropagation(); // Prevent event bubbling

    try {
        // Toggle the open class on the dropdown menu
        dropdown_menu.classList.toggle('open');

        // Change the icon to an X when the menu is open
        const isOpen = dropdown_menu.classList.contains('open');
        
        // Clear any existing classes
        toggleBtnIcon.innerHTML = '';
        
        // Create and append the appropriate icon
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        if (isOpen) {
            // X icon path
            icon.setAttribute('d', 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z');
        } else {
            // Bars icon path
            icon.setAttribute('d', 'M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z');
        }
        
        toggleBtnIcon.appendChild(icon);
    } catch (err) {
        console.error('error toggling menu:', err);
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (dropdown_menu?.classList.contains('open') && 
        !event.target.closest('.toggle_btn') && 
        !event.target.closest('.dropdown_menu')) {
        dropdown_menu.classList.remove('open');
        
        // Reset to bars icon
        toggleBtnIcon.innerHTML = '';
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        icon.setAttribute('d', 'M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z');
        toggleBtnIcon.appendChild(icon);
    }
});

// Video popup functionality for popOutBtn buttons with improved error handling and performance
document.addEventListener('DOMContentLoaded', function() {
    const popOutBtns = document.querySelectorAll('.popOutBtn');
    
    // Use event delegation for better performance
    document.addEventListener('click', function(event) {
        const button = event.target.closest('.popOutBtn');
        if (!button) return;
        
        try {
            event.preventDefault();
            
            const videoId = button.getAttribute('data-video');
            const videoContainer = button.closest('div[class^="video-container"]');
            
            if (!videoContainer) {
                console.error('Video container not found');
                return;
            }
            
            const iframe = videoContainer.querySelector('iframe');
            if (!iframe) {
                console.error('Video iframe not found');
                return;
            }
            
            let videoSrc = iframe.getAttribute('src');
            if (!videoSrc) {
                console.error('Video source not found');
                return;
            }
            
            // Ensure autoplay when opening in new tab
            if (videoSrc.includes('youtube.com') && !videoSrc.includes('autoplay=1')) {
                videoSrc += (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
            }
            
            // Add loading indicator
            button.classList.add('loading');
            
            // Open video in a new tab
            const newTab = window.open(videoSrc, '_blank');
            
            // Remove loading state after a short delay
            setTimeout(() => {
                button.classList.remove('loading');
            }, 500);
            
            // Handle popup blockers
            if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
                alert('Please allow popups for this website to view videos in a new tab.');
            }
        } catch (err) {
            console.error('Error opening video:', err);
        }
    });
    
    // Add visual feedback for video buttons
    popOutBtns.forEach(button => {
        button.setAttribute('title', 'Open video in new tab');
        button.setAttribute('aria-label', 'Open video in new tab');
    });

    // Newsletter subscription form validation
    const emailInput = document.querySelector('.container-6 input[type="email"]');
    const subscribeButton = document.querySelector('.container-6 button');
    
    if (emailInput && subscribeButton) {
        // Create error message element
        const errorMessage = document.createElement('p');
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '14px';
        errorMessage.style.marginTop = '5px';
        errorMessage.style.display = 'none';
        emailInput.parentNode.insertBefore(errorMessage, subscribeButton);
        
        // Email validation function with improved validation
        function validateEmail(email) {
            if (!email || typeof email !== 'string') return false;
            // More comprehensive email regex that handles most valid email formats
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(email);
        }
        
        // Form submission handler with improved validation and feedback
        subscribeButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const email = emailInput.value.trim();
            
            // Clear previous error
            errorMessage.style.display = 'none';
            
            if (!email) {
                errorMessage.textContent = 'Please enter your email address';
                errorMessage.style.display = 'block';
                emailInput.focus();
                return;
            }
            
            if (!validateEmail(email)) {
                errorMessage.textContent = 'Please enter a valid email address';
                errorMessage.style.display = 'block';
                emailInput.focus();
                return;
            }
            
            // If validation passes
            errorMessage.style.display = 'none';
            
            // Show success message with improved styling and accessibility
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.style.color = 'green';
            successMessage.style.fontSize = '14px';
            successMessage.setAttribute('role', 'status');
            successMessage.setAttribute('aria-live', 'polite');
            successMessage.style.marginTop = '5px';
            
            // Remove any existing success messages first
            const existingSuccessMessages = emailInput.parentNode.querySelectorAll('[role="status"]');
            existingSuccessMessages.forEach(msg => msg.remove());
            
            emailInput.parentNode.insertBefore(successMessage, subscribeButton.nextSibling);
            
            // Clear the input field
            emailInput.value = '';
            
            // Store form data (could be extended to send to server)
            try {
                const subscriptionData = {
                    email: email,
                    timestamp: new Date().toISOString()
                };
                
                // For demonstration, store in localStorage
                const savedSubscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
                savedSubscriptions.push(subscriptionData);
                localStorage.setItem('newsletterSubscriptions', JSON.stringify(savedSubscriptions));
                
                console.log('Subscription saved:', subscriptionData);
            } catch (err) {
                console.error('Error saving subscription:', err);
            }
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.remove();
                }
            }, 3000);
        });
        
        // Clear error message when typing
        emailInput.addEventListener('input', function() {
            errorMessage.style.display = 'none';
        });
    }

    // Add page load performance monitoring
    if (window.performance) {
        window.addEventListener('load', function() {
            const pageLoadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
            console.log('Page load time:', pageLoadTime, 'ms');
        });
    }

})(); // End of self-executing function

