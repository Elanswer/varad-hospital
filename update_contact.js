const fs = require('fs');

// Read index.html to get CTA
const indexHtml = fs.readFileSync('index.html', 'utf-8');
const ctaStartIdx = indexHtml.indexOf('<!-- ==========================================\n         SECTION 9: PREMIUM CTA');
const ctaEndIdx = indexHtml.indexOf('</section>', ctaStartIdx) + 10;
const ctaContent = indexHtml.substring(ctaStartIdx, ctaEndIdx);

// Read contact.html to update it
const contactHtml = fs.readFileSync('contact.html', 'utf-8');

const contactSectionStart = contactHtml.indexOf('<!-- ==========================================\n         CONTACT INFO & MAP');
const contactSectionEnd = contactHtml.indexOf('</section>', contactSectionStart) + 10;

const newContactSection = `<!-- ==========================================
         CONTACT INFO
         ========================================== -->
    <section class="section" aria-label="Contact Information">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-label">Get In Touch</span>
          <h2 class="section-title">We Are Here To Help</h2>
          <p class="section-subtitle">Reach out to us for emergencies, appointments, or general inquiries.</p>
        </div>

        <div class="contact-info-grid">
          
          <!-- Emergency -->
          <div class="contact-card-v2">
            <div class="contact-card-v2__icon contact-card-v2__icon--emergency">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3>Emergency (24/7)</h3>
            <p>Immediate medical attention</p>
            <a href="tel:9552218673" class="text-emergency">9552218673</a>
          </div>

          <!-- Pathology -->
          <div class="contact-card-v2">
            <div class="contact-card-v2__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Pathology Laboratory</h3>
            <p>Home collection available</p>
            <a href="tel:9623812423">9623812423</a>
          </div>

          <!-- Email -->
          <div class="contact-card-v2">
            <div class="contact-card-v2__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <h3>Email Address</h3>
            <p>For general inquiries</p>
            <a href="mailto:varadhospital25@gmail.com">varadhospital25@gmail.com</a>
          </div>

          <!-- Address -->
          <div class="contact-card-v2" style="grid-column: 1 / -1; max-width: 800px; margin: 0 auto; width: 100%;">
            <div class="contact-card-v2__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3>Hospital Location</h3>
            <p>Gat Number 16/12, Rustic Paradise Commercial Wing, Dehu - Moshi Rd, Patilnagar, Chikhali, Pimpri-Chinchwad, Maharashtra 411062</p>
          </div>

        </div>
      </div>
    </section>

    <!-- ==========================================
         FULL-WIDTH MAP
         ========================================== -->
    <div class="contact-map-immersive">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.960416954316!2d73.812683!3d18.6659798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9db4587a8b3%3A0xeab5c5b2b2a60d62!2sVarad%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" aria-label="Varad Hospital Location on Google Maps"></iframe>
    </div>

    ${ctaContent}`;

const updatedHtml = contactHtml.replace(contactHtml.substring(contactSectionStart, contactSectionEnd), newContactSection);

fs.writeFileSync('contact.html', updatedHtml, 'utf-8');
console.log('contact.html updated successfully.');
