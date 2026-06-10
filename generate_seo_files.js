const fs = require('fs');

const domain = 'https://varadhospital.com'; // Placeholder domain, change when hosting

// 1. Generate robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;
fs.writeFileSync('robots.txt', robotsContent);

// 2. Generate sitemap.xml
const pages = [
  'index.html',
  'about.html',
  'departments.html',
  'doctors.html',
  'services.html',
  'pathology.html',
  'contact.html',
  'privacy-policy.html',
  'terms-conditions.html',
  'disclaimer.html'
];

let urls = pages.map(page => {
  return `  <url>
    <loc>${domain}/${page === 'index.html' ? '' : page}</loc>
    <changefreq>monthly</changefreq>
    <priority>${page === 'index.html' ? '1.0' : '0.8'}</priority>
  </url>`;
}).join('\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
fs.writeFileSync('sitemap.xml', sitemapContent);

console.log('Generated robots.txt and sitemap.xml');
