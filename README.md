# Noir Avenue

> A product-oriented marketplace application built with React and TypeScript, focused on Front-End engineering, application architecture, API integration, authentication, persistence and continuous product evolution.

<p align="center">
  <a href="https://luizfelipeosz.github.io/Noir-Avenue/">
    <img src="https://img.shields.io/badge/Live%20Application-Noir%20Avenue-111111?style=for-the-badge" alt="Live Application" />
  </a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-Enabled-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Migration-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

**Live Application:** https://luizfelipeosz.github.io/Noir-Avenue/

**Repository:** https://github.com/Luizfelipeosz/Noir-Avenue

---

## Table of Contents

- [Overview](#overview)
- [Product Preview](#product-preview)
- [Core Features](#core-features)
- [Product Flows](#product-flows)
- [Technical Architecture](#technical-architecture)
- [Front-End Engineering](#front-end-engineering)
- [Backend and API](#backend-and-api)
- [Authentication and Account Management](#authentication-and-account-management)
- [Business Rules](#business-rules)
- [State Management](#state-management)
- [Engineering Decisions and Challenges](#engineering-decisions-and-challenges)
- [Quality and Validation](#quality-and-validation)
- [Security](#security)
- [Deployment and Infrastructure](#deployment-and-infrastructure)
- [Development Workflow](#development-workflow)
- [Project Status](#project-status)
- [Roadmap](#roadmap)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Author](#author)

---

## Overview

**Noir Avenue** is a marketplace-inspired web application developed as a continuous product-engineering project.

The project began as a Front-End application and progressively evolved to incorporate backend services, authentication, database integration and more complete user journeys.

Its development focuses on:

- Building responsive and maintainable interfaces.
- Organizing React application responsibilities.
- Integrating REST APIs.
- Implementing authentication and protected routes.
- Managing shared application state.
- Translating business requirements into application behavior.
- Handling asynchronous operations and error states.
- Investigating technical problems across different application layers.
- Validating features in local and production environments.

Noir Avenue is intentionally **Front-End first**.

Backend development supports the product experience while the primary engineering focus remains on React, TypeScript, application architecture and user-facing functionality.

The project is not intended to reproduce an existing marketplace. It is an independent environment for applying technical decisions, implementing features and evolving a digital product incrementally.

## Product Preview

The following sections are reserved for real screenshots of the application.

Replace the image files with screenshots captured from the running Noir Avenue application.

### Dashboard

<!-- Screenshot: Dashboard -->
![Noir Avenue Dashboard](<img width="1249" height="1908" alt="0411" src="https://github.com/user-attachments/assets/d0f4963e-2b28-4c61-a64c-c3c694e6e9eb" />)

### Product Catalog

<!-- Screenshot: Catalog -->
![Noir Avenue Product Catalog](<img width="1249" height="2112" alt="0412" src="https://github.com/user-attachments/assets/33345022-2975-4cf3-97cf-5fc251325a43" />)

### Wishlist and Favorites

<!-- Screenshot: Wishlist -->
![Noir Avenue Wishlist](<img width="1249" height="891" alt="0413" src="https://github.com/user-attachments/assets/2162cb88-6e45-4fc1-91b0-05675866ad4c" />)

### Shopping Cart

<!-- Screenshot: Shopping Cart -->
![Noir Avenue Shopping Cart](<img width="1257" height="692" alt="0414" src="https://github.com/user-attachments/assets/c589cb68-b884-4041-b1f9-8cce5eb77013" />)

### Checkout

<!-- Screenshot: Checkout -->
![Noir Avenue Checkout](<img width="1104" height="836" alt="0415" src="https://github.com/user-attachments/assets/48b0efc6-11ba-40ac-848f-6ee5f17f9bab" />)

### Additional Screens

Additional screenshots can be added to `docs/images/` as the product evolves.

Suggested future captures:

- Product details
- User profile
- Account settings
- Authentication
- Premium experience
- Notifications

---

## Core Features

### Authentication and Account

- User registration.
- Login.
- Authenticated sessions.
- Protected application routes.
- Profile management.
- Account settings.
- Account-related persistence.
- Password recovery.
- Password reset.
- Expiring password-reset tokens.
- Server-side authentication validation.

### Marketplace

- Product catalog.
- Product categories.
- Product details.
- Reusable product cards.
- Favorites.
- Wishlist experience.
- Shopping cart.
- Quantity management.
- Subtotal calculation.
- Shipping calculation.
- Checkout flow.
- Customer information reuse.
- Shipping information.
- Simulated payment selection.
- Order review.

### Dashboard and Application

- Personalized dashboard.
- Account information.
- Application navigation.
- Search interface.
- Notifications.
- Activity history.
- Theme preferences.
- Language preferences.
- Responsive layouts.
- User feedback and notifications.
- Loading, success, error and empty states.

### Additional Product Features

- Premium experience and account status.
- Profile completion indicators.
- Persistent user preferences.
- Account-related interactions.

Some product areas, including Wishlist refinements and Premium functionality, continue to evolve.

---

## Product Flows

The application connects multiple features into coherent user journeys.

### Main Marketplace Journey

```text
Authentication
      |
      v
   Dashboard
      |
      v
    Catalog
      |
      v
 Product Details
      |
      +----------+
      |          |
      v          v
  Favorites    Cart
                 |
                 v
              Checkout
                 |
                 v
             Order Review
```

### Account Journey

```text
Registration
     |
     v
    Login
     |
     v
Authenticated Session
     |
     v
Profile / Settings
     |
     v
Account Management
```

### Password Recovery

```text
Forgot Password
       |
       v
Authentication API
       |
       v
Token Generation
       |
       v
Database Persistence
       |
       v
Recovery Email
       |
       v
Password Reset Link
       |
       v
Token Validation
       |
       v
Password Update
```

---

## Technical Architecture

Noir Avenue follows a client-server architecture with separated application responsibilities.

```text
+--------------------------------------+
|             FRONT-END                |
|                                      |
|          React 19 + TypeScript       |
|                                      |
|  Components                          |
|  Pages                               |
|  Routing                             |
|  Context API                         |
|  Hooks                               |
|  Forms                               |
|  Client State                        |
|  API Integration                     |
+-------------------+------------------+
                    |
                    | HTTP / REST
                    |
                    v
+--------------------------------------+
|              BACKEND                 |
|                                      |
|       Node.js + Express + TypeScript |
|                                      |
|  Routes                              |
|  Controllers / Application Logic     |
|  Authentication                     |
|  Validation                          |
|  API Responses                       |
+-------------------+------------------+
                    |
                    v
+--------------------------------------+
|           DATA ACCESS                |
|                                      |
|              Prisma 7               |
|                                      |
+-------------------+------------------+
                    |
                    v
+--------------------------------------+
|        PostgreSQL / Neon             |
|                                      |
|       Database Persistence           |
+--------------------------------------+
```

**Database migration status:** the backend code has been configured for PostgreSQL using Prisma's Neon adapter. The transition from the previous SQLite database requires final migration and production validation.

The architecture is designed to keep user interface responsibilities separate from server-side validation, authentication and persistence.

---

## Front-End Engineering

The Front-End is the primary engineering focus of Noir Avenue.

The React application is responsible for:

- User interface composition.
- Component architecture.
- Client-side navigation.
- Protected routes.
- Form handling.
- Application state.
- UI state.
- API consumption.
- Asynchronous operations.
- Loading and error feedback.
- Cart and checkout interactions.
- Responsive behavior.
- Client-side validation.
- Translating API responses into user-facing states.

### Component Architecture

Components are organized according to their responsibilities and practical reuse.

Examples include:

- Navigation components.
- Product cards.
- Dashboard sections.
- Form components.
- Account interfaces.
- Shared UI elements.

Abstractions are introduced when they improve maintainability, reuse or readability rather than simply increasing the number of components.

### Routing

React Router handles client-side navigation and application routes.

The architecture includes:

- Public routes.
- Authenticated routes.
- Protected route behavior.
- Layout-based navigation.
- Application-level route organization.

### Responsive Interface

The interface is designed to support different screen sizes.

Responsive considerations include:

- Desktop navigation.
- Mobile navigation.
- Flexible layouts.
- Adaptive components.
- Responsive dashboard sections.
- Accessible interaction patterns.

---

## Backend and API

The backend was introduced progressively as product requirements expanded.

The API uses:

- Node.js.
- Express 5.
- TypeScript.
- Prisma 7.
- PostgreSQL integration through the Neon adapter.

### API Responsibilities

The backend supports:

- User registration.
- Authentication.
- Server-side validation.
- User persistence.
- Password recovery.
- Password reset.
- Reset-token lifecycle.
- Email-related operations.
- CORS configuration.

The API is responsible for security-sensitive operations and server-side application rules.

The Front-End consumes these capabilities through HTTP requests and translates their responses into application states.

### Database

The initial implementation used SQLite.

During the project's evolution, database persistence became an important architectural concern, particularly regarding runtime configuration, database location and environment differences.

The current backend source uses:

- PostgreSQL as the configured database provider.
- Prisma 7 as the ORM.
- `@prisma/adapter-neon` for the Neon integration.

The previous SQLite implementation is part of the project's technical history, not the intended final production architecture.

---

## Authentication and Account Management

Authentication evolved from an initially client-focused implementation into an API-driven architecture.

The responsibility boundaries are:

| Layer | Responsibility |
|---|---|
| React | User experience and session-related UI |
| Express | Authentication endpoints and server-side validation |
| Prisma | Database access |
| PostgreSQL | Persistent account data |

### Password Recovery

The password recovery flow includes:

1. Receiving the recovery request.
2. Validating the supplied email.
3. Generating a recovery token.
4. Persisting the token and expiration.
5. Sending the recovery email.
6. Validating the token.
7. Updating the password.

The recovery flow uses server-side token validation and expiration.

The email delivery provider and production configuration remain subject to final infrastructure validation.

---

## Business Rules

Noir Avenue incorporates product rules into its user flows.

### Shopping Cart

The cart includes:

- Product quantity management.
- Item subtotal.
- Cart subtotal.
- Shipping calculation.
- Total calculation.
- Cart state management.

### Shipping

The current shipping rule is:

| Order subtotal | Shipping |
|---|---:|
| Below R$ 500.00 | R$ 29.90 |
| R$ 500.00 or above | Free |

### Checkout

The checkout connects:

```text
Cart
  |
  v
Customer Identification
  |
  v
Delivery Information
  |
  v
Payment Selection
  |
  v
Order Review
```

The flow reuses available account information where appropriate.

**Important:** checkout currently represents a product-flow simulation. It does not process real payments or represent a completed financial transaction.

---

## State Management

State is organized according to feature responsibility.

Examples include:

- Authentication and session state.
- Cart state.
- Favorites.
- Form state.
- UI state.
- Loading states.
- API request states.
- Theme preferences.
- Language preferences.
- Persistent client-side state.

Context API is used where shared application state is appropriate.

The goal is predictable data flow and clear ownership of state without introducing unnecessary state-management infrastructure.

---

## Engineering Decisions and Challenges

Noir Avenue is developed with attention to the reasoning behind technical decisions.

The project involves investigating problems, identifying their responsible layer and validating solutions instead of applying unrelated changes.

### Database Persistence Investigation

One important challenge involved inconsistent SQLite database locations.

The investigation followed the actual runtime data path:

```text
Application Behavior
        |
        v
Prisma Configuration
        |
        v
DATABASE_URL
        |
        v
Database File Location
        |
        v
Runtime Database
        |
        v
Stored Records
```

The investigation identified multiple database files and differences between the database being inspected and the one used by the running application.

This led to the decision to evolve the persistence architecture toward PostgreSQL.

### Production Routing

The application is deployed under:

```text
/Noir-Avenue/
```

This requires attention to:

- Vite base configuration.
- React Router.
- GitHub Pages.
- SPA fallback behavior.
- Direct route access.
- Production asset paths.

### Environment Differences

Local and production environments require different configurations.

The project considers:

- API base URLs.
- Environment variables.
- Database connections.
- CORS.
- Asset paths.
- Deployment configuration.

### Debugging Approach

```text
Unexpected Behavior
        |
        v
Reproduce the Problem
        |
        v
Identify the Affected Layer
        |
        v
Trace Execution and Data Flow
        |
        v
Test Hypotheses
        |
        v
Identify Root Cause
        |
        v
Implement a Targeted Solution
        |
        v
Validate the Result
```

This approach has been applied to Front-End behavior, routing, API communication, authentication, database configuration, email delivery and deployment.

---

## Quality and Validation

Validation is performed throughout the development cycle.

### Current Practices

- ESLint.
- Production builds.
- API validation.
- Database validation.
- Manual feature testing.
- Responsive testing.
- User-flow validation.
- Production behavior verification.
- Incremental refactoring.

The main application flows have undergone manual validation, including navigation, authentication-related behavior, cart, checkout, profile and settings.

Automated test coverage remains an area for further development.

### Quality Goals

- Predictable application behavior.
- Clear component responsibilities.
- Consistent user feedback.
- Reliable API integration.
- Maintainable code.
- Better error handling.
- Increased automated test coverage.

---

## Security

Security-sensitive operations are handled on the server whenever appropriate.

Current security considerations include:

- Server-side authentication.
- Server-side validation.
- Password-reset token generation.
- Token expiration.
- Token validation.
- Database-backed user persistence.
- Explicit CORS configuration.
- Environment-based configuration.
- Protection of sensitive credentials.

Security and production hardening remain ongoing engineering concerns.

---

## Deployment and Infrastructure

### Front-End Deployment

The Front-End is deployed through GitHub Pages using GitHub Actions.

The workflow is:

```text
Git Push
   |
   v
GitHub Actions
   |
   v
Install Dependencies
   |
   v
Production Build
   |
   v
Upload Build Artifacts
   |
   v
Deploy to GitHub Pages
   |
   v
Live Application
```

The deployment workflow automatically builds the application when changes are pushed to the `main` branch.

### Backend Infrastructure

The backend is being prepared for a PostgreSQL-based production architecture using Neon.

The repository contains the PostgreSQL Prisma configuration and Neon adapter implementation.

Backend production availability and the final database migration must be validated independently from the existing Front-End deployment.

### Live Application

https://luizfelipeosz.github.io/Noir-Avenue/

---

## Development Workflow

Although developed individually, Noir Avenue follows a structured engineering workflow.

```text
Requirement
    |
    v
Investigation
    |
    v
Technical Analysis
    |
    v
Implementation Plan
    |
    v
Focused Changes
    |
    v
Local Validation
    |
    v
Production Validation
    |
    v
Refactoring and Documentation
```

Practices include:

- Feature-oriented development.
- Branch-based development.
- Focused commits.
- Git history management.
- Incremental delivery.
- Pull-request-oriented thinking.
- CI/CD.
- Production validation.
- Refactoring when requirements expose architectural problems.

---

## Project Status

Noir Avenue is an actively evolving project.

| Area | Status |
|---|---|
| React application foundation | Implemented |
| Authentication interface | Implemented |
| Protected routes | Implemented |
| Profile and settings | Implemented |
| Product catalog | Implemented |
| Favorites | Implemented |
| Shopping cart | Implemented |
| Checkout simulation | Implemented |
| REST API | Implemented |
| Authentication backend | Implemented |
| Password recovery flow | Implemented |
| PostgreSQL migration | In progress |
| Backend production validation | Pending |
| Wishlist refinements | In progress |
| Premium experience | Evolving |
| Automated test coverage | Planned / evolving |

Statuses describe the development state and should not be interpreted as confirmation that every feature is available in the public production environment.

---

## Roadmap

The roadmap follows the project's technical and product priorities.

### Near-Term Priorities

- Complete PostgreSQL migration.
- Validate database persistence.
- Stabilize backend deployment.
- Consolidate email delivery.
- Continue Wishlist improvements.
- Refine Premium business rules.
- Improve responsive behavior.
- Expand automated testing.
- Increase type safety.

### Product Evolution

- API-driven product catalog.
- Server-side favorites persistence.
- Server-side cart persistence.
- Persistent order history.
- Advanced search.
- Product filtering.
- Expanded account management.
- Additional notification capabilities.

### Engineering Evolution

- Automated Front-End testing.
- API integration testing.
- Better API contracts.
- Improved error handling.
- Security hardening.
- Production observability.
- Performance improvements.
- Continuous refactoring.

### Long-Term Possibilities

- Real payment gateway integration.
- Expanded order management.
- Administrative capabilities.
- More advanced product discovery.

Future items are possibilities rather than commitments to a specific implementation.

---

## Project Structure

The following is a high-level representation of the repository.

```text
Noir-Avenue/
|
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
│   │   └── lib/
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── docs/
│   └── images/
│
├── .github/
│   └── workflows/
│
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

The `server/prisma/schema.prisma` file represents the PostgreSQL backend configuration. The root-level Prisma schema is a legacy configuration that should be consolidated or removed as part of the migration cleanup.

The structure evolves according to feature responsibilities and practical maintenance requirements.

---

## Tech Stack

### Front-End

- React 19.
- TypeScript.
- React Router 7.
- Vite 8.
- CSS3.
- Context API.
- React Hooks.
- React Icons.
- Sonner.
- LocalStorage.

### Backend

- Node.js.
- Express 5.
- TypeScript.
- Prisma 7.
- PostgreSQL.
- Neon adapter.
- REST API.

### Infrastructure and Development

- Git.
- GitHub.
- GitHub Actions.
- GitHub Pages.
- ESLint.
- npm.

### Database and Email Evolution

- SQLite — previous database implementation.
- PostgreSQL / Neon — current migration target.
- Nodemailer and Resend — dependencies present in the backend; active production email provider requires final configuration validation.

---

## Getting Started

### Prerequisites

- Node.js 20 or compatible version.
- npm.
- Git.
- A PostgreSQL database for the current backend architecture.

### 1. Clone the Repository

```bash
git clone https://github.com/Luizfelipeosz/Noir-Avenue.git
```

```bash
cd Noir-Avenue
```

### 2. Front-End Installation

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### 4. Production Build

```bash
npm run build
```

### 5. Preview the Production Build

```bash
npm run preview
```

---

### Backend Setup

The backend is located inside the `server` directory.

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Configure the environment variables using a local `.env` file.

At minimum, the PostgreSQL configuration requires:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=3001
FRONTEND_URL=http://localhost:5173
```

Additional email and application configuration must follow the backend's environment requirements.

Generate the Prisma Client:

```bash
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

Build the backend:

```bash
npm run build
```

Start the configured server:

```bash
npm start
```

**Database note:** database migrations must be applied according to the actual migration history and target database state. Do not run schema-changing commands against an existing database without verifying the migration plan and preserving the existing data.

---

## Author

### Luiz Felipe Oliveira Souza

**Front-End Developer Jr.**

React.js · TypeScript · Next.js · Front-End Architecture · REST API Integration · Product-Oriented Development

I focus on building maintainable Front-End applications, organizing application responsibilities, integrating APIs and evolving features according to product requirements.

Noir Avenue represents this approach in practice: investigating problems, evaluating technical decisions, implementing features, validating behavior and continuously improving the application.

**GitHub:**  
https://github.com/Luizfelipeosz

**LinkedIn:**  
https://linkedin.com/in/luiz-felipe-o-souza-9a488b372

---

> Built as a continuous product-engineering project focused on Front-End development, maintainability, API integration, technical decision-making, problem solving and product evolution.
