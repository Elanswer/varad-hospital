const fs = require('fs');
const file = 'doctors.html';
let content = fs.readFileSync(file, 'utf-8');

// Replace the grid container
content = content.replace('<div class="doc-grid">', '<div class="premium-doc-grid">');

// Find all doc-card blocks
const cardRegex = /<div class="doc-card">([\s\S]*?)<\/div>\s*<\/div>/g;

content = content.replace(cardRegex, (match, inner) => {
    // Extract Image URL
    const imgMatch = inner.match(/src="([^"]+)"/);
    const imgSrc = imgMatch ? imgMatch[1] : '';

    // Extract Alt/Name from img
    const altMatch = inner.match(/alt="([^"]+)"/);
    const altText = altMatch ? altMatch[1] : '';

    // Extract Badge
    const badgeMatch = inner.match(/<span class="doc-card__badge-floating">([^<]+)<\/span>/);
    const badge = badgeMatch ? badgeMatch[1] : '';

    // Extract Name
    const nameMatch = inner.match(/<h3 class="doc-card__name">([^<]+)<\/h3>/);
    const name = nameMatch ? nameMatch[1] : altText;

    // Extract Qual
    const qualMatch = inner.match(/<p class="doc-card__qual">([^<]+)<\/p>/);
    const qual = qualMatch ? qualMatch[1] : '';

    // Extract Role
    const roleMatch = inner.match(/<p class="doc-card__role">([^<]+)<\/p>/);
    const role = roleMatch ? roleMatch[1] : '';

    return `<div class="premium-doc-card">
            <img src="${imgSrc}" alt="${name}" class="premium-doc-img" loading="lazy">
            <div class="premium-doc-content">
              <span class="premium-doc-badge">${badge}</span>
              <h3 class="premium-doc-name">${name}</h3>
              <p class="premium-doc-qual">${qual}</p>
              <p class="premium-doc-role">${role}</p>
            </div>
          </div>`;
});

fs.writeFileSync(file, content, 'utf-8');
console.log('Successfully upgraded doctors.html to premium layout.');
