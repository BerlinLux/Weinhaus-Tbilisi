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

- [x] Remove back button from Products page
- [x] Remove back button from Shop page  
- [x] Remove back button from About page
- [x] Remove back button from Events page
- [x] Remove back button from Blog page
- [x] Remove back button from Reservation page
- [x] Remove back button from Checkout page
- [x] Remove back button from Privacy page
- [x] Remove back button from Terms page
- [x] Remove back button from Imprint page


## Bug Fixes — Complete

- [x] Create Product detail page (/product/:id)
- [x] Create Event detail page (/event/:id)
- [x] Fix product card click handlers to navigate to detail page
- [x] Fix event card click handlers to navigate to detail page
- [x] Add routing for product and event detail pages in App.tsx
- [x] Test product detail functionality
- [x] Test event detail functionality


## User Authentication — Complete

- [x] Add login button to Navigation component
- [x] Implement Manus OAuth login flow (redirect to portal)
- [x] Add user profile dropdown menu (profile, orders, logout)
- [x] Create user Profile/Dashboard page
- [x] Display user info (name, email, order history)
- [x] Add order history view
- [x] Add account settings page
- [x] Wire authentication to cart persistence
- [x] Wire authentication to reservation history
- [x] Test complete authentication flow


## Bug Fixes — Complete

- [x] Fix cart functionality - products not being added to cart (ProductDetail.tsx now uses CartContext)
- [x] Hide language selector from Shop page header
- [x] Improve Reservation page quantity controls with +/- buttons
- [x] Fix Blog 'Mehr lesen' links to open article detail pages
- [x] Add legal links to footer (Privacy, Terms, Imprint, BattG)


## Homepage Enhancements — Complete

- [x] Add promotions banner section (registration discount, bulk purchase deals, free shipping)
- [x] Add latest events showcase section
- [x] Add wine club membership call-to-action
- [x] Add wine club membership option to navigation menu


## Wine Club Implementation — Complete

- [x] Create dedicated Wine Club page/section and wire navigation menu to it

## Cart Persistence — Complete

- [x] Connect cart to persistent storage (localStorage) for better UX

## Cart Integration — Complete

- [x] Wire Products page to use CartContext for add to cart
- [x] Wire Checkout page to display items from CartContext
- [x] Add cart display in navigation header


## Custom Notifications — Complete

- [x] Create notification context for custom alerts
- [x] Add notification display component
- [x] Wire notifications to key user actions (add to cart, form submissions, etc.)


## Color Scheme Redesign — Complete

- [x] Update color palette to white background with black text and gold accents
- [x] Make product cards transparent with rgba background
- [x] Update all buttons to gold color
- [x] Ensure consistent styling across all pages

## Stripe Integration — Complete

- [x] Add Stripe payment integration for product purchases and wine club membership
- [x] Create checkout session handler
- [x] Implement webhook for payment confirmation
- [x] Add payment history page


## Frontend Tests — Complete

- [x] Add frontend tests for cart persistence (localStorage) - 8 passing tests
- [x] Add Stripe integration tests (server-side payment helpers) - 15 passing tests


## Interface Refinement — Complete

- [x] Create Georgian design elements (decorative crosses, patterns)
- [x] Add vine leaves and branches decorations
- [x] Implement 3D visual effects and shadows
- [x] Enhance typography with better hierarchy
- [x] Add decorative borders and dividers
- [x] Integrate decorative elements into Home.tsx
- [x] Integrate decorative elements into Navigation.tsx
- [x] Integrate decorative elements into Products.tsx
- [x] Polish spacing and alignment
