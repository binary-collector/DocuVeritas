import re

with open(r'C:\Users\Lenovo\DocuVeritas\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Swap background classes for demo and how-it-works sections
# Demo section: change from "section section-light" to "section"
# How It Works section: change from "section" to "section section-light"

# Pattern for demo section
demo_pattern = r'(<section class=")section section-light(" id="demo">)'
# Pattern for how-it-works section
hiw_pattern = r'(<section class=")section(" id="how-it-works">)'

# Replace demo section to remove section-light
html = re.sub(demo_pattern, r'\1section\2', html)
# Replace how-it-works section to add section-light
html = re.sub(hiw_pattern, r'\1section section-light\2', html)

with open(r'C:\Users\Lenovo\DocuVeritas\index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Swapped background classes for demo and how-it-works sections.")