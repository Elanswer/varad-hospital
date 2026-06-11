const fs = require('fs');

const cssFile = 'd:/Varad Hospital/css/style.css';
const htmlFile = 'd:/Varad Hospital/index.html';

const reviews = [
  { name: 'Dhanshri Autade', time: 'a year ago', text: 'Varad hospital is very clean and the doctor is also very supportive he is a trit patient family member. Cost also very less' },
  { name: 'Prashant Jagtap', time: 'a year ago', text: 'Consulting, behaviour, staff and all other things are professional and excellent. You will fill like family doctor......' },
  { name: 'Shubhangi Sonawane', time: '3 years ago', text: "Well known hospital in this area. All facilities available. OPD, IPD, ICU, 24 hr medicine store, etc. Excellent Service and Doctor's and Staff is very Nice." },
  { name: 'Sayali Punde', time: '3 years ago', text: 'Excellent service very nice hospital, hospital staff and doctors are very helpful and very care with patient' },
  { name: 'Shu deep', time: '3 years ago', text: 'The treatment was great... Doctors and staff is very polite and helpful.' },
  { name: 'Rushikesh Argade', time: '3 years ago', text: 'Very good and claver Doctor, Dr Abhay Sir is very good behaviour and all staf are good' },
  { name: 'Sonali Jagtap', time: '3 years ago', text: 'Excellent services. We are very much satisfied with all the services' },
  { name: 'Mohammad Sanaulla Khan', time: 'a year ago', text: 'Excellent Service and staff is very good' },
  { name: 'Amar Thote', time: 'a year ago', text: 'One of the best hospital' },
  { name: 'Jyothi Hingmire', time: '3 years ago', text: 'Hospital khup Chan ahe v sarv staff pan 1 Ch no ahe' }
];

// Divide reviews into 3 columns
const col1 = [reviews[0], reviews[3], reviews[6], reviews[9]];
const col2 = [reviews[1], reviews[4], reviews[7], reviews[0]];
const col3 = [reviews[2], reviews[5], reviews[8], reviews[1]];

const generateColHtml = (arr) => {
  return arr.map(r => `
          <div class="review-card-v">
            <div class="review-stars-v">
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>
            <p class="review-text-v">"${r.text}"</p>
            <div class="review-footer-v">
              <div class="review-avatar-v">${r.name.charAt(0).toUpperCase()}</div>
              <div class="review-meta-v">
                <span class="review-name-v">${r.name}</span>
                <span class="review-role-v">Patient • ${r.time}</span>
              </div>
            </div>
          </div>
  `).join('');
};

const c1 = generateColHtml(col1) + generateColHtml(col1);
const c2 = generateColHtml(col2) + generateColHtml(col2);
const c3 = generateColHtml(col3) + generateColHtml(col3);

const sectionHtml = `
    <!-- ==========================================
         GOOGLE REVIEWS VERTICAL MARQUEE
         ========================================== -->
    <section class="section reviews-section-dark" aria-label="Patient Reviews">
      <div class="container text-center">
        <span class="section-label section-label-dark">Testimonials</span>
        <h2 class="section-title text-white">What Our Patients Say</h2>
        <p class="section-subtitle text-light">Read verified stories from the community we serve.</p>
        
        <div style="margin-top: 30px; margin-bottom: 50px;">
          <a href="https://maps.app.goo.gl/jq38KFqHYSRWnMC36" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-google-rate">
            <svg class="google-logo-btn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;margin-right:8px;">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Rate Us on Google
          </a>
        </div>
      </div>
      
      <div class="marquee-v-container">
        <!-- Col 1 (Up) -->
        <div class="marquee-v-col marquee-up">
          <div class="marquee-v-track track-up">
${c1}
          </div>
        </div>
        <!-- Col 2 (Down) -->
        <div class="marquee-v-col marquee-down">
          <div class="marquee-v-track track-down">
${c2}
          </div>
        </div>
        <!-- Col 3 (Up) -->
        <div class="marquee-v-col marquee-up">
          <div class="marquee-v-track track-up">
${c3}
          </div>
        </div>
      </div>
    </section>
`;

let htmlContent = fs.readFileSync(htmlFile, 'utf-8');

// We need to replace the existing horizontal review section.
const startMarker = 'GOOGLE REVIEWS MARQUEE';
const endMarker = '</section>';

const markerIndex = htmlContent.indexOf(startMarker);
if (markerIndex !== -1) {
  const startIndex = htmlContent.lastIndexOf('<!--', markerIndex);
  let endIndex = htmlContent.indexOf(endMarker, markerIndex);
  if (endIndex !== -1 && startIndex !== -1) {
    endIndex += endMarker.length;
    htmlContent = htmlContent.substring(0, startIndex) + sectionHtml + htmlContent.substring(endIndex);
    fs.writeFileSync(htmlFile, htmlContent, 'utf-8');
    console.log('Replaced HTML with vertical marquee.');
  }
} else {
  console.log('Horizontal marquee not found to replace.');
}

const cssCode = `
/* ==========================================================================
   GOOGLE REVIEWS VERTICAL MARQUEE (Dark Theme)
   ========================================================================== */
.reviews-section-dark {
  padding: 100px 0;
  background-color: var(--color-primary-dark); /* Midnight Navy */
  overflow: hidden;
}

.text-white { color: #ffffff !important; }
.text-light { color: rgba(255,255,255,0.7) !important; }
.section-label-dark {
  background-color: rgba(255,255,255,0.1);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.2);
}

.btn-google-rate {
  background-color: #ffffff;
  color: var(--color-primary-dark);
  border: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-google-rate:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  color: var(--color-primary-dark);
  background-color: #f8f9fa;
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
  /* Fade out top and bottom */
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
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
}

.track-up {
  animation: scroll-up 40s linear infinite;
}

.track-down {
  animation: scroll-down 40s linear infinite;
  /* Start the down animation slightly offset to look natural */
  transform: translateY(calc(-50% - 12px));
}

.marquee-v-container:hover .track-up,
.marquee-v-container:hover .track-down {
  animation-play-state: paused;
}

@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(calc(-50% - 12px)); }
}

@keyframes scroll-down {
  0% { transform: translateY(calc(-50% - 12px)); }
  100% { transform: translateY(0); }
}

.review-card-v {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.3s ease, background 0.3s ease;
  backdrop-filter: blur(10px);
}

.review-card-v:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-4px);
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
  color: rgba(255, 255, 255, 0.9);
  flex-grow: 1;
}

.review-footer-v {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.review-avatar-v {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
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
  color: #ffffff;
  font-size: 0.95rem;
}

.review-role-v {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Responsive */
@media (max-width: 1024px) {
  .marquee-v-col:nth-child(3) {
    display: none; /* Hide 3rd column on tablets */
  }
}
@media (max-width: 768px) {
  .marquee-v-col:nth-child(2) {
    display: none; /* Hide 2nd column on mobile */
  }
  .marquee-v-container {
    height: 450px;
  }
}
`;

let styleContent = fs.readFileSync(cssFile, 'utf-8');
if (!styleContent.includes('GOOGLE REVIEWS VERTICAL MARQUEE')) {
  fs.appendFileSync(cssFile, cssCode);
  console.log('Appended vertical reviews CSS to style.css');
}
