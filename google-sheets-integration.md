# Google Sheets Integration Guide

## Overview
The website is built to work in two modes. By default, it loads curated sample data so the interface is immediately usable during design and testing. When a **published Google Sheets document** is available, the site can switch to live content without introducing a traditional CMS backend.

| Mode | Behavior | Use Case |
|---|---|---|
| Demo mode | Loads local sample data inside the front-end | Design review, early testing, prototype approval |
| Connected mode | Loads published sheet tabs through the Google Visualization JSON endpoint | Real multilingual content management by the business team |

## Supported Content Tabs
The current implementation expects three published tabs.

| Sheet tab | Purpose | Example records |
|---|---|---|
| `Products` | Wines and voucher products | Bottle wines, barrel wines, qvevri wines, voucher items |
| `Events` | Paid events and trade appointments | Tastings, supper clubs, masterclasses |
| `Blog` | Editorial article previews | Georgian grape stories, pairings, culture content |

## Required Multilingual Columns
Each content record should include localized fields using the suffix pattern requested in the brief.

| Field group | Example columns |
|---|---|
| Product or article title | `name_DE`, `name_EN`, `name_KA` |
| Main description | `description_DE`, `description_EN`, `description_KA` |
| Extended product data | `aroma_DE`, `taste_EN`, `recommendation_KA` |
| Event venue text | `venue_DE`, `venue_EN`, `venue_KA` |

## Recommended Product Columns

| Column | Notes |
|---|---|
| `id` | Stable unique ID |
| `category` | `bottle`, `barrel`, `qvevri`, or `voucher` |
| `image` | Public image URL |
| `price` | Numeric EUR value |
| `badge` | Short front-end label |
| `technology` | Bottle, barrel, qvevri, gift, etc. |
| `region` | Wine region |
| `grape` | Grape variety |
| `color` | White, red, amber, rosé |
| `type` | Dry, semi-dry, etc. |
| `volume` | Bottle size or product format |
| `featured` | `true` or `false` |
| Localized fields | `name_*`, `description_*`, `aroma_*`, `taste_*`, `recommendation_*` |

## Recommended Event Columns

| Column | Notes |
|---|---|
| `id` | Stable unique ID |
| `image` | Public image URL |
| `price` | Numeric EUR value; use `0` for by-request events |
| `badge` | Short event label |
| `date` | ISO datetime recommended |
| `seats` | Available seats |
| `volume` | Duration, e.g. `2.5h` |
| `type` | Paid event, by request, etc. |
| `venue_DE`, `venue_EN`, `venue_KA` | Venue localization |
| `name_*`, `description_*` | Main event content |

## Recommended Blog Columns

| Column | Notes |
|---|---|
| `id` | Stable unique ID |
| `image` | Public image URL |
| `date` | Publish date |
| `category` | Editorial grouping |
| `name_DE`, `name_EN`, `name_KA` | Headline |
| `description_DE`, `description_EN`, `description_KA` | Preview copy |

## How the Front-End Connects
The site checks a global browser configuration object. If a spreadsheet ID is present, it requests published tab data from Google Sheets and replaces the demo content.

```html
<script>
  window.GEORGIAN_WINE_CONFIG = {
    spreadsheetId: "YOUR_SPREADSHEET_ID",
    sheets: {
      products: "Products",
      events: "Events",
      blog: "Blog"
    }
  };
</script>
```

This object can be injected before the app bundle loads, or adapted later to use project settings, a small config file, or a lightweight admin layer.

## Google Sheets Publishing Steps

| Step | Action |
|---|---|
| 1 | Create the `Products`, `Events`, and `Blog` tabs |
| 2 | Add all multilingual `_DE`, `_EN`, `_KA` fields |
| 3 | Publish the spreadsheet or relevant tabs so they are publicly readable |
| 4 | Copy the spreadsheet ID from the Google Sheets URL |
| 5 | Set `window.GEORGIAN_WINE_CONFIG.spreadsheetId` in the page environment |
| 6 | Reload the site and verify that the CMS status changes from demo mode to connected mode |

## Notes for Google Sites Embedding
Because the website is single-page and hash-based, it is suitable for embedding in Google Sites via URL or iframe. The multilingual front-end logic and Google Sheets content loading happen entirely in the browser, which keeps the integration lightweight.

## Recommended Next Step
For production use, the next practical improvement would be to connect the current static checkout and form submissions to external tools such as Google Forms, payment workflows, or a future full-stack extension.
