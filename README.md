# Noir Avenue

> A product-oriented Front-End application inspired by premium e-commerce experiences, developed with a focus on maintainable architecture, user experience, technical decision-making, and continuous product evolution.

🔗 **Live Application:** [Noir Avenue](https://luizfelipeosz.github.io/Noir-Avenue/)

Noir Avenue is a web application created to simulate the development of a real digital product, going beyond interface implementation.

The project explores the Front-End development cycle: understanding product requirements, defining application behavior, making technical decisions, implementing features, organizing code, validating changes, deploying the application, and continuously improving the product.

The application is developed incrementally through organized sprints, where each iteration introduces new product capabilities while also addressing architectural and technical challenges discovered during development.

---

## Product Overview

Noir Avenue is a marketplace-inspired application with a visual identity influenced by the atmosphere of New York at night.

The product is designed to simulate common requirements found in modern digital applications, including:

* Authentication and account management.
* Protected application areas.
* User sessions.
* Persistent application data.
* Reusable UI components.
* Structured application state.
* Product-oriented feature development.
* API and database integration.
* Production deployment.

The objective is not to reproduce a specific commercial platform, but to create a realistic environment in which Front-End engineering decisions can be explored and validated.

---

## Product & Engineering Approach

Noir Avenue follows a product-oriented development approach.

Features are not treated as isolated coding exercises. Each iteration considers the relationship between **product requirements, user behavior, technical constraints, implementation, validation, and delivery**.

```text
Product Requirement
        ↓
User / Business Need
        ↓
Functional Requirements
        ↓
Technical Decision
        ↓
Implementation
        ↓
Validation
        ↓
Deployment
        ↓
Iteration
```

### Development Considerations

* What problem is the feature solving?
* What should happen from the user's perspective?
* Which parts of the application are affected?
* Where should the responsibility for the new behavior live?
* Can an existing component or service be reused?
* How will the change affect application state?
* How should the feature behave in different states?
* How can the implementation remain maintainable as the product grows?
* How can the feature be validated before delivery?

---

## Development Workflow

Although Noir Avenue is currently developed individually, its workflow is structured around practices commonly used in collaborative software development.

The project makes use of:

* Feature-oriented development.
* Git branches.
* Focused commits.
* Pull request-oriented changes.
* Incremental delivery.
* Code organization based on responsibility.
* CI/CD through GitHub Actions.
* Production validation.
* Refactoring as part of feature development.

The goal is to develop habits that translate naturally into collaborative engineering environments.

---

## Tech Stack

### Front-End

* React.js
* JavaScript (ES6+)
* TypeScript
* React Router
* Vite
* CSS3
* Sonner
* LocalStorage

### Backend

* Node.js
* Express
* Prisma
* SQLite
* Nodemailer

### Development & Infrastructure

* Git
* GitHub
* GitHub Actions
* ESLint
* GitHub Pages

TypeScript is being progressively adopted as part of the application's ongoing architectural evolution.

---

# Implemented Features

## Sprint 1 — Authentication Foundation

### Product Goal

Establish the initial account and access experience.

### Implemented

* Login page.
* Registration page.
* Authentication flow.
* Session persistence.
* Remember email functionality.
* Protected routes.
* Authentication control.
* User feedback through Sonner notifications.

### Engineering Focus

* Route protection.
* Authentication state.
* Persistence.
* Separation between public and authenticated areas.
* Reusable feedback mechanisms.

---

## Sprint 2 — Core Product Structure

### Product Goal

Transform the initial authentication prototype into a structured application.

### Implemented

* Initial dashboard.
* User profile.
* User information editing.
* Account deletion.
* Reusable component structure.
* Architectural organization.
* Design tokens.
* Organized styling system.
* Visual identity improvements.
* Production build configuration.
* GitHub Pages deployment.
* Automated deployment through GitHub Actions.

### Engineering Focus

* Componentization.
* Separation of responsibilities.
* Reusable UI patterns.
* Design consistency.
* Production deployment.

---

## Sprint 3 — Session & State Architecture

### Product Goal

Improve the reliability and predictability of user state across the application.

### Implemented

* Centralized session handling.
* Consistent session retrieval.
* Dashboard integration with the authenticated user.
* Improved session lifecycle management.
* Centralized storage identifiers.
* Improved persistence organization.
* Reduced duplicated storage logic.
* Improved notification feedback.
* Foundation for future application state evolution.

### Storage Domains

The application currently centralizes persistent storage identifiers for:

```text
USER
SESSION
ACTIVITIES
FAVORITES
SETTINGS
HISTORY
```

This creates a single source of truth for storage keys and reduces the risk of inconsistent persistence logic throughout the application.

### Engineering Focus

Sprint 3 focused less on adding visual features and more on improving the internal structure of the application.

The goal was to make future features easier to implement without spreading session and persistence responsibilities across unrelated parts of the codebase.

---

## Backend Evolution

Noir Avenue is progressively evolving from a primarily client-side application toward a Front-End + API architecture.

The backend currently uses:

* Node.js.
* Express.
* Prisma.
* SQLite.
* Nodemailer.

### Current Backend Foundation

* Express server.
* Environment configuration.
* CORS configuration.
* Health check endpoint.
* Authentication routes.
* Prisma integration.
* SQLite development database.
* User model.
* Password reset token model.
* Email infrastructure.

The backend is currently under active development.

Not every production feature has been migrated to the API yet. The architecture is being transitioned incrementally to avoid unnecessary rewrites and to allow each capability to be introduced and validated independently.

---

## Architecture

The application is organized around separation of responsibilities and predictable feature development.

The Front-End currently follows a structure based on application responsibilities:

```text
src
├── assets
├── components
├── constants
├── hooks
├── pages
│   ├── Login
│   ├── Cadastro
│   ├── Dashboard
│   └── Perfil
├── routes
├── services
├── styles
└── utils
```

The backend is maintained as a separate application:

```text
server
├── src
│   ├── routes
│   ├── services
│   ├── config
│   └── ...
├── prisma
│   └── schema.prisma
└── ...
```

The exact structure continues to evolve as new product requirements are introduced.

### Architectural Principles

The project prioritizes:

* Clear separation of responsibilities.
* Reusable components.
* Predictable data flow.
* Centralized configuration.
* Reduced unnecessary coupling.
* Maintainable feature boundaries.
* Incremental refactoring.
* Explicit technical decisions.
* Evolution based on real product requirements.

The project intentionally avoids over-engineering features before their requirements exist.

---

## State & Persistence

During the current development stage, Noir Avenue uses `localStorage` for client-side persistence.

Storage identifiers are centralized through application constants rather than being distributed throughout the codebase.

Current storage domains include:

```text
USER
SESSION
ACTIVITIES
FAVORITES
SETTINGS
HISTORY
```

This approach provides a predictable client-side persistence layer while the API and database architecture are being developed.

The long-term direction is to move appropriate persistent data from client-side storage toward the backend.

---

## User Experience

User experience is considered as part of feature implementation rather than as a separate visual layer.

Current considerations include:

* Clear authentication feedback.
* Protected navigation.
* Persistent user sessions.
* Consistent visual language.
* Reusable interface components.
* Feedback for user actions.
* Predictable application behavior.
* Progressive responsive improvements.

The objective is to make technical implementation and user experience evolve together.

---

## Technical Decisions

Several technical decisions have been made throughout the project's development.

### React + SPA Architecture

React and React Router provide the foundation for the application's Single Page Application architecture and client-side navigation.

### Protected Routes

Protected routes establish a clear boundary between public and authenticated experiences.

### Centralized Session Management

Session information is handled centrally to avoid different areas of the application independently managing authentication state.

### Centralized Storage Constants

Storage keys are maintained in a centralized location to reduce duplication and improve consistency.

### Componentization

Reusable components are preferred when they provide a meaningful reduction in duplication and improve consistency.

### Design Tokens

Design tokens provide a centralized foundation for visual consistency and future design-system evolution.

### Local Persistence

`localStorage` is currently used where client-side persistence is appropriate during the current development stage.

### Progressive Backend Integration

The backend is being introduced incrementally instead of replacing the existing architecture in a single migration.

### Incremental Delivery

Features are developed in small, organized iterations, allowing technical problems discovered during implementation to influence subsequent architectural decisions.

### Production Deployment

The application is automatically built and deployed through GitHub Actions, allowing changes to be validated in a real deployed environment.

---

## Quality & Validation

Quality is considered throughout the development process rather than only at the end of a feature.

Current practices include:

* ESLint.
* Production builds.
* Git-based version control.
* CI/CD through GitHub Actions.
* Local development validation.
* Production environment validation.
* Incremental refactoring.

Automated testing is part of the project's planned evolution.

---

## Deployment

Noir Avenue is deployed using GitHub Pages.

The deployment pipeline is automated through GitHub Actions.

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

Because the application is hosted under a repository subdirectory, the Vite and routing configuration accounts for the GitHub Pages base path.

### Deployment Responsibilities

The deployment workflow validates:

* Production builds.
* Vite configuration.
* Asset paths.
* SPA routing behavior.
* Deployment artifacts.

🔗 **Live Application:** [Noir Avenue](https://luizfelipeosz.github.io/Noir-Avenue/)

---

## Project Evolution

| Sprint   | Product Goal                          | Engineering Focus                   | Status      |
| -------- | ------------------------------------- | ----------------------------------- | ----------- |
| Sprint 1 | Establish user access                 | Authentication & protected routes   | ✅ Completed |
| Sprint 2 | Establish the core product experience | Components, profile & deployment    | ✅ Completed |
| Sprint 3 | Make application state predictable    | Session & persistence architecture  | 🟡 In Progress |
| Sprint 4 | Backend & product evolution           | API, database & backend integration | 🔵 Planned  |

Future sprints will continue combining product development with architectural improvements.

---

## Roadmap

### Next Sprint

* Backend integration.
* API-based authentication.
* Database-backed user data.
* Password recovery flow.
* Progressive migration of persistent data to the API.

### Planned

* Product catalog.
* Product detail pages.
* Search and filtering.
* Favorites system.
* User settings.
* Shopping cart.
* API-driven product data.
* Automated testing.
* Improved responsive behavior.
* Additional account-management features.
* Progressive TypeScript adoption.

The roadmap may evolve according to new product and technical requirements.

---

## Screenshots

Screenshots will be updated as the product interface evolves.

### Login

*Add current Login screenshot here.*

### Dashboard

*Add current Dashboard screenshot here.*

### Profile

*Add current Profile screenshot here.*

### Product Experience

*Add future catalog and product-detail screenshots here.*

---

## Getting Started

### Front-End

Clone the repository:

```bash
git clone https://github.com/Luizfelipeosz/Noir-Avenue.git
```

Navigate to the project:

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

Generate the production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Backend

The backend is maintained separately inside the `server` directory.

Navigate to the backend:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Configure the required environment variables according to the project's environment configuration.

Start the development server using the configured development command.

The backend currently runs locally and provides the foundation for the application's progressive migration toward API-driven functionality.

---

## Project Status

🟢 **Live & Actively Developed**

Noir Avenue has a deployed version and continues to receive:

* New product features.
* Architectural improvements.
* Backend development.
* Refactoring.
* UX improvements.
* Infrastructure improvements.

The project is currently transitioning from a primarily client-side application toward a more complete Front-End + API architecture.

---

## What This Project Demonstrates

Noir Avenue is intended to demonstrate practical Front-End engineering capabilities.

### Product Thinking

* Translating product needs into technical requirements.
* Considering user behavior and application states.
* Evaluating the impact of technical decisions on future features.
* Delivering functionality incrementally.

### Front-End Engineering

* React development.
* SPA architecture.
* Componentization.
* Routing.
* State and session management.
* Client-side persistence.
* Responsive UI development.
* API integration.

### Software Engineering

* Separation of responsibilities.
* Maintainable code organization.
* Git-based development.
* Incremental refactoring.
* CI/CD.
* Production deployment.
* Technical documentation.

### Team-Oriented Practices

Although the project is currently developed individually, its workflow intentionally follows practices relevant to collaborative environments:

* Feature-oriented changes.
* Branch-based development.
* Focused commits.
* Pull request-oriented workflows.
* Clear separation of responsibilities.
* Continuous integration.
* Incremental delivery.

The purpose is to build not only technical knowledge, but also the development habits required to contribute effectively to a professional engineering team.

---

## Author

**Luiz Felipe Oliveira Souza**

**Front-End Developer Jr.**

React.js • TypeScript • Next.js • Front-End Architecture • Product-Oriented Development

🔗 **GitHub:** [github.com/Luizfelipeosz](https://github.com/Luizfelipeosz)

🔗 **LinkedIn:** [linkedin.com/in/luiz-felipe-o-souza-9a488b372](https://linkedin.com/in/luiz-felipe-o-souza-9a488b372)

---

> Built with a focus on maintainability, user experience, technical decision-making, incremental delivery, and continuous product evolution.
