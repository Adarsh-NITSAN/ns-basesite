//
// main.js - Main application entry point
//

// Import theme configuration
import './theme.js';

// Import demo.js for menu functionality
import './demo.js';

// Import speed booster (handles module scripts properly)
import './speedbooster.js';

// Initialize AOS (Animate On Scroll)
import AOS from 'aos';
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Initialize Bootstrap tooltips and popovers
import { Tooltip, Popover } from 'bootstrap';

// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));

// Initialize popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl));

// Simple function to load images directly
function loadImagesDirectly() {
  console.log('Loading images directly...');
  
  // Handle images with data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.classList.add('loaded');
      console.log('Loaded image:', img.dataset.src);
    }
  });

  // Handle picture elements with data-src
  const lazyPictures = document.querySelectorAll('picture[data-src]');
  lazyPictures.forEach(picture => {
    const img = picture.querySelector('img');
    if (img && picture.dataset.src) {
      img.src = picture.dataset.src;
      img.classList.add('loaded');
      console.log('Loaded picture image:', picture.dataset.src);
    }
  });

  // Handle background images
  const backgroundElements = document.querySelectorAll('[data-background-image]');
  backgroundElements.forEach(el => {
    if (el.dataset.backgroundImage) {
      el.style.backgroundImage = `url(${el.dataset.backgroundImage})`;
      el.classList.add('loaded');
      console.log('Loaded background image:', el.dataset.backgroundImage);
    }
  });

  // Handle iframes
  const lazyIframes = document.querySelectorAll('iframe[data-src]');
  lazyIframes.forEach(iframe => {
    if (iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
      iframe.classList.add('loaded');
      console.log('Loaded iframe:', iframe.dataset.src);
    }
  });
}

// Load images when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM ready, loading images directly...');
  loadImagesDirectly();
});

// Listen for content loaded events from speed booster
document.addEventListener('contentLoaded', function(event) {
  if (event.detail.source === 'speed-booster') {
    console.log('Speed booster content loaded, re-initializing components...');
    
    // Re-initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
    
    // Load images for new content
    setTimeout(() => {
      loadImagesDirectly();
    }, 100);
  }
});

// Listen for module script reload events
document.addEventListener('moduleScriptReload', function(event) {
  if (event.detail.scriptId === 'pageAjax') {
    console.log('Module script reload requested, re-initializing components...');
    
    // Re-initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
    
    // Load images for new content
    setTimeout(() => {
      loadImagesDirectly();
    }, 100);
    
    // Re-initialize Bootstrap components
    if (typeof window.bootstrap !== 'undefined') {
      // Re-initialize tooltips
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(el => {
        if (!el._tooltip) {
          new window.bootstrap.Tooltip(el);
        }
      });

      // Re-initialize popovers
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
      popoverTriggerList.forEach(el => {
        if (!el._popover) {
          new window.bootstrap.Popover(el);
        }
      });
    }
  }
});

// Console log for development
console.log('🚀 NITSAN Technologies - Website loaded successfully!');
console.log('📦 Speed booster module handling enabled');
console.log('🖼️ Direct image loading enabled (no lazy loading)');
