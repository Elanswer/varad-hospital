const fs = require('fs');

const cssPath = 'd:/Varad Hospital/css/style.css';
const minCssPath = 'd:/Varad Hospital/css/style.min.css';
const deployMinCssPath = 'd:/Varad_Hospital_Live_Deploy/css/style.min.css';

const newMobileGrids = `
/* ==========================================================================
   MOBILE 2-COLUMN GRID FIXES
   ========================================================================== */
@media (max-width: 767px) {
  /* Make all main grid cards 2 columns on mobile */
  .quick-actions-grid,
  .services-grid,
  .departments-grid,
  .test-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px !important;
  }
  
  /* Compact styling for the cards to fit nicely in 2 columns */
  .quick-action-card,
  .service-card,
  .dept-card,
  .test-item {
    padding: 16px 12px !important;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .service-icon,
  .dept-icon,
  .quick-action-card .icon-wrapper {
    width: 44px !important;
    height: 44px !important;
    margin: 0 auto 12px !important;
  }
  
  .service-icon svg,
  .dept-icon svg,
  .quick-action-card .icon-wrapper svg {
    width: 24px !important;
    height: 24px !important;
  }
  
  .service-title,
  .dept-title,
  .quick-action-card h3 {
    font-size: 0.85rem !important;
    margin-bottom: 4px !important;
  }
  
  .service-subtitle,
  .service-desc,
  .dept-desc,
  .quick-action-card p {
    font-size: 0.7rem !important;
    line-height: 1.3 !important;
    margin-bottom: 0 !important;
  }

  .quick-action-link,
  .service-link,
  .dept-link {
    font-size: 0.7rem !important;
    margin-top: 8px !important;
  }
  
  /* Ensure pathology tags section is compact */
  .pathology-tags {
    padding: 16px !important;
  }
}
`;

let css = fs.readFileSync(cssPath, 'utf-8');
if (!css.includes('MOBILE 2-COLUMN GRID FIXES')) {
  css += '\n' + newMobileGrids;
  fs.writeFileSync(cssPath, css, 'utf-8');
  console.log('Appended mobile grid fixes to style.css');
} else {
  console.log('Mobile grid fixes already appended.');
}

// 2. Minify CSS safely
let minCss = css
  .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
  .replace(/\n/g, '') // remove newlines
  .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // remove spaces around syntax
  .replace(/\s+/g, ' ') // collapse remaining spaces
  .trim();

// 3. Write minified CSS
fs.writeFileSync(minCssPath, minCss, 'utf-8');
if (fs.existsSync(deployMinCssPath)) {
  fs.writeFileSync(deployMinCssPath, minCss, 'utf-8');
  console.log('Updated style.min.css in source and deploy folders.');
} else {
  console.log('Updated style.min.css in source.');
}
