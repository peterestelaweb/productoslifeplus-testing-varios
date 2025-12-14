# Project Context

## Purpose
LifePlus is a premium digital catalog for wellness and nutritional supplements products. The application serves as an e-commerce showcase for LifePlus brand products, including nutritional supplements, proteins, sports products, and general wellness items. It provides user authentication, product browsing, and a responsive shopping experience optimized for both mobile and desktop users.

## Tech Stack
- **Frontend Framework**: React 19.2.0 with Vite 7.2.4 as build tool
- **Routing**: React Router DOM 7.10.1 for client-side routing
- **Authentication**: Supabase (email/password + Google OAuth integration)
- **Styling**: Custom CSS with CSS Variables for theming
- **Icons**: Lucide React for consistent iconography
- **Database**: Supabase (PostgreSQL-based backend-as-a-service)
- **Deployment**: Static site generation with Apache server configuration

## Project Conventions

### Code Style
- **Language**: JavaScript (ES6+) with JSX for React components
- **File Naming**: PascalCase for components (e.g., `LoginPage.jsx`, `ProtectedRoute.jsx`)
- **Variable Naming**: camelCase for JavaScript variables and functions
- **CSS**: CSS custom properties for theming, BEM-like naming for classes
- **Language**: Spanish language for user interface and component names
- **Structure**: Component-based architecture with clear separation of concerns

### Architecture Patterns
- **SPA Architecture**: Single Page Application with client-side routing
- **Context API**: Centralized authentication state management using `AuthContext.jsx`
- **Component Composition**: Modular React components with protected route wrapper pattern
- **Environment Configuration**: Uses `VITE_` prefix for build-time environment variables
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px

### Testing Strategy
Currently no formal testing framework is implemented. The project relies on:
- Manual testing during development
- Vite's development server for hot reload testing
- Production build validation before deployment
- Browser testing for responsive design verification

### Git Workflow
- No specific branching strategy documented yet
- Commits should follow conventional commit format when implemented
- Development happens directly on main branch currently
- Production deployments triggered after successful testing

## Domain Context
- **Industry**: Wellness and nutritional supplements
- **Target Market**: Spanish-speaking customers interested in health products
- **Product Categories**: Nutritional supplements, proteins, sports nutrition, general wellness
- **Business Model**: Product catalog showcasing (possibly with future e-commerce functionality)
- **Brand Identity**: Green-themed (#2E7D32 primary) with organic, liquid design elements
- **User Flow**: Authentication → Email confirmation → Product browsing → Dashboard access

## Important Constraints
- **Authentication Required**: All product access requires user authentication
- **Spanish Language**: Interface must remain in Spanish for target audience
- **Mobile-First**: Design must work optimally on mobile devices
- **Supabase Dependency**: Authentication system tightly coupled with Supabase
- **Deployment Target**: Configured for BannaHosting deployment on subdomains
- **Email Confirmation**: Users must confirm email addresses for full access

## External Dependencies
- **Supabase**:
  - Project ID: `rljlxmdctcipwulasmic`
  - Authentication service with email/password and Google OAuth
  - Database backend for user management
  - Email confirmation system
- **Google OAuth**: Configured for social login authentication
- **BannaHosting**: Target hosting provider with specific deployment requirements
- **Google Fonts**: Montserrat font family for typography
- **Apache Server**: Requires `.htaccess` configuration for SPA routing
