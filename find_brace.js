const fs = require('fs');
const css = fs.readFileSync('d:/Varad Hospital/css/style.css', 'utf-8');
const lines = css.split('\n');

let depth = 0;
let lastBlock = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('{')) {
    depth += (line.match(/\{/g) || []).length;
    lastBlock = `Line ${i + 1}: ${line.trim()}`;
  }
  if (line.includes('}')) {
    depth -= (line.match(/\}/g) || []).length;
  }
  
  // A CSS file shouldn't generally go deeper than 2 (media query > selector)
  if (depth > 2) {
    console.log(`Deep nesting detected at line ${i + 1}: ${line}`);
  }
}

console.log('Final depth:', depth);
if (depth > 0) {
  console.log('Last opened block was:', lastBlock);
}
