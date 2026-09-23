import re

with open(r'C:\Users\Lenovo\DocuVeritas\css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We'll find the media query block for max-width: 768px
# Pattern: @media (max-width: 768px) { ... }
# We'll use a regex to capture the entire block, then replace inside.

# We want to be careful with nested braces, but there are none inside this media query.
# We'll use a regex that matches from @media (max-width: 768px) to the next closing brace that is at the same level.
# Since there are no nested media queries or other blocks with braces inside, we can do:

pattern = r'(@media\s*\(max-width:\s*768px\)\s*\{)([\s\S]*?)(\s*\})'

def replace_media_query(match):
    prefix = match.group(1)  # "@media (max-width: 768px) {"
    inner = match.group(2)   # the content
    suffix = match.group(3)  # "}"

    # Now, inside this inner, we want to replace the .hamburger block's width and height.
    # We'll look for .hamburger { ... } and replace width and height.
    # We'll do a similar inner replacement for the .hamburger block.
    inner_pattern = r'(\.hamburger\s*\{)([\s\S]*?)(\s*\})'
    def replace_hamburger_inner(m2):
        h_prefix = m2.group(1)  # ".hamburger {"
        h_inner = m2.group(2)   # content
        h_suffix = m2.group(3)  # "}"
        # Replace width and height in h_inner
        h_inner = re.sub(r'width:\s*40px;', 'width: 48px;', h_inner)
        h_inner = re.sub(r'height:\s*40px;', 'height: 48px;', h_inner)
        return h_prefix + h_inner + h_suffix

    inner = re.sub(inner_pattern, replace_hamburger_inner, inner)

    return prefix + inner + suffix

css = re.sub(pattern, replace_media_query, css)

with open(r'C:\Users\Lenovo\DocuVeritas\css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Updated hamburger size to 48x48px in mobile media query.")