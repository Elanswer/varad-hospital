const fs = require('fs');
const cssFile = 'css/style.css';

if (fs.existsSync(cssFile)) {
  let content = fs.readFileSync(cssFile, 'utf-8');

  // 1. Fix the 6-column issue in the original CSS
  content = content.replace(
    /@media \(min-width: 1024px\) \{\s*\.services-grid \{\s*grid-template-columns: repeat\(6, 1fr\);\s*\}\s*\}/g,
    `@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr); /* Fixed: 3 columns instead of 6 for better card layout */
    gap: 32px;
  }
}`
  );

  // 2. Fix the luxury staggering logic
  // We need to remove .services-grid .service-card:nth-child(even) from the transform rule
  const badRule = /\.services-grid \.service-card:nth-child\(even\)/g;
  content = content.replace(badRule, '/* removed services zigzag */');

  // 3. Add the correct column-based staggering for 3-column layouts
  const correctStagger = `
/* Fixed Services Layout */
@media (min-width: 1024px) {
  .services-grid .service-card:nth-child(3n+2) {
    transform: translateY(40px);
    transition: transform 0.4s ease;
  }
  .services-grid .service-card:nth-child(3n+2):hover {
    transform: translateY(30px);
  }
}
`;
  content = content + '\n' + correctStagger;

  fs.writeFileSync(cssFile, content, 'utf-8');
  console.log('Fixed services grid alignment.');
}
