const fs = require('fs');

// 1. Fix style.css duplicates and set preloader to fullscreen
const cssFile = 'css/style.css';
if (fs.existsSync(cssFile)) {
  let cssContent = fs.readFileSync(cssFile, 'utf-8');
  
  // Find the start of the final UX polish section
  const uxPolishStart = cssContent.indexOf('/* ==========================================================================');
  // Wait, there are multiple. Let's find the specific one for UX Polish
  const uxPolishSection = cssContent.indexOf('FINAL UX POLISH (Preloader, Aura, Scroll-To-Top, Focus)');
  
  if (uxPolishSection !== -1) {
    // Find the start of the comment block for this section
    const startIdx = cssContent.lastIndexOf('/* ===', uxPolishSection);
    
    // Keep everything before this section intact
    const beforeSection = cssContent.substring(0, startIdx);
    
    // Now append the clean UX polish CSS
    const cleanCSS = `
/* ==========================================================================
   FINAL UX POLISH (Preloader, Aura, Scroll-To-Top, Focus)
   ========================================================================== */

/* 1. Preloader */
#preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
}
#preloader.loaded {
  opacity: 0;
  visibility: hidden;
}
.preloader-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  pointer-events: none;
}

/* 2. Scroll-to-Top Button */
#scroll-to-top {
  position: fixed;
  bottom: 24px;
  right: 90px;
  width: 48px;
  height: 48px;
  background: var(--color-white);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all var(--transition-fast);
}
#scroll-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
#scroll-to-top:hover {
  background: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(29, 111, 184, 0.3);
}

/* 3. Aura Hover Effects */
.btn-primary:hover,
.cta-pro-card__body .btn-primary:hover {
  box-shadow: 0 8px 25px rgba(29, 111, 184, 0.4);
}
.btn-whatsapp:hover,
.fab-whatsapp:hover {
  box-shadow: 0 8px 25px rgba(31, 161, 91, 0.4);
}
.premium-doc-card:hover {
  box-shadow: 0 15px 35px rgba(29, 111, 184, 0.15);
  transform: translateY(-5px);
}
.quick-card:hover {
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

/* 4. Accessibility Focus Rings */
:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 0;
}

@media (max-width: 768px) {
  #scroll-to-top {
    bottom: 85px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}

/* ==========================================================================
   ULTRA-PREMIUM UI UPGRADES (Cursor, Parallax, Reveal)
   ========================================================================== */

/* 1. Custom Cursor */
@media (min-width: 1024px) {
  body, a, button, .fab, .nav-link, .btn {
    cursor: none !important;
  }
}

.custom-cursor-dot,
.custom-cursor-aura {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  display: none;
}

@media (min-width: 1024px) {
  .custom-cursor-dot,
  .custom-cursor-aura {
    display: block;
  }
}

.custom-cursor-dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-primary);
  transition: width 0.2s, height 0.2s, background-color 0.2s;
}

.custom-cursor-aura {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(29, 111, 184, 0.4);
  background-color: rgba(29, 111, 184, 0.05);
  transition: width 0.3s ease-out, height 0.3s ease-out, background-color 0.3s ease-out, border-color 0.3s ease-out;
}

.custom-cursor-dot.hovered {
  width: 0;
  height: 0;
}
.custom-cursor-aura.hovered {
  width: 60px;
  height: 60px;
  background-color: rgba(29, 111, 184, 0.15);
  border-color: var(--color-primary);
  backdrop-filter: blur(2px);
}

.magnetic-btn {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 2. Parallax Setup */
.inner-hero__bg, .hero-v2__bg, .cta-pro__bg {
  overflow: hidden;
}
.inner-hero__bg img, .hero-v2__bg img, .cta-pro__bg img {
  will-change: transform;
  transform-origin: center center;
  scale: 1.15;
}

/* 3. Cinematic Text Reveal */
.cinematic-reveal {
  overflow: hidden;
  display: inline-block;
  vertical-align: top;
}
.cinematic-reveal-text {
  display: inline-block;
  transform: translateY(110%);
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}
.cinematic-reveal.is-revealed .cinematic-reveal-text {
  transform: translateY(0);
}
`;
    fs.writeFileSync(cssFile, beforeSection + cleanCSS, 'utf-8');
    console.log('Cleaned up style.css duplicates and set preloader to fullscreen.');
  }
}

// 2. Add video playback speed up logic to main.js
const jsFile = 'js/main.js';
if (fs.existsSync(jsFile)) {
  let jsContent = fs.readFileSync(jsFile, 'utf-8');
  
  if (!jsContent.includes('playbackRate = 2.0')) {
    // Insert just before the window.addEventListener('load') for the preloader
    const injectionPoint = "const preloader = document.getElementById('preloader');";
    if (jsContent.includes(injectionPoint)) {
      jsContent = jsContent.replace(injectionPoint, `
  // Speed up preloader video
  const preloaderVideos = document.querySelectorAll('.preloader-video');
  preloaderVideos.forEach(v => v.playbackRate = 2.0); // 2x speed
  
  const preloader = document.getElementById('preloader');`);
      fs.writeFileSync(jsFile, jsContent, 'utf-8');
      console.log('Added 2x speed to preloader video in main.js');
    }
  }
}
