import { SPA } from './spa/app';
import { SPAConfig } from './spa/types';

// Import theme configuration
import './theme.js';

// Import demo.js for menu functionality
import './demo.js';

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

// SPA Configuration
const spaConfig: SPAConfig = {
  rootElement: '.site-main',
  enableHistoryAPI: true,
  enableProgressBar: true,
  router: {
    routes: [
      {
        path: '/',
        component: '/index.html',
        title: 'NITSAN Technologies - Home'
      },
      {
        path: '/cms.html',
        component: '/cms.html',
        title: 'NITSAN Technologies - CMS'
      },
      {
        path: '/test',
        component: '<div class="content-section"><div class="container"><h1>TEST PAGE</h1><p>This is a test page to verify SPA is working!</p></div></div>',
        title: 'Test Page'
      },
      {
        path: '/404',
        component: '<div class="error-page"><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p></div>',
        title: '404 - Page Not Found'
      }
    ],
    defaultRoute: '/',
    notFoundRoute: '/404'
  }
};

// Initialize SPA
let spa: SPA;

document.addEventListener('DOMContentLoaded', () => {
  try {
    spa = new SPA(spaConfig);
    
    // Set up component re-initialization
    spa.getEventBus().on('componentsReinitialize', () => {
      console.log('🔄 Re-initializing components...');
      
      // Re-initialize AOS
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
      
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
      
      // Load images directly (no lazy loading)
      loadImagesDirectly();
    });
    
    // Set up loading indicators
    spa.getEventBus().on('loadingStarted', () => {
      console.log('⏳ Loading started...');
      // You can add a loading spinner here
    });
    
    spa.getEventBus().on('loadingFinished', () => {
      console.log('✅ Loading finished');
      // Hide loading spinner
    });
    
    // Set up state change listener
    spa.getStore().subscribe((state) => {
      console.log('📊 State changed:', state);
    });
    
    console.log('🚀 Custom SPA initialized successfully!');
    
  } catch (error) {
    console.error('❌ Failed to initialize SPA:', error);
  }
});

// Simple function to load images directly
function loadImagesDirectly() {
  console.log('🖼️ Loading images directly...');
  
  // Handle images with data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.classList.add('loaded');
      console.log('✅ Loaded image:', img.dataset.src);
    }
  });

  // Handle picture elements with data-src
  const lazyPictures = document.querySelectorAll('picture[data-src]');
  lazyPictures.forEach(picture => {
    const img = picture.querySelector('img');
    if (img && picture.dataset.src) {
      img.src = picture.dataset.src;
      img.classList.add('loaded');
      console.log('✅ Loaded picture image:', picture.dataset.src);
    }
  });

  // Handle background images
  const backgroundElements = document.querySelectorAll('[data-background-image]');
  backgroundElements.forEach(el => {
    if (el.dataset.backgroundImage) {
      el.style.backgroundImage = `url(${el.dataset.backgroundImage})`;
      el.classList.add('loaded');
      console.log('✅ Loaded background image:', el.dataset.backgroundImage);
    }
  });

  // Handle iframes
  const lazyIframes = document.querySelectorAll('iframe[data-src]');
  lazyIframes.forEach(iframe => {
    if (iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
      iframe.classList.add('loaded');
      console.log('✅ Loaded iframe:', iframe.dataset.src);
    }
  });
}

// Load images on initial page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('🖼️ Initial page load - loading images directly...');
  loadImagesDirectly();
});

// Console log for development
console.log('🚀 NITSAN Technologies - Custom SPA System');
console.log('📦 Virtual DOM enabled');
console.log('🔄 Client-side routing enabled');
console.log('📊 State management enabled');
console.log('🖼️ Direct image loading enabled');
