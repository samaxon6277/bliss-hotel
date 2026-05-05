const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Look for pexels image URLs without query params and add compression params
      let modified = content.replace(/https:\/\/images\.pexels\.com\/photos\/(\d+)\/([^\s'\"]+)\.jpeg(?!\?)/g, 'https://images.pexels.com/photos/$1/$2.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
      
      if (content !== modified) {
        fs.writeFileSync(fullPath, modified);
        console.log('Updated', fullPath);
      }
    }
  }
}

processDir('./src');
