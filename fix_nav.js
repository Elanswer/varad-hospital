const fs = require('fs');
const cssFile = 'css/style.css';

if (fs.existsSync(cssFile)) {
  let content = fs.readFileSync(cssFile, 'utf-8');
  
  content += `
/* Fix Navbar Wrapping for Wider Luxury Fonts */
@media (min-width: 992px) {
  .nav-list {
    gap: 20px !important;
  }
  .nav-link {
    font-size: 14px !important;
    padding: 8px 12px !important;
  }
}
`;
  
  fs.writeFileSync(cssFile, content, 'utf-8');
  console.log('Fixed navbar wrapping');
}
