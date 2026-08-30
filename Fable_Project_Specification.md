# Fable — Complete Project Specification & Development Guide

> **Project:** Fable – Ebook Sharing Platform  
> **Assignment:** A10_CAT-012  
> **Project Type:** Full-stack Ebook Marketplace & Reading Platform  
> **Primary Goal:** Build a polished, recruiter-friendly digital bookstore and publishing platform for Readers, Writers, and Admins.

---

# 1. Project Overview

**Fable** is a premium digital ebook sharing and marketplace platform that connects readers with independent writers.

Readers can discover ebooks, search and filter the library, view book details, bookmark stories, purchase ebooks through Stripe, and read purchased content.

Writers can create, upload, edit, publish/unpublish, and delete ebooks. They can also monitor sales and revenue.

Admins control the platform by managing users, ebooks, transactions, and analytics.

The project should demonstrate advanced full-stack development concepts including:

- Authentication
- JWT/session management
- Google OAuth
- Role-based authorization
- MongoDB CRUD
- Image upload
- Stripe payment integration
- Bookmark/wishlist functionality
- Search
- Filtering
- Sorting
- Pagination
- Analytics
- Responsive UI
- Production deployment
- Error/loading/empty states

---

# 2. Core Product Vision

Fable must **not** look like a generic CRUD assignment or a basic SaaS dashboard.

The product should feel like:

- A premium digital bookstore
- A modern publishing platform
- An editorial literary magazine
- A calm reading application

### Brand Personality

- Elegant
- Literary
- Premium
- Modern
- Calm
- Creative
- Trustworthy

### Avoid

- Excessive gradients
- Excessive rounded cards
- Huge shadows
- Random colors
- Poor spacing
- Cluttered dashboards
- Generic Bootstrap layouts
- Generic SaaS templates
- Amateur/"gobindo" design
- Unnecessary animations
- Fake-looking demo content

---

# 3. Design System

## Color Direction

Use a warm editorial palette.

### Primary

- Deep charcoal / ink
- Warm ivory / cream

### Accent

- Muted amber / warm gold
- Optional muted terracotta where appropriate

### Supporting

- Soft neutral gray
- Border gray
- Success green
- Warning amber
- Error red

Keep the color palette restrained.

CTA buttons should use the primary Fable accent.

Maintain strong accessibility contrast.

---

# 4. Typography

Use a premium typography combination.

### Headings

Prefer an elegant serif font.

### Body/UI

Use a clean modern sans-serif font.

Typography hierarchy should be obvious:

- Large serif hero headings
- Serif section headings
- Clean sans-serif body text
- Small semibold labels
- Comfortable reading typography for ebook content

Avoid using too many font weights.

---

# 5. Recommended Technology Stack

## Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- Better Auth / JWT-based authentication architecture
- Email/password authentication
- Google OAuth

## Payment

- Stripe Checkout
- Stripe Webhooks

## Image Hosting

- imgBB API

## Deployment

- Frontend: Vercel
- Backend: Production Express hosting
- Database: MongoDB Atlas

---

# 6. Repository Structure

Recommended structure:

```text
Fable/
│
├── client/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── styles/
│   ├── .env.local
│   └── README.md
│
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── services/
    ├── utils/
    ├── config/
    ├── .env
    └── README.md
```

Exact structure may vary depending on implementation, but responsibilities should remain separated.

---

# 7. Main Application Routes

## Public Routes

```text
/
 /browse
 /ebooks/:id
 /writers/:id
 /login
 /register
 /about
 /contact
 /privacy
```

## Reader Routes

```text
/dashboard/user
/dashboard/user/purchases
/dashboard/user/bookmarks
/dashboard/user/profile
```

## Writer Routes

```text
/dashboard/writer
/dashboard/writer/ebooks
/dashboard/writer/ebooks/new
/dashboard/writer/ebooks/:id/edit
/dashboard/writer/sales
/dashboard/writer/bookmarks
/dashboard/writer/profile
```

## Admin Routes

```text
/dashboard/admin
/dashboard/admin/users
/dashboard/admin/ebooks
/dashboard/admin/transactions
```

## Reading

```text
/read/:id
```

## Payment

```text
/payment/success
/payment/cancel
```

---

# 8. Global Navbar

The navbar must contain:

### Left

- Fable logo
- Open-book icon
- Fable wordmark

### Center

- Home
- Browse Ebooks
- Writers
- About

### Right

- Search
- Dashboard
- Login when logged out
- Avatar/profile menu when logged in

### Profile Menu

Depending on role:

- Profile
- Dashboard
- Bookmarks
- Purchase History
- Logout

Writer-specific and admin-specific navigation should not expose irrelevant items.

### Mobile

Use a hamburger menu and animated drawer.

Prevent background scrolling while the mobile menu is open.

---

# 9. Global Footer

Footer sections:

## Fable

"Stories, writers, and readers in one place."

## Explore

- Browse Ebooks
- Writers
- Genres

## Company

- About
- Contact
- Privacy Policy

## Connect

- Facebook
- Instagram
- X
- GitHub

Use dummy links.

## Newsletter

Heading:

"Stay in the story."

Description:

"Get new stories, writer updates, and reading recommendations."

Include:

- Email input
- Subscribe button

Newsletter may remain frontend-only.

Bottom:

```text
© 2026 Fable. All rights reserved.
```

---

# 10. Home Page

Route:

```text
/
```

## Hero

Headline:

**Discover Stories Worth Reading.**

Description:

"Explore original ebooks from emerging writers and find your next unforgettable story."

CTA:

- Browse Ebooks
- Become a Writer

Visual:

- Premium ebook covers
- Open book
- Editorial composition
- Subtle paper texture

Avoid generic stock images.

## Featured Ebooks

Display latest/featured 6 ebooks.

Each card:

- Cover
- Genre
- Title
- Writer
- Price
- Bookmark
- Details

## Top Writers

Display 3 writers based on actual sales.

Show:

- Avatar
- Name
- Bio
- Ebook count
- Sales
- View Profile

## Genres

Genres:

- Fiction
- Mystery
- Romance
- Science Fiction
- Fantasy
- Horror
- Thriller
- Biography
- Self Development
- Poetry
- History
- Adventure

Clicking a genre:

```text
/browse?genre=<genre>
```

## How Fable Works

1. Discover
2. Purchase
3. Read

## Editorial Quote

Use:

"Every story begins with someone brave enough to write the first page."

## Final CTA

"Your next favorite story is waiting."

---

# 11. Browse Ebooks Page

Route:

```text
/browse
```

Publicly accessible.

## Search

Search by:

- Ebook title
- Writer name

Placeholder:

```text
Search by title or writer...
```

## Filters

### Genre

All Genres + supported genres.

### Price

- Minimum
- Maximum

### Availability

- All
- Available
- Sold

### Sort

- Newest
- Price Low to High
- Price High to Low

### Clear Filters

## Ebook Grid

Desktop:

4 columns

Tablet:

3 columns

Mobile:

2 columns when appropriate.

## Ebook Card

Show:

- Cover
- Genre
- Title
- Writer
- Price
- Purchased/Sold badge
- Bookmark
- View Details

## Pagination

6–12 ebooks per page.

Controls:

- Previous
- Page numbers
- Next

Preserve filters/search/sort during pagination.

Use URL query parameters where practical:

```text
/browse?search=fantasy&genre=Fantasy&sort=newest&page=2
```

## Loading

Use skeleton cards.

## Empty

"No stories found."

## Error

"Unable to load the library."

---

# 12. Ebook Details Page

Route:

```text
/ebooks/:id
```

Publicly accessible.

## Main Layout

Desktop:

- Left: large cover
- Right: book information

Mobile:

- Cover first
- Information second

## Information

Show:

- Genre
- Title
- Writer
- Description
- Price
- Availability
- Uploaded date

Writer name links to:

```text
/writers/:id
```

## Purchase Rules

### Guest

Button:

"Login to Purchase"

### Writer's Own Ebook

Disable purchase:

"You cannot purchase your own ebook."

### Already Purchased

Show:

"Already Purchased"

and:

"Read Ebook"

### Sold

Show:

"Currently Unavailable"

### Available

Show:

"Buy Now — $XX"

## Bookmark

Authenticated users can bookmark.

Guests should be redirected to login.

## Writer Section

Show:

- Avatar
- Writer name
- Bio
- Published ebook count
- View Writer Profile

## Related Ebooks

Display 4 related ebooks.

Prefer same genre.

Exclude current ebook.

## Loading

Full detail skeleton.

## Error

"Book not found."

---

# 13. Reading Page

Route:

```text
/read/:id
```

Only available to users who purchased the ebook.

## Reading UI

Show:

- Ebook title
- Writer
- Reading progress
- Clean content area
- Comfortable typography
- Previous/Next controls if content is paginated
- Back to library

The reading interface should be calm and distraction-free.

Do not expose full content publicly.

Backend must verify purchase access.

---

# 14. Writer Profile Page

Route:

```text
/writers/:id
```

Public.

## Header

Show:

- Avatar
- Writer name
- Bio
- Published ebook count
- Total sales if available

## Books

Heading:

"Books by [Writer Name]"

Display published ebooks.

## Empty

"No published stories yet."

---

# 15. Login Page

Route:

```text
/login
```

## Layout

Desktop:

- Left editorial visual
- Right login form

Mobile:

- Form-focused layout

## Form

Fields:

- Email
- Password

Features:

- Show/hide password
- Validation
- Loading state

## Google

Button:

"Continue with Google"

## Submit

"Sign In"

## Errors

Examples:

"Email or password is incorrect."

"Something went wrong. Please try again."

## Redirect

Reader:

```text
/dashboard/user
```

Writer:

```text
/dashboard/writer
```

Admin:

```text
/dashboard/admin
```

If user attempted a protected route, return them to that route after authentication where appropriate.

---

# 16. Register Page

Route:

```text
/register
```

## Fields

- Full Name
- Email
- Password
- Confirm Password
- Role

## Role Selection

### Reader

"Discover, purchase, bookmark, and read ebooks."

### Writer

"Publish your stories and reach new readers."

Default:

Reader

## Validation

- Required fields
- Valid email
- Unique email
- Password strength
- Password confirmation
- Valid role

## Google

Provide Google signup.

## Success

Reader → user dashboard

Writer → writer dashboard

---

# 17. User Dashboard

Route:

```text
/dashboard/user
```

Only role `user`.

## Sidebar

- Overview
- Purchased Ebooks
- Bookmarks
- Purchase History
- Profile
- Logout

## Header

"Welcome back, [Name]"

## Stats

- Purchased Ebooks
- Bookmarks
- Total Spent
- Books Read

Use actual values.

## Continue Reading

Show recently accessed purchased ebooks.

Show:

- Cover
- Title
- Writer
- Progress
- Continue Reading

## Recent Purchases

Show recent purchases.

## Recommendations

Display recommended ebooks.

---

# 18. User Purchase History

Route:

```text
/dashboard/user/purchases
```

## Summary

- Total Purchases
- Total Spent
- Latest Purchase

## Table

Columns:

- Ebook
- Writer
- Amount
- Purchase Date
- Payment Status
- Action

Action:

"Read Ebook"

## Filters

- All
- Completed
- Pending
- Failed

## Search

Search by ebook title.

Mobile should use cards instead of tiny tables.

---

# 19. User Bookmarks

Route:

```text
/dashboard/user/bookmarks
```

Display bookmarked ebooks using the shared EbookCard.

## Empty

"Your reading list is empty."

CTA:

"Explore Ebooks"

Bookmark removal should update UI immediately and persist to backend.

---

# 20. User Profile

Route:

```text
/dashboard/user/profile
```

## Profile

Show:

- Avatar
- Name
- Email
- Role
- Member since

## Editable

- Full Name
- Profile Picture
- Bio

Use imgBB for profile picture.

## Optional

Password change section.

---

# 21. Writer Dashboard

Route:

```text
/dashboard/writer
```

Only role `writer`.

## Sidebar

- Overview
- My Ebooks
- Add Ebook
- Sales
- Bookmarks
- Profile
- Logout

## Stats

- Total Ebooks
- Published Ebooks
- Total Sales
- Total Revenue

## Quick Actions

- Add New Ebook
- View My Ebooks
- View Sales

## Revenue Chart

Use Recharts.

Use real data only.

## Top Performing Ebooks

Show actual best sellers.

## Recent Sales

Show latest transactions.

---

# 22. Writer My Ebooks

Route:

```text
/dashboard/writer/ebooks
```

## Header

"My Ebooks"

CTA:

"Add Ebook"

## Summary

- Total
- Published
- Unpublished
- Sales

## Table

Columns:

- Cover
- Title
- Genre
- Price
- Status
- Sales
- Created
- Actions

## Actions

- View
- Edit
- Publish
- Unpublish
- Delete

Delete must require confirmation.

## Search

By title.

## Filters

- All
- Published
- Unpublished

## Sort

- Newest
- Oldest
- Price
- Sales

---

# 23. Add Ebook

Route:

```text
/dashboard/writer/ebooks/new
```

## Fields

- Title
- Genre
- Price
- Description
- Full Ebook Content
- Cover Image

## Cover

Upload through imgBB.

Support:

- Preview
- Replace
- Remove
- Upload progress
- Validation

Allowed:

- JPG
- JPEG
- PNG

## Content

Full ebook content must remain private.

Only purchasers can read it.

## Initial Status

Default:

```text
unpublished
```

## Validation

All required fields must be validated.

## Submit

"Create Ebook"

After success:

- Save
- Associate with authenticated writer
- Redirect to My Ebooks
- Toast

Backend must determine writerId from authenticated user.

---

# 24. Edit Ebook

Route:

```text
/dashboard/writer/ebooks/:id/edit
```

Pre-fill all data.

Fields:

- Title
- Genre
- Price
- Description
- Full Content
- Cover

Only owner writer can edit.

Backend must verify ownership.

Actions:

- Save
- Publish/Unpublish if permitted
- Delete

---

# 25. Writer Sales

Route:

```text
/dashboard/writer/sales
```

## Summary

- Total Sales
- Total Revenue
- Average Sale
- Best Selling Ebook

## Chart

Monthly revenue chart.

## Table

Columns:

- Ebook
- Buyer
- Amount
- Purchase Date
- Transaction ID
- Status

Search by:

- Ebook
- Buyer

Filter by:

- Ebook
- Date
- Status

---

# 26. Writer Bookmarks

Route:

```text
/dashboard/writer/bookmarks
```

Use the same bookmark system as readers.

Display bookmarked ebooks.

Do not create a separate bookmark architecture for writers.

---

# 27. Writer Profile

Route:

```text
/dashboard/writer/profile
```

Editable:

- Name
- Profile picture
- Bio

Bio should appear on public writer profile.

Use imgBB for profile picture.

Include:

"View Public Profile"

---

# 28. Admin Dashboard

Route:

```text
/dashboard/admin
```

Only role `admin`.

## Sidebar

- Overview
- Users
- Ebooks
- Transactions
- Profile
- Logout

## Analytics Cards

- Total Users
- Total Writers
- Total Ebooks Sold
- Total Revenue

## Charts

### Monthly Sales

Use Recharts.

### Genre Distribution

Use pie/donut chart.

## Recent Transactions

Show latest transactions.

## Recent Users

Show latest users.

---

# 29. Admin User Management

Route:

```text
/dashboard/admin/users
```

## Table

- Name
- Email
- Role
- Joined Date
- Status
- Actions

## Actions

Change role:

- user
- writer
- admin

Delete user.

Use confirmation before deletion.

Protect against accidentally removing the final administrator.

Backend must enforce admin authorization.

---

# 30. Admin Ebook Management

Route:

```text
/dashboard/admin/ebooks
```

## Table

- Cover
- Title
- Writer
- Genre
- Price
- Status
- Created Date
- Actions

Actions:

- Publish
- Unpublish
- Delete
- View

Admin can manage all ebooks.

---

# 31. Admin Transactions

Route:

```text
/dashboard/admin/transactions
```

## Table

- Transaction ID
- Type
- User/Writer Email
- Ebook
- Amount
- Date
- Status

Transaction types:

- Purchase
- Publishing Fee

Filters:

- Type
- Date
- Status

---

# 32. Authentication Architecture

Authentication must support:

- Email/password
- Google login
- JWT/session persistence
- Role-based authorization
- Logout

JWT expiration:

```text
7 days
```

Authentication must survive browser refresh.

Private routes must not redirect authenticated users to login after refresh.

Never trust a frontend role value.

Always verify authentication and role server-side.

---

# 33. Authorization Matrix

| Feature | Guest | User | Writer | Admin |
|---|---:|---:|---:|---:|
| Home | Yes | Yes | Yes | Yes |
| Browse | Yes | Yes | Yes | Yes |
| Ebook Details | Yes | Yes | Yes | Yes |
| Purchase | No | Yes | Yes* | Yes* |
| Bookmark | No | Yes | Yes | Optional |
| Read Purchased Ebook | No | Yes | Yes | Optional |
| User Dashboard | No | Yes | No | No |
| Writer Dashboard | No | No | Yes | No |
| Admin Dashboard | No | No | No | Yes |
| Manage Own Ebooks | No | No | Yes | No |
| Manage All Ebooks | No | No | No | Yes |
| Manage Users | No | No | No | Yes |
| Transactions | Own | Own | Own Sales | All |

\* Writer/admin purchase rules should follow the final business rules. A writer must never purchase their own ebook.

---

# 34. Bookmark System

Recommended User model field:

```text
bookmarks: [ebookId]
```

Endpoints:

```text
POST   /api/ebooks/:id/bookmark
DELETE /api/ebooks/:id/bookmark
GET    /api/users/bookmarks
```

Bookmark operation must be idempotent where practical.

Frontend should use optimistic UI with rollback if API fails.

---

# 35. Purchase System

Recommended Purchase model:

```text
userId
ebookId
writerId
amount
stripeSessionId
transactionId
status
purchasedAt
```

Possible status:

```text
pending
completed
failed
cancelled
```

Prevent duplicate purchases.

Prevent writer from purchasing own ebook.

---

# 36. Stripe Flow

Recommended flow:

```text
User
 ↓
Click Buy Now
 ↓
Frontend request
 ↓
Backend validates user
 ↓
Backend validates ebook
 ↓
Backend checks ownership
 ↓
Backend checks duplicate purchase
 ↓
Create Stripe Checkout Session
 ↓
Redirect to Stripe
 ↓
Payment
 ↓
Stripe webhook
 ↓
Verify payment
 ↓
Create Purchase
 ↓
Create Transaction
 ↓
Grant ebook access
 ↓
Success page
```

Do not trust frontend success redirects as proof of payment.

Stripe secret key must only exist on the backend.

Use Stripe webhook verification.

---

# 37. Transaction Model

Recommended:

```text
transactionId
type
userId
userEmail
ebookId
amount
status
createdAt
```

Types:

```text
purchase
publishing_fee
```

Publishing fee is part of the platform requirement if implemented as a writer verification flow.

---

# 38. Ebook Model

Recommended:

```text
title
description
content
price
genre
coverImage
writerId
writerName
status
createdAt
updatedAt
```

Status should distinguish publishing availability from purchase state where possible.

Preferred approach:

```text
publicationStatus:
published | unpublished

availability:
available | sold
```

If the existing project uses a single status field, maintain consistent business logic and avoid ambiguous states.

---

# 39. User Model

Recommended:

```text
name
email
password
photoURL
bio
role
bookmarks
createdAt
updatedAt
```

Roles:

```text
user
writer
admin
```

Passwords must be securely hashed.

Never return password hashes to frontend responses.

---

# 40. Search / Filter / Sort

Browse page must support:

### Search

- title
- writer name

### Genre

All supported genres.

### Price

Min/max.

### Availability

- available
- sold

### Sort

- newest
- price ascending
- price descending

Search and filters should work together.

---

# 41. Pagination

Default:

6–12 items per page.

Backend pagination is preferred for scalability.

Possible query:

```text
GET /api/ebooks?page=1&limit=12&search=fantasy&genre=Fantasy&sort=newest
```

Response should include:

```text
data
total
page
limit
totalPages
```

---

# 42. API Design

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## Ebooks

```text
GET    /api/ebooks
GET    /api/ebooks/:id
POST   /api/ebooks
PATCH  /api/ebooks/:id
DELETE /api/ebooks/:id
```

## Bookmarks

```text
POST   /api/ebooks/:id/bookmark
DELETE /api/ebooks/:id/bookmark
GET    /api/users/bookmarks
```

## Purchases

```text
POST /api/payments/create-checkout-session
GET  /api/purchases
GET  /api/purchases/:id
```

## Writer

```text
GET /api/writer/ebooks
GET /api/writer/sales
GET /api/writer/analytics
```

## Admin

```text
GET    /api/admin/users
PATCH  /api/admin/users/:id/role
DELETE /api/admin/users/:id

GET    /api/admin/ebooks
PATCH  /api/admin/ebooks/:id/status
DELETE /api/admin/ebooks/:id

GET /api/admin/transactions
GET /api/admin/analytics
```

Exact endpoint naming can differ, but responsibilities must remain clear.

---

# 43. Middleware

Recommended middleware:

```text
authenticate
requireRole
requireAdmin
requireWriter
requireOwnership
errorHandler
validateRequest
```

Example authorization logic:

```text
authenticate
    ↓
verify JWT/session
    ↓
attach user to request
    ↓
requireRole("writer")
    ↓
controller
```

Never rely only on frontend route protection.

---

# 44. Image Upload

Use imgBB for:

- Ebook covers
- Profile pictures

Requirements:

- Preview
- Upload state
- Error state
- File validation
- File size validation
- Replace image
- Remove image

Store only the final image URL in MongoDB.

Keep API key in environment variables.

---

# 45. Loading States

Every asynchronous operation needs a proper loading state.

Implement:

- Global loading
- Ebook skeleton
- Table skeleton
- Dashboard skeleton
- Details skeleton
- Profile skeleton
- Payment loading
- Upload loading
- Button loading

Never show an unexplained blank screen.

---

# 46. Error Handling

Create:

## 404

Heading:

"Page Not Found"

Description:

"The page you're looking for doesn't exist."

Button:

"Back to Home"

## Runtime Error

"Something went wrong."

Button:

"Try Again"

## API Error

Use friendly toast messages.

Examples:

"Failed to load ebooks."

"Unable to save your changes."

"Something went wrong. Please try again."

Never expose stack traces or raw database errors.

---

# 47. Empty States

Use dedicated empty states.

Examples:

### No purchases

"You haven't purchased an ebook yet."

### No bookmarks

"Your reading list is waiting."

### No sales

"Your first sale is waiting."

### No ebooks

"Your library is empty."

### No search results

"No stories match your search."

Each should include a relevant CTA where appropriate.

---

# 48. EbookCard Component

Shared component responsibilities:

- Cover image
- Genre
- Title
- Writer
- Price
- Purchased badge
- Sold badge
- Bookmark button
- Details link

Bookmark interaction must stop event propagation so clicking the bookmark does not navigate to the details page.

Example behavior:

```text
Guest
 → redirect to login

Authenticated
 → toggle bookmark

Remove
 → call onUnbookmark when used inside bookmark page
```

Use optimistic UI carefully.

Rollback UI state if API fails.

---

# 49. Current EbookCard Consideration

If using:

```jsx
const { data: session } = useSession();
```

make sure the auth/session provider and backend session endpoint are functioning correctly.

If the session endpoint returns 500, EbookCard may appear to fail even when its UI code is correct.

When debugging:

```text
/api/auth/get-session
```

must return a valid response.

Do not ignore authentication API errors.

---

# 50. Accessibility

Ensure:

- Keyboard navigation
- Focus states
- Semantic HTML
- Proper form labels
- Accessible dialogs
- Accessible buttons
- Alt text
- Sufficient contrast
- Screen reader support
- Reduced motion support

Icons used as buttons must have accessible labels.

---

# 51. Responsive Design

The application must work on:

- Mobile
- Tablet
- Laptop
- Large desktop

Important areas:

- Navbar
- Ebook grids
- Tables
- Forms
- Dashboard sidebar
- Charts
- Modals
- Reading page

Mobile tables should become cards or horizontal scroll containers.

Never create page-level horizontal overflow.

---

# 52. Dark Mode

Implement optional persistent dark mode.

Dark mode should use:

- Deep ink backgrounds
- Slightly lighter charcoal surfaces
- Warm off-white text
- Muted gold accent
- Subtle borders

Do not simply invert colors.

Persist theme preference using the chosen theme solution/local storage.

---

# 53. SEO

Add:

- Page title
- Meta description
- Open Graph metadata
- Semantic headings

Ebook pages should have dynamic metadata based on:

- title
- description
- cover

---

# 54. Security Requirements

Implement:

- Password hashing
- JWT/session verification
- Secure cookies where applicable
- RBAC
- Input validation
- MongoDB injection protection
- CORS configuration
- Secure HTTP headers
- Rate limiting where appropriate
- Server-side Stripe verification
- Ownership checks
- Environment variables

Never trust:

- frontend role
- frontend userId
- frontend writerId
- frontend payment success
- frontend ownership claims

---

# 55. Environment Variables

Example frontend:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_APP_URL=
```

Example backend:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
IMGBB_API_KEY=
CLIENT_URL=
SERVER_URL=
```

Use only the variables actually required by the selected authentication/payment implementation.

Never commit `.env` files.

Add `.env.example`.

---

# 56. Deployment Requirements

Frontend should deploy successfully to Vercel.

Backend must be deployed to a production server.

MongoDB must use MongoDB Atlas.

Production configuration must include:

- Correct CORS origin
- Correct frontend URL
- Correct backend URL
- Stripe webhook URL
- Production environment variables
- HTTPS
- Proper authentication cookies/session configuration

---

# 57. Production Refresh Requirement

Every route must work after direct browser refresh.

Test:

```text
/browse
/ebooks/:id
/writers/:id
/dashboard/user
/dashboard/writer
/dashboard/admin
/read/:id
```

Private routes must restore authentication after refresh.

No valid route should produce an unexpected 404.

---

# 58. CORS

Production backend should allow only the required frontend origin(s).

Example concept:

```text
Development:
http://localhost:3000

Production:
https://your-fable-domain.vercel.app
```

Do not use unrestricted:

```text
origin: "*"
```

when credentials/cookies are involved.

---

# 59. Seed / Demo Data

Create realistic data.

Recommended:

- 10–15 ebooks
- 5–8 writers
- Several readers
- Multiple genres
- Several purchases
- Multiple transactions
- Admin account

Avoid:

```text
Book 1
Writer 1
Lorem ipsum
User 1
```

Use believable titles, descriptions, names, prices, and cover images.

---

# 60. Admin Credentials

Development/demo admin:

```text
Email:
admin@fable.com

Password:
Admin@123
```

Do not expose production secrets in source code or README.

For production, use a secure credential setup.

---

# 61. Optional Wishlist

If implemented, wishlist can use:

```text
User.wishlist: [ebookId]
```

Features:

- Add
- Remove
- View wishlist
- Purchase from wishlist

Bookmark and wishlist should not become confusing duplicate features. Prefer one clear saved-reading concept unless both are intentionally distinct.

---

# 62. Optional Email Notification

After:

- successful purchase
- publishing fee payment

simulate notification through:

- console log
- Nodemailer

Never expose SMTP credentials.

---

# 63. Optional Writer Verification / Publishing Fee

The requirement mentions writer verification through a one-time payment.

If implemented, create a writer verification flow:

```text
User
 ↓
Choose Writer
 ↓
Verification/payment
 ↓
Stripe
 ↓
Webhook
 ↓
Mark writer verified
 ↓
Allow publishing
```

Possible User fields:

```text
writerVerified
writerVerifiedAt
```

A writer who has not completed required verification should be prevented from publishing if this rule is enabled.

---

# 64. Dashboard Design Rules

Dashboards must not look like generic admin templates.

Use:

- Fable typography
- Warm surfaces
- Editorial details
- Clean charts
- Real ebook covers
- Generous whitespace
- Subtle borders
- Restrained shadows

Keep information hierarchy strong.

---

# 65. Tables

Tables should:

- have clear headers
- use consistent spacing
- have status badges
- have action menus
- support loading skeletons
- support empty states
- support mobile layouts

Destructive actions should use confirmation dialogs.

---

# 66. Forms

All forms should have:

- labels
- placeholders where helpful
- validation
- error messages
- loading states
- disabled submit state
- success toast
- API error handling

Do not allow duplicate submissions.

---

# 67. Toast System

Use toast notifications for:

### Auth

- Login successful
- Registration successful
- Logout successful
- Authentication error

### Ebook

- Created
- Updated
- Deleted
- Published
- Unpublished

### Bookmark

- Added
- Removed

### Profile

- Updated

### Payment

- Purchase successful
- Payment failed
- Payment cancelled

### API

Friendly error messages.

---

# 68. Animation Rules

Use Framer Motion.

Good uses:

- Hero fade-in
- Card stagger
- Scroll reveal
- Hover scale
- Bookmark animation
- Dialog transitions
- Page transitions

Keep animations subtle.

Avoid:

- constant movement
- excessive parallax
- long animations
- distracting transitions

Respect:

```text
prefers-reduced-motion
```

---

# 69. Component Architecture

Create reusable components such as:

```text
Navbar
MobileMenu
Footer
SearchDialog
UserMenu
ThemeToggle

EbookCard
EbookGrid
EbookSkeleton
GenreCard
WriterCard
BookmarkButton

SearchBar
FilterPanel
Pagination
StatusBadge

DashboardSidebar
DashboardHeader
StatCard
DataTable

EmptyState
LoadingSpinner
ErrorState
ConfirmDialog
ImageUploader

Toast
```

Avoid duplicating the same UI across pages.

---

# 70. Error Debugging Checklist

If you see:

```text
Failed to get session
```

check:

```text
/api/auth/get-session
```

Then verify:

- Better Auth configuration
- Auth client configuration
- Auth server configuration
- Database connection
- Session cookies
- Environment variables
- Auth route
- CORS
- Backend availability

If:

```text
bookmarks → 500
```

check:

- authenticated user
- token/session
- bookmark route
- database connection
- User model
- Ebook model
- authorization middleware

If React reports:

```text
Encountered a script tag while rendering React component
```

search the project for:

```text
<script
```

Use Next.js `Script` for third-party scripts when appropriate.

CSS preload warnings are usually secondary and should be investigated after functional errors are fixed.

---

# 71. Git Commit Requirement

The assignment requires:

### Client

At least:

```text
20 meaningful commits
```

### Server

At least:

```text
12 meaningful commits
```

Do not create meaningless commits just to increase the count.

Use descriptive messages.

## Example Client Commits

```text
feat: initialize Fable design system
feat: build responsive navbar and footer
feat: create Fable home page
feat: add featured ebook section
feat: add browse ebook page
feat: implement ebook search and filters
feat: add ebook pagination
feat: create ebook details page
feat: add writer profile page
feat: implement authentication UI
feat: add user dashboard
feat: add purchase history
feat: add bookmark management
feat: create writer dashboard
feat: add writer ebook management
feat: add ebook creation form
feat: add ebook editing flow
feat: create writer sales dashboard
feat: create admin dashboard
feat: polish responsive and error states
```

## Example Server Commits

```text
feat: initialize Express server
feat: connect MongoDB Atlas
feat: create user model
feat: create ebook model
feat: implement authentication
feat: add role based authorization
feat: implement ebook CRUD
feat: implement bookmark APIs
feat: implement purchase APIs
feat: integrate Stripe Checkout
feat: add Stripe webhook handling
feat: add admin analytics APIs
```

---

# 72. README Requirements

README must include:

## Project Name

Fable – Ebook Sharing Platform

## Purpose

Explain what Fable does.

## Features

Include:

- Authentication
- Google login
- Reader role
- Writer role
- Admin role
- Ebook marketplace
- Search
- Filtering
- Sorting
- Pagination
- Bookmarks
- Stripe
- imgBB
- Analytics
- Reading experience

## Technologies

List all major npm packages.

## Environment Variables

Explain required variables without exposing secrets.

## Installation

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
npm install
npm run dev
```

## Deployment

Explain frontend/backend deployment.

## Links

Include placeholders:

```text
Live Site:
https://your-live-url

Client Repository:
https://github.com/...

Server Repository:
https://github.com/...
```

---

# 73. Final QA Checklist

Before submission, verify:

## Public

- [ ] Home works
- [ ] Browse works
- [ ] Search works
- [ ] Filters work
- [ ] Sorting works
- [ ] Pagination works
- [ ] Ebook details works
- [ ] Writer profile works
- [ ] About works
- [ ] Contact works
- [ ] Privacy works

## Authentication

- [ ] Registration works
- [ ] Login works
- [ ] Google login works
- [ ] Logout works
- [ ] Session survives refresh
- [ ] Role redirects work
- [ ] Unauthorized routes are protected

## Reader

- [ ] Dashboard works
- [ ] Purchase history works
- [ ] Bookmarks work
- [ ] Profile works
- [ ] Purchased ebook can be read

## Writer

- [ ] Dashboard works
- [ ] Ebook creation works
- [ ] Ebook editing works
- [ ] Ebook deletion works
- [ ] Publish works
- [ ] Unpublish works
- [ ] Sales work
- [ ] Bookmarks work
- [ ] Profile works
- [ ] Image upload works

## Admin

- [ ] Dashboard works
- [ ] User management works
- [ ] Role management works
- [ ] Ebook management works
- [ ] Transactions work
- [ ] Analytics work

## Payment

- [ ] Stripe checkout opens
- [ ] Payment succeeds
- [ ] Payment cancellation works
- [ ] Webhook works
- [ ] Purchase record is stored
- [ ] Transaction is stored
- [ ] Reading access is granted
- [ ] Duplicate purchase is prevented

## UI

- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Dark mode works
- [ ] Loading states exist
- [ ] Empty states exist
- [ ] Error states exist
- [ ] Toasts work
- [ ] 404 works
- [ ] No horizontal overflow
- [ ] No obvious console errors
- [ ] No broken images

## Deployment

- [ ] Production frontend works
- [ ] Production backend works
- [ ] MongoDB works
- [ ] CORS works
- [ ] Environment variables work
- [ ] Stripe production configuration works
- [ ] Direct route refresh works
- [ ] Private route refresh preserves authentication
- [ ] No 404/500/504 on valid routes

---

# 74. Final Product Standard

Fable should communicate this message immediately:

> **A premium digital library and marketplace for discovering independent stories.**

The Home page should feel:

**Editorial + emotional**

The Browse page should feel:

**Like a premium digital bookstore**

The Ebook Details page should feel:

**Like a premium book product page**

The Reading page should feel:

**Calm + immersive**

The Reader Dashboard should feel:

**Like a personal digital library**

The Writer Dashboard should feel:

**Like a professional publishing workspace**

The Admin Dashboard should feel:

**Like a polished platform control center**

The entire application should maintain one coherent visual identity.

---

# 75. Submission Information

## Admin

```text
Email:
admin@fable.com

Password:
Admin@123
```

## Live Site

```text
[Your deployed Vercel URL]
```

## Client Repository

```text
[Your Next.js frontend GitHub repository]
```

## Server Repository

```text
[Your Express.js backend GitHub repository]
```

---

# 76. Development Philosophy

Build Fable as a real product, not as a checklist.

Prioritize:

1. Correct functionality
2. Security
3. UX
4. Visual quality
5. Responsive design
6. Maintainable architecture
7. Reusable components
8. Production readiness

Every feature should have:

```text
Loading
Success
Error
Empty
Unauthorized
Responsive
```

states where applicable.

Every important backend operation should validate:

```text
Authentication
Authorization
Input
Ownership
Business rules
```

The final application should be polished enough to demonstrate professional full-stack development skills to a recruiter.
