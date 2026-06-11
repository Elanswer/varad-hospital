const fs = require('fs');
const jsFile = 'js/main.js';

if (fs.existsSync(jsFile)) {
  let content = fs.readFileSync(jsFile, 'utf-8');
  
  // Find the start of cinematic text reveal
  const startStr = '// --- 4. Cinematic Text Reveal (All Devices) ---';
  const startIdx = content.indexOf(startStr);
  
  if (startIdx !== -1) {
    // The script was appended to the end of main.js, so we can just truncate it here.
    content = content.substring(0, startIdx);
    fs.writeFileSync(jsFile, content, 'utf-8');
    console.log('Removed Cinematic Text Reveal from main.js');
  }
}
