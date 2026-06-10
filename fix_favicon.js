const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'departments.html',
  'services.html',
  'doctors.html',
  'pathology.html',
  'contact.html'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    // Replace favicon.ico with logo.webp (since we have the logo)
    content = content.replace('href="images/favicon.ico" type="image/x-icon"', 'href="images/logo.webp" type="image/webp"');
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated favicon in ${file}`);
  }
});
