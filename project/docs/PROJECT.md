# InstantAnalytics Project Documentation

## Project Overview
InstantAnalytics is a modern analytics dashboard for Instantly users that provides real-time insights into email campaign performance. The application helps users track and analyze their email campaigns, manage clients, and generate detailed reports.

## Tech Stack
- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL)
- Authentication: Supabase Auth
- Payment Processing: Stripe
- Email Service: Custom SMTP via Supabase Edge Functions

## Project Structure

```
src/
├── components/           # React components
│   ├── dashboard/       # Dashboard-specific components
│   ├── shared/         # Shared/reusable components
│   └── auth/           # Authentication components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── pages/              # Page components
├── services/           # API and data services
├── types/              # TypeScript type definitions
└── styles/             # Global styles and theme
```

## Key Features
1. Real-time Analytics Dashboard
2. Client Management Portal
3. Email Campaign Tracking
4. Domain & Provider Analytics
5. Subscription Management

## Core Modules

### Authentication (/src/pages/auth/*)
- Sign Up
- Sign In
- Password Reset
- Email Verification

### Dashboard (/src/pages/dashboard/*)
1. Main Dashboard
   - Overview statistics
   - Quick navigation
   - Recent activity

2. Client Management (/dashboard/clients)
   - Client list
   - Client details
   - Campaign mapping

3. Email Analytics
   - Mailbox stats
   - Email by client
   - Connection status

4. Campaign Analytics
   - Campaign stats
   - Campaign by client
   - Sequence analytics

### Data Flow
1. User Authentication
   - Supabase handles auth
   - User data stored in instantly_user table
   - JWT tokens for session management

2. Analytics Data
   - Real-time updates via Supabase
   - Data aggregation using PostgreSQL functions
   - Client-side caching for performance

3. Subscription Management
   - Stripe integration for payments
   - Webhook handling via n8n
   - Subscription status tracking

## Database Schema

### Core Tables
1. instantly_user
   - User account information
   - Subscription details
   - Instantly credentials

2. instantly_client
   - Client information
   - Campaign mappings
   - Analytics preferences

3. instantly_email
   - Email tracking data
   - Performance metrics
   - Status information

4. instantly_campaign
   - Campaign details
   - Performance metrics
   - Client associations

## Development Guidelines

### Code Organization
1. Components
   - One component per file
   - Use index.ts for exports
   - Group related components

2. Hooks
   - Extract reusable logic
   - Keep hooks focused
   - Document dependencies

3. Services
   - Separate API calls
   - Handle errors consistently
   - Use TypeScript types

### State Management
1. Local State
   - Use useState for component state
   - Extract complex logic to hooks

2. Server State
   - Use Supabase real-time subscriptions
   - Implement optimistic updates
   - Handle loading/error states

### Styling
1. Tailwind CSS
   - Use utility classes
   - Extract common patterns
   - Follow naming conventions

2. Theme
   - Use CSS variables
   - Support dark/light modes
   - Maintain consistency

## Common Tasks

### Adding a New Feature
1. Plan the feature
2. Create necessary database migrations
3. Add TypeScript types
4. Implement UI components
5. Add tests if required
6. Update documentation

### Debugging
1. Check browser console
2. Verify network requests
3. Check Supabase logs
4. Validate data flow
5. Test edge cases

### Deployment
1. Build process
   ```bash
   npm run build
   ```
2. Environment variables
   - Set up in Supabase
   - Update .env.example

3. Database migrations
   - Run in correct order
   - Test data integrity

## Security Considerations
1. Authentication
   - Always verify user sessions
   - Implement proper RLS policies
   - Handle token expiration

2. Data Access
   - Use RLS for all tables
   - Validate user permissions
   - Sanitize user input

3. API Security
   - Rate limiting
   - Input validation
   - Error handling

## Performance Optimization
1. Code Splitting
   - Lazy loading routes
   - Component chunking
   - Dynamic imports

2. Caching
   - Browser caching
   - API response caching
   - State management

3. Database
   - Proper indexing
   - Query optimization
   - Connection pooling

## Troubleshooting Guide

### Common Issues
1. Authentication
   - Token expiration
   - Invalid credentials
   - Missing permissions

2. Data Loading
   - Network errors
   - Invalid queries
   - Missing data

3. UI/UX
   - Layout issues
   - Performance problems
   - State management

### Support Resources
1. Documentation
   - Project docs
   - API references
   - Component library

2. External Resources
   - Supabase docs
   - Stripe docs
   - React docs

## Future Improvements
1. Feature Ideas
   - Advanced analytics
   - Custom reports
   - API integrations

2. Technical Debt
   - Code optimization
   - Test coverage
   - Documentation updates

3. Scalability
   - Performance monitoring
   - Database optimization
   - Caching strategies