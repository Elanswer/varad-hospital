const fs = require('fs');
const cssFile = 'css/style.css';

if (fs.existsSync(cssFile)) {
  let content = fs.readFileSync(cssFile, 'utf-8');
  
  content += `
/* ==========================================================================
   REMOVE BREADCRUMB FROM INNER HERO FOR CLEANER BOUTIQUE LOOK
   ========================================================================== */
.inner-hero nav[aria-label="Breadcrumb"] {
  display: none !important;
}
`;
  
  fs.writeFileSync(cssFile, content, 'utf-8');
  console.log('Breadcrumb hidden in inner hero');
}
