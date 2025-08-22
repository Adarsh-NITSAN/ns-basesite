// using ES6 modules
import VanillaSiteSpeedBooster from "@nitsantechnologies/vanilla-site-speed-booster";

// Initialize speed booster with simplified configuration (no lazy loading)
const speedBooster = new VanillaSiteSpeedBooster({
  // If you need progress bar then enabled, We use famous nprogress.js (know more at below FAQ section)
  enableProgressBar: false,

  // Set Id's of your Bundlejs script tag (know more at below usage section)
  // Note: For module scripts, this will trigger component re-initialization instead of script re-execution
  // Set to null to disable script re-execution completely for modules
  idBundleJs: null,

  // Enter list of CSS-selector which you want to exclude of Anchor tag - Remove this speed-booster feature
  langSwitch: ".navigation a",

  // Enter list of CSS-selector which you want to exclude from whole page - Remove this speed-booster feature
  removeUsingPageClass: ".myCustomPageClass",

  // Add Error Message
  errorMsg: "Oops! Fatal error in VanillaSiteSpeedBooster plugin",

  // CSS-class name of your site's Main div-wrapper
  mainClassName: ".site-main",

  // Enable/Disable Browser's back & forward feature
  pageBackForwardReload: true,

  // If you have remove this functionality by target specific <A> Tag class
  removeUsingTargetClass: ['exclude-ajax-link', 'lang-menu-item'],

  // If you have remove this functionality by target specific <A> Tag class
  removeWithoutReloadUsingTargetClass: ['exclude-ajax-link'],

  // Disable lazy loading features (using direct loading instead)
  enableImagePreloading: false,
  enableLazyLoading: false
});

// Log successful initialization
console.log('⚡ Speed booster initialized with direct image loading');
