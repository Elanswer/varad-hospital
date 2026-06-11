const fs = require('fs');

const cssContent = `
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
.preloader-cross {
  width: 60px;
  height: 60px;
  background-color: var(--color-primary);
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>') center/contain no-repeat;
  -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>') center/contain no-repeat;
  animation: pulse 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
}

/* 2. Scroll-to-Top Button */
#scroll-to-top {
  position: fixed;
  bottom: 24px;
  right: 90px; /* Offset from FABs */
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
    bottom: 85px; /* Above the mobile FABs */
    right: 20px;
    width: 40px;
    height: 40px;
  }
}
`;

const jsContent = `
  /* ==========================================
     UX POLISH: Preloader & Scroll-to-Top
     ========================================== */
  
  // Preloader Logic
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      // Add slight delay to ensure smooth transition
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 500); // Clean up DOM
      }, 300);
    });
  }

  // Scroll-to-Top Logic
  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
`;

const preloaderHTML = `
  <!-- Preloader -->
  <div id="preloader" aria-label="Page is loading">
    <div class="preloader-cross"></div>
  </div>
`;

const scrollTopHTML = `
  <!-- Scroll to Top -->
  <button id="scroll-to-top" aria-label="Scroll back to top">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  </button>
`;

// 1. Update CSS
fs.appendFileSync('css/style.css', `\n${cssContent}\n`);
console.log('Injected UX Polish CSS');

// 2. Update JS
fs.appendFileSync('js/main.js', `\n${jsContent}\n`);
console.log('Injected UX Polish JS');

// 3. Inject HTML into all pages
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Inject Preloader immediately after <body>
    if (!content.includes('id="preloader"')) {
      content = content.replace('<body>', `<body>\n${preloaderHTML}`);
      modified = true;
    }

    // Inject Scroll-to-Top right before the Cal embed script or </body>
    if (!content.includes('id="scroll-to-top"')) {
      if (content.includes('<!-- Cal element-click embed code begins -->')) {
        content = content.replace('<!-- Cal element-click embed code begins -->', `${scrollTopHTML}\n  <!-- Cal element-click embed code begins -->`);
      } else {
        content = content.replace('</body>', `${scrollTopHTML}\n</body>`);
      }
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Injected UX HTML into ${file}`);
    }
  }
});
