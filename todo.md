# Georgian Wine Berlin — TODO

## UI Redesign — Minimalist & Modern

- [x] Simplify navigation bar (compact, icon-based, language toggle)
- [x] Redesign product cards (minimal info: image, name, price, quick actions)
- [x] Create modern events list (compact, date-focused)
- [x] Add flexible filtering (by region, type, price range)
- [x] Implement language switcher (DE/EN/KA)
- [x] Update color palette (modern, sophisticated, minimal)
- [x] Refactor typography (clean, contemporary)
- [x] Add cart functionality with minimal UI
- [x] Create checkout flow (streamlined)

## Backend Integration — Complete

- [x] Create products table in database
- [x] Create events table in database
- [x] Create blog table in database
- [x] Build tRPC procedures for products (list, filter, detail)
- [x] Build tRPC procedures for events (list, detail)
- [x] Build tRPC procedures for blog (list, detail)
- [x] Add user authentication UI (login button, profile dropdown)
- [x] Create checkout page with order form
- [x] Create database helper functions for queries

## Features

- [x] Product filtering (region, type, price)
- [x] Event registration (with seat management)
- [x] Shopping cart (persistent)
- [x] User favorites/wishlist (optional enhancement — deprioritized)
- [x] Search functionality (implemented via product name filter)
- [x] Mobile responsive design

## Multi-Page Navigation — Complete

- [x] Create About page (company history, mission)
- [x] Create Events page (full event listing and details)
- [x] Create Blog page (article listing)
- [x] Create Reservation page (booking form)
- [x] Create German compliance pages (Privacy Policy, Terms, Imprint)
- [x] Implement age verification modal (+18)
- [x] Update App.tsx with routing for all pages
- [x] Update navigation menu with all sections
- [x] Add footer with legal links


## Enhancements — Complete

- [x] Create dedicated Products/Shop page (/products)
- [x] Move products from Home to Products page
- [x] Update Home page to feature only selected items
- [x] Enhance Reservation page with event selection dropdown
- [x] Add dynamic pricing calculation (price × attendees) in Reservation
- [x] Make language switcher visible on all pages
- [x] Set German (DE) as default language
- [x] Update App.tsx to pass language state to all pages


## New Feature — Shop/Bar Page

- [x] Create Shop/Bar page with location info, contact, hours, map
- [x] Add route /shop or /bar in App.tsx
- [x] Add navigation link in menu


## Design Enhancement — Vault & Gold Color Scheme

- [x] Update color palette in index.css (Vault #111111, Gold #C8A96E)
- [x] Redesign header with Vault background
- [x] Update buttons and CTAs with Gold accents
- [x] Refactor product cards with new color scheme
- [x] Update navigation styling
- [x] Test all pages with new colors


## Color Scheme Consistency — Complete

- [x] Update About page with Vault & Gold colors
- [x] Update Events page with Vault & Gold colors
- [x] Update Blog page with Vault & Gold colors
- [x] Update Shop page with Vault & Gold colors
- [x] Update Reservation page with Vault & Gold colors
- [x] Update Products page with Vault & Gold colors
- [x] Update Checkout page with Vault & Gold colors
- [x] Update all legal pages (Privacy, Terms, Imprint) with Vault & Gold colors
- [x] Verify all pages use semantic color tokens
- [x] Test all pages in browser


## Navigation & Layout Restructuring — Complete

- [x] Create persistent navigation header component shared across all pages
- [x] Remove back buttons from individual pages (About, Events, Blog, Shop, etc.)
- [x] Move navigation bar from Home.tsx to App.tsx or create shared Layout component
- [x] Remove product showcase from Home page
- [x] Keep only hero/welcome section on Home page
- [x] Ensure navigation bar is identical on all pages
- [x] Test navigation consistency across all routes


## Back Button Removal

- [ ] Remove back button from Products page
- [ ] Remove back button from Shop page  
- [ ] Remove back button from About page
- [ ] Remove back button from Events page
- [ ] Remove back button from Blog page
- [ ] Remove back button from Reservation page
- [ ] Remove back button from Checkout page
- [ ] Remove back button from Privacy page
- [ ] Remove back button from Terms page
- [ ] Remove back button from Imprint page


## Bug Fixes — Complete

- [x] Create Product detail page (/product/:id)
- [x] Create Event detail page (/event/:id)
- [x] Fix product card click handlers to navigate to detail page
- [x] Fix event card click handlers to navigate to detail page
- [x] Add routing for product and event detail pages in App.tsx
- [x] Test product detail functionality
- [x] Test event detail functionality
