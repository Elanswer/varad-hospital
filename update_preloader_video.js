const fs = require('fs');

const newPreloaderHTML = `
  <!-- Preloader -->
  <div id="preloader" aria-label="Page is loading">
    <video class="preloader-video" autoplay loop muted playsinline>
      <source src="videos/preloader.webm" type="video/webm">
    </video>
  </div>`;

// 1. Process all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace the old preloader HTML with the new one
    // Using regex to match the old preloader block
    const regex = /<!-- Preloader -->\s*<div id="preloader" aria-label="Page is loading">\s*<div class="preloader-cross"><\/div>\s*<\/div>/i;
    
    if (content.match(regex)) {
      content = content.replace(regex, newPreloaderHTML.trim());
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Updated preloader HTML in ${file}`);
    }
  }
});

// 2. Process style.css
const cssFile = 'css/style.css';
if (fs.existsSync(cssFile)) {
  let cssContent = fs.readFileSync(cssFile, 'utf-8');
  
  // Remove the old .preloader-cross rules
  const cssRegex = /\.preloader-cross {[\s\S]*?@keyframes pulse {[\s\S]*?}/i;
  if (cssContent.match(cssRegex)) {
    cssContent = cssContent.replace(cssRegex, `
.preloader-video {
  width: 150px; /* Adjust size based on video proportions */
  height: auto;
  pointer-events: none;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
}
    `.trim());
    fs.writeFileSync(cssFile, cssContent, 'utf-8');
    console.log(`Updated preloader CSS in ${cssFile}`);
  }
}
