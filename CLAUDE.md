# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a romantic interactive web application called "will-you-date-me" - a playful, animated date invitation website. The application guides users through a multi-step process to plan a date, including location selection, date/time picking, food preferences, drinks, and optional note-leaving, with the ability to send email invitations.

## Architecture & Structure

**Frontend-Only Application**: Pure HTML, CSS, and vanilla JavaScript with no build process or server-side components.

**Core Files**:
- `index.html` - Main application structure with all UI cards/screens
- `script.js` - All application logic, animations, and interactivity
- `styles.css` - Complete styling including animations and dark mode support

**Multi-Card Flow**: The application uses a card-based UI system where different screens are shown/hidden:
1. Initial question card (nervous cat animation)
2. Success celebration card  
3. Location selection card
4. Date & time picker card
5. Food selection card
6. Drinks selection card
7. Note-leaving card
8. Final completion card

**State Management**: Uses in-memory JavaScript objects (`appState`) to track:
- Dark mode preference
- Selected locations, foods, drinks
- Date options
- User notes
- Map coordinates (when location is marked on map)

**External Dependencies**:
- Flatpickr - Date/time picker functionality
- Leaflet.js - Interactive map functionality for location marking
- Google Fonts (Quicksand)

## Key Features

**Interactive Elements**:
- Animated cherry blossom background
- Mouse-tracking heart trail effects
- Playful "NO" button that moves when hovered
- Nervous cat SVG with sweat drop animations
- Heart burst animations on selections
- Interactive Leaflet map for custom location marking (Ho Chi Minh City centered)

**Dark Mode**: Full dark mode support with system preference detection and manual toggle.

## Development Notes

**No Build Process**: This is a static website that can be opened directly in a browser - no npm, webpack, or other build tools required.

**Asset Structure**: Images organized in themed folders (`images/places/`, `images/food/`, `images/drinks/`) with SVG icons embedded inline.

**Animation System**: Heavy use of CSS animations and JavaScript-based Web Animations API for smooth transitions and effects.

**Map Integration**: Leaflet.js integration allows users to click on map to select custom locations when choosing "around the city" option. Selected coordinates are stored in appState and formatted as `map:lat,lng`.


## Deployment

**GitHub Pages**: Automated deployment via GitHub Actions workflow (`.github/workflows/static.yml`) that deploys the entire repository as static content to GitHub Pages on pushes to main branch.