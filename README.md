# Noir Avenue

> A Front-End platform inspired by premium e-commerce experiences, built with a focus on maintainable architecture, predictable structure, and continuous product evolution.

🔗 **Live Project:** [Noir Avenue — GitHub Pages](https://luizfelipeosz.github.io/Noir-Avenue/)

Noir Avenue was created with a clear goal: to build a Front-End application that simulates challenges commonly found in real-world digital products, including authentication, state management, componentization, architectural organization, user experience, and production deployment.

The project goes beyond building interfaces. Each feature is developed with maintainability, component reuse, and long-term evolution in mind.

The application is currently deployed and actively developed through incremental sprints, with new features and architectural improvements being introduced continuously.

---

## Product Overview

Noir Avenue is a modern marketplace-inspired application built around a visual identity influenced by the atmosphere of New York at night.

The project aims to reproduce a realistic product development workflow, covering planning, implementation, problem-solving, feature integration, and production deployment.

### Project Goals

* Build a Single Page Application using React.
* Apply Front-End architecture and development best practices.
* Simulate a product-oriented development environment.
* Build reusable and consistent components.
* Implement authentication, protected routes, and local persistence.
* Make technical decisions with maintainability and future evolution in mind.
* Deploy and validate the application in a production environment.

---

## Tech Stack

* React.js
* JavaScript (ES6+)
* TypeScript *(being progressively introduced)*
* React Router
* Vite
* CSS3
* Sonner
* LocalStorage
* ESLint
* Git & GitHub
* GitHub Actions
* GitHub Pages

---

## Implemented Features

### Sprint 1 — Authentication Layer

* Login page.
* Registration page.
* Session persistence.
* "Remember email" functionality.
* Visual feedback using Sonner.
* Protected routes.
* Authentication control.

### Sprint 2 — Product Structure

* Initial dashboard.
* User profile.
* User information editing.
* Account deletion.
* Architectural organization.
* Reusable component structure.
* Design token implementation.
* Organized styling system.
* Visual identity improvements.
* Production build configuration.
* GitHub Pages deployment.
* Automated deployment through GitHub Actions.

---

## Roadmap

Noir Avenue is continuously evolving. Planned improvements include:

* Favorites system.
* User settings.
* Product catalog.
* Search and filtering.
* Shopping cart.
* API integration.
* Advanced responsive behavior.
* Automated testing.
* Progressive migration to TypeScript.

---

## Architecture

The project structure was designed with growth and predictability in mind.

```text
src
├── assets
├── components
├── pages
│   ├── Login
│   ├── Cadastro
│   ├── Dashboard
│   └── Perfil
├── routes
├── services
├── styles
├── utils
└── hooks
```

This organization provides:

* Clear separation of responsibilities.
* Easier maintenance.
* A foundation for new features.
* Greater predictability as the application evolves.
* A structure that can support future collaboration.

---

## Deployment

The project uses a deployment pipeline powered by GitHub Actions.

Whenever changes are pushed to the `main` branch, the application is built with Vite and automatically deployed to GitHub Pages.

### Deployment Flow

```text
Git Push
   ↓
GitHub Actions
   ↓
npm run build
   ↓
Vite
   ↓
GitHub Pages
   ↓
Live Application
```

This workflow allows the application to be validated not only locally, but also in a deployed production environment.

🔗 **Live Project:** [Noir Avenue](https://luizfelipeosz.github.io/Noir-Avenue/)

---

## Technical Decisions

Several technical decisions have been made throughout the development process:

* Using an SPA architecture for fluid navigation.
* Implementing protected routes to simulate authenticated environments.
* Using `localStorage` for persistence during the current development stage.
* Applying componentization to reduce coupling and improve maintainability.
* Using Design Tokens to maintain visual consistency.
* Structuring the application around continuous product evolution.
* Developing incrementally through organized sprints.
* Configuring Vite to support deployment under a subdirectory.
* Using `BrowserRouter` with `BASE_URL` for GitHub Pages compatibility.
* Automating the build and deployment process through GitHub Actions.

---

## Screenshots

### Login

Add an updated screenshot of the Login page here.

### Dashboard

Add an updated screenshot of the Dashboard here.

### Profile

Add an updated screenshot of the Profile page here.

> Screenshots will be updated as new features are incorporated into the product.

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Luizfelipeosz/Noir-Avenue.git
```

Navigate to the project directory:

```bash
cd Noir-Avenue
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### Production Preview

To generate and preview the production build locally:

```bash
npm run build
npm run preview
```

The production preview will be served by Vite.

---

## Development Approach

Noir Avenue is treated as a product under continuous development.

Each sprint introduces new functionality while also addressing common challenges in modern Front-End development:

* How can an application maintain a sustainable architecture as it grows?
* How can components scale without unnecessarily increasing complexity?
* How can user experience and maintainability be balanced?
* How should technical decisions account for long-term evolution?
* How can an application be validated beyond the local development environment?

More than a portfolio project, Noir Avenue represents a development approach based on **incremental delivery, technical decision-making, maintainability, and continuous product evolution**.

---

## Project Status

🟢 **Live and actively developed**

Noir Avenue has a deployed version and continues to receive new features, architectural improvements, and product enhancements.

---

## Author

**Luiz Felipe Oliveira Souza**

**Front-End Developer Jr.**

* React.js
* TypeScript
* Next.js
* Front-End Architecture
* SPAs
* Continuous Product Evolution

🔗 **GitHub:** [github.com/Luizfelipeosz](https://github.com/Luizfelipeosz)

🔗 **LinkedIn:** [linkedin.com/in/luiz-felipe-o-souza-9a488b372](https://linkedin.com/in/luiz-felipe-o-souza-9a488b372)

---

> Built with a focus on maintainability, user experience, technical quality, and continuous product evolution.
