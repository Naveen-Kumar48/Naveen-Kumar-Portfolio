const fs = require('fs');
const path = require('path');

const sitemapPaths = [
  path.join(__dirname, '../src/sitemap.xml'),
  path.join(__dirname, '../public/sitemap.xml')
];
const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

const urls = [
  { loc: 'https://naveenweb.site/', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://naveenweb.site/web-developer-in-delhi', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://naveenweb.site/full-stack-developer-in-delhi', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://naveenweb.site/mern-stack-developer-delhi', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://naveenweb.site/react-developer-in-delhi', changefreq: 'monthly', priority: '0.9' }
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

sitemapPaths.forEach((sitemapPath) => {
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log('✅ Dynamic sitemap.xml generated at', sitemapPath, 'with lastmod:', date);
});
