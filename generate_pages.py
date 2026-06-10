import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

head_part = html[:html.find('<main>')]
footer_part = html[html.find('</main>') + 7:]

pages = [
    ('about.html', 'About Us', 'about'),
    ('departments.html', 'Departments', 'departments'),
    ('doctors.html', 'Our Doctors', 'doctors'),
    ('services.html', 'Services', 'services'),
    ('pathology.html', 'Pathology Lab', 'pathology'),
    ('contact.html', 'Contact Us', 'contact')
]

for filename, title, nav_class in pages:
    page_head = head_part.replace('<title>Varad Hospital — Multispeciality Hospital in Chikhali, Pune</title>', f'<title>{title} | Varad Hospital</title>')
    
    # Desktop nav
    page_head = page_head.replace('class="nav-link active" aria-current="page"', 'class="nav-link"')
    page_head = page_head.replace(f'href="{filename}" class="nav-link"', f'href="{filename}" class="nav-link active" aria-current="page"')
    
    # Mobile nav
    page_head = page_head.replace('class="mobile-nav-link active" aria-current="page"', 'class="mobile-nav-link"')
    page_head = page_head.replace(f'href="{filename}" class="mobile-nav-link"', f'href="{filename}" class="mobile-nav-link active" aria-current="page"')
    
    main_content = f'''<main id="main-content">
    <!-- ==========================================
         INNER PAGE HERO
         ========================================== -->
    <section class="inner-hero">
      <div class="inner-hero__bg">
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80" alt="{title}" aria-hidden="true" loading="eager">
        <div class="inner-hero__overlay"></div>
      </div>
      <div class="container inner-hero__content">
        <h1 class="inner-hero__title">{title}</h1>
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb">
            <li><a href="index.html">Home</a></li>
            <li><span aria-current="page">{title}</span></li>
          </ol>
        </nav>
      </div>
    </section>

    <!-- Page Content Placeholder -->
    <section class="section">
      <div class="container">
        <h2>Content coming soon...</h2>
      </div>
    </section>
    
</main>'''

    with open(filename, 'w', encoding='utf-8') as out:
        out.write(page_head + main_content + footer_part)

print("Inner pages generated successfully.")
