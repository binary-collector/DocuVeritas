import subprocess
import re

# Get the clean full index.html from HEAD with utf-8 encoding
original_html = subprocess.check_output(['git', 'show', 'HEAD:index.html'], encoding='utf-8')

# 1. Update the nav-links order and add the mobile theme toggle inside nav-links
# Look for nav-links in original_html
old_nav_pattern = r'(<ul class="nav-links">)(.*?)(</ul>\s*<button class="theme-toggle")'
nav_match = re.search(old_nav_pattern, original_html, re.DOTALL)
if not nav_match:
    print("Could not match nav in HEAD:index.html")
    # Let's inspect nav area
    exit(1)

new_nav = """      <ul class="nav-links">
        <li><a href="#features" class="active">Features</a></li>
        <li><a href="#demo">Live Demo</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#technology">Technology</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="#demo" class="btn btn-primary btn-sm">Try Demo</a></li>
        <li class="mobile-toggle-li"><button class="theme-toggle mobile-theme-toggle" id="themeToggleMobile" aria-label="Toggle dark/light theme"><span class="theme-icon">🌙</span></button></li>
      </ul>
      <button class="theme-toggle desktop-theme-toggle" id="themeToggle" aria-label="Toggle dark/light theme">
        <span class="theme-icon">🌙</span>
      </button>"""

# Replace navbar portion
# Let's replace the whole <nav class="navbar">...</nav> carefully
nav_full_pattern = r'(<nav class="navbar">.*?<div class="container">)(.*?)(</div>\s*</nav>)'
def replace_nav(m):
    container_inner = """
      <a href="#" class="navbar-brand">
        <div class="logo-icon">🛡️</div>
        <span>DocuVeritas</span>
      </a>
      <ul class="nav-links">
        <li><a href="#features" class="active">Features</a></li>
        <li><a href="#demo">Live Demo</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#technology">Technology</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="#demo" class="btn btn-primary btn-sm">Try Demo</a></li>
        <li class="mobile-toggle-li"><button class="theme-toggle mobile-theme-toggle" id="themeToggleMobile" aria-label="Toggle dark/light theme"><span class="theme-icon">🌙</span></button></li>
      </ul>
      <button class="theme-toggle desktop-theme-toggle" id="themeToggle" aria-label="Toggle dark/light theme">
        <span class="theme-icon">🌙</span>
      </button>
      <div class="mobile-brand" style="display:none;font-size:1.2rem;font-weight:800;color:var(--text-primary)">DocuVeritas</div>
      <button class="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    """
    return m.group(1) + container_inner + m.group(3)

html = re.sub(nav_full_pattern, replace_nav, original_html, flags=re.DOTALL)

# 2. Reorder Sections: Move How It Works section to come after Live Demo section
how_it_works_pattern = r'(\s*<!-- ========== HOW IT WORKS ========== -->\s*<section class="section" id="how-it-works">.*?</section>)'
how_it_works_match = re.search(how_it_works_pattern, html, re.DOTALL)
if not how_it_works_match:
    print("How it works section not found!")
    exit(1)

how_it_works_content = how_it_works_match.group(1)

# Remove How It Works from its original position
html_without_hiw = html[:how_it_works_match.start()] + html[how_it_works_match.end():]

# Find Live Demo section and insert How It Works right after it
demo_pattern = r'(<!-- ========== LIVE DEMO ========== -->\s*<section class="section section-light" id="demo">.*?</section>)'
demo_match = re.search(demo_pattern, html_without_hiw, re.DOTALL)
if not demo_match:
    print("Live demo section not found!")
    exit(1)

demo_end = demo_match.end()

# Insert How It Works after Live Demo
final_html = html_without_hiw[:demo_end] + "\n\n" + how_it_works_content.strip() + "\n" + html_without_hiw[demo_end:]

# Update footer links to match section order
old_footer_links = """            <li><a href="#features">Features</a></li>
            <li><a href="#demo">Live Demo</a></li>
            <li><a href="#dashboard">Dashboard</a></li>"""

new_footer_links = """            <li><a href="#features">Features</a></li>
            <li><a href="#demo">Live Demo</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#dashboard">Dashboard</a></li>"""

if old_footer_links in final_html:
    final_html = final_html.replace(old_footer_links, new_footer_links)

with open(r'C:\Users\Lenovo\DocuVeritas\index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Successfully reconstructed index.html!")
