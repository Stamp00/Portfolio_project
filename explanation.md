# Portfolio Website - Project Documentation

## Project Overview

This is a full-stack portfolio website built with a retro aesthetic design. The website features a single-page layout with multiple sections showcasing skills, projects, and contact information. It includes a complete admin panel for content management, allowing easy updates without touching the code.

**Live Features:**
- Retro-styled single-page portfolio
- Interactive skills showcase with category filtering
- Project gallery with detailed information
- Contact form with email integration
- Admin dashboard for content management
- Responsive design for all devices

---

## Technology Stack

### Frontend
- **React** (TypeScript) - UI framework
- **React Router** - Navigation and routing
- **CSS3** - Custom styling with retro design system
- **Vite** - Build tool and development server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)
- **JWT** - Authentication

### Design
- **Figma** - Design mockups and assets
- **Custom SVG Illustrations** - Hand-crafted retro graphics
- **Google Fonts** - Protest Strike, Spicy Rice, Squada One

---

## Design System

### Color Palette
The website uses a carefully selected retro color scheme:
- **Primary (Coral)**: `#ED6A5A` - Used for titles and accents
- **Secondary (Cream)**: `#F4F1BB` - Background for cards and panels
- **Tertiary (Teal)**: `#9BC1BC` - Buttons and interactive elements
- **Background**: `#FFF7E3` - Main page background
- **Text**: `#66635B` - Primary text color

### Typography
- **Protest Strike** - Hero titles (70px)
- **Spicy Rice** - Section headings (40px, 4px letter-spacing)
- **Squada One** - Subheadings and buttons (36px)
- **Arial** - Body text and form labels

### Animation Style
All animations use stepped timing functions (`steps(2, end)` or `steps(3, end)`) to create a retro, pixelated feel. Buttons feature hard box shadows (4px 4px) that shift on hover, creating a tactile 3D effect.

---

## Architecture

### Database Models

**HeroInfo**
- `header` - Main name/title
- `subheader` - Job title/role
- `text` - Brief introduction

**AboutInfo**
- `text` - Full biography and background

**ContactInfo**
- `email` - Contact email
- `phone` - Phone number
- `location` - Physical location
- `githubUrl` - GitHub profile link
- `linkedinUrl` - LinkedIn profile link
- `twitterUrl` - Twitter profile link (optional)

**Skill**
- `name` - Skill name
- `category` - Frontend, Backend, DevOps, or UI/UX
- `icon` - CDN URL to skill icon
- `order` - Display order within category

**Project**
- `name` - Project name
- `description` - Project description
- `image` - Project image URL
- `liveUrl` - Live demo link
- `githubUrl` - Source code link
- `technologies` - Array of technologies used
- `featured` - Boolean for homepage display
- `order` - Display order

**Message**
- `name` - Sender name
- `email` - Sender email
- `subject` - Message subject
- `message` - Message content
- `read` - Read status
- `createdAt` - Timestamp

**Admin**
- `email` - Admin email
- `password` - Hashed password (bcrypt)

---

## Website Sections

### 1. Hero Section
The landing area featuring:
- Animated profile illustration
- Name and title (editable via admin)
- Brief introduction
- Social media links (LinkedIn, GitHub)

**Key Features:**
- Custom SVG character illustration with 57 vector components
- Responsive layout that adapts to screen size
- Smooth scroll navigation to other sections

### 2. Skills Section
Interactive skills showcase with:
- Retro computer illustration housing the skills display
- Category filtering (Frontend, Backend, DevOps, UI/UX)
- Animated icon grid with staggered animations
- Icons from Devicon CDN

**Technical Implementation:**
- Grid layout with fixed 55px × 45px cells
- Stepped animations on category change
- Pixel-perfect alignment with illustration frame
- Hover effects with scale transforms

### 3. About Section
Personal background and story featuring:
- Full-body character illustration
- Expandable biography text
- Professional journey and interests

**Design Details:**
- Character illustration with 55 vector components
- Text content managed through admin panel
- Responsive layout for mobile devices

### 4. Projects Section
Portfolio showcase including:
- Project cards with images and descriptions
- Technology tags
- Links to live demos and source code
- Folder-style design elements

**Features:**
- Filterable/sortable project display
- Custom project card design
- Hover animations
- Featured projects support

### 5. Contact Section
Two-column layout with:
- Contact information card with retro styling
- Contact form (Email, Subject, Message)
- Social media links
- Retro phone illustration

**Form Functionality:**
- Client-side validation
- Success/error messaging
- Form data sent to backend API
- Messages stored in database for admin review

---

## Admin Panel

### Authentication
- Secure login with JWT tokens
- Token stored in localStorage
- Protected routes requiring authentication
- Auto-redirect for unauthorized access

### Dashboard Tabs

**1. Hero Section**
Edit homepage hero content:
- Header (main name)
- Subheader (job title)
- Text (introduction)

**2. About Me**
Manage biography:
- Full text editor for personal story

**3. Contact Info**
Update contact details:
- Email address
- Phone number
- Location
- Social media URLs (GitHub, LinkedIn, Twitter)

**4. Skills**
Comprehensive skill management:
- Add new skills with icon search
- Edit existing skills
- Delete skills
- Organize by category (Frontend, Backend, DevOps, UI/UX)
- Set display order
- Icon selector with 1000+ Devicon icons

**5. Projects & Certificates**
Project portfolio management:
- Add/edit/delete projects
- Upload project images
- Set live demo and GitHub URLs
- Add technology tags
- Feature projects on homepage
- Set display order

**6. Messages**
View contact form submissions:
- Read/unread status
- Sender information
- Message content and timestamp
- Mark as read functionality
- Delete messages

### Admin Features
- **Seed Database** - Populate with sample data
- **Logout** - Clear authentication and return to login
- **Real-time Updates** - Changes reflect immediately on frontend
- **Form Validation** - Prevent invalid data entry
- **Success/Error Alerts** - User feedback for all actions

---

## How It Works

### Frontend Flow

1. **Initial Load**
   - React app loads in browser
   - Fetches all content from API endpoints
   - Displays loading state during fetch
   - Renders sections with fetched data

2. **Navigation**
   - Smooth scroll navigation between sections
   - Hash-based routing (#home, #skills, #about, etc.)
   - Mobile hamburger menu for small screens

3. **Interactive Features**
   - Skills category filtering updates display
   - Contact form validates and submits
   - Retro animations on user interactions
   - Hover effects on buttons and cards

### Backend Flow

1. **Server Initialization**
   - Express server starts on port 5000
   - Connects to MongoDB database
   - Sets up API routes and middleware
   - Enables CORS for frontend communication

2. **API Endpoints**
   - `GET /api/content/hero-info` - Fetch hero data
   - `PUT /api/content/hero-info` - Update hero data (protected)
   - `GET /api/content/about-info` - Fetch about data
   - `PUT /api/content/about-info` - Update about data (protected)
   - `GET /api/content/contact-info` - Fetch contact data
   - `PUT /api/content/contact-info` - Update contact data (protected)
   - `GET /api/skills` - Fetch all skills
   - `POST /api/skills` - Create skill (protected)
   - `PUT /api/skills/:id` - Update skill (protected)
   - `DELETE /api/skills/:id` - Delete skill (protected)
   - `GET /api/projects` - Fetch all projects
   - `POST /api/projects` - Create project (protected)
   - `PUT /api/projects/:id` - Update project (protected)
   - `DELETE /api/projects/:id` - Delete project (protected)
   - `GET /api/messages` - Fetch messages (protected)
   - `POST /api/messages` - Send message
   - `PATCH /api/messages/:id/read` - Mark as read (protected)
   - `DELETE /api/messages/:id` - Delete message (protected)
   - `POST /api/admin/login` - Admin login
   - `POST /api/admin/seed` - Seed database (protected)

3. **Authentication**
   - Admin credentials verified with bcrypt
   - JWT token generated on successful login
   - Token required for protected routes
   - Middleware validates token on each request

4. **Database Operations**
   - Mongoose models define data structure
   - CRUD operations for each content type
   - Validation ensures data integrity
   - Timestamps track creation/update times

### Data Flow Example

**Updating Hero Section:**
1. Admin logs into dashboard
2. Navigates to "Hero Section" tab
3. Edits header, subheader, or text
4. Clicks "Update Hero Info" button
5. Frontend sends PUT request to `/api/content/hero-info`
6. Backend validates JWT token
7. Backend updates MongoDB document
8. Backend returns updated data
9. Frontend shows success message
10. Public website displays new content on next refresh

**Sending Contact Message:**
1. Visitor fills out contact form
2. Submits form
3. Frontend validates input
4. Sends POST request to `/api/messages`
5. Backend creates new Message document
6. Backend returns success response
7. Frontend shows success message
8. Admin can view message in dashboard

---

## Project Structure

```
Portfolio_project/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   ├── fullbody-character/      # Character SVG components
│   │   ├── icons/                   # Social media icons
│   │   ├── profile-pic/             # Profile picture SVG components
│   │   └── *.svg                    # Other illustrations
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── illustrations/       # SVG illustration components
│   │   │   │   ├── FullBodyCharacter.tsx
│   │   │   │   ├── ProfilePic.tsx
│   │   │   │   ├── RetroComputer.tsx
│   │   │   │   ├── RetroPhone.tsx
│   │   │   │   └── StackScreen.tsx
│   │   │   ├── sections/            # Page sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── SkillsSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── ProjectsSection.tsx
│   │   │   │   └── ContactSection.tsx
│   │   │   ├── Button.tsx           # Reusable button component
│   │   │   ├── Logo.tsx             # Site logo
│   │   │   ├── Navigation.tsx       # Navigation bar
│   │   │   ├── ProjectCard.tsx      # Project display card
│   │   │   ├── ProtectedRoute.tsx   # Auth wrapper
│   │   │   ├── SocialLink.tsx       # Social media link
│   │   │   └── SpeechBubble.tsx     # Speech bubble component
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.tsx  # Main admin interface
│   │   │   │   ├── AdminLogin.tsx      # Admin login page
│   │   │   │   ├── AdminDashboard.css  # Admin dashboard styles
│   │   │   │   └── AdminLogin.css      # Login page styles
│   │   │   └── Home.tsx             # Main portfolio page
│   │   ├── services/
│   │   │   └── api.ts               # API client functions
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript type definitions
│   │   ├── utils/
│   │   │   └── deviconIcons.ts      # Icon library utilities
│   │   ├── App.tsx                  # Main app component
│   │   ├── index.css                # Global styles
│   │   └── main.tsx                 # App entry point
│   ├── index.html                   # HTML template
│   └── package.json                 # Frontend dependencies
│
├── server/                          # Backend Node.js application
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   │   ├── heroInfoController.ts
│   │   │   ├── aboutInfoController.ts
│   │   │   ├── contactInfoController.ts
│   │   │   ├── skillController.ts
│   │   │   ├── projectController.ts
│   │   │   ├── messageController.ts
│   │   │   ├── adminController.ts
│   │   │   └── seedController.ts
│   │   ├── models/                  # Database schemas
│   │   │   ├── HeroInfo.ts
│   │   │   ├── AboutInfo.ts
│   │   │   ├── ContactInfo.ts
│   │   │   ├── Skill.ts
│   │   │   ├── Project.ts
│   │   │   ├── Message.ts
│   │   │   ├── Admin.ts
│   │   │   └── PersonalInfo.ts      # Legacy model
│   │   ├── routes/                  # API routes
│   │   │   ├── contentRoutes.ts
│   │   │   ├── skillRoutes.ts
│   │   │   ├── projectRoutes.ts
│   │   │   ├── messageRoutes.ts
│   │   │   └── adminRoutes.ts
│   │   ├── middleware/
│   │   │   └── auth.ts              # JWT authentication
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection
│   │   └── index.ts                 # Server entry point
│   └── package.json                 # Backend dependencies
│
├── explanation.md                   # This documentation
└── README.md                        # Project readme
```

---

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio_project
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Configuration**

   Create `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**

   In separate terminal windows:
   ```bash
   # Terminal 1 - Start backend
   cd server
   npm run dev

   # Terminal 2 - Start frontend
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`
   - Admin Login: `http://localhost:5173/admin/login`

7. **Seed the database**
   - Log in to admin dashboard
   - Click "Seed Database" button
   - This populates the database with sample content

### Default Admin Credentials
After seeding the database:
- Email: `admin@portfolio.com`
- Password: `admin123`

**Important:** Change these credentials immediately in production!

---

## Key Features

### Retro Design System
- Pixel-perfect stepped animations
- Hard box shadows for 3D effects
- Consistent color palette throughout
- Custom retro fonts
- Hand-crafted SVG illustrations

### Content Management
- No coding required for updates
- Intuitive admin interface
- Real-time preview of changes
- Image upload support
- Icon library integration

### Performance
- Optimized asset loading
- Lazy loading for images
- Efficient database queries
- Minimal JavaScript bundle
- CSS-only animations

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Adaptive layouts
- Hidden elements on mobile for performance

### Security
- JWT authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation
- XSS protection

---

## Customization Guide

### Changing Colors
Edit CSS variables in `client/src/index.css`:
```css
:root {
  --color-primary: #ED6A5A;    /* Coral */
  --color-secondary: #F4F1BB;  /* Cream */
  --color-tertiary: #9BC1BC;   /* Teal */
  --color-background: #FFF7E3; /* Background */
  --color-text: #66635B;       /* Text */
}
```

### Adding New Sections
1. Create component in `client/src/components/sections/`
2. Create corresponding CSS file
3. Add to `Home.tsx`
4. Update navigation in `Navigation.tsx`

### Modifying Database Schema
1. Update model in `server/src/models/`
2. Create/update controller in `server/src/controllers/`
3. Update routes in `server/src/routes/`
4. Update TypeScript types in `client/src/types/`
5. Update API client in `client/src/services/api.ts`
6. Update admin dashboard forms

---

## Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the client:
   ```bash
   cd client
   npm run build
   ```
2. Deploy `dist` folder to hosting service
3. Set environment variables for API URL

### Backend Deployment (Heroku/Railway)
1. Set up MongoDB Atlas database
2. Configure environment variables
3. Deploy server code
4. Update CORS settings to allow frontend domain

### Environment Variables
**Production Server:**
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `CLIENT_URL` - Frontend URL for CORS

---

## Technologies Explained

### Why React?
React provides a component-based architecture perfect for building reusable UI elements. The virtual DOM ensures efficient updates, and TypeScript adds type safety.

### Why Express?
Express is a minimal, flexible Node.js framework that makes creating REST APIs straightforward. It has excellent middleware support and a large ecosystem.

### Why MongoDB?
MongoDB's document-based structure is ideal for this project's flexible content. It allows easy schema modifications and stores complex nested data naturally.

### Why JWT?
JSON Web Tokens provide stateless authentication, eliminating the need for session storage. Tokens can be easily validated and contain user information.

---

## Future Enhancements

Potential features to add:
- Blog section with markdown support
- Project filtering and search
- Dark mode toggle
- Multi-language support
- Analytics dashboard
- Email notifications for messages
- Image optimization and CDN
- Progressive Web App (PWA) features
- Comment system for projects
- Resume/CV download
- Testimonials section
- Certificate gallery

---

## Credits

**Developer:** Samuel Jaari
**Design:** Custom retro aesthetic
**Icons:** Devicon CDN
**Fonts:** Google Fonts (Protest Strike, Spicy Rice, Squada One)
**Built with:** Claude Code AI Assistant

---

## License

This project is personal portfolio software. All rights reserved.

---

## Support

For questions or issues:
- Email: Jaari.samuel00@gmail.com
- GitHub: https://github.com/Stamp00
- LinkedIn: https://www.linkedin.com/in/samuel-jaari-b3b681198/

---

*Last Updated: 2025*
*Documentation Version: 1.0*
