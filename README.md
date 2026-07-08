# BreadMall

BreadMall is a polished bakery storefront built with React and Vite. It combines a warm landing page experience with a dedicated ordering flow so visitors can browse featured breads, place an order, and complete checkout in a smooth, modern experience.

## Features

- A branded landing page with hero content, bakery highlights, testimonials, and contact details
- A curated featured products section with a clear “Place order” call to action
- A dedicated order page for browsing products and managing the cart
- A separate checkout experience with delivery or pickup options
- Responsive styling designed to feel premium and approachable

## Tech Stack

- React
- Vite
- React Router DOM
- Custom CSS

## Getting Started

### Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Luwaiz/breadmall.git
   ```
2. Move into the project folder:
   ```bash
   cd breadmall
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Start the backend server from a second terminal:
   ```bash
   npm run dev:server
   ```
6. Open the local URL shown in the terminal for the frontend.

## Available Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint checks

## Project Structure

- `src/pages/` – landing, order, and checkout pages
- `src/components/` – reusable UI pieces like the hero, product cards, cart, and checkout form
- `src/data/` – product content and formatting helpers
- `src/App.css` and `src/index.css` – styling for the storefront

## Future Improvements

- Connect the checkout flow to a real backend or database
- Add payment integration
- Introduce order history and admin management
