const fs = require('fs');
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = require('path').join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.tsx')) results.push(file);
  });
  return results;
};
const files = walk('./app');
files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/className=\"label\"style/g, 'className=\"label\" style');
  newContent = newContent.replace(/pattern id=\"(.*?)\"width=/g, 'pattern id=\"$1\" width=');
  newContent = newContent.replace(/width=\"(.*?)\"height=/g, 'width=\"$1\" height=');
  newContent = newContent.replace(/fill=\"(.*?)\"stroke=/g, 'fill=\"$1\" stroke=');
  newContent = newContent.replace(/stroke=\"(.*?)\"strokeWidth=/g, 'stroke=\"$1\" strokeWidth=');
  newContent = newContent.replace(/height=\"(.*?)\"fill=/g, 'height=\"$1\" fill=');
  newContent = newContent.replace(/\? \"italic\":/g, '? \"italic\" :');
  newContent = newContent.replace(/\? \"underline\":/g, '? \"underline\" :');
  newContent = newContent.replace(/\? \"#C8F135\":/g, '? \"#C8F135\" :');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed syntax spacing in', file);
  }
});
