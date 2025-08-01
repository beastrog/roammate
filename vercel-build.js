const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set environment variables for the build
process.env.NODE_ENV = 'production';
process.env.NODE_OPTIONS = '--max_old_space_size=4096';

// Log environment information
console.log('🚀 Starting Vercel Build Process');
console.log(`📦 Node Version: ${process.version}`);
console.log(`🏗️  NPM Version: ${execSync('npm -v', { encoding: 'utf-8' }).trim()}`);
console.log(`📂 Current Directory: ${process.cwd()}`);

// Install dependencies with cache optimization
console.log('\n🔧 Installing dependencies...');
try {
  // Check for package-lock.json or yarn.lock
  const useYarn = fs.existsSync(path.join(process.cwd(), 'yarn.lock'));
  const installCmd = useYarn ? 'yarn install --frozen-lockfile' : 'npm ci --prefer-offline';
  
  execSync(installCmd, { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development' }
  });
  console.log('✅ Dependencies installed successfully!');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Generate assets (logos, favicons, etc.)
console.log('\n🎨 Generating assets...');
try {
  execSync('npm run generate:assets', { stdio: 'inherit' });
  console.log('✅ Assets generated successfully!');
} catch (error) {
  console.error('⚠️ Warning: Asset generation failed, but continuing with build...');
}

// Run the build script
console.log('\n🏗️  Building application...');
try {
  execSync('npm run build', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      GENERATE_SOURCEMAP: 'false',
      INLINE_RUNTIME_CHUNK: 'false'
    }
  });
  console.log('✅ Build completed successfully!');
  
  // Verify build output
  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('Build directory not found!');
  }
  
  console.log('📦 Build output:');
  const files = fs.readdirSync(distDir);
  files.forEach(file => {
    const stats = fs.statSync(path.join(distDir, file));
    console.log(`  - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
  
} catch (error) {
  console.error('❌ Build failed!');
  console.error(error.message);
  process.exit(1);
}

console.log('\n🚀 Application is ready for deployment!');
