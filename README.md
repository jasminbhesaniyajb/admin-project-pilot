# Admin Project Pilot

A React + Vite + TypeScript-based Admin Dashboard for managing projects and estimations. The project uses **Ant Design** for UI components.

---

### Project Setup & Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation
```
yarn install

yarn dev
```

### Authentication
Default Login Credentials

Email: jasmin@gmail.com

Password: 123456

### Running the Mock API
No extra steps needed to run — the mock will automatically intercept relevant requests during development.

### Project Structure
```src/
├── api/         
├── assets/      
├── components/ 
├── constants/
├── hooks/         
├── i18n/
├── mocks/         # Mock API data and handlers
├── pages/         # Application pages (routes)
├── store/         # Redux Toolkit store setup and slices
├── types/         # Global TypeScript type definitions
├── utils/
├── validation/    # Zod or Yup schema validations
├── App.tsx
├── main.tsx 
└── routes.tsx
```
### Features
Auth: login, signUp, forgot-password

multi-language support

Dashboard: Overview of system statistics and interactive charts.

Project Management: Manage project creation, listing, and editing.

Estimation Tool: Dynamic estimation form with multiple sections and real-time calculations (subtotal, margin, total).

Mock API Support: Built-in mock API for local development/testing.

Ant Design Integration

TypeScript Support: Full TypeScript setup for type safety.


### Important Notes
If you are facing an issue where data is not appearing or behaving unexpectedly, please refresh the page.

This sometimes happens because the mock API server may not initialize correctly on first load.

It's a rare issue, but easily resolved by a simple page refresh.
