const fs = require('fs');
const cssFile = 'd:/Varad Hospital/css/style.css';
let content = fs.readFileSync(cssFile, 'utf-8');

const override = `
/* Force gap on quick actions grid */
.quick-actions-grid {
  gap: 24px !important;
}
`;

fs.appendFileSync(cssFile, override);
console.log('Appended gap override to style.css');
