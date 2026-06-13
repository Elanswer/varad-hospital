const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'about.html',
  'departments.html',
  'doctors.html',
  'services.html',
  'pathology.html',
  'contact.html'
];

const mobileStickyBook = `
  <!-- Mobile Sticky Book Button -->
  <div class="mobile-sticky-book">
    <a href="#" data-cal-link="varad-hospital-qlklm3/doctor-consultation" data-cal-namespace="doctor-consultation" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}' class="btn btn-primary btn-block">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Book Appointment
    </a>
  </div>
`;

const menuButton = `
      <a href="#" data-cal-link="varad-hospital-qlklm3/doctor-consultation" data-cal-namespace="doctor-consultation" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}' class="btn btn-primary btn-block" style="margin-bottom: 12px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Book Appointment
      </a>`;

htmlFiles.forEach(file => {
  const filePath = path.join('d:/Varad Hospital', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // 1. Update mobile menu
    if (content.includes('<div class="mobile-nav-contact">')) {
      // Check if not already added to avoid duplicates
      if (!content.includes('style="margin-bottom: 12px;"') || !content.includes('data-cal-link')) {
         content = content.replace(
           '<div class="mobile-nav-contact">', 
           '<div class="mobile-nav-contact">' + menuButton
         );
         console.log('Updated mobile menu in ' + file);
      } else {
         console.log('Mobile menu already updated in ' + file);
      }
    } else {
      console.log('Could not find <div class="mobile-nav-contact"> in ' + file);
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
