# MonksTrip 🌍✈️

Exclusive Travel Experiences & Luxury Destinations

## Overview
MonksTrip is a premium, static website for a luxury travel agency. It provides curated travel experiences, responsive design, and smooth user interactions built with modern web principles. The platform is designed to offer potential travelers a visually stunning and seamless booking journey.

## Tech Stack
* **HTML5** & **Vanilla JavaScript** (ES6+)
* **TailwindCSS** (via CDN for styling)
* **Supabase** (Authentication & Backend services)

## Project Structure
```text
/public         # Images, fonts, and other static assets
/components     # Reusable HTML/JS components (if applicable)
/pages          # Additional HTML pages (About, Services, Destinations, etc.)
/styles         # Global CSS style files
/lib            # Utility scripts, including Supabase client
index.html      # Main entry point (Home Page)
server.js       # Simple Node.js static server for local development
```

## Setup Instructions
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd travel-agency`
3. Environment Setup:
   - Copy the example environment file: `cp .env.example .env`
   - Fill in your actual Supabase credentials in the `.env` file or configure them in your build step/deployment provider.
4. Run Locally:
   - If you have Node.js installed, start the local server: `node server.js`
   - The site will be available at `http://localhost:3456`

## Environment Variables Guide
We use Supabase for backend authentication. Ensure these keys are never committed directly to the repository.
* `VITE_SUPABASE_URL`: Your Supabase Project URL.
* `VITE_SUPABASE_ANON_KEY`: Your Supabase Project API Anon Key.

For static deployments without a bundler, ensure these are injected during the build, or update the `lib/supabase-client.js` file with your credentials locally before deploying (while keeping `.gitignore` active).

## Deployment Instructions
This project is configured as a standard static site and can be seamlessly deployed on platforms like:
* **Vercel / Netlify / Cloudflare Pages**: Point the build directory to the root or `/` and deploy. No complex build scripts are required by default.
* **GitHub Pages**: You may need to configure base paths for routing if serving from a sub-directory, but the `index.html` structure remains the same.
