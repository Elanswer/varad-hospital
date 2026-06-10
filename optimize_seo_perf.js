const fs = require('fs');

const domain = 'https://www.varadhospitalcare.com';

const pagesData = {
  'index.html': {
    title: 'Varad Hospital — Multispeciality Hospital in Chikhali, Pune',
    desc: 'Varad Hospital is a trusted multispeciality hospital in Chikhali, Pune offering 24/7 emergency care, ICU, OPD, and expert doctors in surgery, orthopedics, and more.'
  },
  'about.html': {
    title: 'About Us | Varad Hospital',
    desc: 'Learn about Varad Hospital in Chikhali. Discover our mission, values, and meet Medical Director Dr. Abhaysinha Thote, dedicated to compassionate healthcare.'
  },
  'departments.html': {
    title: 'Departments | Varad Hospital',
    desc: 'Explore the specialized medical departments at Varad Hospital, including General Medicine, Orthopedics, General Surgery, Gynecology, Pediatrics, and Cardiology.'
  },
  'doctors.html': {
    title: 'Our Doctors | Varad Hospital',
    desc: 'Meet the expert medical team at Varad Hospital. Our 11+ specialist doctors provide compassionate, top-tier healthcare services in Pimpri-Chinchwad, Pune.'
  },
  'services.html': {
    title: 'Services | Varad Hospital',
    desc: 'Varad Hospital offers comprehensive medical services including 24/7 Emergency, ICU, Advanced OT, Pathology Lab, Pharmacy, and specialized clinics in Chikhali.'
  },
  'pathology.html': {
    title: 'Pathology Lab | Varad Hospital',
    desc: 'Our 24/7 pathology lab at Varad Hospital provides accurate and swift diagnostic services including blood tests, biochemistry, and microbiology. Home collection available.'
  },
  'contact.html': {
    title: 'Contact Us | Varad Hospital',
    desc: 'Get in touch with Varad Hospital in Chikhali, Pune. Call our 24/7 emergency line, book an appointment, or find our location on Dehu-Moshi Road.'
  },
  'privacy-policy.html': {
    title: 'Privacy Policy | Varad Hospital',
    desc: 'Read the Privacy Policy of Varad Hospital. Learn how we collect, use, and protect your personal and health data in compliance with Indian data protection laws.'
  },
  'terms-conditions.html': {
    title: 'Terms & Conditions | Varad Hospital',
    desc: 'Review the Terms and Conditions for using the Varad Hospital website. Understand your rights, our intellectual property, and governing laws in Pune, Maharashtra.'
  },
  'disclaimer.html': {
    title: 'Medical Disclaimer | Varad Hospital',
    desc: 'Read our Medical Disclaimer. The Varad Hospital website provides educational information and does not substitute professional medical diagnosis or treatment.'
  },
  '404.html': {
    title: 'Page Not Found | Varad Hospital',
    desc: 'The page you are looking for at Varad Hospital could not be found. Please return to our homepage or contact us for assistance.'
  }
};

const schemaMarkup = `
  <!-- JSON-LD Schema Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Varad Hospital",
    "url": "${domain}",
    "logo": "${domain}/images/logo.webp",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    "description": "Varad Hospital is a trusted multispeciality hospital in Chikhali, Pune offering 24/7 emergency care, ICU, OPD, and expert doctors.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gat Number 16/12, Rustic Paradise Commercial Wing, Dehu - Moshi Rd, Patilnagar",
      "addressLocality": "Chikhali, Pimpri-Chinchwad",
      "addressRegion": "Maharashtra",
      "postalCode": "411062",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.6869093,
      "longitude": 73.8073880
    },
    "telephone": "+91-9552218673",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
        "description": "24/7 Emergency & ICU"
      }
    ]
  }
  </script>
`;

const heroPreload = `  <link rel="preload" as="image" href="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80">`;

Object.keys(pagesData).forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    const data = pagesData[file];

    // 1. Replace Meta Description
    content = content.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${data.desc}">`);

    // 2. Inject Canonical Tag (if not exists)
    if (!content.includes('<link rel="canonical"')) {
      const canonicalTag = `<link rel="canonical" href="${domain}/${file === 'index.html' ? '' : file}">\n`;
      content = content.replace('</head>', `  ${canonicalTag}</head>`);
    } else {
       content = content.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="${domain}/${file === 'index.html' ? '' : file}">`);
    }

    // 3. Inject Schema and Preload ONLY in index.html
    if (file === 'index.html') {
      if (!content.includes('application/ld+json')) {
        content = content.replace('</head>', `${schemaMarkup}</head>`);
      }
      if (!content.includes('rel="preload" as="image"')) {
        content = content.replace('<!-- Stylesheet -->', `${heroPreload}\n  <!-- Stylesheet -->`);
      }
    }

    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Optimized ${file}`);
  }
});
