const fs = require('fs');
const path = require('path');

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

const generateCards = () => {
  return reviews.map(r => `
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">${r.name.charAt(0).toUpperCase()}</div>
              <div class="review-meta">
                <span class="review-name">${r.name}</span>
                <span class="review-time">${r.time}</span>
              </div>
            </div>
            <div class="review-stars">
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>
            <p class="review-text">"${r.text}"</p>
            <div class="review-footer">
              <svg class="google-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span style="font-size: 0.85rem; font-weight: 500; color: #64748B;">Posted on Google</span>
            </div>
          </div>
  `).join('');
};

const cardsHtml = generateCards() + generateCards(); // Duplicate for seamless loop

const sectionHtml = `
    <!-- ==========================================
         GOOGLE REVIEWS MARQUEE
         ========================================== -->
    <section class="section reviews-section" aria-label="Patient Reviews">
      <div class="container text-center">
        <span class="section-label">Wall of Love</span>
        <h2 class="section-title">What Our Patients Say</h2>
        <p class="section-subtitle" style="margin-bottom: 40px;">Read verified stories from the community we serve.</p>
      </div>
      
      <div class="marquee-container">
        <div class="marquee-track">
${cardsHtml}
        </div>
      </div>
    </section>
`;

// Insert into index.html before <footer
let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
if (!htmlContent.includes('reviews-section')) {
  htmlContent = htmlContent.replace('<!-- ============================================', sectionHtml + '\n  <!-- ============================================');
  fs.writeFileSync(htmlFile, htmlContent, 'utf-8');
  console.log('Inserted reviews section into index.html');
}

// Append CSS
const cssCode = `
/* ==========================================================================
   GOOGLE REVIEWS MARQUEE (Elanswer Style)
   ========================================================================== */
.reviews-section {
  padding: 80px 0 100px;
  background-color: var(--color-bg);
  overflow: hidden;
}

.marquee-container {
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;
  /* Fade edges for elanswer aesthetic */
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-track {
  display: flex;
  gap: 24px;
  padding: 20px 0;
  width: max-content;
  animation: marquee 50s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 12px)); }
}

.review-card {
  width: 380px;
  flex-shrink: 0;
  background: var(--color-white);
  border: 1px solid rgba(10, 37, 64, 0.06);
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 30px rgba(10, 37, 64, 0.03);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.review-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(10, 37, 64, 0.08);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.review-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(44, 183, 165, 0.15); /* Sage wash */
  color: var(--color-accent); /* Sage */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-family: var(--font-heading);
  font-size: 1.4rem;
}

.review-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.review-name {
  font-weight: 600;
  color: var(--color-text);
  font-size: 1.05rem;
  letter-spacing: -0.01em;
}

.review-time {
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.review-stars {
  display: flex;
  gap: 3px;
  color: #FBBC05;
}

.review-stars svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.review-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  flex-grow: 1;
}

.review-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 20px;
  border-top: 1px solid rgba(10, 37, 64, 0.06);
}

.google-logo {
  width: 20px;
  height: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .review-card {
    width: 300px;
    padding: 24px;
  }
}
`;

let styleContent = fs.readFileSync(cssFile, 'utf-8');
if (!styleContent.includes('GOOGLE REVIEWS MARQUEE')) {
  fs.appendFileSync(cssFile, cssCode);
  console.log('Appended reviews CSS to style.css');
}
