const fs = require('fs');

const templateSrc = fs.readFileSync('about.html', 'utf-8');

// Extract Header & Footer
const headerEnd = templateSrc.indexOf('<main id="main-content">') + '<main id="main-content">'.length;
const footerStart = templateSrc.indexOf('</main>');

const siteHeader = templateSrc.substring(0, headerEnd);
const siteFooter = templateSrc.substring(footerStart);

const createPage = (filename, title, content) => {
  let header = siteHeader.replace(/<title>.*?<\/title>/, `<title>${title} | Varad Hospital</title>`);
  
  const pageHtml = `${header}
    <section class="inner-hero" style="min-height: 250px;">
      <div class="inner-hero__bg">
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80" alt="${title}" loading="eager">
      </div>
      <div class="container inner-hero__container">
        <div class="inner-hero__glass">
          <h1 class="inner-hero__title" style="font-size: 2rem !important; margin-bottom: 0;">${title}</h1>
        </div>
      </div>
    </section>
    
    <section class="section">
      <div class="container" style="max-width: 800px; margin: 0 auto; line-height: 1.8;">
        ${content}
      </div>
    </section>
  ${siteFooter}`;

  fs.writeFileSync(filename, pageHtml, 'utf-8');
  console.log(`Populated ${filename}`);
};

const privacyContent = `
<div class="legal-content">
  <p><strong>Last Updated: May 2026</strong></p>
  
  <h2>1. Introduction</h2>
  <p>Welcome to Varad Hospital ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy informs you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tells you about your privacy rights and how the law protects you.</p>
  
  <h2>2. The Data We Collect About You</h2>
  <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
  <ul>
    <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title, and date of birth.</li>
    <li><strong>Contact Data</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
    <li><strong>Health Data</strong> includes information regarding your medical history, symptoms, or queries submitted through our contact forms (though we strongly advise against sharing sensitive medical records via plain website forms).</li>
    <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
  </ul>

  <h2>3. How We Use Your Personal Data</h2>
  <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
  <ul>
    <li>To respond to your inquiries and appointment requests.</li>
    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
    <li>Where we need to comply with a legal obligation under Indian Law (such as the Digital Personal Data Protection Act).</li>
  </ul>

  <h2>4. Data Security & Patient Confidentiality</h2>
  <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a strict duty of confidentiality.</p>

  <h2>5. Your Legal Rights</h2>
  <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of processing of your personal data.</p>

  <h2>6. Contact Us</h2>
  <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at:</p>
  <p>
    <strong>Varad Hospital</strong><br>
    Gat Number 16/12, Rustic Paradise Commercial Wing,<br>
    Dehu - Moshi Rd, Patilnagar, Chikhali,<br>
    Pimpri-Chinchwad, Maharashtra 411062<br>
    Email: varadhospital25@gmail.com
  </p>
</div>
`;

const termsContent = `
<div class="legal-content">
  <p><strong>Last Updated: May 2026</strong></p>

  <h2>1. Agreement to Terms</h2>
  <p>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Varad Hospital ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.</p>

  <h2>2. Website Purpose</h2>
  <p>This website is provided for informational purposes only. It is designed to provide general information about Varad Hospital, our facilities, our doctors, and the services we offer. It is not intended to be a platform for medical diagnosis or treatment.</p>

  <h2>3. Intellectual Property Rights</h2>
  <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws of India.</p>

  <h2>4. User Representations</h2>
  <p>By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms and Conditions; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose.</p>

  <h2>5. Third-Party Websites and Content</h2>
  <p>The Site may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties. Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site.</p>

  <h2>6. Governing Law</h2>
  <p>These Terms shall be governed by and defined following the laws of India. Varad Hospital and yourself irrevocably consent that the courts of Pune, Maharashtra, India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
</div>
`;

const disclaimerContent = `
<div class="legal-content">
  <p><strong>Last Updated: May 2026</strong></p>

  <h2>1. Not Medical Advice</h2>
  <p><strong>The information provided on this website does not, and is not intended to, constitute medical advice.</strong></p>
  <p>All information, content, and material available on this site is for general informational and educational purposes only. The information provided is not a substitute for professional medical advice, diagnosis, or treatment.</p>

  <h2>2. No Doctor-Patient Relationship</h2>
  <p>Your use of this website, including the submission of inquiries or appointment requests, does not create a doctor-patient relationship between you and Varad Hospital or any of its affiliated physicians. A formal doctor-patient relationship is only established after an in-person physical examination and consultation at our medical facility.</p>

  <h2>3. Medical Emergencies</h2>
  <p>If you think you may have a medical emergency, call your doctor, go to the nearest hospital emergency department, or call the emergency services immediately. Do not rely on electronic communications or this website for assistance in regard to your immediate, urgent medical needs. <strong>For local emergencies in Chikhali, please call our 24/7 Emergency Line: 9552218673.</strong></p>

  <h2>4. Accuracy of Information</h2>
  <p>While we strive to keep the information on this website accurate and up-to-date, medical knowledge is constantly evolving. Varad Hospital makes no representations, warranties, or guarantees, whether express or implied, that the content on our site is accurate, complete, or up-to-date. We assume no liability or responsibility for any errors or omissions in the content of the site.</p>

  <h2>5. External Links</h2>
  <p>This website may contain links to third-party websites. These links are provided solely as a convenience to you and not as an endorsement by Varad Hospital of the contents on such third-party websites. We are not responsible for the content of linked third-party sites and do not make any representations regarding their content or accuracy.</p>
</div>
`;

const notFoundContent = `
<div style="text-align: center; padding: 60px 0;">
  <h2 style="font-size: 6rem; color: var(--color-primary); margin-bottom: 20px; font-family: var(--font-heading); line-height: 1;">404</h2>
  <h3 style="font-size: 2rem; margin-bottom: 16px;">Page Not Found</h3>
  <p style="color: var(--color-text-secondary); max-width: 500px; margin: 0 auto 32px;">We're sorry, but the page you are looking for doesn't exist, has been moved, or is temporarily unavailable.</p>
  <a href="index.html" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    Return to Homepage
  </a>
</div>
`;

createPage('privacy-policy.html', 'Privacy Policy', privacyContent);
createPage('terms-conditions.html', 'Terms & Conditions', termsContent);
createPage('disclaimer.html', 'Medical Disclaimer', disclaimerContent);
createPage('404.html', 'Page Not Found', notFoundContent);
