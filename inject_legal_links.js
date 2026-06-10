const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'departments.html',
  'services.html',
  'doctors.html',
  'pathology.html',
  'contact.html',
  'privacy-policy.html',
  'terms-conditions.html',
  'disclaimer.html',
  '404.html'
];

const oldFooterBottom = `<div class="footer-bottom">
      <div class="container">
        <p>&copy; <span class="footer-year">2026</span> Varad Hospital. All rights reserved.</p>
      </div>
    </div>`;

const newFooterBottom = `<div class="footer-bottom">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <p style="margin:0;">&copy; <span class="footer-year">2026</span> Varad Hospital. All rights reserved.</p>
        <div class="footer-legal" style="display: flex; gap: 16px; font-size: 0.85rem;">
          <a href="privacy-policy.html" style="color: #64748B; text-decoration: none;">Privacy Policy</a>
          <a href="terms-conditions.html" style="color: #64748B; text-decoration: none;">Terms & Conditions</a>
          <a href="disclaimer.html" style="color: #64748B; text-decoration: none;">Disclaimer</a>
        </div>
      </div>
    </div>`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    // Using regex to catch potential whitespace differences
    const footerRegex = /<div class="footer-bottom">[\s\S]*?<p>&copy; <span class="footer-year">2026<\/span> Varad Hospital\. All rights reserved\.<\/p>[\s\S]*?<\/div>\s*<\/div>/;
    
    if (footerRegex.test(content)) {
      content = content.replace(footerRegex, newFooterBottom);
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Injected legal links into ${file}`);
    } else {
      console.log(`Could not find match in ${file}`);
    }
  }
});
