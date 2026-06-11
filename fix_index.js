const fs = require('fs');

const htmlFile = 'd:/Varad Hospital/index.html';

const faqHtml = `
    <!-- ==========================================
         FAQ SECTION
         ========================================== -->
    <section class="section faq-section" aria-label="Frequently Asked Questions" id="faq" style="background-color: var(--color-white); padding: 100px 0;">
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

  </main>

  <!-- ============================================
       FOOTER
       ============================================ -->
  <footer class="footer" role="contentinfo">`;

let htmlContent = fs.readFileSync(htmlFile, 'utf-8');

// The broken state currently has:
//     </section>
//     <div class="container footer-grid">
// We need to replace that exact junction.
htmlContent = htmlContent.replace('    </section>\n    <div class="container footer-grid">', '    </section>\n' + faqHtml + '\n    <div class="container footer-grid">');

// Also handle the case where it might be \r\n
htmlContent = htmlContent.replace('    </section>\r\n    <div class="container footer-grid">', '    </section>\r\n' + faqHtml + '\r\n    <div class="container footer-grid">');


fs.writeFileSync(htmlFile, htmlContent, 'utf-8');
console.log('Repaired index.html and injected FAQ successfully.');
