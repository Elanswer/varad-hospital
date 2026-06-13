const fs = require('fs');
const path = require('path');

const cssPath = 'd:/Varad Hospital/css/style.css';
const minCssPath = 'd:/Varad Hospital/css/style.min.css';
const deployMinCssPath = 'd:/Varad_Hospital_Live_Deploy/css/style.min.css';

const mobileFixes = `
/* ==========================================================================
   MOBILE & TABLET RESPONSIVENESS FIXES (Appended to override previous)
   ========================================================================== */

@media (max-width: 991px) {
  /* General Layout */
  .container {
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
  
  body {
    overflow-x: hidden;
  }

  /* Hero Section */
  .hero-v2 {
    min-height: auto;
    padding: 60px 0;
  }
  .hero-v2__inner {
    padding-top: 40px;
    padding-bottom: 0px;
  }
  .hero-v2__title {
    font-size: clamp(2rem, 8vw, 2.5rem);
  }
  .hero-v2__subtitle {
    margin-bottom: 24px;
    font-size: 1rem;
  }
  .hero-v2__visual {
    margin-top: 20px;
  }
  .hero-v2__image-wrapper {
    max-width: 340px;
    margin: 0 auto;
  }
  
  /* Hide decorative elements that cause horizontal scroll */
  .hero-decoration--1, 
  .hero-decoration--2, 
  .hero-v2__shape--1, 
  .hero-v2__shape--2 {
    display: none !important;
  }

  /* Quick Actions Grid */
  .quick-actions {
    margin-top: 0 !important;
    padding-bottom: 40px;
  }
  .quick-actions-grid {
    gap: 12px !important;
  }

  /* About Collage Image */
  .about-image-collage {
    height: 380px;
  }
  .about-image-collage .img-back {
    height: 280px;
    width: 80%;
  }
  .about-image-collage .img-front {
    height: 240px;
    width: 70%;
    border-width: 6px;
  }

  /* Doctor Cards Grid */
  .doctors-grid-v2 {
    gap: 16px;
  }
  .doc-card {
    margin-bottom: 0;
  }

  /* CTA Pro (Digital Front Desk) */
  .cta-pro {
    padding: 50px 0;
  }
  .cta-pro__inner {
    gap: 40px;
  }
  .cta-pro__title {
    font-size: clamp(2rem, 7vw, 2.5rem);
  }

  /* Reviews Margin */
  .review-card {
    width: 280px !important;
    padding: 24px;
  }

  /* FAQ Inline Override */
  .faq-section {
    padding: 60px 0 !important;
  }

  /* Inner Pages Hero */
  .inner-hero {
    min-height: auto;
    padding: 100px 0 60px;
  }
  .inner-hero__glass {
    padding: 32px 24px;
    margin: 0 16px;
    max-width: calc(100% - 32px);
  }
  .inner-hero__title {
    font-size: 2rem;
  }
}

/* Extra small mobile adjustments */
@media (max-width: 479px) {
  .hero-v2__trust {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .hero-v2__actions {
    flex-direction: column;
    width: 100%;
  }
  .hero-v2__actions .btn {
    width: 100%;
    justify-content: center;
  }
}
`;

// 1. Append fixes to style.css
let css = fs.readFileSync(cssPath, 'utf-8');
if (!css.includes('MOBILE & TABLET RESPONSIVENESS FIXES')) {
  css += '\n' + mobileFixes;
  fs.writeFileSync(cssPath, css, 'utf-8');
  console.log('Appended mobile fixes to style.css');
} else {
  console.log('Mobile fixes already appended to style.css');
}

// 2. Minify CSS
let minCss = css
  .replace(/\/\*.*?\*\//gs, '') // remove comments
  .replace(/\n/g, '') // remove newlines
  .replace(/\s*([{}:;,])\s*/g, '$1') // remove spaces around syntax
  .replace(/\s+/g, ' ') // collapse remaining spaces
  .trim();

// 3. Write minified CSS to both places
fs.writeFileSync(minCssPath, minCss, 'utf-8');
if (fs.existsSync(path.dirname(deployMinCssPath))) {
  fs.writeFileSync(deployMinCssPath, minCss, 'utf-8');
  console.log('Updated style.min.css in source and deploy folders.');
} else {
  console.log('Updated style.min.css in source. Deploy folder not found.');
}
