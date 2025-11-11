const fs = require('fs');
const path = require('path');

// Create www directory if it doesn't exist
const wwwDir = path.join(__dirname, '..', 'www');
if (!fs.existsSync(wwwDir)) {
  fs.mkdirSync(wwwDir, { recursive: true });
}

// Copy index.html
const indexSrc = path.join(__dirname, '..', 'index.html');
const indexDest = path.join(wwwDir, 'index.html');

let indexContent = fs.readFileSync(indexSrc, 'utf-8');

// Replace the script tag to use capacitor bundle
indexContent = indexContent.replace(
  '<script src="dist/renderer.js"></script>',
  '<script type="module" src="capacitor-bundle.js"></script>'
);

fs.writeFileSync(indexDest, indexContent);

// Copy styles.css
const stylesSrc = path.join(__dirname, '..', 'styles.css');
const stylesDest = path.join(wwwDir, 'styles.css');
fs.copyFileSync(stylesSrc, stylesDest);

console.log('✅ Web assets copied to www/');
