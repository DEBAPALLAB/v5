const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
};

const files = walk('./app');
files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  // Handle things like "0 56px", "16px 56px", "120px 56px", "0 0 56px 92px", etc.
  let newContent = content.replace(/([\"'])(.*?)(?:^|\s)56px(.*?)([\"'])/g, '$1$2 var(--px)$3$4');
  // cleanup double spaces
  newContent = newContent.replace(/([\"']) (.*?)([\"'])/g, '$1$2$3');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated', file);
  }
});
