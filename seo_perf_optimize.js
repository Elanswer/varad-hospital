const fs = require('fs');
const path = require('path');

const dir = 'd:/Varad Hospital';
const htmlFiles = [
  'about.html',
  'departments.html',
  'doctors.html',
  'services.html',
  'pathology.html',
  'contact.html'
];

const seoData = {
  'about.html': {
    title: 'About Us | Varad Hospital — Best Hospital in Chikhali',
    desc: 'Learn about Varad Hospital in Chikhali, Pune. Meet Medical Director Dr. Abhaysinha Thote and discover our mission of compassionate, affordable healthcare.'
  },
  'departments.html': {
    title: 'Departments & Specialties | Varad Hospital Chikhali',
    desc: 'Explore the expert medical departments at Varad Hospital including General Surgery, Orthopedics, Pediatrics, Gynecology, and internal medicine.'
  },
  'doctors.html': {
    title: 'Our Expert Doctors | Varad Hospital Pune',
    desc: 'Meet our team of 11+ highly qualified specialists and expert doctors at Varad Hospital, Chikhali. Delivering premium healthcare across multiple specialties.'
  },
  'services.html': {
    title: 'Medical Services & Facilities | Varad Hospital',
    desc: 'Varad Hospital offers 24/7 emergency care, advanced ICU, OPD, IPD, and fully equipped operation theatres in Chikhali, Pimpri-Chinchwad.'
  },
  'pathology.html': {
    title: '24/7 Pathology Lab & Diagnostics | Varad Hospital',
    desc: 'Our advanced, in-house pathology lab offers accurate blood tests, diagnostic imaging, and 24-hour pharmacy services for all patients.'
  },
  'contact.html': {
    title: 'Contact & Directions | Varad Hospital Chikhali',
    desc: 'Get in touch with Varad Hospital. View our address, Google Maps location, contact numbers for emergency, and book your appointment easily.'
  }
};

// 1. Update SEO Tags
htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf-8');
    const data = seoData[file];

    if (data) {
      // Replace Title
      html = html.replace(/<title>.*?<\/title>/s, `<title>${data.title}</title>`);
      
      // Replace Meta Description
      html = html.replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="${data.desc}">`);
      
      // Replace OG Title
      html = html.replace(/<meta property="og:title" content=".*?">/s, `<meta property="og:title" content="${data.title}">`);
      
      // Replace OG Description
      html = html.replace(/<meta property="og:description" content=".*?">/s, `<meta property="og:description" content="${data.desc}">`);

      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`Optimized SEO for ${file}`);
    }
  }
});

// 2. Minify CSS
const cssPath = path.join(dir, 'css', 'style.css');
const minCssPath = path.join(dir, 'css', 'style.min.css');

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf-8');
  
  // Basic minification: remove comments, newlines, and extra spaces
  let minCss = css
    .replace(/\/\*.*?\*\//gs, '') // remove comments
    .replace(/\n/g, '') // remove newlines
    .replace(/\s*([{}:;,])\s*/g, '$1') // remove spaces around syntax
    .replace(/\s+/g, ' ') // collapse remaining spaces
    .trim();

  fs.writeFileSync(minCssPath, minCss, 'utf-8');
  console.log('Minified style.css to style.min.css');
}

// 3. Update HTML files to use style.min.css
const allFiles = fs.readdirSync(dir);
allFiles.forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    if (html.includes('css/style.css')) {
      html = html.replace(/href="css\/style\.css"/g, 'href="css/style.min.css"');
      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`Updated ${file} to use style.min.css`);
    }
  }
});
