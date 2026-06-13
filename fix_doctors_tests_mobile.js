const fs = require('fs');

const cssPath = 'd:/Varad Hospital/css/style.css';
const minCssPath = 'd:/Varad Hospital/css/style.min.css';

const newFixes = `
/* ==========================================================================
   DOCTORS GRID & TEST CATEGORIES MOBILE IMPROVEMENT
   ========================================================================== */
@media (max-width: 767px) {
  /* 1. Doctors Grid - Horizontal Scroll Carousel */
  .doctors-grid-v2 {
    display: flex !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory;
    gap: 16px !important;
    padding-bottom: 24px !important;
    margin-right: -20px !important; /* Negative margin to let it scroll to screen edge */
    margin-left: -20px !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Hide scrollbar for cleaner look */
  }
  .doctors-grid-v2::-webkit-scrollbar {
    display: none;
  }
  .doctors-grid-v2 .doc-card {
    min-width: 280px !important;
    max-width: 280px !important;
    scroll-snap-align: center;
    flex-shrink: 0;
  }

  /* 2. Test Categories - Clean Vertical App-Style List */
  .test-grid {
    grid-template-columns: 1fr !important;
    gap: 8px !important;
  }
  .test-item {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding: 12px 20px !important;
    text-align: left !important;
  }
  .test-item svg {
    margin: 0 16px 0 0 !important;
    width: 22px !important;
    height: 22px !important;
    color: var(--color-accent) !important;
  }
  .test-item span {
    font-size: 0.95rem !important;
    font-weight: 500 !important;
    margin: 0 !important;
  }
}
`;

let css = fs.readFileSync(cssPath, 'utf-8');
if (!css.includes('DOCTORS GRID & TEST CATEGORIES MOBILE IMPROVEMENT')) {
  css += '\n' + newFixes;
  fs.writeFileSync(cssPath, css, 'utf-8');
  console.log('Appended doctors and tests mobile fixes to style.css');
} else {
  console.log('Fixes already appended.');
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
