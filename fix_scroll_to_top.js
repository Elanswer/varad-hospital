const fs = require('fs');

const cssPath = 'd:/Varad Hospital/css/style.css';
const minCssPath = 'd:/Varad Hospital/css/style.min.css';

let css = fs.readFileSync(cssPath, 'utf-8');

const oldCss = `@media (max-width: 768px) {
  #scroll-to-top {
    bottom: 85px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}`;

const newCss = `@media (max-width: 768px) {
  #scroll-to-top {
    bottom: 24px;
    right: auto;
    left: 20px;
    width: 44px;
    height: 44px;
  }
}`;

if (css.includes(oldCss)) {
  css = css.replace(oldCss, newCss);
  fs.writeFileSync(cssPath, css, 'utf-8');
  console.log('Scroll to top button moved to left on mobile in style.css');
} else {
  console.log('Could not find exact old CSS block. Falling back to appending override.');
  const appendCss = `
/* Fix scroll-to-top overlap on mobile */
@media (max-width: 767px) {
  #scroll-to-top {
    bottom: 24px !important;
    right: auto !important;
    left: 20px !important;
    width: 44px !important;
    height: 44px !important;
  }
}
`;
  css += appendCss;
  fs.writeFileSync(cssPath, css, 'utf-8');
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
