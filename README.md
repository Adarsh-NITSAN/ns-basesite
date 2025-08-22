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
- **CMS Ready**: TYPO3 CMS content elements and styling

## 📁 Project Structure

```
basesite/
├── index.html              # Main HTML file (optimized)
├── cms.html                # CMS template with TYPO3 content elements
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── public/                 # Static assets (served directly)
│   └── assets/
│       ├── images/         # Optimized images
│       │   ├── nitsan-logo.png
│       │   ├── placeholder_982x512.jpg
│       │   ├── placeholder_650x350.jpg
│       │   └── placeholder_480x270.jpg
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
│       │   ├── _header.scss
│       │   ├── _footer.scss
│       │   ├── _button.scss
│       │   ├── _form.scss
│       │   ├── _general.scss
│       │   ├── _content-section.scss
│       │   └── _cms.scss   # TYPO3 CMS specific styles
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
Runs on http://localhost:3000 (or next available port)

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
- **CMS Integration**: TYPO3 content element styling

## 📱 Features

- **Lazy Loading**: Images and iframes load on demand
- **Responsive Images**: Picture element with multiple sources
- **Smooth Animations**: AOS (Animate On Scroll)
- **Modern JavaScript**: ES6+ with module system
- **Clean Build**: No deprecation warnings
- **Mobile Menu**: Responsive navigation with hamburger menu
- **CMS Support**: TYPO3 content elements and layouts

## 🔧 Configuration

### Vite Configuration
- Optimized for production builds
- Sass deprecation warnings silenced
- Asset optimization enabled
- Multiple entry points (index.html, cms.html)
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

The project has been optimized to:
- ✅ **Migrated to public assets** - Static files moved to `/public/assets/`
- ✅ **Updated all asset paths** - Images, fonts, and favicons use `/assets/` prefix
- ✅ **Modernized Sass structure** - Using `@use` syntax throughout
- ✅ **Silenced deprecation warnings** - Bootstrap warnings handled properly
- ✅ **Optimized build process** - Clean, fast builds with no errors
- ✅ **Removed unused favicon files** - Kept only essential favicon assets

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

## 📄 Pages

### Main Page (`index.html`)
- Optimized landing page with modern features
- Responsive design with lazy loading
- SEO optimized with meta tags
- Interactive elements with Bootstrap components

### CMS Page (`cms.html`)
- TYPO3 CMS template with content elements
- Demonstrates various content layouts:
  - Text and image combinations
  - Multi-column layouts
  - Responsive image galleries
  - Form elements
  - Typography examples
- Perfect for CMS integration and content management

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
