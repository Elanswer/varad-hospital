const fs = require('fs');

const cssContent = `
/* ==========================================================================
   ULTRA-PREMIUM UI UPGRADES (Cursor, Parallax, Reveal)
   ========================================================================== */

/* 1. Custom Cursor */
@media (min-width: 1024px) {
  /* Hide default cursor on desktop */
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
  display: none; /* Hidden on mobile */
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

/* Cursor Hover States */
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

/* Magnetic Buttons container fix */
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
  scale: 1.15; /* Give room to move without showing edges */
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

const jsContent = `
/* ==========================================================================
   ULTRA-PREMIUM UI: Custom Cursor, Parallax, Magnetic Buttons, Text Reveal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Only run advanced interactions on desktop
  if (window.innerWidth >= 1024) {
    
    // --- 1. Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorAura = document.getElementById('cursor-aura');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;
    
    // Track mouse
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot moves instantly
      cursorDot.style.transform = \`translate3d(\${mouseX}px, \${mouseY}px, 0) translate(-50%, -50%)\`;
    });

    // Smooth aura trailing effect
    function animateAura() {
      // Ease aura towards mouse (lerp)
      auraX += (mouseX - auraX) * 0.15;
      auraY += (mouseY - auraY) * 0.15;
      cursorAura.style.transform = \`translate3d(\${auraX}px, \${auraY}px, 0) translate(-50%, -50%)\`;
      requestAnimationFrame(animateAura);
    }
    animateAura();

    // Hover states for links and buttons
    const interactables = document.querySelectorAll('a, button, .fab, .btn, .doc-card, .premium-doc-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hovered');
        cursorAura.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hovered');
        cursorAura.classList.remove('hovered');
      });
    });

    // --- 2. Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.fab, .btn-primary, .btn-emergency');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Move button slightly towards mouse
        btn.style.transform = \`translate(\${distanceX * 0.3}px, \${distanceY * 0.3}px)\`;
      });
      
      btn.addEventListener('mouseleave', () => {
        // Snap back to original position
        btn.style.transform = 'translate(0px, 0px)';
      });
    });

    // --- 3. Parallax Scrolling ---
    const parallaxImages = document.querySelectorAll('.inner-hero__bg img, .hero-v2__bg img, .cta-pro__bg img');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxImages.forEach(img => {
        // Move image down at 30% of scroll speed to create depth
        img.style.transform = \`translate3d(0, \${scrollY * 0.3}px, 0) scale(1.15)\`;
      });
    }, { passive: true });

  } // End Desktop Only

  // --- 4. Cinematic Text Reveal (All Devices) ---
  const revealElements = document.querySelectorAll('.section-title');
  
  // Wrap text in cinematic spans
  revealElements.forEach(el => {
    // Skip if already processed
    if (el.classList.contains('cinematic-processed')) return;
    
    const text = el.innerText;
    el.innerHTML = ''; // Clear original
    el.classList.add('cinematic-processed');
    
    // We'll reveal word by word for massive impact
    const words = text.split(' ');
    words.forEach((word, index) => {
      const outerSpan = document.createElement('span');
      outerSpan.className = 'cinematic-reveal';
      outerSpan.innerHTML = \`<span class="cinematic-reveal-text" style="transition-delay: \${index * 0.1}s">\${word}&nbsp;</span>\`;
      el.appendChild(outerSpan);
    });
  });

  // Observe and trigger reveals
  const cinematicObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const reveals = entry.target.querySelectorAll('.cinematic-reveal');
        reveals.forEach(r => r.classList.add('is-revealed'));
        cinematicObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

  revealElements.forEach(el => cinematicObserver.observe(el));
});
`;

const cursorHTML = `
  <!-- Custom Cursor -->
  <div class="custom-cursor-dot" id="cursor-dot"></div>
  <div class="custom-cursor-aura" id="cursor-aura"></div>
`;

// 1. Update CSS
fs.appendFileSync('css/style.css', `\n${cssContent}\n`);
console.log('Injected Premium UI CSS');

// 2. Update JS
fs.appendFileSync('js/main.js', `\n${jsContent}\n`);
console.log('Injected Premium UI JS');

// 3. Inject HTML into all pages
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Inject Cursor immediately before </body>
    if (!content.includes('id="cursor-dot"')) {
      if (content.includes('<!-- Cal element-click embed code begins -->')) {
        content = content.replace('<!-- Cal element-click embed code begins -->', `${cursorHTML}\n  <!-- Cal element-click embed code begins -->`);
      } else {
        content = content.replace('</body>', `${cursorHTML}\n</body>`);
      }
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Injected Cursor HTML into ${file}`);
    }
  }
});
