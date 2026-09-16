# Noir Avenue

> A product-oriented web application built to simulate the development of a real digital product, with a focus on Front-End engineering, maintainable architecture, API integration, technical decision-making, problem solving, and continuous product evolution.

🔗 **Live Application:** [Noir Avenue](https://luizfelipeosz.github.io/Noir-Avenue/)

---

## Overview

Noir Avenue is a marketplace-inspired web application designed to go beyond interface implementation.

The project simulates the development of a real digital product: understanding requirements, defining application behavior, making technical decisions, implementing features, integrating APIs, investigating problems, validating changes, deploying to production, and continuously evolving the system.

Development is organized incrementally, allowing technical decisions and architectural changes to be driven by actual product requirements rather than by adding complexity without a practical reason.

The project is primarily focused on **Front-End engineering**, while also implementing the backend and API layer necessary to understand and build complete application flows.

---

## Product Overview

Noir Avenue has a visual identity inspired by the atmosphere of New York at night and is structured around common requirements found in modern digital products.

Current and evolving product capabilities include:

* User registration and authentication
* Protected application areas
* Session management
* User account management
* Password recovery
* Password reset with expiring tokens
* Persistent application data
* Reusable UI components
* Structured application state
* API integration
* Database integration
* Email infrastructure
* Production deployment
* Progressive responsive improvements

The objective is not to reproduce a specific commercial platform, but to create a realistic environment for applying and validating Front-End engineering decisions.

---

# Engineering Approach

Noir Avenue is developed with a product-oriented engineering mindset.

Features are not treated as isolated coding exercises. Each implementation considers the relationship between:

```text
Product Requirement
        ↓
User / Business Need
        ↓
Functional Requirements
        ↓
Technical Constraints
        ↓
Technical Decision
        ↓
Implementation
        ↓
Validation
        ↓
Production
        ↓
Iteration
```

During development, decisions are guided by questions such as:

* What problem is this feature solving?
* What should happen from the user's perspective?
* Which parts of the system are affected?
* Which layer should own the responsibility?
* Can an existing component, service, or abstraction be reused?
* How will the change affect application state?
* What happens when the request fails?
* What happens when the user provides invalid data?
* How should loading, success, and error states behave?
* What are the trade-offs of the proposed solution?
* How can the implementation remain maintainable as the product grows?
* How can the change be validated before delivery?

This approach is intended to keep technical decisions connected to actual product requirements.

---

# Engineering Challenges & Problem Solving

One of the main goals of Noir Avenue is to document not only what was implemented, but also how problems were investigated and resolved.

The project has required investigation across different layers of the application, including the Front-End, API, database, authentication, email infrastructure, routing, persistence, and production deployment.

## Authentication & API Migration

**Problem**

The initial application relied heavily on client-side authentication and persistence.

As the product evolved, authentication required server-side validation and persistent user data.

**Investigation**

The application responsibilities had to be separated between the React client and the backend instead of relying exclusively on client-side state.

**Decision**

Introduce a Node.js/Express API with Prisma and SQLite and progressively move authentication responsibilities to the backend.

**Result**

Authentication became an API-driven flow with responsibilities distributed between the client and server.

---

## Password Recovery

**Problem**

Password recovery required more than a Front-End form. The flow needed secure token generation, expiration, persistence, email delivery, and token validation.

**Implementation**

```text
User
 ↓
React
 ↓
POST /api/auth/forgot-password
 ↓
Express
 ↓
Generate reset token
 ↓
Persist token + expiration
 ↓
Send recovery email
 ↓
User accesses reset flow
 ↓
Validate token
 ↓
Update password
```

The reset token lifecycle is handled by the backend, including expiration and validation.

This required integrating:

* Express routes
* Authentication services
* Prisma
* SQLite
* Cryptographic token generation
* Token expiration
* Nodemailer
* Front-End API integration
* User-facing feedback

The feature was implemented incrementally while investigating issues across the API, database, and email layers.

---

## Database & Persistence Investigation

During backend development, database behavior had to be investigated across different environments and file locations.

Instead of assuming that the application was reading the expected database, the issue was traced through the actual Prisma and SQLite configuration and runtime behavior.

This reinforced an important development practice:

> When application behavior is unexpected, investigate the system state and data flow before changing unrelated code.

---

## Front-End / Backend Responsibility Boundaries

As the application evolved, responsibilities were progressively separated between the client and server.

The Front-End is responsible for:

* User interaction
* Interface state
* Form handling
* Client-side navigation
* API consumption
* User-facing feedback
* Protected application flows

The backend is responsible for:

* Authentication
* Server-side validation
* User persistence
* Password recovery
* Token generation and validation
* Database access
* Email delivery
* API endpoints

This separation allows each layer to evolve independently while keeping responsibilities explicit.

---

## Production Routing

The application is deployed under a GitHub Pages repository path rather than a root domain.

This introduced differences between local development and production behavior, particularly around SPA routing and direct navigation to client-side routes.

The deployment configuration therefore accounts for the repository base path and SPA fallback behavior.

This is an example of a recurring principle throughout the project:

> A feature is not considered complete simply because it works locally. It must also behave correctly in the environment where it is delivered.

---

# Selected Technical Decisions

## React + SPA Architecture

React and React Router provide the foundation for the Single Page Application architecture.

This allows the application to manage client-side navigation while keeping interface components and application behavior organized by responsibility.

---

## Protected Routes

Protected routes establish a clear boundary between public and authenticated areas of the application.

Authentication state is checked before allowing access to protected experiences.

---

## Centralized Session Management

Session handling is centralized rather than allowing different pages to independently implement authentication logic.

This reduces duplicated behavior and makes session-related changes easier to maintain.

---

## Centralized Storage Constants

Persistent storage identifiers are centralized instead of being distributed throughout the application.

Current storage domains include:

```text
USER
SESSION
ACTIVITIES
FAVORITES
SETTINGS
HISTORY
```

This provides a single source of truth for client-side storage identifiers and reduces inconsistencies caused by duplicated string values.

---

## Progressive Backend Integration

The backend was introduced incrementally rather than replacing the entire client-side architecture at once.

This approach allows each capability to be migrated and validated independently.

The result is a controlled transition from a primarily client-side prototype toward a Front-End + API architecture.

---

## Componentization

Reusable components are introduced when they provide a meaningful improvement in consistency, maintainability, or reduction of duplication.

The goal is not to abstract every piece of the interface, but to establish useful boundaries where reuse and responsibility justify the abstraction.

---

## Design Tokens

Design tokens provide a centralized foundation for visual consistency and allow the visual system to evolve without scattering values throughout the application.

---

## Local Persistence

`localStorage` is currently used for client-side persistence where it is appropriate during the current stage of product development.

Persistent data that requires server-side ownership is progressively being moved toward the API and database layer.

---

## Incremental Delivery

Features are developed in small iterations.

This makes it possible for problems discovered during implementation to influence subsequent technical decisions instead of requiring the entire application architecture to be defined upfront.

---

# Architecture

The Front-End is organized around application responsibilities:

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

The backend is maintained separately:

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

The structure continues to evolve as product requirements increase.

### Architectural Principles

The project prioritizes:

* Clear separation of responsibilities
* Reusable components
* Predictable data flow
* Centralized configuration
* Explicit service boundaries
* Reduced unnecessary coupling
* Maintainable feature boundaries
* Incremental refactoring
* Practical technical decisions
* Evolution based on product requirements

The project intentionally avoids introducing abstractions or infrastructure without a concrete requirement for them.

---

# Front-End + Backend Architecture

The current architecture consists of a React application communicating with a Node.js API.

```text
┌─────────────────────────────┐
│        React Front-End      │
│                             │
│  UI • Routing • State       │
│  Forms • Feedback           │
└──────────────┬──────────────┘
               │
               │ HTTP / API
               ↓
┌─────────────────────────────┐
│       Express Backend       │
│                             │
│ Routes • Services • Rules   │
└──────────────┬──────────────┘
               │
        ┌──────┴──────┐
        ↓             ↓
    Prisma         Nodemailer
        │             │
        ↓             ↓
     SQLite        Email
```

The Front-End remains the primary focus of the project, while the backend provides the infrastructure required for real authentication, persistence, and server-side application behavior.

---

# API Integration

The Front-End communicates with the backend through HTTP APIs.

Current integration areas include:

* User registration
* Authentication
* Password recovery
* Password reset
* User-related operations
* Authentication state
* Server-side validation

The Front-End is responsible for orchestrating user interactions and translating API responses into predictable interface states.

The backend remains responsible for server-side rules, sensitive operations, persistence, and data validation.

---

# Authentication Flow

The current authentication architecture follows a client → API → service → database flow.

```text
User
 ↓
React Application
 ↓
Authentication API
 ↓
Express Route
 ↓
Authentication Service
 ↓
Prisma
 ↓
SQLite
```

This separation allows authentication rules to remain on the server instead of being trusted exclusively to client-side behavior.

---

# Error Handling & Application States

Application features consider more than the successful request path.

The current development approach considers states such as:

* Loading
* Success
* Validation failure
* Authentication failure
* Unauthorized access
* Invalid input
* Expired reset tokens
* Invalid reset tokens
* Network failures
* API unavailable
* Unexpected backend responses

The Front-End translates these states into appropriate user feedback while the backend remains responsible for server-side validation and business rules.

---

# Security Considerations

Security-sensitive flows are designed with server-side validation and controlled responsibility boundaries in mind.

Current considerations include:

* Authentication operations are handled through the API.
* Password-related operations are handled by the backend.
* Password reset tokens are generated server-side.
* Reset tokens have an expiration period.
* Reset tokens are validated before allowing password changes.
* Sensitive operations are not trusted solely to client-side validation.
* CORS is explicitly configured for the application's environments.
* Environment-specific configuration is kept outside the application source where appropriate.

Security remains an area of continuous improvement as the application evolves.

---

# Tech Stack

## Front-End

* React.js
* JavaScript (ES6+)
* TypeScript
* React Router
* Vite
* CSS3
* Sonner
* LocalStorage

## Backend

* Node.js
* Express
* TypeScript
* Prisma
* SQLite
* Nodemailer

## Development & Infrastructure

* Git
* GitHub
* GitHub Actions
* ESLint
* GitHub Pages

TypeScript is being progressively adopted across the application as part of its architectural evolution.

---

# Development Workflow

Although Noir Avenue is currently developed individually, its workflow is structured around practices used in collaborative software development.

The project makes use of:

* Feature-oriented development
* Branch-based development
* Focused commits
* Pull-request-oriented changes
* Incremental delivery
* Separation of responsibilities
* Continuous integration
* Production validation
* Refactoring as part of feature development

Changes are organized so that another developer can understand:

```text
What problem is being solved?
        ↓
Why is the change necessary?
        ↓
Which parts of the system are affected?
        ↓
What technical decision was made?
        ↓
What was implemented?
        ↓
How was it validated?
        ↓
What remains to evolve?
```

The purpose is to make technical decisions explicit and keep changes understandable and maintainable in a collaborative environment.

---

# Collaboration & Communication

Although the project is developed individually, its development process is structured around practices that translate into collaborative engineering environments.

Technical changes are treated as something that should be explainable to another developer.

The project therefore emphasizes:

* Clear responsibility boundaries
* Focused changes
* Understandable commits
* Feature-oriented branches
* Explicit technical decisions
* Reproducible development steps
* Validation before delivery
* Documentation of relevant architectural decisions

The objective is not only to make the code work, but to make the reasoning behind the implementation understandable.

---

# Quality & Validation

Quality is considered throughout development rather than only after implementation.

Current practices include:

* ESLint
* Production builds
* Git-based version control
* GitHub Actions
* Local development validation
* API validation
* Database validation
* Production environment validation
* Incremental refactoring
* Manual feature validation

Automated testing is part of the project's continued evolution.

---

# Deployment

Noir Avenue is deployed through GitHub Pages.

The Front-End deployment pipeline is automated with GitHub Actions.

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

Because the application is hosted under a repository subdirectory, Vite and routing configuration account for the GitHub Pages base path.

### Deployment Validation

The production environment is used to validate:

* Production builds
* Asset paths
* SPA routing
* Repository base paths
* Deployment artifacts
* Application behavior outside the local development environment

🔗 **Live Application:** [Noir Avenue](https://luizfelipeosz.github.io/Noir-Avenue/)

---

# Project Evolution

| Stage    | Product / Engineering Goal                                          | Status                              |
| -------- | ------------------------------------------------------------------- | ----------------------------------- |
| Sprint 1 | Authentication foundation and protected routes                      | ✅ Completed                         |
| Sprint 2 | Core product structure, profile and deployment                      | ✅ Completed                         |
| Sprint 3 | Session, persistence and application-state architecture             | 🔄 Evolved into backend integration |
| Current  | Real API authentication, database integration and password recovery | 🟢 In Progress                      |
| Next     | Catalog, product experience and continued API-driven evolution      | 🔵 Planned                          |

The sprint structure is intentionally flexible.

When implementation exposes architectural or product problems, subsequent work can change direction to address them instead of following a predetermined roadmap blindly.

---

# Roadmap

## Current Evolution

* API-driven authentication
* Database-backed user data
* Password recovery
* Password reset
* Session architecture
* Progressive migration from client-side persistence
* Product catalog
* Product detail experience
* Shopping cart
* API-driven product data

## Planned Improvements

* Search and filtering
* Favorites
* User settings
* Automated testing
* Improved responsive behavior
* Additional account-management capabilities
* Further TypeScript adoption
* Continued backend/API expansion
* Additional production hardening

The roadmap may evolve according to product requirements and technical discoveries made during implementation.

---

# Screenshots

Screenshots will be maintained as the product interface evolves.

### Login

*Add current Login screenshot here.*

### Dashboard

*Add current Dashboard screenshot here.*

### Profile

*Add current Profile screenshot here.*

### Product Experience

*Add catalog and product-detail screenshots as these experiences evolve.*

---

# Getting Started

## Front-End

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

### Production Build

Generate the production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Backend

The backend is maintained inside the `server` directory.

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

The backend currently provides the API foundation for authentication, user persistence, password recovery, token management, and progressive expansion of server-side functionality.

---

# Project Status

🟢 **Live & Actively Developed**

Noir Avenue has a deployed production version and continues to evolve through:

* New product features
* Front-End improvements
* API integration
* Backend development
* Database evolution
* Refactoring
* UX improvements
* Error handling
* Infrastructure improvements
* Production validation

The project is currently evolving from its original client-focused architecture toward a more complete Front-End + API product architecture.

---

# What This Project Demonstrates

## Front-End Engineering

* Building React applications around real product requirements
* Componentization
* Reusable UI patterns
* Client-side routing
* Protected application areas
* State and session management
* API integration
* Asynchronous application states
* Error handling
* Responsive interface development
* Progressive TypeScript adoption

## Software Engineering

* Separation of responsibilities
* Maintainable code organization
* Technical decision-making
* Debugging and root-cause investigation
* Incremental refactoring
* Git-based development
* CI/CD
* Production deployment
* Technical documentation

## Backend Integration

* Node.js
* Express APIs
* Prisma
* SQLite
* Authentication flows
* Password recovery
* Token lifecycle
* Email infrastructure
* CORS configuration
* Environment configuration

## Product Development

* Translating product requirements into technical requirements
* Considering user behavior and application states
* Evaluating technical trade-offs
* Breaking features into incremental deliveries
* Validating changes in real environments
* Iterating based on problems discovered during development
* Balancing implementation complexity with actual product requirements

## Problem Solving

The project demonstrates an iterative problem-solving process:

```text
Observe unexpected behavior
        ↓
Reproduce the problem
        ↓
Identify the affected layer
        ↓
Trace the data / execution flow
        ↓
Form possible causes
        ↓
Test the hypothesis
        ↓
Choose the appropriate solution
        ↓
Implement the change
        ↓
Validate locally
        ↓
Validate in production when applicable
        ↓
Document the relevant decision
```

This process is applied across Front-End, API, persistence, authentication, deployment, and infrastructure problems encountered during development.

## Collaborative Engineering Practices

Although Noir Avenue is currently an individual project, its workflow intentionally follows practices relevant to professional development teams:

* Feature-oriented work
* Branch-based development
* Focused commits
* Pull-request-oriented changes
* Clear responsibility boundaries
* Incremental delivery
* Continuous integration
* Technical documentation
* Production validation

The goal is to build not only software, but also development habits that support effective collaboration with other engineers.

---

# Author

**Luiz Felipe Oliveira Souza**

**Front-End Developer Jr.**

React.js • TypeScript • Next.js • Front-End Architecture • Product-Oriented Development

🔗 **GitHub:** [github.com/Luizfelipeosz](https://github.com/Luizfelipeosz)

🔗 **LinkedIn:** [linkedin.com/in/luiz-felipe-o-souza-9a488b372](https://linkedin.com/in/luiz-felipe-o-souza-9a488b372)

---

> Built with a focus on maintainability, user experience, technical decision-making, problem solving, incremental delivery, and continuous product evolution.
