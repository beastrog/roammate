// This script updates the index.html file with the correct logo and favicon paths
const fs = require('fs');
const path = require('path');

// Paths
const indexPath = path.join(__dirname, '../index.html');
const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');
const iconsDir = path.join(publicDir, 'icons');

// Read the index.html file
let html = fs.readFileSync(indexPath, 'utf8');

// Update favicon and logo paths
const replacements = [
  // Favicons
  { 
    search: /<link rel="icon" type="image\/png" sizes="32x32" href="[^"]*"\s*\/>/, 
    replace: '<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />' 
  },
  { 
    search: /<link rel="icon" type="image\/png" sizes="16x16" href="[^"]*"\s*\/>/, 
    replace: '<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />' 
  },
  { 
    search: /<link rel="apple-touch-icon" sizes="180x180" href="[^"]*"\s*\/>/, 
    replace: '<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />' 
  },
  { 
    search: /<link rel="manifest" href="[^"]*"\s*\/>/, 
    replace: '<link rel="manifest" href="/site.webmanifest" />' 
  },
  // Apple touch icon
  { 
    search: /<link rel="apple-touch-icon" href="[^"]*"\s*\/>/, 
    replace: '<link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" />' 
  },
  // Theme color
  { 
    search: /<meta name="theme-color" content="[^"]*"\s*\/>/, 
    replace: '<meta name="theme-color" content="#F97316" />' 
  },
  // MS Application Tile
  { 
    search: /<meta name="msapplication-TileImage" content="[^"]*"\s*\/>/, 
    replace: '<meta name="msapplication-TileImage" content="/icons/favicon-144x144.png" />' 
  },
  // OG Image
  { 
    search: /<meta property="og:image" content="[^"]*"\s*\/>/, 
    replace: '<meta property="og:image" content="/images/og-image.png" />' 
  },
  // Twitter Card
  { 
    search: /<meta name="twitter:image" content="[^"]*"\s*\/>/, 
    replace: '<meta name="twitter:image" content="/images/og-image.png" />' 
  },
  // Apple touch startup image
  { 
    search: /<link rel="apple-touch-startup-image" href="[^"]*"\s*\/>/g, 
    replace: '' 
  }
];

// Apply all replacements
replacements.forEach(({ search, replace }) => {
  html = html.replace(search, replace);
});

// Write the updated HTML back to the file
fs.writeFileSync(indexPath, html, 'utf8');

console.log('✅ Updated index.html with correct asset paths');
console.log('\nNext steps:');
console.log('1. Run the logo generator: node scripts/generate-logos.js');
console.log('2. Run this script again to update index.html: node scripts/update-assets.js');
console.log('3. Test the website locally to ensure all assets load correctly');
