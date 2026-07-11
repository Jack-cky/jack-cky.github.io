# Changelog

## [2.0.4] - 2026-07-11

Polished content and display refinements across the site.

### Added
- Added a smooth scroll function to the splash page `pages/splash-page.html` and `static/js/splash-page.js`.
- Added a new project entry and accompanying assets in `pages/projects.html` and `static/img/project/`.
- Added a clickable `services` word on the Services page that plays "buzzwords".
- Added animated fade and repositioning transitions when filtering project cards `static/js/header.js`.

### Changed
- Refined the certification layout and typography for improved readability `static/css/certificate/`.
- Updated job title and project descriptions across relevant pages for clarity.
- Adjusted education presentation to better reflect chronology and credentials.
- Revised wording across the About, Services, and Experience pages for clearer phrasing.
- Refactored the mobile menu lookups, education slider, and audio playback into shared helpers `static/js/header.js`.
- Simplified the project card layout to a block-based structure `static/css/projects.css`.

### Fixed
- Corrected an incorrect project date shown on the projects page.
- Stopped the splash page auto-scroll from continuing after users navigate away or switch tabs `static/js/splash-page.js`, `static/js/header.js`.
- Stopped audio from continuing to play after users navigate to another page or switch tabs `static/js/header.js`.
- Corrected grammar and wording, including "First Class Honours" and project descriptions `pages/about.html`, `pages/projects.html`, `pages/services.html`.

## [2.0.3] - 2025-06-18

Minor content additions and interactive improvements.

### Added
- Added a new certification entry and updated certificate artwork in `static/img/certificate/`.
- Added a new project and supporting documentation under `pages/projects.html`.
- Introduced the "Technologia" sound effect to `static/audio/` and initialised it in the site scripts.

### Changed
- Replaced the work-life gallery image and optimised images for faster loading.
- Modified the typewriter script to support text wrapping and multi-line items `static/js/header.js`.
- Renamed project category labels for clearer navigation.

### Fixed
- Restored missing images that were failing to load on some devices.
- Ensured the viewport meta uses device width for reliable mobile scaling.

## [2.0.2] - 2024-10-20

Cross-browser display adjustments and mobile viewport improvements.

### Changed
- Updated the viewport handling to use device width and improved responsive breakpoints.
- Tweaked CSS rules to harmonise layout across modern browsers `static/css/styles.css`.

### Fixed
- Resolved several CSS inconsistencies that affected layout on older browsers.

## [2.0.1] - 2024-10-19

Design refresh and functional enhancements.

### Changed
- Revamped the overall site design for a cleaner, more professional appearance.

## [1.0.1] - 2023-07-30

Initial repository.
