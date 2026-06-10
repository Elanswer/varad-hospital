const fs = require('fs');

const replacements = [
  {
    file: 'index.html',
    replaces: [
      { from: '<body>', to: '<body class="home">' }
    ]
  },
  {
    file: 'about.html',
    replaces: [
      { from: '<div class="about-text">', to: '<div class="about-text reveal">' },
      { from: '<div class="about-image">', to: '<div class="about-image reveal">' },
      { from: '<div class="director-message">', to: '<div class="director-message reveal">' }
    ]
  },
  {
    file: 'departments.html',
    replaces: [
      { from: /<div class="dept-card">/g, to: '<div class="dept-card reveal">' }
    ]
  },
  {
    file: 'services.html',
    replaces: [
      { from: /<div class="service-card">/g, to: '<div class="service-card reveal">' }
    ]
  },
  {
    file: 'doctors.html',
    replaces: [
      { from: /<div class="premium-doc-card">/g, to: '<div class="premium-doc-card reveal">' }
    ]
  },
  {
    file: 'pathology.html',
    replaces: [
      { from: '<div class="pathology-tests-grid">', to: '<div class="pathology-tests-grid reveal">' }
    ]
  },
  {
    file: 'contact.html',
    replaces: [
      { from: /<div class="contact-card-v2">/g, to: '<div class="contact-card-v2 reveal">' },
      { from: '<div class="contact-map-immersive">', to: '<div class="contact-map-immersive reveal">' }
    ]
  }
];

replacements.forEach(({ file, replaces }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    replaces.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Polished ${file}`);
  }
});
