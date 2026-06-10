const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

const headEnd = html.indexOf('<main');
const footerStart = html.indexOf('</main>') + 7;

const headPart = html.substring(0, headEnd);
const footerPart = html.substring(footerStart);

const pages = [
    { file: 'about.html', title: 'About Us' },
    { file: 'departments.html', title: 'Departments' },
    { file: 'doctors.html', title: 'Our Doctors' },
    { file: 'services.html', title: 'Services' },
    { file: 'pathology.html', title: 'Pathology Lab' },
    { file: 'contact.html', title: 'Contact Us' }
];

pages.forEach(p => {
    let pageHead = headPart.replace('<title>Varad Hospital — Multispeciality Hospital in Chikhali, Pune</title>', `<title>${p.title} | Varad Hospital</title>`);
    
    // desktop nav
    pageHead = pageHead.replace('class="nav-link active" aria-current="page"', 'class="nav-link"');
    pageHead = pageHead.replace(`href="${p.file}" class="nav-link"`, `href="${p.file}" class="nav-link active" aria-current="page"`);
    
    // mobile nav
    pageHead = pageHead.replace('class="mobile-nav-link active" aria-current="page"', 'class="mobile-nav-link"');
    pageHead = pageHead.replace(`href="${p.file}" class="mobile-nav-link"`, `href="${p.file}" class="mobile-nav-link active" aria-current="page"`);
    
    const mainContent = `<main id="main-content">
    <!-- ==========================================
         INNER PAGE HERO
         ========================================== -->
    <section class="inner-hero">
      <div class="inner-hero__bg">
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80" alt="${p.title}" aria-hidden="true" loading="eager">
        <div class="inner-hero__overlay"></div>
      </div>
      <div class="container inner-hero__content">
        <h1 class="inner-hero__title">${p.title}</h1>
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb">
            <li><a href="index.html">Home</a></li>
            <li><span aria-current="page">${p.title}</span></li>
          </ol>
        </nav>
      </div>
    </section>

    <!-- Page Content Placeholder -->
    <section class="section">
      <div class="container">
        <h2>Content coming soon...</h2>
      </div>
    </section>
    
</main>`;

    fs.writeFileSync(p.file, pageHead + mainContent + footerPart, 'utf-8');
});

console.log('Generated successfully');
