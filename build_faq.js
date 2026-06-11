const fs = require('fs');

const htmlFile = 'd:/Varad Hospital/index.html';
const cssFile = 'd:/Varad Hospital/css/style.css';
const jsFile = 'd:/Varad Hospital/js/faq.js';

// 1. FAQ HTML
const faqHtml = `
    <!-- ==========================================
         FAQ SECTION
         ========================================== -->
    <section class="section faq-section" aria-label="Frequently Asked Questions" id="faq">
      <div class="container">
        <div class="text-center">
          <span class="section-label">Patient Guide</span>
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="section-subtitle" style="margin-bottom: 40px;">Find answers to common questions about our services and policies.</p>
        </div>

        <div class="faq-accordion">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              What are the hospital visiting hours?
              <span class="faq-icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-answer">
              <p>For General Wards, visiting hours are from 10:00 AM to 1:00 PM and 5:00 PM to 8:00 PM. For ICU patients, visiting is strictly restricted to one family member at a time during designated hours to ensure patient safety and infection control.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              Do you accept cashless health insurance / TPA?
              <span class="faq-icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-answer">
              <p>Yes, we are empaneled with all major Health Insurance companies and TPAs to provide cashless hospitalization facilities. Please bring your insurance ID card, Aadhar card, and policy documents at the time of admission.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              How can I book an appointment with a specialist?
              <span class="faq-icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-answer">
              <p>You can easily book an appointment by clicking the "Book Appointment" button on our website, calling our reception directly, or walking into the OPD during regular consulting hours (9 AM - 3 PM & 5 PM - 10 PM).</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              Are emergency services available 24/7?
              <span class="faq-icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-answer">
              <p>Yes! Our emergency department, trauma care, and intensive care units (ICU) operate 24 hours a day, 7 days a week, supported by dedicated medical officers, expert specialists, and a fully equipped 24/7 pharmacy and pathology lab.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
const insertTarget = '    </section>\n\n\n  </main>';

if (htmlContent.includes('FAQ SECTION')) {
  console.log('FAQ already exists.');
} else {
  htmlContent = htmlContent.replace(insertTarget, '    </section>\n' + faqHtml + '\n  </main>');
  
  // Inject script at bottom
  htmlContent = htmlContent.replace('</body>', '  <script src="js/faq.js"></script>\n</body>');
  fs.writeFileSync(htmlFile, htmlContent, 'utf-8');
  console.log('Injected FAQ into index.html');
}

// 2. FAQ CSS
const cssCode = `
/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
.faq-section {
  padding: 100px 0;
  background-color: var(--color-white);
}

.faq-accordion {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  border: 1px solid rgba(10, 37, 64, 0.1);
  border-radius: 12px;
  background: var(--color-white);
  overflow: hidden;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.faq-item.active {
  box-shadow: 0 10px 30px rgba(10, 37, 64, 0.05);
  border-color: rgba(10, 37, 64, 0.15);
}

.faq-question {
  width: 100%;
  text-align: left;
  padding: 24px;
  background: transparent;
  border: none;
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease;
}

.faq-question:hover {
  color: var(--color-primary);
}

.faq-icon {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color-primary);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  line-height: 1;
}

.faq-item.active .faq-icon {
  transform: rotate(45deg); /* Turns '+' into 'x' */
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s ease, opacity 0.4s ease;
  opacity: 0;
  padding: 0 24px;
}

.faq-item.active .faq-answer {
  padding-bottom: 24px;
  opacity: 1;
}

.faq-answer p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.7;
}
`;

let styleContent = fs.readFileSync(cssFile, 'utf-8');
if (!styleContent.includes('FAQ ACCORDION')) {
  fs.appendFileSync(cssFile, cssCode);
  console.log('Appended FAQ CSS to style.css');
}

// 3. FAQ JS
const jsCode = `
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other open items (optional, but good UX)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      }
    });
  });
});
`;

fs.writeFileSync(jsFile, jsCode, 'utf-8');
console.log('Created faq.js');
