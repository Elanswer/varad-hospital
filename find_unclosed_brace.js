const fs = require('fs');
const css = fs.readFileSync('d:/Varad Hospital/css/style.css', 'utf-8');
const lines = css.split('\n');

let depth = 0;
let lastZeroDepthLine = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const opens = (line.match(/\{/g) || []).length;
  const closes = (line.match(/\}/g) || []).length;
  
  depth += opens;
  depth -= closes;
  
  if (depth === 0) {
    lastZeroDepthLine = i;
  }
}

console.log('Last line where depth was 0:', lastZeroDepthLine + 1);
console.log('The unclosed block starts shortly after this line:');
for (let i = lastZeroDepthLine + 1; i <= lastZeroDepthLine + 15 && i < lines.length; i++) {
  console.log(`Line ${i + 1}: ${lines[i]}`);
}
