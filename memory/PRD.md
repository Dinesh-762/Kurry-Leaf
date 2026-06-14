# Kurry Leaf Restaurant Website - PRD

## Original Problem Statement
Build a professional, modern, mobile-responsive restaurant website for "Kurry Leaf". Premium olive-green/dark luxury theme.

## Core Features (Implemented)
- **Home**: Hero with video bg, rating badge (4.0★/108 Google Reviews), CTAs
- **About**: Restaurant story with values grid
- **Menu**: Categorized food menu with add-to-cart (frontend-mocked)
- **Offers**: Special deals and delivery info
- **Gallery**: Photo gallery with lightbox, glassmorphism hover, warm gradient overlay, zoom effect
- **Reviews**: Google Reviews auto-sync (backend API), review cards, "Leave a Review" redirect
- **Google Review Prompt**: Smart rating (4-5★→Google, 1-3★→private feedback)
- **Contact**: Form (WhatsApp), Google Maps embed + fallback, contact cards
- **Admin Panel**: Settings (frontend-mocked)
- **Order Tracking**: Status page (frontend-mocked)

## Tech Stack
- **Frontend**: React, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: FastAPI, httpx
- **Database**: MongoDB (certifi for Atlas SSL)

## What's Been Implemented

### Session 1-3 (Previous Forks)
- Full website, premium theme, deployment hardening, branding removal

### Session 4 (March 8, 2026)
- Mobile header fix, Google Review Prompt, branding removal CSS+JS

### Session 5 (March 10, 2026)
- Google Reviews auto-sync backend, rewritten Reviews section, QR section

### Session 6 (March 12, 2026)
- Backend redirect endpoint for Google review (iframe bypass)

### Session 7 (April 1, 2026)
- **Fixed**: Review "Leave a Review" button uses relative URL to avoid CSS branding rule hiding it
- **Fixed**: Google Maps embed with proper search-based URL + "Open in Google Maps" fallback
- **Removed**: QR scanner section (per user request)
- **Enhanced**: Gallery images with rounded-xl, warm gradient overlay, glassmorphism caption, zoom hover, shadow-lg
- **Fixed**: Mobile keyboard overlap (CSS scroll-margin-top for focused inputs)
- **Replaced**: Logo with new circular brown/gold Kurry Leaf logo (navbar + footer)
- **Verified**: Full mobile responsiveness at 320px and 375px

### Session 8 (Feb 14, 2026)
- **Added**: Full restaurant menu (130+ items across 13 categories) from uploaded Kurry Leaf PDF
  - New `/app/frontend/src/data/menuData.js` catalog (excludes blank pages 9-10)
  - Redesigned `MenuSection.jsx` with dual-layout: image cards for Signature + elegant typography rows for all other categories (dotted-leader luxury menu style)
  - Pill-style scrollable category tabs with edge fades, ChevronLeft/Right buttons (desktop) and auto-scroll-into-view on selection
  - Per-category header with leaf decorator + uppercase tracking tagline
  - Veg marker, Hindi/Marathi descriptions, Chef's Special badges (Sparkles icon)
  - Inline quantity controls + cart integration preserved
  - Mobile floating cart summary repositioned above WhatsApp FAB

## Key API Endpoints
- `GET /api/reviews/google` - Returns synced reviews data
- `GET /api/reviews/redirect` - 302 redirect to Google write-review page
- `GET /api/health` + `/health`, `/healthz`, `/ready`, `/live` - Health checks

## Backlog
- Add GOOGLE_PLACES_API_KEY for live review sync
- Custom domain connection (user handles)

## Test Reports
- `/app/test_reports/iteration_4.json` - All tests PASS (100%)
