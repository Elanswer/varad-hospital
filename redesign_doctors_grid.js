const fs = require('fs');

const cssPath = 'd:/Varad Hospital/css/style.css';
const minCssPath = 'd:/Varad Hospital/css/style.min.css';

const newDoctorsGridCss = `
/* ==========================================================================
   DOCTORS GRID ULTRA-PREMIUM REDESIGN OVERRIDE
   ========================================================================== */
.premium-doc-card {
  min-height: auto !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  padding: 0 !important;
  overflow: hidden !important;
  background: var(--color-white) !important;
  border-radius: 16px !important;
  border: 1px solid rgba(0, 0, 0, 0.06) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  aspect-ratio: auto !important;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.4s ease !important;
}

.premium-doc-card:hover {
  transform: translateY(-6px) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08) !important;
  border-color: rgba(29, 111, 184, 0.2) !important;
}

/* Remove old gradients & pseudo-elements */
.premium-doc-card::after {
  display: none !important;
}

/* Clean Avatar Wrapper */
.premium-doc-card .monogram-avatar-wrapper {
  padding: 32px 0 16px 0 !important;
  background: transparent !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

/* Elegant Avatar Circle */
.premium-doc-card .monogram-avatar {
  width: 80px !important;
  height: 80px !important;
  font-size: 1.75rem !important;
  font-weight: 600 !important;
  font-family: var(--font-body) !important;
  background-color: rgba(29, 111, 184, 0.06) !important;
  color: var(--color-primary) !important;
  box-shadow: none !important;
  border: 1px solid rgba(29, 111, 184, 0.1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 50% !important;
  transition: transform 0.4s ease, background-color 0.4s ease !important;
}

.premium-doc-card:hover .monogram-avatar {
  transform: scale(1.05) !important;
  background-color: rgba(29, 111, 184, 0.1) !important;
}

/* Content Area */
.premium-doc-content {
  position: static !important;
  padding: 0 24px 32px 24px !important;
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: none !important;
  color: var(--color-text) !important;
  text-align: center !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

.premium-doc-card:hover .premium-doc-content {
  background: transparent !important;
  border-color: transparent !important;
}

/* Elegant Badge */
.premium-doc-badge {
  display: inline-block !important;
  font-size: 0.7rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  background: rgba(44, 183, 165, 0.1) !important; /* Soft Teal */
  color: var(--color-accent) !important;
  padding: 6px 14px !important;
  border-radius: 30px !important;
  margin-bottom: 16px !important;
}

/* Modern Typography */
.premium-doc-name {
  font-family: var(--font-body) !important;
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  color: var(--color-primary-dark) !important;
  margin-bottom: 6px !important;
  line-height: 1.3 !important;
  letter-spacing: -0.01em !important;
}

.premium-doc-qual {
  font-family: var(--font-body) !important;
  font-size: 0.85rem !important;
  color: var(--color-text-secondary) !important;
  margin-bottom: 12px !important;
  font-weight: 400 !important;
  opacity: 1 !important;
  line-height: 1.4 !important;
}

.premium-doc-role {
  font-family: var(--font-body) !important;
  font-size: 0.8rem !important;
  font-weight: 600 !important;
  color: var(--color-primary) !important;
  margin-bottom: 0 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
}
`;

let css = fs.readFileSync(cssPath, 'utf-8');

if (!css.includes('DOCTORS GRID ULTRA-PREMIUM REDESIGN OVERRIDE')) {
  css += '\n' + newDoctorsGridCss;
  fs.writeFileSync(cssPath, css, 'utf-8');
  console.log('Appended doctors grid redesign CSS to style.css');
} else {
  console.log('Doctors grid redesign already applied.');
}

// Minify CSS safely
let minCss = css
  .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
  .replace(/\n/g, '') // remove newlines
  .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // remove spaces around syntax
  .replace(/\s+/g, ' ') // collapse remaining spaces
  .trim();

fs.writeFileSync(minCssPath, minCss, 'utf-8');
console.log('Updated style.min.css in source.');
