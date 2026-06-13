const fs = require('fs');

const cssPath = 'd:/Varad Hospital/css/style.css';
const minCssPath = 'd:/Varad Hospital/css/style.min.css';

const heroMobileFix = `
/* ==========================================================================
   HERO MOBILE PADDING & OVERFLOW FIXES
   ========================================================================== */
@media (max-width: 767px) {
  .hero-v2__content {
    padding: 24px 16px !important;
    border-radius: 20px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .hero-v2__title {
    font-size: clamp(1.75rem, 6vw, 2.25rem) !important;
    word-wrap: break-word !important;
    hyphens: auto !important;
  }
  
  .hero-v2__badge {
    height: auto !important;
    padding: 6px 12px !important;
    text-align: left !important;
    flex-wrap: wrap !important;
  }
}
`;

let css = fs.readFileSync(cssPath, 'utf-8');
if (!css.includes('HERO MOBILE PADDING & OVERFLOW FIXES')) {
  css += '\n' + heroMobileFix;
  fs.writeFileSync(cssPath, css, 'utf-8');
  console.log('Appended hero mobile fixes to style.css');
} else {
  console.log('Hero mobile fixes already appended.');
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
