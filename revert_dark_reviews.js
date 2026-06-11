const fs = require('fs');

const htmlFile = 'd:/Varad Hospital/index.html';
const cssFile = 'd:/Varad Hospital/css/style.css';

// 1. Update HTML
let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
htmlContent = htmlContent.replace(/reviews-section-dark/g, 'reviews-section-light');
htmlContent = htmlContent.replace(/section-label-dark/g, '');
htmlContent = htmlContent.replace(/text-white/g, '');
htmlContent = htmlContent.replace(/text-light/g, '');
fs.writeFileSync(htmlFile, htmlContent, 'utf-8');
console.log('Updated HTML classes to light mode.');

// 2. Update CSS
let cssContent = fs.readFileSync(cssFile, 'utf-8');
const cssStartMarker = '/* ==========================================================================\n   GOOGLE REVIEWS VERTICAL MARQUEE';
const cssStartIndex = cssContent.indexOf(cssStartMarker);

if (cssStartIndex !== -1) {
  const newCss = `/* ==========================================================================
   GOOGLE REVIEWS VERTICAL MARQUEE (Light Theme)
   ========================================================================== */
.reviews-section-light {
  padding: 100px 0;
  background-color: var(--color-bg); /* Alabaster */
  overflow: hidden;
}

.btn-google-rate {
  background-color: #ffffff;
  color: var(--color-text);
  border: 1px solid rgba(10, 37, 64, 0.1);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-google-rate:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(10,37,64,0.08);
  color: var(--color-primary);
}

.marquee-v-container {
  display: flex;
  justify-content: center;
  gap: 24px;
  height: 600px;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  /* Fade out top and bottom for smooth entry/exit */
  mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
  padding: 0 20px;
}

.marquee-v-col {
  flex: 1;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.marquee-v-track {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  will-change: transform;
  transform: translateZ(0);
}

.track-up {
  animation: scroll-up 45s linear infinite;
}

.track-down {
  animation: scroll-down 45s linear infinite;
  transform: translateY(calc(-50% - 12px)) translateZ(0);
}

.marquee-v-container:hover .track-up,
.marquee-v-container:hover .track-down {
  animation-play-state: paused;
}

@keyframes scroll-up {
  0% { transform: translateY(0) translateZ(0); }
  100% { transform: translateY(calc(-50% - 12px)) translateZ(0); }
}

@keyframes scroll-down {
  0% { transform: translateY(calc(-50% - 12px)) translateZ(0); }
  100% { transform: translateY(0) translateZ(0); }
}

.review-card-v {
  background: var(--color-white);
  border: 1px solid rgba(10, 37, 64, 0.06);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 30px rgba(10, 37, 64, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.review-card-v:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(10, 37, 64, 0.08);
}

.review-stars-v {
  display: flex;
  gap: 4px;
  color: #FBBC05;
}

.review-stars-v svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.review-text-v {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  flex-grow: 1;
}

.review-footer-v {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(10, 37, 64, 0.05);
}

.review-avatar-v {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(44, 183, 165, 0.15);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-family: var(--font-heading);
  font-size: 1.2rem;
}

.review-meta-v {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.review-name-v {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.95rem;
}

.review-role-v {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

/* Responsive */
@media (max-width: 1024px) {
  .marquee-v-col:nth-child(3) { display: none; }
}
@media (max-width: 768px) {
  .marquee-v-col:nth-child(2) { display: none; }
  .marquee-v-container { height: 450px; }
}
`;

  cssContent = cssContent.substring(0, cssStartIndex) + newCss;
  fs.writeFileSync(cssFile, cssContent, 'utf-8');
  console.log('Updated CSS to light mode and improved smoothness.');
} else {
  console.log('CSS block not found.');
}
