import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove wishlist button
html = re.sub(r'\s*<button type="button" class="wishlist-btn[^"]*"[^>]*>[\s\S]*?</button>', '', html)

# Remove price badge
html = re.sub(r'\s*<div class="property-price-badge">[\s\S]*?</div>', '', html)

# Remove spec chips (Beds, Baths, Sq.Ft.)
# We want to remove the <div class="property-spec-chips"> and all its contents up to its closing </div>
# In the HTML, it's followed by closing divs for property-info-wrap, featured-property-card, and col.
# Wait, let's just match the <div class="property-spec-chips">...</div> block carefully.
html = re.sub(r'\s*<div class="property-spec-chips">[\s\S]*?</div>\s*</div>\s*</div>\s*</div>', '\n                            </div>\n                        </div>\n                    </div>', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('done')
