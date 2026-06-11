const fs = require('fs');

const cssFile = 'css/style.css';
if (fs.existsSync(cssFile)) {
  let css = fs.readFileSync(cssFile, 'utf-8');

  // 1. UPDATE COLOR TOKENS
  // Midnight Navy & Muted Sage
  css = css.replace(/--color-primary:\s*#[0-9a-fA-F]+;/g, '--color-primary:        #0A2540;');
  css = css.replace(/--color-primary-dark:\s*#[0-9a-fA-F]+;/g, '--color-primary-dark:   #051120;');
  css = css.replace(/--color-primary-light:\s*#[0-9a-fA-F]+;/g, '--color-primary-light:  #F0F3F5;');
  
  css = css.replace(/--color-secondary:\s*#[0-9a-fA-F]+;/g, '--color-secondary:      #2E5C55;');
  css = css.replace(/--color-secondary-dark:\s*#[0-9a-fA-F]+;/g, '--color-secondary-dark: #1E403B;');
  css = css.replace(/--color-accent:\s*#[0-9a-fA-F]+;/g, '--color-accent:         #1C886F;');
  
  css = css.replace(/--color-bg:\s*#[0-9a-fA-F]+;/g, '--color-bg:             #FDFBF7;');
  css = css.replace(/--color-border:\s*#[0-9a-fA-F]+;/g, '--color-border:         #E5E3DB;');
  css = css.replace(/--color-highlight:\s*#[0-9a-fA-F]+;/g, '--color-highlight:      #F4EFEB;');
  css = css.replace(/--color-text:\s*#[0-9a-fA-F]+;/g, '--color-text:           #151A20;');
  css = css.replace(/--color-text-secondary:\s*#[0-9a-fA-F]+;/g, '--color-text-secondary: #4A5560;');

  // 2. UPDATE SHADOW AND RADII TOKENS (Softer shadows, sharper corners)
  css = css.replace(/--shadow-sm:\s*0 1px 3px rgba\(0, 0, 0, 0\.08\);/g, '--shadow-sm: 0 4px 20px rgba(10, 37, 64, 0.04);');
  css = css.replace(/--shadow-md:\s*0 4px 12px rgba\(0, 0, 0, 0\.1\);/g, '--shadow-md: 0 10px 30px rgba(10, 37, 64, 0.06);');
  css = css.replace(/--shadow-lg:\s*0 8px 24px rgba\(0, 0, 0, 0\.12\);/g, '--shadow-lg: 0 20px 40px rgba(10, 37, 64, 0.08);');
  
  css = css.replace(/--radius-md:\s*12px;/g, '--radius-md:   8px;'); // Sharper
  css = css.replace(/--radius-lg:\s*16px;/g, '--radius-lg:   12px;'); // Sharper

  // 3. FIX GOOGLE FONTS IMPORT
  css = css.replace(
    /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^\)]+'\);/g,
    `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');`
  );
  
  // Also ensure font variables are correct
  css = css.replace(/--font-heading: 'Poppins', sans-serif;/g, "--font-heading: 'Playfair Display', serif;");
  css = css.replace(/--font-body:    'Inter', sans-serif;/g, "--font-body:    'Plus Jakarta Sans', sans-serif;");

  // 4. APPEND PREMIUM LAYOUT, TYPOGRAPHY & MICRO-INTERACTIONS
  const premiumCSS = `
/* ==========================================================================
   BOUTIQUE CLINIC: Premium Typography, Layout & Micro-Interactions
   ========================================================================== */

/* 1. Elegant Typography */
body {
  line-height: 1.7; /* Much more readable and luxurious */
  color: var(--color-text);
}

.section-label, .tag, .service-subtitle {
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.85rem;
}

h1, .hero__title, .hero-v2__title {
  font-size: clamp(3rem, 5vw, 4.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}

h2, .section-title {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* 2. Expansive Layout Spacing */
.section {
  padding: 120px 0; /* Huge breathing room */
}
@media (min-width: 1024px) {
  .section { padding: 160px 0; }
}

/* 3. Delicate Card Styles */
.card, .service-card, .dept-card, .doctor-card, .premium-doc-card {
  border: 1px solid rgba(10, 37, 64, 0.05); /* Extremely delicate border */
  box-shadow: none; /* Removed heavy shadows by default */
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover, .service-card:hover, .dept-card:hover, .doctor-card:hover, .premium-doc-card:hover {
  box-shadow: var(--shadow-lg); /* Soft bloom on hover */
  transform: translateY(-5px);
}

/* 4. Silky Micro-Interactions (CSS Only) */
/* Smooth Image Scale on Hover (used in About/Hero cards if applicable) */
.about-image-collage .img-back,
.about-image-collage .img-front {
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.about-image-collage:hover .img-back {
  transform: scale(1.03) translate(-10px, -10px);
}
.about-image-collage:hover .img-front {
  transform: scale(1.05) translate(10px, 10px);
}

/* Elegant Underline Reveal for text links */
.nav-link, .footer-link {
  position: relative;
  text-decoration: none;
}
.nav-link::after, .footer-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover::after, .footer-link:hover::after {
  width: 100%;
}

/* 5. Custom Boutique Gradient Overrides */
.hero-v2__content {
  background: rgba(253, 251, 247, 0.85) !important; /* Alabaster frost */
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(10, 37, 64, 0.08);
}
`;

  fs.writeFileSync(cssFile, css + '\n' + premiumCSS, 'utf-8');
  console.log('Applied Boutique UI styles to style.css');
}
