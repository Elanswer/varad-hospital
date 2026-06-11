const fs = require('fs');

const newPreloaderHTML = `
  <!-- Preloader -->
  <div id="preloader" aria-label="Page is loading">
    <video class="preloader-video" autoplay loop muted playsinline>
      <source src="videos/preloader.webm" type="video/webm">
    </video>
  </div>`;

// Process all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace the entire preloader block, whether it uses an img or a cross div
    // We match <!-- Preloader --> up to the closing </div> of the preloader container
    const regex = /<!-- Preloader -->\s*<div id="preloader"[^>]*>[\s\S]*?<\/div>/i;
    
    if (content.match(regex)) {
      content = content.replace(regex, newPreloaderHTML.trim());
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Updated preloader HTML in ${file}`);
    } else {
        // Fallback if there's no <!-- Preloader --> comment
        const regex2 = /<div id="preloader"[^>]*>[\s\S]*?<\/div>/i;
        if(content.match(regex2)) {
          content = content.replace(regex2, newPreloaderHTML.trim());
          fs.writeFileSync(file, content, 'utf-8');
          console.log(`Updated preloader HTML without comment in ${file}`);
        }
    }
  }
});
