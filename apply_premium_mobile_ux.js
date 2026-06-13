const fs = require('fs');

const cssPath = 'd:/Varad Hospital/css/style.css';
const minCssPath = 'd:/Varad Hospital/css/style.min.css';

const premiumUxCss = `
/* ==========================================================================
   PREMIUM MOBILE UX OVERHAUL (All Inner Pages)
   ========================================================================== */
@media (max-width: 767px) {
  
  /* 1. Global Spacing & Typography */
  .section {
    padding: 48px 0 !important;
  }
  .section-title {
    font-size: clamp(1.75rem, 6vw, 2.25rem) !important;
    word-wrap: break-word !important;
    hyphens: auto !important;
  }
  .inner-hero__title {
    font-size: clamp(2rem, 8vw, 2.75rem) !important;
  }

  /* 2. Departments Grid -> Horizontal Carousel */
  .dept-grid {
    display: flex !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory;
    gap: 16px !important;
    padding-bottom: 24px !important;
    margin-right: -20px !important; 
    margin-left: -20px !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; 
  }
  .dept-grid::-webkit-scrollbar {
    display: none;
  }
  .dept-grid .dept-card {
    min-width: 290px !important;
    max-width: 290px !important;
    scroll-snap-align: center;
    flex-shrink: 0;
  }

  /* 3. Treatments Grid -> Compact Tag Cloud / Chips */
  .treatment-grid {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 10px !important;
  }
  .treatment-item {
    display: inline-flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 8px 16px !important;
    border-radius: 30px !important; /* Full pill shape */
    background: rgba(29, 111, 184, 0.05) !important; /* Primary blue tint */
    border: 1px solid rgba(29, 111, 184, 0.15) !important;
    width: auto !important;
    flex: 0 0 auto !important;
  }
  .treatment-item svg {
    margin: 0 8px 0 0 !important;
    width: 16px !important;
    height: 16px !important;
    color: var(--color-primary) !important;
  }
  .treatment-item span {
    font-size: 0.85rem !important;
    font-weight: 600 !important;
    color: var(--color-primary-dark) !important;
    margin: 0 !important;
  }

  /* 4. About Page Collage Optimization */
  .about-image-collage {
    height: 380px !important;
    margin-top: 24px !important;
  }
  .about-image-collage .img-back {
    width: 85% !important;
    right: 0 !important;
    top: 0 !important;
  }
  .about-image-collage .img-front {
    width: 70% !important;
    left: 0 !important;
    bottom: 0 !important;
  }

  /* 5. Contact Page Map */
  .contact-map iframe {
    height: 300px !important;
  }

  /* 6. Footer Layout Optimization */
  .footer {
    padding-top: 48px !important;
  }
  .footer-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 24px 16px !important;
  }
  .footer-col:first-child {
    grid-column: 1 / -1; /* Brand takes full width */
    margin-bottom: 8px;
  }
  .footer-col:last-child {
    grid-column: 1 / -1; /* Location takes full width */
  }
  .footer-heading {
    font-size: 1.1rem !important;
    margin-bottom: 16px !important;
  }
  .footer-logo {
    max-width: 130px !important;
  }
  .footer-bottom .container {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }
  .footer-legal {
    justify-content: center !important;
    margin-top: 8px !important;
  }
}
`;

let css = fs.readFileSync(cssPath, 'utf-8');

if (!css.includes('PREMIUM MOBILE UX OVERHAUL')) {
  css += '\n' + premiumUxCss;
  fs.writeFileSync(cssPath, css, 'utf-8');
  console.log('Appended premium mobile UX fixes to style.css');
} else {
  console.log('Premium mobile UX fixes already appended.');
}

// Minify CSS safely
let minCss = css
  .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
  .replace(/\n/g, '') // remove newlines
  .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // remove spaces around syntax
  .replace(/\s+/g, ' ') // collapse remaining spaces
  .trim();

// Write minified CSS
fs.writeFileSync(minCssPath, minCss, 'utf-8');
console.log('Updated style.min.css in source.');
