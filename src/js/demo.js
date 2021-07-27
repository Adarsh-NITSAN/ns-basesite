//
// demo.js
//

import lozad from 'lozad';

// Init lozad(Lazyload)
const observer = lozad();
observer.observe();

const $body = document.body;

// Menu toggle
const menuTrigger = document.getElementById('menuTrigger');
if (menuTrigger) {
  menuTrigger.addEventListener('click', () => {
    $body.classList.toggle('menu--open');
  });
}
