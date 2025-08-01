// This script generates logo assets for the Roammate application
// Run with: node scripts/generate-logos.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Ensure public directory exists
const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');
const iconsDir = path.join(publicDir, 'icons');

[publicDir, imagesDir, iconsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Logo configuration
const logoConfig = {
  text: 'Roammate',
  primaryColor: '#F97316', // Orange-500
  secondaryColor: '#F59E0B', // Amber-500
  backgroundColor: '#FFFFFF',
  darkBackgroundColor: '#1F2937', // Gray-800
  sizes: [
    { name: 'logo', width: 512, height: 512 },
    { name: 'logo-192', width: 192, height: 192 },
    { name: 'logo-512', width: 512, height: 512 },
    { name: 'og-image', width: 1200, height: 630 },
  ],
  faviconSizes: [16, 32, 96, 192],
  appleIconSizes: [180],
};

// Generate logo with text
async function generateLogo(width, height, filename, isDark = false) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = isDark ? logoConfig.darkBackgroundColor : logoConfig.backgroundColor;
  ctx.fillRect(0, 0, width, height);
  
  // Draw R icon
  const size = Math.min(width, height) * 0.6;
  const x = (width - size) / 2;
  const y = (height - size) / 2;
  
  // R icon with gradient
  const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
  gradient.addColorStop(0, logoConfig.primaryColor);
  gradient.addColorStop(1, logoConfig.secondaryColor);
  
  ctx.fillStyle = gradient;
  ctx.font = `bold ${size * 0.8}px 'Inter', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('R', width / 2, height / 2);
  
  // Add text for larger logos
  if (width > 200) {
    ctx.fillStyle = isDark ? '#FFFFFF' : '#111827';
    ctx.font = `bold ${size * 0.25}px 'Inter', sans-serif`;
    ctx.fillText(logoConfig.text, width / 2, height * 0.75);
  }
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  await sharp(buffer).toFile(filename);
  console.log(`Generated: ${filename}`);
}

// Generate favicon
async function generateFavicon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background with rounded corners
  const radius = size * 0.2;
  ctx.fillStyle = logoConfig.primaryColor;
  roundRect(ctx, 0, 0, size, size, radius);
  ctx.fill();
  
  // R icon
  ctx.fillStyle = '#FFFFFF';
  const fontSize = size * 0.6;
  ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('R', size / 2, size / 2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  await sharp(buffer).toFile(filename);
  console.log(`Generated favicon: ${filename}`);
}

// Helper function to draw rounded rectangles
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Generate all assets
async function generateAllAssets() {
  try {
    // Generate main logo variations
    for (const size of logoConfig.sizes) {
      await generateLogo(
        size.width,
        size.height,
        path.join(imagesDir, `${size.name}.png`)
      );
      
      // Generate dark version
      if (size.name === 'logo') {
        await generateLogo(
          size.width,
          size.height,
          path.join(imagesDir, `${size.name}-dark.png`),
          true
        );
      }
    }
    
    // Generate favicons
    for (const size of logoConfig.faviconSizes) {
      await generateFavicon(
        size,
        path.join(iconsDir, `favicon-${size}x${size}.png`)
      );
    }
    
    // Generate Apple touch icons
    for (const size of logoConfig.appleIconSizes) {
      await generateFavicon(
        size,
        path.join(iconsDir, `apple-touch-icon-${size}x${size}.png`)
      );
    }
    
    // Generate manifest file
    const manifest = {
      name: 'Roammate',
      short_name: 'Roammate',
      icons: [
        {
          src: '/icons/favicon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icons/favicon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: logoConfig.primaryColor,
      background_color: logoConfig.backgroundColor,
      display: 'standalone',
      start_url: '/'
    };
    
    fs.writeFileSync(
      path.join(publicDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('Generated: site.webmanifest');
    
    console.log('\n✅ All logo assets generated successfully!');
  } catch (error) {
    console.error('Error generating assets:', error);
    process.exit(1);
  }
}

// Install required dependencies and run the generator
async function main() {
  console.log('Installing required dependencies...');
  
  try {
    // Install sharp if not already installed
    await require('child_process').execSync('npm list sharp || npm install sharp canvas --no-save', {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    console.log('\nGenerating logo assets...');
    await generateAllAssets();
    
  } catch (error) {
    console.error('Failed to install dependencies:', error);
    console.log('\nPlease install the required dependencies manually:');
    console.log('npm install sharp canvas --save-dev');
    process.exit(1);
  }
}

main();
