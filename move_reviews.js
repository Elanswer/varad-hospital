const fs = require('fs');

const htmlFile = 'd:/Varad Hospital/index.html';
let content = fs.readFileSync(htmlFile, 'utf-8');

const newSectionMarker = 'GOOGLE REVIEWS MARQUEE';
const startIndexMarker = content.lastIndexOf('<!--', content.indexOf(newSectionMarker));

if (startIndexMarker !== -1) {
  let endIndex = content.indexOf('</section>', startIndexMarker);
  if (endIndex !== -1) {
    endIndex += '</section>'.length;
    // Extract the reviews HTML
    const reviewsHtml = content.substring(startIndexMarker, endIndex);
    
    // Remove it from the top
    content = content.substring(0, startIndexMarker) + content.substring(endIndex);
    
    // Now find the old SECTION 10
    const oldSectionMarker = 'SECTION 10: GOOGLE REVIEWS / TRUST';
    const oldSectionStart = content.lastIndexOf('<!--', content.indexOf(oldSectionMarker));
    
    if (oldSectionStart !== -1) {
      let oldSectionEnd = content.indexOf('</section>', oldSectionStart);
      if (oldSectionEnd !== -1) {
        oldSectionEnd += '</section>'.length;
        
        // Replace old section with new section
        content = content.substring(0, oldSectionStart) + reviewsHtml + content.substring(oldSectionEnd);
        
        fs.writeFileSync(htmlFile, content, 'utf-8');
        console.log('Successfully moved the reviews section to the bottom and removed the old trust section.');
      } else {
        console.log('Could not find end of old section.');
      }
    } else {
      console.log('Old section not found.');
    }
  } else {
    console.log('Could not find end of new section.');
  }
} else {
  console.log('New section not found at the top.');
}
