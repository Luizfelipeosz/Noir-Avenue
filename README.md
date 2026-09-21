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
* C
