'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* ──────────────────────────────────────────────
     1. Mobile Navigation
  ────────────────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileNav  = document.querySelector('.mobile-nav');
  const navOverlay = document.querySelector('.mobile-nav-overlay');

  const openNav = () => {
    hamburger?.classList.add('active');
    mobileNav?.classList.add('active');
    navOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    hamburger?.classList.remove('active');
    mobileNav?.classList.remove('active');
    navOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.contains('active') ? closeNav() : openNav();
  });

  navOverlay?.addEventListener('click', closeNav);

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ──────────────────────────────────────────────
     2. Sticky Header Enhancement
  ────────────────────────────────────────────── */
  const header = document.querySelector('.header');

  const handleScroll = () => {
    if (!header) return;
    header.classList.toggle('header-scrolled', window.scrollY > 50);

    /* 6. FAB visibility — show after 300px */
    fabs.forEach(fab => fab.classList.toggle('visible', window.scrollY > 300));
  };

  /* ──────────────────────────────────────────────
     3. Smooth Scroll (anchor links)
  ────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#' || id === '') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const headerH = header?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────────
     4. Scroll Reveal Animations
  ────────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('active'));
  } else if (reveals.length) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ──────────────────────────────────────────────
     5. Active Navigation Link
  ────────────────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === currentPath) link.classList.add('active');
  });

  /* ──────────────────────────────────────────────
     6. Floating Action Buttons (collected for scroll handler)
  ────────────────────────────────────────────── */
  const fabs = document.querySelectorAll('.fab');

  /* ──────────────────────────────────────────────
     7. Footer Year
  ────────────────────────────────────────────── */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ──────────────────────────────────────────────
     8. Stat Counter Animation
  ────────────────────────────────────────────── */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.classList.add('counted');
      }
    }
    requestAnimationFrame(step);
  }

  if (statNumbers.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));
  }

  /* ──────────────────────────────────────────────
     Attach scroll listener (passive for performance)
  ────────────────────────────────────────────── */
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load
});


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

