const fs = require('fs');

const cssPath = 'd:/Varad Hospital/css/style.css';
const minCssPath = 'd:/Varad Hospital/css/style.min.css';

let css = fs.readFileSync(cssPath, 'utf-8');

const oldCss = `  /* 2. Test Categories - Clean Vertical App-Style List */
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
  }`;

const newCss = `  /* 2. Test Categories - Compact Tag Cloud / Chips */
  .test-grid {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 10px !important;
  }
  .test-item {
    display: inline-flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 8px 16px !important;
    border-radius: 30px !important; /* Full pill shape */
    background: rgba(28, 136, 111, 0.04) !important;
    border: 1px solid rgba(28, 136, 111, 0.15) !important;
    width: auto !important;
    flex: 0 0 auto !important;
  }
  .test-item svg {
    margin: 0 8px 0 0 !important;
    width: 16px !important;
    height: 16px !important;
    color: var(--color-accent) !important;
  }
  .test-item span {
    font-size: 0.85rem !important;
    font-weight: 600 !important;
    color: var(--color-primary-dark) !important;
    margin: 0 !important;
  }`;

css = css.replace(oldCss, newCss);
fs.writeFileSync(cssPath, css, 'utf-8');
console.log('Test grid updated to Tag Cloud layout in style.css');

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
