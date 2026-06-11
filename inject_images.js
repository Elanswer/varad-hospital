const fs = require('fs');
const path = require('path');

const dir = 'd:/Varad Hospital';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 1. Replace the w=600 img-back with OT.webp
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1519494026892-80bbd2d6fd0d\?auto=format&fit=crop&w=600&q=80/g, 'images/OT.webp');
  
  // 2. Replace the w=600 img-front with Madam_Img.webp
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1631217868264-e5b90bb7e133\?auto=format&fit=crop&w=600&q=80/g, 'images/Madam_Img.webp');
  
  // 3. Replace the w=1920 inner hero backgrounds. Alternate them.
  if (file === 'about.html' || file === 'contact.html' || file === 'pathology.html') {
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1519494026892-80bbd2d6fd0d\?auto=format&fit=crop&w=1920&q=80/g, 'images/room.webp');
  } else {
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1519494026892-80bbd2d6fd0d\?auto=format&fit=crop&w=1920&q=80/g, 'images/OT.webp');
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated images in ${file}`);
});
