//
// main.js - Main application entry point
//

// Import theme configuration
import './theme.js';

// Initialize AOS (Animate On Scroll)
import AOS from 'aos';
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Import lozad for background image handling
import lozad from 'lozad';

// Lozad is initialized in demo.js
// Additional Lozad configuration for background images
document.addEventListener('DOMContentLoaded', function() {
  const observer = lozad('.lozad', {
    loaded: function(el) {
      el.classList.add('loaded');
      console.log('Lozad loaded element:', el);

      // Handle background images
      if (el.dataset.backgroundImage) {
        el.style.backgroundImage = `url(${el.dataset.backgroundImage})`;
        console.log('Background image set:', el.dataset.backgroundImage);
      }
    }
  });
  observer.observe();
});

// Initialize Bootstrap tooltips and popovers
import { Tooltip, Popover } from 'bootstrap';

// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));

// Initialize popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl));

// Console log for development
console.log('🚀 NITSAN Technologies - Website loaded successfully!');
