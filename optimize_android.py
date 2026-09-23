import re

with open(r'C:\Users\Lenovo\DocuVeritas\css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Increase hamburger size to 48x48px in the mobile media query
# Find the .hamburger block inside @media (max-width: 768px)
# We'll replace the specific lines for .hamburger
# We'll do a more precise replacement: find the .hamburger { ... } block and replace width and height

# Pattern for .hamburger in the mobile query
hamburger_pattern = r'(\.hamburger\s*\{\s*)([^}]*)(\s*\})'
def replace_hamburger(match):
    prefix = match.group(1)
    content = match.group(2)
    suffix = match.group(3)
    # Replace width and height
    content = re.sub(r'width:\s*40px;', 'width: 48px;', content)
    content = re.sub(r'height:\s*40px;', 'height: 48px;', content)
    # Also adjust the gap? We'll leave gap as 5px for now
    return prefix + content + suffix

css = re.sub(hamburger_pattern, replace_hamburger, css)

# 2. Increase nav-links padding and link padding in mobile query
# We'll find the .nav-links block and adjust padding and the a inside
# We'll do two replacements: one for .nav-links and one for .nav-links a

# First, .nav-links padding
nav_links_pattern = r'(\.nav-links\s*\{\s*)([^}]*)(\s*\})'
def replace_nav_links(match):
    prefix = match.group(1)
    content = match.group(2)
    suffix = match.group(3)
    # Replace padding
    content = re.sub(r'padding:\s*16px;', 'padding: 20px;', content)
    # We can also adjust the gap? Not directly set, but we can adjust the a padding
    return prefix + content + suffix

css = re.sub(nav_links_pattern, replace_nav_links, css)

# Now, .nav-links a padding and font size
nav_links_a_pattern = r'(\.nav-links\s+a\s*\{\s*)([^}]*)(\s*\})'
def replace_nav_links_a(match):
    prefix = match.group(1)
    content = match.group(2)
    suffix = match.group(3)
    # Replace padding
    content = re.sub(r'padding:\s*8px\s+16px;', 'padding: 12px 16px;', content)
    # Increase font size
    content = re.sub(r'font-size:\s*0\.9rem;', 'font-size: 1rem;', content)
    return prefix + content + suffix

css = re.sub(nav_links_a_pattern, replace_nav_links_a, css)

# 3. Adjust the hero section on very small screens (<=400px) to have even less padding?
# We'll add a new media query for <=400px if we want, but let's adjust the existing <=600px hero padding-top and bottom
# We'll adjust the hero padding-top and padding-bottom in the <=600px query to be smaller on very small screens?
# Actually, we can leave it as is because the user didn't specify.

# Instead, let's adjust the hero-text h1 font size on <=400px to be even smaller?
# We'll add a new block inside the <=600px query for <=400px? But we can just adjust the existing <=600px.

# We'll leave the hero as is for now.

# 4. Ensure the demo tabs have good touch target: we already set min-height 48px and padding 14px 18px in mobile
# We'll leave that.

with open(r'C:\Users\Lenovo\DocuVeritas\css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Android optimizations applied: increased hamburger size, nav-links padding and font size.")