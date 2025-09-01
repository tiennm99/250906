# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a romantic interactive web application called "will-you-date-me" - a playful, animated date invitation website. The application guides users through a multi-step process to plan a date, including location selection, date/time picking, food preferences, drinks, and optional note-leaving. **Note**: EmailJS integration was removed - no email functionality exists.

## Architecture & Structure

**Frontend-Only Application**: Pure HTML, CSS, and vanilla JavaScript with no build process or server-side components.

**Core Files**:
- `index.html` - Main application structure with all UI cards/screens
- `script.js` - All application logic, animations, and interactivity
- `styles.css` - Complete styling including animations and dark mode support

**Multi-Card Flow**: The application uses a card-based UI system where different screens are shown/hidden:
1. Initial question card (nervous cat animation)
2. Success celebration card (auto-advances after 3 seconds)
3. Location selection card (multiple choice - cafe, restaurant, cinema, park, mall, around-city, custom)
4. Date & time picker card (fixed date: 06/09/2025)
5. **Detail Cards** (single choice, shown based on location selections):
   - drinks-card (if cafe selected)
   - food-card (if restaurant selected)  
   - cinema-card (if cinema selected)
   - park-card (if park selected)
   - mall-card (if mall selected)
   - area-card (if around-city selected - shows interactive map)
   - custom-plan-card (if custom location selected)
6. Note-leaving card (optional)
7. Final completion card

**State Management**: Uses in-memory JavaScript objects (`appState`) to track:
- Dark mode preference
- Selected locations (array for multiple locations)
- Selected foods/drinks (single choice each)
- Date options (fixed date with user-selected time)
- User notes and custom plans
- Map coordinates (when location is marked on map)
- Detail queue and current index for card progression

**External Dependencies**:
- Flatpickr - Date/time picker functionality
- Leaflet.js - Interactive map functionality for location marking (centered on Ho Chi Minh City)
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

## UI Behavior & Flow Logic

**Selection Types**:
- **Location Selection**: Multiple choice (users can select multiple locations like cafe + restaurant + cinema)
- **Detail Cards**: Single choice (food, drinks, cinema, mall, park activities, custom plans)
- **Date/Time**: Single time selection with immediate save on blur/change

**Button Text Logic**: 
- Buttons dynamically show appropriate next step text using `getNextStageButtonText()` function
- Example: After selecting drinks, button shows "Let's pick food ♥" if restaurant was also selected
- Uses detail queue system to determine correct flow progression

**Card Transitions**:
- Detail cards use `showNextDetailOrContinue()` for proper sequential flow
- Cards progress through detail queue based on selected locations
- Priority order: cafe → restaurant → cinema → park → mall → around-city → custom

**DateTime Behavior**:
- User selects time → "Confirm" button saves and shows "Perfect time! 💕"
- Time input remains editable after confirmation
- "Continue" button proceeds to next stage
- Auto-saves on time picker change events

**Image Assets**: 
- All image filenames use hyphens instead of spaces (e.g., `Shin-Cau-be-but-chi.jpg`)
- Images organized in `/images/places/`, `/images/food/`, `/images/drinks/`, `/images/cinema/`, `/images/park/`

## Common Issues & Fixes

**Missing Animation Functions**: 
- If `createFloatingHeart()` errors occur, use `createHeartBurst(element, count)` instead
- Heart animations: `createHeart()`, `createHeartBurst()`, `createRandomHeart()`

**Button Centering**: 
- Single buttons use `justify-content: center` in their container
- `.note-actions` and similar containers should center single buttons

**Textarea Styling**:
- Both `#note-textarea` and `#custom-plan-textarea` share same styling for consistency
- Includes dark mode support and focus effects

## Deployment

**GitHub Pages**: Automated deployment via GitHub Actions workflow (`.github/workflows/static.yml`) that deploys the entire repository as static content to GitHub Pages on pushes to main branch.