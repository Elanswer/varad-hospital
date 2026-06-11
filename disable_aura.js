const fs = require('fs');

// 1. Remove JS aura physics from main.js
const jsFile = 'js/main.js';
if (fs.existsSync(jsFile)) {
  let jsContent = fs.readFileSync(jsFile, 'utf-8');
  
  // Disable the animateAura loop
  jsContent = jsContent.replace(/requestAnimationFrame\(animateAura\);/g, '// requestAnimationFrame(animateAura); // Disabled to fix GPU lag');
  
  fs.writeFileSync(jsFile, jsContent, 'utf-8');
  console.log('Disabled cursor physics in main.js');
}

// 2. Hide the aura completely in style.css
const cssFile = 'css/style.css';
if (fs.existsSync(cssFile)) {
  let cssContent = fs.readFileSync(cssFile, 'utf-8');
  
  // Find the block that keeps the aura
  const blockToReplace = `.custom-cursor-aura {
  will-change: transform, width, height;
  backface-visibility: hidden;
  transform: translateZ(0);
    display: block; /* Keep the aura for hover effects */
  }`;
  
  // Actually, let's just globally force it hidden
  cssContent += `\n/* Force hide aura to prevent GPU ghosting bug */\n.custom-cursor-aura { display: none !important; }\n`;
  
  fs.writeFileSync(cssFile, cssContent, 'utf-8');
  console.log('Force hid aura in style.css');
}
