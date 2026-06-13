const fs = require('fs');

const css = fs.readFileSync('d:/Varad Hospital/css/style.css', 'utf-8');

// Let's find any properties that could break mobile:
// min-width > 300px, width > 300px, grid-template-columns with px, missing max-width 100% on images
const lines = css.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.match(/width:\s*[3-9][0-9]{2}px/)) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
  if (line.match(/min-width:\s*[3-9][0-9]{2}px/)) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
  if (line.match(/grid-template-columns.*px/)) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
}
