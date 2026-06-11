const fs = require('fs');
const path = require('path');

const dir = 'd:/Varad Hospital';
const jsFile = path.join(dir, 'js', 'title-animation.js');
const cssFile = path.join(dir, 'css', 'style.css');

// 1. Create the JS file
const jsCode = `document.addEventListener('DOMContentLoaded', () => {
  const titles = document.querySelectorAll('h1, h2, h3.section-title, .hero__title, .hero-v2__title, .inner-hero__title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.1 });

  function wrapWordsInTextNode(textNode, wordIndexCounter) {
    const text = textNode.nodeValue;
    // Split by whitespace but keep spaces separate
    const parts = text.split(/(\\s+)/);
    const fragment = document.createDocumentFragment();

    parts.forEach(part => {
      if (part.trim() === '') {
        // Just whitespace
        fragment.appendChild(document.createTextNode(part));
      } else {
        // A word
        const wrap = document.createElement('span');
        wrap.className = 'cinematic-word-wrap';
        
        const inner = document.createElement('span');
        inner.className = 'cinematic-word-inner';
        inner.textContent = part;
        inner.style.transitionDelay = \`\${wordIndexCounter.value * 0.08}s\`;
        
        wrap.appendChild(inner);
        fragment.appendChild(wrap);
        
        wordIndexCounter.value++;
      }
    });

    textNode.parentNode.replaceChild(fragment, textNode);
  }

  function traverseAndWrap(node, wordIndexCounter) {
    const children = Array.from(node.childNodes);
    children.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        wrapWordsInTextNode(child, wordIndexCounter);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (!child.classList.contains('cinematic-word-wrap') && !child.classList.contains('cinematic-word-inner')) {
          traverseAndWrap(child, wordIndexCounter);
        }
      }
    });
  }

  titles.forEach(title => {
    if (title.classList.contains('title-animated')) return;
    title.classList.add('title-animated');
    
    // Some titles might be flex/grid, we might need to ensure inline-block wrapping doesn't break them, 
    // but usually text nodes inside are fine.
    
    const wordIndexCounter = { value: 0 };
    traverseAndWrap(title, wordIndexCounter);
    
    observer.observe(title);
  });
});
`;

if (!fs.existsSync(path.join(dir, 'js'))) {
  fs.mkdirSync(path.join(dir, 'js'));
}
fs.writeFileSync(jsFile, jsCode, 'utf-8');
console.log('Created js/title-animation.js');

// 2. Append CSS to style.css
const cssCode = `
/* ==========================================================================
   WORD-BY-WORD TITLE ANIMATION
   ========================================================================== */
.cinematic-word-wrap {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  /* padding to prevent cutting off descending letters like 'p' or 'g' */
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
}

.cinematic-word-inner {
  display: inline-block;
  transform: translateY(115%);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.title-animated.is-revealed .cinematic-word-inner {
  transform: translateY(0);
}

/* Ensure no weird line-height clipping on h1/h2 */
.title-animated {
  overflow: hidden; /* Sometimes needed, but usually wrap is enough */
  overflow: visible; /* Better to keep visible so ascenders aren't cut */
}
`;

let currentCss = fs.readFileSync(cssFile, 'utf-8');
if (!currentCss.includes('WORD-BY-WORD TITLE ANIMATION')) {
  fs.appendFileSync(cssFile, cssCode);
  console.log('Appended title animation CSS to style.css');
}

// 3. Inject JS into HTML files
const files = fs.readdirSync(dir);
files.forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    // Check if already injected
    if (!html.includes('title-animation.js')) {
      // Find </body> and inject before it
      html = html.replace('</body>', '  <script src="js/title-animation.js"></script>\n</body>');
      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`Injected JS into ${file}`);
    }
  }
});
