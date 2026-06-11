const fs = require('fs');

const preloaderHTML = `
  <!-- Preloader -->
  <div id="preloader" aria-label="Page is loading">
    <div class="preloader-cross"></div>
  </div>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Inject Preloader immediately after <body> (accounting for attributes like class="home")
    if (!content.includes('id="preloader"')) {
      content = content.replace(/(<body[^>]*>)/i, `$1\n${preloaderHTML}`);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Injected Preloader HTML into ${file}`);
    }
  }
});
