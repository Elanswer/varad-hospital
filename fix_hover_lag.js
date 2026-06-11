const fs = require('fs');

// FIX 1: Clean up style.css
const cssFile = 'css/style.css';
let css = fs.readFileSync(cssFile, 'utf-8');

// (A) Remove the broken stagger block with invalid comment-as-selector
const staggerStart = '/* 3. Asymmetrical Grids (Staggered) */';
const staggerStartIdx = css.indexOf(staggerStart);
if (staggerStartIdx !== -1) {
  // Find the closing brace of the @media block
  let braceCount = 0;
  let i = css.indexOf('{', staggerStartIdx);
  // Find the @media opening brace
  while (i < css.length) {
    if (css[i] === '{') braceCount++;
    if (css[i] === '}') braceCount--;
    if (braceCount === 0) break;
    i++;
  }
  css = css.substring(0, staggerStartIdx) + '/* Stagger removed to fix hover lag */' + css.substring(i + 1);
  console.log('Removed broken stagger block');
}

// (B) Remove the services stagger block
const svcStart = '/* Fixed Services Layout';
const svcStartIdx = css.indexOf(svcStart);
if (svcStartIdx !== -1) {
  let braceCount = 0;
  let i = css.indexOf('{', svcStartIdx);
  while (i < css.length) {
    if (css[i] === '{') braceCount++;
    if (css[i] === '}') braceCount--;
    if (braceCount === 0) break;
    i++;
  }
  css = css.substring(0, svcStartIdx) + '/* Services stagger removed */' + css.substring(i + 1);
  console.log('Removed services stagger block');
}

// (C) Replace all "transition: all" with specific properties
css = css.replace(/transition: all var\(--transition\);/g, 
  'transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);');
css = css.replace(/transition: all 0\.3s ease;/g, 
  'transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;');
css = css.replace(/transition: all 0\.25s ease;/g, 
  'transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;');
css = css.replace(/transition: all 0\.4s ease;/g, 
  'transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;');
css = css.replace(/transition: all 300ms ease;/g, 
  'transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;');
css = css.replace(/transition: all var\(--transition-fast\);/g, 
  'transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);');

fs.writeFileSync(cssFile, css, 'utf-8');
console.log('Replaced all transition:all with specific properties');

// FIX 2: Clean up main.js
const jsFile = 'js/main.js';
let js = fs.readFileSync(jsFile, 'utf-8');

// Strip out the entire ULTRA-PREMIUM block (cursor, magnetic, parallax)
const ultraStart = '/* ==========================================================================\n   ULTRA-PREMIUM UI:';
const ultraIdx = js.indexOf(ultraStart);
if (ultraIdx !== -1) {
  js = js.substring(0, ultraIdx).trimEnd() + '\n';
  console.log('Removed ULTRA-PREMIUM JS block (cursor, magnetic buttons, parallax)');
}

fs.writeFileSync(jsFile, js, 'utf-8');

// Verify JS syntax
const { execSync } = require('child_process');
try {
  execSync('node -c js/main.js', { stdio: 'pipe' });
  console.log('JS syntax check: PASSED');
} catch (e) {
  console.log('JS syntax check: FAILED - ' + e.stderr.toString());
}

console.log('\nDone! All hover lag sources removed.');
