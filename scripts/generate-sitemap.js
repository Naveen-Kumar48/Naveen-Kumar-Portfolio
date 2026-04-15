const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../src/sitemap.xml');
const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://naveenweb.site/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://naveenweb.site/#about</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://naveenweb.site/#projects</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://naveenweb.site/#skills</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://naveenweb.site/#experience</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://naveenweb.site/#contact</loc>
    <lastmod>${date}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

fs.writeFileSync(sitemapPath, sitemapContent);
console.log('✅ Dynamic sitemap.xml generated at', sitemapPath, 'with lastmod:', date);
