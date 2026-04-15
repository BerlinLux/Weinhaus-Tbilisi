# Georgian Wine Berlin — Sitemap and Wireframe

## Project Summary
The website is designed as a **single-page, hash-based public experience** so it can be embedded cleanly into Google Sites while still presenting all major commercial and brand sections in one continuous flow. The structure combines premium brand storytelling with practical commerce modules for products, events, vouchers, reservations, and future account access.

| Layer | Purpose | Implementation Direction |
|---|---|---|
| Brand layer | Present Georgian wine culture in a premium Berlin context | Editorial hero, story sections, visual identity, cultural explanations |
| Commerce layer | Support product sales, event tickets, and vouchers | Product grid, cart, checkout request flow, event add-to-cart actions |
| Service layer | Support tastings, contact, and wholesale communication | Reservation form, contact form, map, wholesale teaser |
| Content layer | Support multilingual updates via Google Sheets | `_DE`, `_EN`, `_KA` fields for structured content |

## Sitemap

| Section ID | Navigation Label | Core Content | Primary Action |
|---|---|---|---|
| `#home` | Home | Hero, brand message, premium positioning, quick highlights | Discover wines / reserve tasting |
| `#about` | About Us | Brand story, Georgian wine culture, bottle/barrel/qvevri concept | Continue to products |
| `#products` | Products | Filters, category browsing, product cards, product details | Add to cart |
| `#store` | Online Store | Voucher module, shared cart, checkout request form | Request checkout |
| `#events` | Events | Upcoming events, paid experiences, wholesale appointment teaser | Add ticket |
| `#blog` | Blog | Multilingual article previews | Open article |
| `#reservation` | Reservation | Tasting and private event reservation form | Send reservation request |
| `#login` | Login | Placeholder customer-area modules for future expansion | Future profile access |
| `#contact` | Contact | Address, map, phone, email, hours, contact form, CMS note | Send message |

## Wireframe Narrative
The layout intentionally avoids a generic centered landing page. Instead, it uses a paced editorial flow with alternating emphasis between **immersive brand presentation** and **practical conversion modules**.

| Sequence | Wireframe Role | Layout Description |
|---|---|---|
| 1 | Hero | Left-heavy typographic statement with CTA buttons; right-hand premium information panel and branded hero image |
| 2 | Category introduction | Asymmetrical split section with category cards and concise brand positioning |
| 3 | About | Visual heritage block paired with three conceptual story cards |
| 4 | Products | Large filter panel followed by responsive product grid and product detail modal |
| 5 | Store | Voucher selector on one side, shared cart and checkout form on the other |
| 6 | Events | Three-card event grid with date, venue, price, and ticket action |
| 7 | Blog | Editorial article list with preview cards and metadata |
| 8 | Reservation | Two-column reservation CTA with form and tasting visual |
| 9 | Login | Future-ready account modules for profile, history, wishlist, and wholesale access |
| 10 | Contact | Contact details, map, contact form, and Google Sheets CMS integration note |

## Interaction Model

| Interaction | Behavior |
|---|---|
| Main navigation | Hash-based anchors for Google Sites-friendly embedding |
| Language switch | Immediate front-end language update across content and interface |
| Product filtering | Search + category + technology + region + grape + color + type + price |
| Product details | Modal overlay for deeper product information |
| Cart | Shared state for wines, vouchers, and paid events |
| Forms | Static front-end submission flow ready for later external integration |
| Google Sheets mode | Uses sample data by default, but supports published Google Sheets tabs when configured |

## Future Extension Notes
The current front-end already establishes the information architecture for future integrations such as account login, payment processing, order persistence, wholesale portals, and richer blog detail pages. Those can be added without restructuring the public site because the navigation, section system, and multilingual data model are already in place.
