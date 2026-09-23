import re

with open(r'C:\Users\Lenovo\DocuVeritas\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Move How It Works section to after Live Demo section
# Pattern for How It Works section
hiw_pattern = r'(\s*<!-- ========== HOW IT WORKS ========== -->\s*<section class="section" id="how-it-works">.*?</section>)'
hiw_match = re.search(hiw_pattern, html, re.DOTALL)
if hiw_match:
    hiw_content = hiw_match.group(0)
    # Remove it from its current position
    html = html[:hiw_match.start()] + html[hiw_match.end():]
else:
    hiw_content = None
    print("Warning: How It Works section not found")

# Pattern for Live Demo section
demo_pattern = r'(\s*<!-- ========== LIVE DEMO ========== -->\s*<section class="section section-light" id="demo">.*?</section>)'
demo_match = re.search(demo_pattern, html, re.DOTALL)
if demo_match:
    # Insert How It Works right after Live Demo
    insert_pos = demo_match.end()
    if hiw_content:
        html = html[:insert_pos] + '\n\n' + hiw_content.strip() + '\n' + html[insert_pos:]
else:
    print("Warning: Live Demo section not found")

# 2. Update the nav-links: reorder list items and add mobile theme toggle
# We'll find the <ul class="nav-links"> and replace its content.
nav_ul_pattern = r'(<ul class="nav-links">)(.*?)(</ul>)'
nav_match = re.search(nav_ul_pattern, html, re.DOTALL)
if nav_match:
    before_ul = nav_match.group(1)
    ul_content = nav_match.group(2)
    after_ul = nav_match.group(3)

    # We want to reorder the list items so that the order is:
    # Features, Live Demo, How It Works, Dashboard, Technology, Team, Try Demo
    # Then add the mobile theme toggle as a new <li> at the end.

    # Let's extract all <li> elements (assuming they are simple and not nested)
    li_pattern = r'(<li[^>]*>.*?</li>)'
    lis = re.findall(li_pattern, ul_content, re.DOTALL)

    # We'll map each li to its key based on the href or content.
    # We'll define the desired order.
    order_key = {
        'features': 0,
        'demo': 1,
        'how-it-works': 2,
        'dashboard': 3,
        'technology': 4,
        'team': 5,
        'try-demo': 6  # the button with class btn-primary btn-sm
    }

    def get_key(li):
        li_lower = li.lower()
        if 'href="#features"' in li_lower or 'id="features"' in li_lower:
            return order_key['features']
        if 'href="#demo"' in li_lower:
            return order_key['demo']
        if 'href="#how-it-works"' in li_lower:
            return order_key['how-it-works']
        if 'href="#dashboard"' in li_lower:
            return order_key['dashboard']
        if 'href="#technology"' in li_lower:
            return order_key['technology']
        if 'href="#team"' in li_lower:
            return order_key['team']
        if 'class="btn btn-primary btn-sm"' in li_lower:
            return order_key['try-demo']
        # If we don't know, put it at the end (but we will handle the mobile toggle separately)
        return 999

    # Sort the lis by key, but we want to keep the Try Demo button where it is? Actually, the Try Demo button is also a <li>.
    # We'll sort all lis by the key, but note that the Try Demo button is already in the list.
    sorted_lis = sorted(lis, key=get_key)

    # Now, we want to add the mobile theme toggle <li> at the end of the list.
    mobile_toggle_li = '<li class="mobile-toggle-li"><button class="theme-toggle mobile-theme-toggle" id="themeToggleMobile" aria-label="Toggle dark/light theme"><span class="theme-icon">🌙</span></button></li>'
    sorted_lis.append(mobile_toggle_li)

    # Join them back with newlines and indentation (we'll keep the original indentation from the first li? Let's just join with newline and same indentation as the original ul content's first line? Simpler: join with '\n        ' (8 spaces) because the original ul content is indented by 8 spaces? Let's check.
    # We'll just join with '\n        ' and then wrap with the before and after.
    new_ul_content = '\n        '.join(sorted_lis)
    # Ensure there is a newline at the end? We'll let the after_ul handle it.
    html = before_ul + new_ul_content + after_ul
else:
    print("Warning: nav-links ul not found")

# 3. Update the theme toggle button outside the nav-links: change its class to include 'desktop-theme-toggle'
# We'll find the button with id="themeToggle" and add the class if not present.
# We'll do a simple replacement.
theme_toggle_pattern = r'(<button class=")theme-toggle(" id="themeToggle"[^>]*>)'
def replace_class(match):
    return match.group(1) + 'theme-toggle desktop-theme-toggle' + match.group(2)
html = re.sub(theme_toggle_pattern, replace_class, html)

# 4. Ensure the mobile theme toggle button we added has the correct classes and id.
# We already added it with the correct classes and id, so we are good.

# Write back
with open(r'C:\Users\Lenovo\DocuVeritas\index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html")