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
├── src/
│   ├── js/
│   │   ├── main.js         # Main application entry point
│   │   ├── theme.js        # Theme configuration
│   │   ├── aos.js          # Animate On Scroll
│   │   └── demo.js         # Demo functionality
│   ├── scss/
│   │   ├── style.scss      # Main stylesheet
│   │   ├── base/           # Base styles (variables, typography, etc.)
│   │   ├── include/        # Component styles
│   │   ├── mixins/         # Sass mixins
│   │   └── plugin/         # Third-party styles
│   ├── images/             # Optimized images
│   └── fonts/              # Web fonts
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

## 🔧 Configuration

### Vite Configuration
- Optimized for production builds
- Sass deprecation warnings silenced
- Asset optimization enabled
- Multiple entry points support

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
