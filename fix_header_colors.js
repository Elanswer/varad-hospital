const fs = require('fs');
const cssFile = 'css/style.css';

if (fs.existsSync(cssFile)) {
  let content = fs.readFileSync(cssFile, 'utf-8');
  
  content += `
/* ==========================================================================
   FIX HEADER LINKS ON DARK INNER HERO
   ========================================================================== */

/* Make navigation links and hamburger white when header is transparent over the dark inner hero */
body:not(.home) .header:not(.header-scrolled) .nav-link {
  color: rgba(253, 251, 247, 0.9) !important; /* Alabaster with slight transparency */
  text-shadow: 0 1px 4px rgba(0,0,0,0.4);
}

body:not(.home) .header:not(.header-scrolled) .nav-link:hover {
  color: var(--color-bg) !important;
}

body:not(.home) .header:not(.header-scrolled) .nav-link::after {
  background-color: var(--color-bg) !important;
}

body:not(.home) .header:not(.header-scrolled) .nav-link.active {
  color: var(--color-bg) !important;
  font-weight: 600;
}

body:not(.home) .header:not(.header-scrolled) .hamburger-bar {
  background-color: var(--color-bg) !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}
`;
  
  fs.writeFileSync(cssFile, content, 'utf-8');
  console.log('Fixed header link colors on inner pages');
}
