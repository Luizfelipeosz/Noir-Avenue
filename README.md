# Noir Avenue

> A product-oriented marketplace application built to simulate the development of a real digital product — from interface and user experience to API integration, authentication, persistence, checkout flows, deployment, debugging, and continuous product evolution.

[![Live Application](https://img.shields.io/badge/Live%20Application-Noir%20Avenue-111111?style=flat-square)](https://luizfelipeosz.github.io/Noir-Avenue/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-3178C6?style=flat-square\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=flat-square\&logo=vite\&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square\&logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-API-000000?style=flat-square\&logo=express\&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square\&logo=prisma\&logoColor=white)](https://www.prisma.io/)

🔗 **Live Application:** https://luizfelipeosz.github.io/Noir-Avenue/

---

## About the Product

**Noir Avenue** is a marketplace-inspired web application designed around the development of a realistic digital product.

The project started with a Front-End focus and progressively evolved into a **React + API architecture**, introducing authentication, persistent data, password recovery, database integration, product browsing, cart management and checkout experiences.

The objective is not to reproduce an existing marketplace.

The objective is to simulate the type of engineering work involved in building and evolving a real product:

```text
Product Requirement
        ↓
User Flow
        ↓
Technical Requirement
        ↓
Architecture / Responsibility
        ↓
Implementation
        ↓
Validation
        ↓
Production
        ↓
Feedback / Investigation
        ↓
Iteration
```

This means the project is intentionally developed around **real application behavior**, rather than isolated UI screens.

---

# Product Experience

Noir Avenue is structured around a marketplace journey:

```text
Authentication
      ↓
Dashboard
      ↓
Profile
      ↓
Catalog
      ↓
Product Selection
      ↓
Cart
      ↓
Checkout
      ↓
Order Flow
```

The product also includes account and authentication flows:

```text
Register
   ↓
Login
   ↓
Authenticated Session
   ↓
Profile / Dashboard
   ↓
Account Management
```

Password recovery follows a server-side flow:

```text
Forgot Password
      ↓
API
      ↓
Token Generation
      ↓
Database
      ↓
Recovery Email
      ↓
Reset Link
      ↓
Token Validation
      ↓
Password Update
```

The application is continuously evolving, so individual flows may gain additional functionality as product requirements increase.

---

# Current Product Capabilities

### Authentication & Account

* User registration
* Login
* Session management
* Protected application areas
* User profile
* Account-related data
* Password recovery
* Password reset
* Expiring reset tokens
* Server-side authentication validation

### Marketplace Experience

* Product catalog
* Product categorization
* Reusable product cards
* Product selection
* Shopping cart
* Cart state management
* Quantity and subtotal handling
* Free-shipping business rule
* Checkout experience
* User information integration during checkout
* Responsive marketplace interface

### Application Architecture

* React SPA
* React Router
* Component-based architecture
* Centralized application state where appropriate
* Reusable UI components
* API service layer
* Authentication boundaries
* Client/server responsibility separation
* Persistent client-side state where appropriate
* Progressive TypeScript adoption

### Backend

* Node.js
* Express
* TypeScript
* REST API
* Prisma
* SQLite
* Authentication services
* Password reset token lifecycle
* Database persistence
* Email delivery with Nodemailer
* CORS configuration
* Environment-based configuration

### Delivery

* Git-based development
* Feature-oriented branches
* Focused commits
* GitHub Actions
* Automated Front-End deployment
* GitHub Pages
* Production validation
* SPA routing under a repository base path

---

# Engineering Focus

The primary engineering focus of Noir Avenue is **Front-End development**.

The project is intentionally centered around:

* React
* TypeScript
* Componentization
* Application architecture
* State management
* Routing
* API integration
* Authentication flows
* UX and responsive behavior
* Error and loading states
* Maintainability
* Refactoring
* Product-oriented decision-making

The backend exists to support the Front-End with realistic application capabilities and to provide a better understanding of how responsibilities are distributed across a modern web application.

> **The project is Front-End first, with practical backend and API development used to build complete product flows.**

---

# Why the Project Goes Beyond a UI

A marketplace can be implemented visually with pages, buttons and cards.

That is not the engineering challenge this project is trying to simulate.

A real product also needs to answer questions such as:

* What happens when the API is unavailable?
* Where should authentication rules live?
* Which layer owns a specific responsibility?
* What happens when a reset token expires?
* How should invalid input be handled?
* What should the interface display while data is loading?
* How should cart state be preserved?
* Which user information can be reused during checkout?
* What happens when local development behaves differently from production?
* How does a route behave when accessed directly on GitHub Pages?
* Is a component actually reusable or is abstraction adding unnecessary complexity?
* What should be changed when a feature exposes an architectural problem?

These questions influence implementation decisions throughout the project.

---

# Technical Decision-Making

Noir Avenue follows a simple principle:

> **Architecture should solve product problems, not create complexity for its own sake.**

Before implementing a feature, the development process considers:

1. What user or product problem is being solved?
2. What should the user experience?
3. Which parts of the application are affected?
4. Which layer should own the responsibility?
5. Can an existing abstraction be reused?
6. What states can the feature have?
7. What happens when something fails?
8. What are the technical trade-offs?
9. How can the change be validated?
10. Does the implementation remain understandable as the product grows?

This has led to several architectural changes during the project's evolution.

---

# Architecture

## Front-End

```text
src/
├── assets/
├── components/
├── constants/
├── hooks/
├── pages/
│   ├── Login/
│   ├── Cadastro/
│   ├── Dashboard/
│   ├── Perfil/
│   ├── Catalogo/
│   ├── Carrinho/
│   └── Checkout/
├── routes/
├── services/
├── styles/
└── utils/
```

The exact structure continues to evolve according to feature boundaries and application requirements.

The goal is not to create the largest possible folder hierarchy.

The goal is to keep responsibilities understandable and changes localized.

---

# Front-End / Backend Architecture

The current application follows a client → API → service → persistence architecture.

```text
┌───────────────────────────────────┐
│           React Front-End         │
│                                   │
│ UI                                │
│ Routing                           │
│ Forms                             │
│ Client State                      │
│ User Feedback                     │
│ API Consumption                   │
└────────────────┬──────────────────┘
                 │
                 │ HTTP / REST
                 ↓
┌───────────────────────────────────┐
│          Express API              │
│                                   │
│ Routes                            │
│ Validation                        │
│ Authentication                    │
│ Application Services              │
└───────────────┬───────────────────┘
                │
        ┌───────┴────────┐
        ↓                ↓
   ┌─────────┐      ┌────────────┐
   │ Prisma  │      │ Nodemailer │
   └────┬────┘      └─────┬──────┘
        ↓                  ↓
     SQLite              Email
```

The Front-End remains the primary area of the project, while the backend provides the infrastructure required for realistic application flows.

---

# Front-End Responsibilities

The React application owns responsibilities related to the user experience and client-side application behavior.

Examples include:

* Rendering interfaces
* Managing forms
* Client-side navigation
* UI state
* Loading states
* Success and error feedback
* Cart interactions
* Checkout interactions
* API consumption
* Protected route behavior
* Responsive behavior
* Translating API responses into user-facing states

The Front-End does not assume that client-side validation is sufficient for sensitive operations.

---

# Backend Responsibilities

The backend owns server-side responsibilities that should not depend exclusively on client-side behavior.

Examples include:

* Authentication
* Server-side validation
* User persistence
* Password recovery
* Password reset
* Token generation
* Token expiration
* Token validation
* Database access
* Email delivery
* API endpoints
* CORS configuration

This separation allows the client and server to evolve independently while keeping responsibilities explicit.

---

# Authentication

Authentication evolved from an initially client-focused implementation into an API-driven architecture.

The current flow is:

```text
User
 ↓
React
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

The Front-End handles the user experience.

The backend handles authentication rules, validation and persistence.

This transition was implemented incrementally rather than rewriting the entire application at once.

---

# Password Recovery

Password recovery is implemented as a complete application flow rather than only a Front-End form.

```text
User requests recovery
          ↓
POST /api/auth/forgot-password
          ↓
Backend validates request
          ↓
Generate secure token
          ↓
Persist token + expiration
          ↓
Send recovery email
          ↓
User opens reset link
          ↓
Validate token
          ↓
Update password
```

The implementation involves:

* Express
* TypeScript
* Prisma
* SQLite
* Cryptographic token generation
* Token expiration
* Nodemailer
* React API integration
* User-facing validation states

Reset tokens are handled server-side and expire after a defined period.

---

# Database Investigation & Debugging

One of the more practical backend problems encountered during development involved SQLite database persistence.

Application behavior suggested that data was not being persisted as expected.

Instead of changing unrelated application code, the problem was investigated through:

```text
Application behavior
        ↓
Prisma configuration
        ↓
DATABASE_URL
        ↓
SQLite file location
        ↓
Runtime database
        ↓
Stored records
```

The investigation revealed that multiple SQLite database files existed in different locations and that the application was using a different database from the one initially inspected.

The issue reinforced an important engineering practice:

> **When the observed behavior contradicts expectations, inspect the actual runtime state and data flow before changing the implementation.**

This was a concrete debugging problem involving configuration, filesystem state, Prisma and SQLite rather than a purely theoretical architecture exercise.

---

# Production Routing

The application is deployed under:

```text
/Noir-Avenue/
```

rather than directly from the root domain.

This created differences between local development and production behavior, especially when directly accessing client-side routes.

The deployment therefore required configuration for:

* Vite base paths
* React Router
* GitHub Pages
* SPA fallback behavior
* Direct route access
* Production asset paths

The project includes a fallback mechanism for SPA routes so that URLs such as password-reset flows can continue to work after deployment.

This is an example of an important product-development principle:

> **A feature is not complete simply because it works locally.**

---

# Checkout & Product Flow

The marketplace experience has progressively evolved from isolated interface screens toward a connected product flow.

The current direction is:

```text
Catalog
   ↓
Product Selection
   ↓
Cart
   ↓
Quantity / Subtotal
   ↓
Customer Information
   ↓
Shipping
   ↓
Payment Selection
   ↓
Order Review
```

The checkout experience is designed to simulate the behavior and information architecture of a real marketplace.

Where appropriate, information already available from the user's account can be reused instead of asking for the same data again.

The checkout is currently a **product-flow simulation**; it does not represent a real payment processor or financial transaction.

---

# State Management

State is introduced according to the responsibility of the feature.

Examples include:

* Authentication/session state
* Cart state
* Form state
* UI state
* Loading states
* API request states
* Persistent client-side state

For example, cart behavior is centralized through application-level state rather than duplicating cart logic across individual pages.

The goal is predictable data flow without introducing state-management infrastructure that the product does not currently require.

---

# Componentization

Reusable components are created when they provide a meaningful benefit.

Examples include:

* Product cards
* Form elements
* Navigation elements
* Dashboard sections
* Account interfaces
* Shared UI patterns

The project intentionally avoids creating abstractions simply to increase the number of components.

The guiding question is:

> **Does this abstraction make the product easier to change, reuse or understand?**

---

# Client-Side Persistence

`localStorage` is used for client-side data where appropriate during the current stage of the product.

Examples include application-level preferences and temporary client-owned state.

Persistent data that requires server-side ownership is progressively moving toward:

```text
React
 ↓
API
 ↓
Database
```

This represents an ongoing architectural evolution rather than an artificial requirement to migrate everything at once.

---

# Error & Application States

Features are designed around more than the happy path.

The application considers states such as:

* Loading
* Success
* Validation errors
* Invalid credentials
* Unauthorized access
* Invalid input
* Expired tokens
* Invalid reset tokens
* API unavailable
* Network failures
* Unexpected server responses
* Empty states

The Front-End translates these conditions into understandable user feedback while the backend remains responsible for server-side rules.

---

# Security Considerations

Security-sensitive operations are intentionally kept outside the responsibility of the client alone.

Current considerations include:

* Server-side authentication
* Server-side validation
* Secure password-reset token generation
* Token expiration
* Token validation
* Database-backed authentication data
* Explicit CORS configuration
* Environment-specific configuration
* Sensitive configuration kept outside source code where appropriate

Security remains an evolving area of the project.

---

# Tech Stack

## Front-End

* React 19
* TypeScript
* JavaScript ES6+
* React Router
* Vite
* CSS3
* Sonner
* LocalStorage

## Backend

* Node.js
* Express
* TypeScript
* Prisma 7
* SQLite
* Nodemailer

## Development & Delivery

* Git
* GitHub
* GitHub Actions
* GitHub Pages
* ESLint
* npm

---

# Development Workflow

Noir Avenue is developed individually, but the workflow is intentionally structured around practices used in professional software teams.

### Feature development

```text
Requirement
    ↓
Investigation
    ↓
Implementation plan
    ↓
Feature branch
    ↓
Focused changes
    ↓
Local validation
    ↓
Production validation
    ↓
Refactoring / documentation
```

The project uses:

* Feature-oriented development
* Branch-based development
* Focused commits
* Git history as a development record
* Pull-request-oriented thinking
* Incremental delivery
* Continuous integration
* Production validation
* Refactoring when requirements expose architectural problems

---

# Problem-Solving Process

One of the main objectives of Noir Avenue is to demonstrate how development problems are approached.

The general process is:

```text
Unexpected behavior
        ↓
Reproduce
        ↓
Identify affected layer
        ↓
Trace execution / data flow
        ↓
Form hypotheses
        ↓
Test hypotheses
        ↓
Identify root cause
        ↓
Implement targeted solution
        ↓
Validate
        ↓
Document relevant decision
```

This process has been applied to problems involving:

* React state
* Routing
* API communication
* Authentication
* Database persistence
* Prisma configuration
* SQLite
* Email delivery
* Git
* GitHub Pages
* Production routing
* Environment configuration
* User flows

The goal is not simply to make an error disappear, but to understand **why it happened and which layer should own the solution**.

---

# Quality & Validation

Quality is considered throughout the development cycle.

Current practices include:

* ESLint
* Production builds
* API validation
* Database validation
* Manual feature validation
* Git-based version control
* GitHub Actions
* Production environment validation
* Incremental refactoring
* Responsive testing
* User-flow validation

Automated testing is part of the project's continued evolution, with Jest and React Testing Library being progressively incorporated.

---

# CI/CD & Deployment

The Front-End is deployed through GitHub Pages using GitHub Actions.

```text
Git Push
   ↓
GitHub Actions
   ↓
Install dependencies
   ↓
Build application
   ↓
Generate production artifacts
   ↓
Deploy
   ↓
GitHub Pages
   ↓
Live Product
```

Production validation includes:

* Build verification
* Asset paths
* SPA routing
* Repository base path
* Client-side routes
* Authentication-related flows
* Production application behavior

🔗 **Live Application:**
https://luizfelipeosz.github.io/Noir-Avenue/

---

# Project Evolution

Noir Avenue is intentionally developed as an evolving product rather than a project with a fixed checklist.

| Stage                 | Focus                                                   | Status                    |
| --------------------- | ------------------------------------------------------- | ------------------------- |
| Sprint 1              | Authentication foundation and protected routes          | ✅ Completed               |
| Sprint 2              | Core product structure, profile and deployment          | ✅ Completed               |
| Sprint 3              | Session, persistence and application-state architecture | 🔄 Evolved                |
| Backend Evolution     | API, database, authentication and password recovery     | 🟢 Implemented / evolving |
| Marketplace Evolution | Catalog, product experience and cart                    | 🟢 In progress            |
| Checkout Evolution    | Customer data, shipping, order review and purchase flow | 🟢 In progress            |
| Next                  | API-driven product data and further product evolution   | 🔵 Planned                |

The roadmap is intentionally flexible.

If implementation reveals a product or architectural problem, the development direction can change to solve it.

This is preferable to following a predetermined roadmap that no longer reflects the actual state of the product.

---

# Roadmap

## Near-Term

* Expand API-driven product data
* Continue catalog evolution
* Product detail experience
* Improve checkout flow
* Expand account-management capabilities
* Continue TypeScript adoption
* Add automated tests
* Improve responsive behavior

## Product Evolution

* Search
* Filtering
* Favorites
* Settings
* Additional account capabilities
* More server-side persistence
* Expanded API architecture
* Additional validation and error states

## Engineering Evolution

* Increase automated test coverage
* Refine API contracts
* Improve type safety
* Continue refactoring
* Improve production observability
* Harden authentication and account flows
* Continue reducing unnecessary coupling

The roadmap may change as new product requirements and technical discoveries emerge.

---

# Project Structure

```text
Noir-Avenue/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   └── utils/
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   └── ...
│   │
│   └── prisma/
│       └── schema.prisma
│
├── public/
├── .github/
│   └── workflows/
├── package.json
├── vite.config.ts
└── README.md
```

The structure is not treated as immutable.

As the product grows, boundaries are reorganized when the existing structure no longer represents the application's responsibilities clearly.

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

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Backend

The backend is located inside the `server` directory.

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Configure the environment variables according to the project's environment configuration.

Start the backend using the configured development command.

The API currently provides the foundation for:

* Authentication
* User persistence
* Password recovery
* Password reset
* Token management
* Progressive server-side product functionality

---

# Screenshots

The interface continues to evolve alongside the product.

### Authentication

*Current login and registration interface.*

### Dashboard

*Current authenticated application experience.*

### Profile

*User account and profile management.*

### Catalog

*Product discovery and marketplace experience.*

### Cart

*Cart management, quantities, subtotal and shipping logic.*

### Checkout

*Customer information, shipping and order review experience.*

Screenshots should be kept synchronized with the current production version of the application.

---

# What Noir Avenue Demonstrates

## Front-End Engineering

* React application development
* TypeScript
* Componentization
* Reusable UI
* SPA architecture
* Client-side routing
* Protected routes
* State management
* API integration
* Form handling
* Loading and error states
* Responsive interfaces
* UX-oriented implementation
* Progressive refactoring

## Product Engineering

* Translating requirements into technical behavior
* Designing user flows
* Defining application states
* Understanding responsibility boundaries
* Evaluating technical trade-offs
* Incremental feature delivery
* Product-oriented iteration
* Production validation

## Backend Integration

* Node.js
* Express
* REST APIs
* Prisma
* SQLite
* Authentication
* Password recovery
* Token lifecycle
* Email infrastructure
* Server-side validation
* CORS
* Environment configuration

## Debugging & Problem Solving

* Reproducing problems
* Investigating root causes
* Tracing application and data flow
* Debugging Front-End behavior
* Debugging API behavior
* Investigating database persistence
* Understanding environment differences
* Resolving production-specific problems
* Validating fixes instead of assuming them

## Engineering Practices

* Git
* Feature branches
* Focused commits
* CI/CD
* GitHub Actions
* Production deployment
* Code organization
* Refactoring
* Documentation
* Incremental architecture evolution

---

# Front-End Engineering Perspective

Noir Avenue is intentionally built from the perspective of a **Front-End Developer working on a real product**, rather than as a collection of isolated screens.

The Front-End responsibilities involve more than writing JSX and CSS.

They include understanding:

```text
Requirement
   ↓
User Flow
   ↓
Interface
   ↓
State
   ↓
API Contract
   ↓
Error Handling
   ↓
Backend Responsibility
   ↓
Production Behavior
```

This means working with the surrounding system when necessary while keeping the Front-End as the primary area of responsibility.

The project demonstrates practical experience with:

* Understanding requirements
* Breaking features into manageable changes
* Identifying affected application layers
* Integrating APIs
* Handling asynchronous states
* Investigating bugs
* Communicating technical decisions
* Refactoring existing code
* Validating behavior
* Considering maintainability
* Delivering features to production

The objective is to demonstrate readiness to contribute to a professional development team, not to claim that the project represents a finished commercial marketplace.

---

# Current Project Status

🟢 **Live & Actively Developed**

Noir Avenue is currently deployed and continuously evolving.

The project has progressed from a primarily client-side React application into a more complete product architecture involving:

```text
React
  +
TypeScript
  +
REST API
  +
Express
  +
Prisma
  +
SQLite
  +
Authentication
  +
Email
  +
Marketplace Flows
  +
Checkout
  +
CI/CD
  +
Production Deployment
```

The next iterations will continue improving the product experience while increasing API-driven behavior, automated testing, type safety, responsiveness and production robustness.

---

# Author

## Luiz Felipe Oliveira Souza

**Front-End Developer Jr.**

React.js • TypeScript • Next.js • Front-End Architecture • API Integration • Product-Oriented Development

I focus on building maintainable Front-End applications, understanding requirements, organizing application responsibilities, integrating APIs and evolving features based on real product needs.

Noir Avenue represents this approach in practice: investigating problems, making technical decisions, implementing features, validating behavior and continuously improving the product.

**GitHub:**
https://github.com/Luizfelipeosz

**LinkedIn:**
https://linkedin.com/in/luiz-felipe-o-souza-9a488b372

---

> Built as a continuous product-engineering exercise focused on Front-End development, maintainability, API integration, technical decision-making, problem solving, production delivery and product evolution.
