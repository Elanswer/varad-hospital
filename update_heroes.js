const fs = require('fs');
const files = ['about.html', 'departments.html', 'doctors.html', 'services.html', 'pathology.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Find the inner-hero block
    const startMarker = '<!-- ==========================================\n         INNER PAGE HERO\n         ========================================== -->';
    const sectionStart = content.indexOf(startMarker);
    const sectionEnd = content.indexOf('</section>', sectionStart) + 10;
    
    if (sectionStart !== -1 && sectionEnd !== -1) {
        const heroBlock = content.substring(sectionStart, sectionEnd);
        
        // Extract the title from the h1
        const titleMatch = heroBlock.match(/<h1 class="inner-hero__title">([^<]+)<\/h1>/);
        const title = titleMatch ? titleMatch[1] : '';
        
        // Extract the image source
        const imgMatch = heroBlock.match(/<img src="([^"]+)"/);
        const imgSrc = imgMatch ? imgMatch[1] : '';
        
        // Build new hero block
        const newHeroBlock = `${startMarker}
    <section class="inner-hero">
      <div class="inner-hero__bg">
        <img src="${imgSrc}" alt="${title}" aria-hidden="true" loading="eager">
      </div>
      <div class="container inner-hero__container">
        <div class="inner-hero__glass">
          <span class="inner-hero__badge">Varad Hospital</span>
          <h1 class="inner-hero__title">${title}</h1>
          <nav aria-label="Breadcrumb">
            <ol class="breadcrumb">
              <li><a href="index.html">Home</a></li>
              <li><span aria-current="page">${title}</span></li>
            </ol>
          </nav>
        </div>
      </div>
    </section>`;
        
        content = content.replace(heroBlock, newHeroBlock);
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Updated ${file}`);
    }
});
