//
// demo.js
//

// Menu functionality only (no lazy loading)

const $body = document.body;

// Menu toggle
const menuTrigger = document.getElementById('menuTrigger');
if (menuTrigger) {
  menuTrigger.addEventListener('click', () => {
    $body.classList.toggle('menu--open');
  });
}

console.log('🎛️ Menu functionality initialized');
