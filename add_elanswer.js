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

const targetText = '<p style="margin:0;">&copy; <span class="footer-year">2026</span> Varad Hospital. All rights reserved.</p>';
const replacementText = '<p style="margin:0;">&copy; <span class="footer-year">2026</span> Varad Hospital. All rights reserved. | Designed and developed by <a href="https://www.elanswer.com" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent); text-decoration: none; font-weight: 500;">Elanswer</a></p>';

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    if (content.includes(targetText)) {
      content = content.replace(targetText, replacementText);
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Added developer credit to ${file}`);
    } else {
      console.log(`Could not find target text in ${file}`);
    }
  }
});
