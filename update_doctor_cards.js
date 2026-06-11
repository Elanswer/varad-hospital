const fs = require('fs');

function getInitials(name) {
  const cleanName = name.replace(/^Dr\.?\s+/i, '').trim();
  const parts = cleanName.split(/[\s-]+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  } else if (parts.length === 1 && parts[0].length > 0) {
    return parts[0][0].toUpperCase();
  }
  return 'MD';
}

function processIndexHtml() {
  if (!fs.existsSync('index.html')) return;
  let content = fs.readFileSync('index.html', 'utf-8');
  
  // Replace the image wrapper in doc-card
  const regex = /<div class="doc-card__image-wrapper">[\s\S]*?alt="([^"]+)"[\s\S]*?<\/div>/g;
  
  content = content.replace(regex, (match, altText) => {
    const initials = getInitials(altText);
    return `
            <div class="monogram-avatar-wrapper">
              <div class="monogram-avatar">${initials}</div>
            </div>`;
  });

  fs.writeFileSync('index.html', content, 'utf-8');
  console.log('Updated index.html');
}

function processDoctorsHtml() {
  if (!fs.existsSync('doctors.html')) return;
  let content = fs.readFileSync('doctors.html', 'utf-8');
  
  // Replace the img directly inside premium-doc-card
  const regex = /<img src="[^"]+" alt="([^"]+)" class="premium-doc-img"[^>]*>/g;
  
  content = content.replace(regex, (match, altText) => {
    const initials = getInitials(altText);
    return `
            <div class="monogram-avatar-wrapper">
              <div class="monogram-avatar">${initials}</div>
            </div>`;
  });

  fs.writeFileSync('doctors.html', content, 'utf-8');
  console.log('Updated doctors.html');
}

processIndexHtml();
processDoctorsHtml();

const cssContent = `
/* ==========================================================================
   MONOGRAM DOCTOR CARDS (No Photo Layout)
   ========================================================================== */

.monogram-avatar-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0 16px 0;
  background: linear-gradient(135deg, var(--color-bg), var(--color-white));
  border-bottom: 1px solid var(--color-border);
}

.monogram-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: inset 0 0 0 2px rgba(29, 111, 184, 0.1), var(--shadow-sm);
  position: relative;
}

.monogram-avatar::after {
  content: '';
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background-color: var(--color-secondary);
  border: 3px solid var(--color-white);
  border-radius: 50%;
}

.doc-card {
  text-align: center;
  overflow: hidden;
}
.doc-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.premium-doc-card {
  min-height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  overflow: hidden;
  background: var(--color-white);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}
.premium-doc-card .monogram-avatar-wrapper {
  padding: 40px 0 24px 0;
  background: var(--color-primary-light);
  border-bottom: none;
}
.premium-doc-card .monogram-avatar {
  width: 110px;
  height: 110px;
  font-size: 2.5rem;
  background-color: var(--color-white);
  color: var(--color-primary);
  box-shadow: 0 8px 24px rgba(29, 111, 184, 0.15);
}
.premium-doc-content {
  position: relative;
  z-index: 2;
  padding: 32px;
  background: var(--color-white);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
`;

fs.appendFileSync('css/style.css', `\n${cssContent}\n`);
console.log('Appended styles to style.css');
