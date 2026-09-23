import re

with open(r'C:\Users\Lenovo\DocuVeritas\css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We'll replace the :root block with updated values.
# Instead of replacing the whole block, we'll replace specific lines.

# Update --text-secondary
css = re.sub(r'--text-secondary: #475569;', '--text-secondary: #334155;', css)
# Update --text-muted
css = re.sub(r'--text-muted: #64748b;', '--text-muted: #52606d;', css)
# Update --bg-secondary
css = re.sub(r'--bg-secondary: #f8fafc;', '--bg-secondary: #f1f5f9;', css)

# Also update --bg-card? Keep white.
# Update --bg-input? Keep white.

# Optionally adjust --gray-500? But that's used in dark theme? Actually grays are redefined in dark theme.
# We'll leave grays as they are.

with open(r'C:\Users\Lenovo\DocuVeritas\css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Light theme optimized: adjusted text-secondary, text-muted, and bg-secondary.")