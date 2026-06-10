const fs = require('fs');

const embedScript = `
  <!-- Cal element-click embed code begins -->
  <script type="text/javascript">
  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", "doctor-consultation", {origin:"https://app.cal.com"});
  Cal.config = Cal.config || {};
  Cal.config.forwardQueryParams = true;
  Cal.ns["doctor-consultation"]("ui", {"hideEventTypeDetails":true,"layout":"month_view"});
  </script>
  <!-- Cal element-click embed code ends -->
`;

const calAttributes = `href="#" data-cal-link="varad-hospital-qlklm3/doctor-consultation" data-cal-namespace="doctor-consultation" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // 1. Inject the script before </body>
    if (!content.includes('Cal element-click embed code begins')) {
      content = content.replace('</body>', `${embedScript}\n</body>`);
      modified = true;
    }

    // 2. Replace href="#appointment" with the Cal.com attributes
    if (content.includes('href="#appointment"')) {
      // Use regex with global flag to replace all occurrences
      content = content.replace(/href="#appointment"/g, calAttributes);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Integrated Cal.com into ${file}`);
    }
  }
});
