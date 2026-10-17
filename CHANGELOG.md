# Changelog

## [2.1.0] - 2026-10-17

Introduced project video previews and expanded the portfolio with new content, interactions, and responsive layout improvements.

### Added
- Added a personal bio section with a link to the Markov decision process reference `pages/about.html`.
- Added a horizontal certification marquee with hover-to-pause behavior `static/css/about.css`, `static/js/header.js`.
- Added View Transition animations to project category filtering `static/js/header.js`.
- Added the HKHS Code Search project and its preview assets and links `pages/projects.html`, `static/img/project/`, `static/video/`.
- Added video previews and a modal video player for project cards `pages/projects.html`, `static/css/projects.css`, `static/js/header.js`, `static/video/`.
- Added Fabric and GitHub certifications `pages/about.html`, `static/img/certificate/`.

### Changed
- Moved the certification badges into the self-paced learning section and reorganised their presentation `pages/about.html`.
- Replaced the project preview play icon with a labelled `Preview` overlay and hover treatment `static/css/projects.css`.
- Updated the Experience page job title and employment end date `pages/experience.html`.
- Changed the splash-page typewriter animation to pause while the tab is hidden and resume when it becomes visible, removed manual line wrapping, and changed the completed animation to jump to the page end `static/js/splash-page.js`.
- Simplified responsive menu state handling and added discrete display transitions `static/css/header.css`, `static/js/header.js`.
- Moved the services audio source into the page markup and standardised audio cleanup across page navigation `pages/services.html`, `static/js/header.js`.
- Refined the education slideshow timing, layering, and self-introduction image positioning `static/css/about.css`, `static/js/header.js`.
- Updated the shared page shell and footer layout to keep the footer in the page flow and fill the viewport `static/css/general.css`, `static/css/footer.css`.
- Consolidated the Experience card hover transitions and updated project card grid behavior `static/css/experience.css`, `static/css/projects.css`.
- Updated shared email trigger selectors and project card layout behavior `static/js/footer.js`, `template/header.html`, `template/footer.html`, `static/css/projects.css`.
- Updated the GitHub social icons used in the shared header and footer `static/img/social/github-bk.svg`, `static/img/social/github-gd.svg`.

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
