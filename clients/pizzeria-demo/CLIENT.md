# Client: pizzeria-demo (studio template)

| Field | Value |
|-------|--------|
| **Slug** | `pizzeria-demo` |
| **Purpose** | Generic local pizzeria — delivery, takeout, menu, hours, catering leads |
| **Subdomain** | Not wired until a client signs |
| **Catalog** | Low visibility until reviewed (`recommended: false`, moderate `popularity`) |

Stock food photography via Pexels with attribution in footer.

## Sections (go-live copy)

- **Weekly specials** (`.specials`): edit the headline and the Tuesday / Friday / Sunday line.
- **Featured cards** above the menu tabs: lunch combo, family feast, party trays.
- **Gallery** (`#gallery`): six photos under “Hot out of the hearth.” Replace `img` `src` and `alt`, then add a matching Pexels credit in the footer.
- **Order apps**: Uber Eats, DoorDash, and Skip currently point at `#order`. Swap `href` for the shop’s real links.

## Google Maps (go-live)

Visit section uses placeholder **123 Main Street, Your Town, ON**:

- **Embed iframe** `src`: `https://maps.google.com/maps?q=YOUR+ENCODED+ADDRESS&hl=en&z=15&output=embed` (adjust `z` for zoom).
- **Get directions** button: `https://www.google.com/maps/search/?api=1&query=YOUR+ENCODED+ADDRESS` or the client’s Google Maps share / short link.

Update the address in the visit list, both URLs, and the iframe `title` together when the client signs.