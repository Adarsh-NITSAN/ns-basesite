# NITSAN Technologies - Frontend Project

A modern, optimized frontend project built with Vite, Bootstrap 5, and Sass.

## 🚀 Features

- **Modern Build System**: Vite for fast development and optimized production builds
- **Bootstrap 5.3.7**: Latest version with all components and utilities
- **Modern Sass**: Using `@use` syntax for better module management
- **Performance Optimized**: 
  - Lazy loading with Lozad
  - Image optimization with responsive pictures
  - Critical resource preloading
  - Clean build output (no deprecation warnings)
- **SEO Optimized**: Meta tags, Open Graph, semantic HTML
- **Accessibility**: ARIA labels, semantic structure, keyboard navigation

## 📁 Project Structure

```
basesite/
├── index.html              # Main HTML file (optimized)
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── public/                 # Static assets (served directly)
│   └── assets/
│       ├── images/         # Optimized images
│       ├── fonts/          # Web fonts (Open Sans, Font Awesome)
│       └── favicon/        # Favicon assets
├── src/
│   ├── js/
│   │   ├── main.js         # Main application entry point
│   │   ├── theme.js        # Theme configuration
│   │   ├── aos.js          # Animate On Scroll
│   │   └── demo.js         # Menu functionality & Lozad init
│   └── scss/
│       ├── style.scss      # Main stylesheet
│       ├── base/           # Base styles (variables, typography, extensions)
│       ├── include/        # Component styles (header, footer, buttons, etc.)
│       ├── mixins/         # Sass mixins
│       └── plugin/         # Third-party styles (Font Awesome)
└── dist/                   # Production build output
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation
```bash
yarn install
```

### Development Server
```bash
yarn dev
```
Runs on http://localhost:3000

### Production Build
```bash
yarn build
```

### Preview Production Build
```bash
yarn preview
```

## 🎨 Styling

- **Bootstrap 5.3.7**: Complete component library
- **Custom Sass**: Modern `@use` syntax
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized CSS with critical path optimization

## 📱 Features

- **Lazy Loading**: Images and iframes load on demand
- **Responsive Images**: Picture element with multiple sources
- **Smooth Animations**: AOS (Animate On Scroll)
- **Modern JavaScript**: ES6+ with module system
- **Clean Build**: No deprecation warnings
- **Mobile Menu**: Responsive navigation with hamburger menu

## 🔧 Configuration

### Vite Configuration
- Optimized for production builds
- Sass deprecation warnings silenced
- Asset optimization enabled
- Single entry point (index.html)
- Public assets served directly from `/public` directory

### Bootstrap Integration
- Full Bootstrap 5.3.7 integration
- Custom variable overrides
- Component customization
- Utility classes available

## 📊 Performance

- **Build Size**: Optimized bundle sizes
- **Loading Speed**: Critical resources preloaded
- **SEO Score**: Optimized meta tags and structure
- **Accessibility**: WCAG compliant markup

## 🧹 Cleanup Summary

The project has been cleaned up to remove:
- ❌ Unused `cms.html` file (848 lines)
- ❌ Unused `_cms.scss` stylesheet
- ❌ Unused `placeholder_196x156.jpg` image
- ❌ Unused favicon files (browserconfig.xml, favicon.ico, mstile-150x150.png, safari-pinned-tab.svg, android-chrome-144x144.png)
- ❌ Old build artifacts in `dist/` directory

## 🗂️ Asset Organization

**Static Assets in `/public/assets/`:**
- **Images**: Direct access via `/assets/images/`
- **Fonts**: Direct access via `/assets/fonts/`
- **Favicons**: Direct access via `/assets/favicon/`

**Benefits of Public Assets:**
- ✅ **Direct serving** - No processing overhead
- ✅ **Better caching** - Static assets cached effectively
- ✅ **Cleaner URLs** - Simple `/assets/` paths
- ✅ **Better organization** - Clear separation from source code

## 🚀 Deployment

The project is ready for deployment to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any CDN

## 📝 License

© 2024 NITSAN Technologies. All rights reserved.

---

**Built with ❤️ by NITSAN Technologies**
