const fs = require('fs');
const path = require('path');

const srcDir = 'd:/Varad Hospital';
const destDir = 'd:/Varad_Hospital_Live_Deploy';

// Clean destination if exists
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir);

// What we want to include
const includeDirs = ['css', 'js', 'images', 'videos'];
const includeExts = ['.html', '.xml', '.txt'];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Copy directories
includeDirs.forEach(dir => {
  const src = path.join(srcDir, dir);
  const dest = path.join(destDir, dir);
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
  }
});

// 2. Copy root files (HTML, robots.txt, sitemap)
const files = fs.readdirSync(srcDir);
files.forEach(file => {
  const fullPath = path.join(srcDir, file);
  if (fs.statSync(fullPath).isFile()) {
    const ext = path.extname(file).toLowerCase();
    if (includeExts.includes(ext)) {
      fs.copyFileSync(fullPath, path.join(destDir, file));
    }
  }
});

console.log('Successfully created clean deployment folder at: ' + destDir);
