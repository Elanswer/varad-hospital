const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const descMatch = content.match(/<meta name="description" content="(.*?)">/);
  
  const title = titleMatch ? titleMatch[1] : 'NONE';
  const desc = descMatch ? descMatch[1].substring(0, 40) + '...' : 'NONE';
  
  console.log(`${f.padEnd(25)} | Title: ${title.substring(0, 30).padEnd(30)} | Desc: ${desc}`);
});
