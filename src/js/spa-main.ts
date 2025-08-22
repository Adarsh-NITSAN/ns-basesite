/// <reference path="./types.d.ts" />
import { SPA } from './spa/app';
import { SPAConfig } from './spa/types';
import './theme.js';
import './demo.js';
import 'flickity/css/flickity.css';
import Flickity from 'flickity';
import AOS from 'aos';
import { Tooltip, Popover } from 'bootstrap';

AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new Tooltip(el));
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new Popover(el));

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

let spa: SPA;

function initializeFlickity() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => {
    const carouselEl = carousel as any;
    if (carouselEl._flickity) {
      carouselEl._flickity.destroy();
    }
    
    const flickity = new Flickity(carousel as HTMLElement, {
      wrapAround: true,
      autoPlay: 3000,
      cellAlign: 'left',
      contain: true
    });
    
    carouselEl._flickity = flickity;
  });
}

function loadImagesDirectly() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    const imageEl = img as HTMLImageElement;
    if (imageEl.dataset.src) {
      imageEl.src = imageEl.dataset.src;
      imageEl.classList.add('loaded');
    }
  });

  const lazyPictures = document.querySelectorAll('picture[data-src]');
  lazyPictures.forEach(picture => {
    const img = picture.querySelector('img');
    const pictureEl = picture as HTMLElement;
    if (img && pictureEl.dataset.src) {
      img.src = pictureEl.dataset.src;
      img.classList.add('loaded');
    }
  });

  const backgroundElements = document.querySelectorAll('[data-background-image]');
  backgroundElements.forEach(el => {
    const element = el as HTMLElement;
    if (element.dataset.backgroundImage) {
      element.style.backgroundImage = `url(${element.dataset.backgroundImage})`;
      element.classList.add('loaded');
    }
  });

  const lazyIframes = document.querySelectorAll('iframe[data-src]');
  lazyIframes.forEach(iframe => {
    const iframeEl = iframe as HTMLIFrameElement;
    if (iframeEl.dataset.src) {
      iframeEl.src = iframeEl.dataset.src;
      iframeEl.classList.add('loaded');
    }
  });
}

function initializeBootstrapComponents() {
  if (typeof (window as any).bootstrap !== 'undefined') {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => {
      const element = el as any;
      if (!element._tooltip) {
        new (window as any).bootstrap.Tooltip(element);
      }
    });

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(el => {
      const element = el as any;
      if (!element._popover) {
        new (window as any).bootstrap.Popover(element);
      }
    });
  }
}

function reinitializeComponents() {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
  
  initializeBootstrapComponents();
  initializeFlickity();
  loadImagesDirectly();
}

document.addEventListener('DOMContentLoaded', () => {
  spa = new SPA(spaConfig);
  
  spa.getEventBus().on('componentsReinitialize', reinitializeComponents);
  
  spa.getEventBus().on('loadingStarted', () => {});
  
  spa.getEventBus().on('loadingFinished', () => {});
  
  spa.getStore().subscribe(() => {});
  
  loadImagesDirectly();
  initializeFlickity();
});
