const fs = require('fs');
const cssFile = 'd:/Varad Hospital/css/style.css';

const override = `
/* Fix for transparent/gradient text clipping inside animated inner spans */
.hero-v2__title-accent .cinematic-word-inner {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;

fs.appendFileSync(cssFile, override);
console.log('Appended gradient fix to style.css');
