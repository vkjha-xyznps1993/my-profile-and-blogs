# Project Overview: Vivek Jha's Personal Portfolio & Blog

This project is a personal portfolio and blog website for Vivek Jha, a Manager - AI/ML. It showcases his professional journey, core expertise, resume, portfolio of projects (synced with GitHub), and blog articles.

## Technology Stack
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
- **Icons:** Font Awesome 6
- **Fonts:** Google Fonts (Inter, Poppins)
- **Data:** JSON (`posts.json`) for blog content, GitHub API for repository data.
- **Hosting:** Optimized for static hosting (e.g., GitHub Pages).

## Architecture
The site follows a single-page application (SPA) layout with smooth scrolling navigation.
- **Dynamic Loading:** Blog posts are fetched from `posts.json` and GitHub repositories are pulled directly from the GitHub API using `fetch`.
- **Theme Management:** Supports Dark and Light modes, persisting via `localStorage`.
- **UI Design:** Uses a modern "Glassmorphism" aesthetic with responsive grid layouts.

## Key Files
- `index.html`: The main structural entry point of the application.
- `assets/js/script.js`: Contains all client-side logic:
    - Theme switching (Dark/Light).
    - Mobile navigation toggle.
    - Smooth scrolling and ScrollSpy for active section highlighting.
    - Dynamic fetching, filtering, and rendering of GitHub repositories.
    - Dynamic rendering of blog posts and modal-based article viewing.
    - Contact form validation.
- `assets/css/style.css`: Comprehensive styles including variables for themes, layout utility classes, and component-specific styles.
- `posts.json`: A local JSON-based data store for blog articles.
- `github_repos.html`: A snippet or auxiliary page for displaying GitHub repositories.

## Building and Running
As a static website, no compilation or build step is required.

### Local Development
To view the site locally, you can use any static file server:
- **VS Code:** Use the "Live Server" extension.
- **Python:** Run `python -m http.server 8000` in the root directory.
- **Node.js:** Run `npx serve .`.

### Testing
- **Visual Testing:** Manually verify responsive behavior on different screen sizes (mobile, tablet, desktop).
- **Functionality:** Ensure theme toggling, smooth scrolling, and modal popups work correctly.
- **API Integration:** Confirm GitHub repositories are fetched and categorized correctly.

## Development Conventions
- **Vanilla Only:** Avoid adding external frameworks (React, Tailwind, etc.) to keep the project lightweight and maintain the current architectural direction.
- **Targeting:** Use `data-` attributes (e.g., `data-nav-link`, `data-theme-toggle`) for JavaScript DOM selection to separate styling from logic.
- **Styling:** Adhere to the established CSS variables defined in `:root` and `[data-theme='light']`.
- **Content Updates:**
    - To add a new blog post, update `posts.json`.
    - To update the resume or expertise, modify the corresponding sections in `index.html`.
