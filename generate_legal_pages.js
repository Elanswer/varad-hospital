const fs = require('fs');

const templateSrc = fs.readFileSync('about.html', 'utf-8');

// Extract Header & Footer
const headerEnd = templateSrc.indexOf('<main id="main-content">') + '<main id="main-content">'.length;
const footerStart = templateSrc.indexOf('</main>');

const siteHeader = templateSrc.substring(0, headerEnd);
const siteFooter = templateSrc.substring(footerStart);

const createPage = (filename, title, content) => {
  // Fix title tag
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
  console.log(`Generated ${filename}`);
};

const privacyContent = `
<h2>1. Introduction</h2>
<p>Welcome to Varad Hospital. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.</p>
<h2>2. Information We Collect</h2>
<p>We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, or otherwise when you contact us.</p>
<h2>3. How We Use Your Information</h2>
<p>We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
<h2>4. Contact Us</h2>
<p>If you have questions or comments about this notice, you may email us at varadhospital25@gmail.com.</p>
`;

const termsContent = `
<h2>1. Agreement to Terms</h2>
<p>These Terms and Conditions constitute a legally binding agreement made between you and Varad Hospital, concerning your access to and use of our website.</p>
<h2>2. User Representations</h2>
<p>By using the Site, you represent and warrant that all registration information you submit will be true, accurate, current, and complete.</p>
<h2>3. Prohibited Activities</h2>
<p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
<h2>4. Modifications and Interruptions</h2>
<p>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice.</p>
`;

const disclaimerContent = `
<h2>Medical Disclaimer</h2>
<p><strong>This website does not provide medical advice.</strong></p>
<p>The information, including but not limited to, text, graphics, images and other material contained on this website are for informational purposes only. No material on this site is intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
<p>Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition or treatment and before undertaking a new health care regimen, and never disregard professional medical advice or delay in seeking it because of something you have read on this website.</p>
<p>In case of a medical emergency, call your doctor or emergency services immediately (9552218673).</p>
`;

const notFoundContent = `
<div style="text-align: center; padding: 40px 0;">
  <h2 style="font-size: 4rem; color: var(--color-primary); margin-bottom: 20px;">404</h2>
  <h3>Page Not Found</h3>
  <p>The page you are looking for doesn't exist or has been moved.</p>
  <a href="index.html" class="btn btn-primary mt-4">Return Home</a>
</div>
`;

createPage('privacy-policy.html', 'Privacy Policy', privacyContent);
createPage('terms-conditions.html', 'Terms & Conditions', termsContent);
createPage('disclaimer.html', 'Medical Disclaimer', disclaimerContent);
createPage('404.html', 'Page Not Found', notFoundContent);
