import re

css_path = r'C:/Users/Lenovo/DocuVeritas/css/style.css'

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Pattern to match the mobile media query (<=768px)
media_pattern = r'(@media\s*\(max-width:\s*768px\)\s*\{)([\s\S]*?)(\s*\})'

def replace_media_query(match):
    prefix = match.group(1)  # "@media (max-width: 768px) {"
    inner = match.group(2)   # the content
    suffix = match.group(3)  # "}"

    # 1. Adjust .hamburger width and height to 48px
    hamburger_pattern = r'(\.hamburger\s*\{)([\s\S]*?)(\s*\})'
    def replace_hamburger(m):
        h_prefix = m.group(1)
        h_inner = m.group(2)
        h_suffix = m.group(3)
        h_inner = re.sub(r'width:\s*40px;', 'width: 48px;', h_inner)
        h_inner = re.sub(r'height:\s*40px;', 'height: 48px;', h_inner)
        return h_prefix + h_inner + h_suffix
    inner = re.sub(hamburger_pattern, replace_hamburger, inner)

    # 2. Adjust .nav-links padding to 20px
    nav_links_pattern = r'(\.nav-links\s*\{)([\s\S]*?)(\s*\})'
    def replace_nav_links(m):
        nl_prefix = m.group(1)
        nl_inner = m.group(2)
        nl_suffix = m.group(3)
        nl_inner = re.sub(r'padding:\s*16px;', 'padding: 20px;', nl_inner)
        return nl_prefix + nl_inner + nl_suffix
    inner = re.sub(nav_links_pattern, replace_nav_links, inner)

    # 3. Adjust .nav-links a padding and font-size
    nav_links_a_pattern = r'(\.nav-links\s+a\s*\{)([\s\S]*?)(\s*\})'
    def replace_nav_links_a(m):
        nla_prefix = m.group(1)
        nla_inner = m.group(2)
        nla_suffix = m.group(3)
        nla_inner = re.sub(r'padding:\s*8px\s+16px;', 'padding: 12px 16px;', nla_inner)
        nla_inner = re.sub(r'font-size:\s*0\.9rem;', 'font-size: 1rem;', nla_inner)
        return nla_prefix + nla_inner + nla_suffix
    inner = re.sub(nav_links_a_pattern, replace_nav_links_a, inner)

    return prefix + inner + suffix

css = re.sub(media_pattern, replace_media_query, css)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Android optimizations applied: hamburger size 48x48px, nav-links padding 20px, nav-links a padding 12px 16px and font-size 1rem.")