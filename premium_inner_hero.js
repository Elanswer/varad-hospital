const fs = require('fs');
const cssFile = 'css/style.css';

if (fs.existsSync(cssFile)) {
  let content = fs.readFileSync(cssFile, 'utf-8');
  
  content += `
/* ==========================================================================
   PREMIUM INNER HERO OVERRIDES
   ========================================================================== */

/* The Inner Hero Section */
.inner-hero {
  min-height: 550px; /* Taller, more majestic */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Deep Midnight Overlay over the image */
.inner-hero__bg::after {
  background: linear-gradient(to bottom, rgba(10, 37, 64, 0.75) 0%, rgba(10, 37, 64, 0.95) 100%) !important;
}

/* Ensure the image scale animation is buttery smooth */
.inner-hero:hover .inner-hero__bg img {
  transform: scale(1.08);
  transition: transform 8s cubic-bezier(0.16, 1, 0.3, 1);
}

.inner-hero__bg img {
  transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Remove the "Glass Box" look and let text float majestically */
.inner-hero__glass {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: none !important;
  box-shadow: none !important;
  max-width: 800px !important;
  margin: 0 auto;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Typography Overrides for Dark Background */
.inner-hero__title {
  color: var(--color-bg) !important; /* Alabaster */
  font-size: clamp(3rem, 6vw, 4.5rem) !important;
  margin-bottom: 30px !important;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* The delicate badge */
.inner-hero__badge {
  background: rgba(46, 92, 85, 0.2) !important; /* Sage wash */
  color: var(--color-bg) !important; /* Alabaster */
  border: 1px solid rgba(253, 251, 247, 0.3);
  padding: 8px 18px !important;
  letter-spacing: 0.15em !important;
}

/* Breadcrumbs */
.breadcrumb {
  justify-content: center !important;
}
.breadcrumb li, .breadcrumb a {
  color: rgba(253, 251, 247, 0.7) !important;
  font-size: 0.95rem;
}
.breadcrumb a:hover {
  color: var(--color-bg) !important;
}
.breadcrumb li + li::before {
  color: rgba(253, 251, 247, 0.4) !important;
}
`;
  
  fs.writeFileSync(cssFile, content, 'utf-8');
  console.log('Premium Inner Hero overrides appended to style.css');
}
