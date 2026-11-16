# Brand lock — AltruDigiTech

**Status:** Locked for public launch  
**Code source:** `src/utils/siteData.js` → `brand` + `business`

## Names

| Token | Value | Use |
|-------|--------|-----|
| **Legal / full name** | AltruDigiTech Digital Studio | Browser titles (`Seo`), footer ©, invoices, contracts |
| **Short name** | AltruDigiTech | Header logo, in-app copy, client credits |
| **Domain** | altrudigitech.com | Hosting, canonical URLs, email (`updates@`) |
| **Public contact (Gmail fallback)** | altrudigitech.studio@gmail.com | Destination for Email Routing; not shown on site |
| **Public contact (site)** | hello@altrudigitech.com | `business.email` / `mailto` — set up in [EMAIL_ROUTING.md](./EMAIL_ROUTING.md) |
| **Subdomain pattern** | `{slug}.altrudigitech.com` | Starter client URLs |
| **Client footer credit** | AltruDigiTech → altrudigitech.com | HTML template footers |

## Deprecated (do not use in copy)

- Altruism  
- Altruism Digital Studio  

Canonical git repo: **`bhalla1993/altrudigitech-studio`**. Legacy **`altruism`** GitHub Pages is retired — public URLs use **`altrudigitech.com`** (see `docs/REPOS.md`). Repo folder names are not public brand.

## Usage rules

1. **Header:** `business.shortName`  
2. **Page `<title>` / OG site name:** `business.name` via `Seo`  
3. **Body copy:** prefer **AltruDigiTech**; use full name once on About or legal contexts  
4. **Meta descriptions:** `pageSeo.*` in `siteData.js` — do not hardcode brand strings in pages  
5. **index.html:** keep fallback meta aligned with `business.defaultMetaDescription` and `brand.legalName`  
6. **Social:** “AltruDigiTech Builders” handles are fine; company page should match **AltruDigiTech Digital Studio** where possible  

## Related properties

Same umbrella, separate products: SparkShots, LocalTopSpot, Punchface — link as **Studio Labs**, not merged into the legal name.