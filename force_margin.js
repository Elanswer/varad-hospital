const fs = require('fs');
const cssFile = 'd:/Varad Hospital/css/style.css';

const override = `
/* Force quick actions to drop below hero section with a little gap */
.quick-actions {
  margin-top: 30px !important;
}
`;

fs.appendFileSync(cssFile, override);
console.log('Appended margin-top override to style.css');
