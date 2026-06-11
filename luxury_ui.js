const fs = require('fs');

// 1. Process HTML Files (Fonts and About Section)
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const collageHTML = `
          <div class="about-image-collage reveal">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" alt="Hospital interior" class="img-back" loading="lazy">
            <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=600&q=80" alt="Doctor consulting patient" class="img-front" loading="lazy">
          </div>`;

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Update Fonts
    content = content.replace(/family=Inter:wght[^&]*&family=Poppins:wght[^"]*/g, "family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800");

    // Replace About Image with Collage in index.html and about.html
    if (file === 'index.html' || file === 'about.html') {
      const regex = /<div class="about-image reveal">[\s\S]*?<\/div>/i;
      content = content.replace(regex, collageHTML.trim());
    }

    fs.writeFileSync(file, content, 'utf-8');
  }
});
console.log('HTML files updated with new fonts and image collages.');

// 2. Process CSS
const cssFile = 'css/style.css';
if (fs.existsSync(cssFile)) {
  let cssContent = fs.readFileSync(cssFile, 'utf-8');
  
  // Update Font Vars
  cssContent = cssContent.replace(/--font-heading: 'Poppins', sans-serif;/g, "--font-heading: 'Playfair Display', serif;");
  cssContent = cssContent.replace(/--font-body: 'Inter', sans-serif;/g, "--font-body: 'Plus Jakarta Sans', sans-serif;");

  // Inject Luxury CSS
  const luxuryCSS = `
/* ==========================================================================
   LUXURY UI OVERHAUL
   ========================================================================== */

/* 1. Grain Texture Overlay */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 99998; /* Below cursor */
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.04; /* Very subtle */
}

/* 2. Glassmorphism & Mesh Gradients */
.hero-v2__content {
  background: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 24px 48px rgba(0,0,0,0.06);
  border-radius: 24px;
  padding: 48px;
}

/* 3. Asymmetrical Grids (Staggered) */
@media (min-width: 992px) {
  .dept-grid {
    align-items: flex-start;
  }
  .dept-grid .dept-card:nth-child(even),
  .doc-grid .premium-doc-card:nth-child(even),
  .services-grid .service-card:nth-child(even) {
    transform: translateY(40px);
    transition: transform 0.4s ease;
  }
  .dept-grid .dept-card:nth-child(even):hover,
  .doc-grid .premium-doc-card:nth-child(even):hover,
  .services-grid .service-card:nth-child(even):hover {
    transform: translateY(30px); /* Slight lift on hover */
  }
}

/* 4. Overlapping Image Collage */
.about-image-collage {
  position: relative;
  height: 550px;
  width: 100%;
}
.about-image-collage .img-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  height: 420px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  transition: transform 0.5s ease;
}
.about-image-collage .img-front {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60%;
  height: 380px;
  object-fit: cover;
  border-radius: 16px;
  border: 10px solid var(--color-white);
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  transition: transform 0.5s ease;
}
.about-image-collage:hover .img-back {
  transform: scale(1.02) translate(-10px, -10px);
}
.about-image-collage:hover .img-front {
  transform: scale(1.02) translate(10px, 10px);
}

/* Enhancing Headings */
h1, h2, h3, .section-title {
  letter-spacing: -0.02em;
  font-weight: 600;
}
`;

  // Append luxury CSS
  fs.writeFileSync(cssFile, cssContent + '\n' + luxuryCSS, 'utf-8');
  console.log('CSS updated with luxury aesthetics.');
}
