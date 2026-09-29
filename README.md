# Noir Avenue

> A product-oriented marketplace application built with React and TypeScript, evolving from a Front-End project into a complete web application with API integration, authentication, persistence, checkout flows and production deployment.

[![Live Application](https://img.shields.io/badge/Live%20Application-Noir%20Avenue-111111?style=flat-square)](https://luizfelipeosz.github.io/Noir-Avenue/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-3178C6?style=flat-square\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=flat-square\&logo=vite\&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square\&logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-API-000000?style=flat-square\&logo=express\&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square\&logo=prisma\&logoColor=white)](https://www.prisma.io/)

**Live:** https://luizfelipeosz.github.io/Noir-Avenue/

---

## Overview

**Noir Avenue** is a marketplace-inspired web application developed as a continuous product-engineering project.

The project started with a strong Front-End focus and progressively evolved to include:

* React and TypeScript application architecture
* Authentication and protected routes
* REST API integration
* Server-side validation
* Database persistence
* Password recovery and reset
* Product catalog and product details
* Favorites and cart management
* Checkout flow
* Account and profile management
* Responsive interface
* CI/CD and production deployment
* Debugging and architectural evolution

The objective is not to reproduce an existing marketplace.

Instead, Noir Avenue is used to simulate the type of development process involved in building and evolving a real digital product:

```text
Requirement
    ↓
User Flow
    ↓
Technical Analysis
    ↓
Architecture / Responsibility
    ↓
Implementation
    ↓
Validation
    ↓
Production
    ↓
Investigation / Feedback
    ↓
Iteration
```

The project is **Front-End first**, with practical backend and API development used to support complete product flows.

---

# Product Experience

The main user journey is organized around a marketplace experience:

```text
Authentication
      ↓
Dashboard
      ↓
Catalog
      ↓
Product Details
      ↓
Favorites / Cart
      ↓
Checkout
      ↓
Order Flow
```

Account-related functionality includes:

```text
Register
   ↓
Login
   ↓
Authenticated Session
   ↓
Profile / Settings
   ↓
Account Management
```

Password recovery is handled through the API:

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

---

# Current Features

## Authentication & Account

* User registration
* Login
* Authenticated sessions
* Protected routes
* Profile management
* Account settings
* Account-related persistence
* Password recovery
* Password reset
* Expiring reset tokens
* Server-side authentication validation

## Marketplace

* Product catalog
* Product categories
* Product details
* Reusable product cards
* Favorites
* Shopping cart
* Quantity management
* Subtotal calculation
* Free-shipping business rule
* Checkout flow
* Customer information reuse
* Shipping information
* Payment selection simulation
* Order review
* Responsive marketplace interface

## Application

* React SPA
* React Router
* Component-based architecture
* Reusable components
* Context API
* React Hooks
* API service integration
* Protected route architecture
* Client-side persistence where appropriate
* Loading and error states
* Form validation
* Responsive behavior
* Light/dark interface theme

---

# Architecture

Noir Avenue follows a client → API → persistence architecture.

```text
┌───────────────────────────────────┐
│          React Front-End          │
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
│            Express API            │
│                                   │
│ Routes                            │
│ Validation                        │
│ Authentication                    │
│ Application Logic                 │
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

The Front-End remains the primary area of responsibility.

The backend exists to provide realistic server-side capabilities and to allow the application to evolve beyond a purely client-side implementation.

---

# Front-End Engineering

The main engineering focus of Noir Avenue is **Front-End development**.

The React application is responsible for:

* User interface
* Component composition
* Client-side navigation
* Forms
* UI state
* Application state
* Loading states
* Error feedback
* Cart interactions
* Checkout interactions
* API consumption
* Protected route behavior
* Responsive behavior
* Client-side validation
* Translating API responses into user-facing states

The project uses React, TypeScript and reusable application patterns to keep responsibilities understandable as features are added.

The goal is not to introduce abstraction for its own sake.

> **Architecture should solve product problems, not create unnecessary complexity.**

---

# Backend & API

The backend was introduced progressively as the product requirements became more realistic.

Current technologies include:

* Node.js
* Express
* TypeScript
* Prisma
* SQLite
* Nodemailer

The API currently supports functionality such as:

* User registration
* Login
* Authentication validation
* Password recovery
* Password reset
* Reset-token lifecycle
* User persistence
* Server-side validation
* Email delivery
* CORS configuration

The separation between client and server is intentional:

```text
Front-End
  ↓
User experience + client behavior

API
  ↓
Server-side rules + validation

Database
  ↓
Persistent application data
```

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
Express
 ↓
Authentication Logic
 ↓
Prisma
 ↓
SQLite
```

The Front-End owns the user experience and application states.

The backend owns authentication rules, server-side validation and persistence.

This evolution was implemented incrementally instead of rewriting the entire application.

---

# Password Recovery

Password recovery is implemented as a complete server-backed flow.

```text
User requests recovery
          ↓
POST /api/auth/forgot-password
          ↓
Backend validates request
          ↓
Generate token
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

The flow involves:

* Express
* TypeScript
* Prisma
* SQLite
* Secure token generation
* Token expiration
* Nodemailer
* React API integration
* User-facing validation states

Reset tokens are validated server-side and expire after a defined period.

---

# State Management

State is organized according to feature responsibility.

Examples include:

* Authentication/session state
* Cart state
* Favorites
* Form state
* UI state
* Loading states
* API request states
* Theme preference
* Persistent client-side state

The cart, for example, uses centralized application state rather than duplicating cart logic across individual pages.

The goal is predictable data flow without introducing state-management infrastructure that the product does not currently require.

---

# Componentization

Reusable components are introduced when they provide a practical benefit.

Examples include:

* Product cards
* Navigation elements
* Form components
* Dashboard sections
* Account interfaces
* Shared UI patterns

The project avoids creating abstractions simply to increase the number of components.

The guiding question is:

> **Does this abstraction make the product easier to reuse, change or understand?**

---

# Debugging & Problem Solving

A major objective of Noir Avenue is to demonstrate the development process behind a solution, not only the final interface.

The general debugging workflow is:

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
```

This approach has been applied to problems involving:

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

The goal is not simply to remove an error.

It is to understand **why it happened, which layer owns the problem and how the solution affects the rest of the application**.

---

# Database Investigation

One of the practical backend problems encountered during development involved SQLite persistence.

Application behavior suggested that data was not being persisted as expected.

Instead of changing unrelated application code, the investigation followed the actual data path:

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

The investigation identified that multiple SQLite database files existed in different locations and that the running application was using a different database from the one initially inspected.

The problem reinforced an important debugging practice:

> **When observed behavior contradicts expectations, inspect the actual runtime state and data flow before changing the implementation.**

---

# Production Routing

The application is deployed under:

```text
/Noir-Avenue/
```

rather than directly from the root domain.

This introduced differences between local development and production, particularly around direct access to client-side routes.

The deployment therefore required configuration for:

* Vite base paths
* React Router
* GitHub Pages
* SPA fallback behavior
* Direct route access
* Production asset paths

A fallback mechanism is used to preserve SPA navigation when routes are accessed directly in production.

This is an important part of the project because:

> **A feature is not considered complete simply because it works locally.**

---

# Checkout

The checkout experience connects multiple parts of the application into a single user flow.

```text
Catalog
   ↓
Product
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

The flow reuses available account information where appropriate instead of repeatedly requesting the same data.

The checkout is a **product-flow simulation** and does not represent a real payment processor or financial transaction.

---

# Error & Application States

The application is designed around more than the happy path.

Relevant states include:

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

The Front-End translates these conditions into understandable user feedback while server-side rules remain the responsibility of the API.

---

# Security Considerations

Security-sensitive operations are not delegated exclusively to the client.

Current considerations include:

* Server-side authentication
* Server-side validation
* Secure password-reset token generation
* Token expiration
* Token validation
* Database-backed authentication
* Explicit CORS configuration
* Environment-based configuration
* Sensitive configuration kept outside source code where appropriate

Security remains an evolving area of the project.

---

# Production & CI/CD

The Front-End is deployed through GitHub Pages using GitHub Actions.

```text
Git Push
   ↓
GitHub Actions
   ↓
Install dependencies
   ↓
Build
   ↓
Production artifacts
   ↓
Deployment
   ↓
GitHub Pages
   ↓
Live Application
```

Production validation includes:

* Build verification
* Asset paths
* SPA routing
* Repository base path
* Client-side routes
* Authentication flows
* Main marketplace flows
* Responsive behavior

**Live Application:**

https://luizfelipeosz.github.io/Noir-Avenue/

---

# Development Workflow

Although Noir Avenue is developed individually, its workflow is structured around practices commonly used in professional software development.

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
Refactoring / Documentation
```

Practices include:

* Feature-oriented development
* Branch-based development
* Focused commits
* Git history as a development record
* Pull-request-oriented thinking
* Incremental delivery
* CI/CD
* Production validation
* Refactoring when requirements expose architectural problems

---

# Testing & Validation

Validation is performed throughout the development cycle.

Current practices include:

* ESLint
* Production builds
* API validation
* Database validation
* Manual feature validation
* Responsive testing
* User-flow testing
* Production validation
* Automated Front-End tests
* Incremental refactoring

The main application flows have been tested after the Sprint 3 implementation, including navigation, authentication-related behavior, cart, checkout, profile and settings functionality.

Testing continues to evolve alongside the application.

---

# Project Evolution

Noir Avenue is developed as an evolving product rather than a fixed checklist.

| Stage                 | Focus                                               | Status                    |
| --------------------- | --------------------------------------------------- | ------------------------- |
| Sprint 1              | Authentication foundation and protected routes      | ✅ Completed               |
| Sprint 2              | Core product structure, profile and deployment      | ✅ Completed               |
| Sprint 3              | Session, persistence, state and application flows   | ✅ Completed               |
| Backend Evolution     | API, database, authentication and password recovery | 🟢 Implemented / evolving |
| Marketplace Evolution | Catalog, products, favorites and cart               | 🟢 Implemented / evolving |
| Checkout Evolution    | Customer data, shipping and order review            | 🟢 Implemented / evolving |
| Next                  | Further API-driven product evolution                | 🔵 Planned                |

The roadmap is intentionally flexible.

If implementation exposes a product or architectural problem, the development direction can change to address it.

---

# Roadmap

## Near Term

* Expand API-driven product data
* Continue catalog evolution
* Improve product details
* Continue checkout improvements
* Expand account management
* Increase TypeScript coverage
* Expand automated tests
* Continue responsive improvements

## Product Evolution

* Search
* Advanced filtering
* Expanded favorites functionality
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
* Reduce unnecessary coupling

The roadmap may change as new requirements and technical discoveries emerge.

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

The structure evolves with the product.

The goal is to keep responsibilities understandable and changes localized rather than creating unnecessary layers or folders.

---

# Tech Stack

### Front-End

* React 19
* TypeScript
* JavaScript ES6+
* React Router
* Vite
* CSS3
* Context API
* React Hooks
* Sonner
* LocalStorage

### Backend

* Node.js
* Express
* TypeScript
* Prisma 7
* SQLite
* Nodemailer
* REST API

### Development & Delivery

* Git
* GitHub
* GitHub Actions
* GitHub Pages
* ESLint
* npm

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

The API provides the foundation for:

* Authentication
* User persistence
* Password recovery
* Password reset
* Token management
* Progressive server-side product functionality

---

# What This Project Demonstrates

### Front-End Engineering

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
* Refactoring

### Product Engineering

* Translating requirements into technical behavior
* Designing user flows
* Defining application states
* Understanding responsibility boundaries
* Evaluating technical trade-offs
* Incremental feature delivery
* Product-oriented iteration
* Production validation

### Backend Integration

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

### Debugging & Problem Solving

* Reproducing problems
* Investigating root causes
* Tracing application and data flow
* Debugging Front-End behavior
* Debugging API behavior
* Investigating database persistence
* Understanding environment differences
* Resolving production-specific problems
* Validating fixes

### Engineering Practices

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

# Front-End Perspective

Noir Avenue is intentionally built from the perspective of a **Front-End Developer working on a real product**, rather than as a collection of isolated screens.

The Front-End responsibilities go beyond JSX and CSS:

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

This requires understanding the surrounding system while keeping Front-End development as the primary responsibility.

The project demonstrates practical work with:

* Requirements analysis
* Feature decomposition
* Component architecture
* State management
* API integration
* Asynchronous flows
* Error handling
* Debugging
* Refactoring
* Technical decision-making
* Production validation
* Maintainability

The objective is to demonstrate the ability to contribute to a professional development team through practical Front-End engineering and product-oriented problem solving.

---

# Current Status

🟢 **Live & Actively Developed**

Noir Avenue is currently deployed and continues to evolve.

The project has progressed from a primarily client-side React application into a broader product architecture involving:

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
Password Recovery
  +
Marketplace Flows
  +
Checkout
  +
CI/CD
  +
Production Deployment
```

The next iterations will focus on increasing API-driven behavior, automated testing, type safety, responsive quality and production robustness.

---

# Author

## Luiz Felipe Oliveira Souza

**Front-End Developer Jr.**

React.js • TypeScript • Next.js • Front-End Architecture • API Integration • Product-Oriented Development

I focus on building maintainable Front-End applications, understanding requirements, organizing application responsibilities, integrating APIs and evolving features according to real product needs.

Noir Avenue represents this approach in practice: investigating problems, making technical decisions, implementing features, validating behavior and continuously improving the product.

**GitHub:**
https://github.com/Luizfelipeosz

**LinkedIn:**
https://linkedin.com/in/luiz-felipe-o-souza-9a488b372

---

> Built as a continuous product-engineering project focused on Front-End development, maintainability, API integration, technical decision-making, problem solving, production delivery and product evolution.
