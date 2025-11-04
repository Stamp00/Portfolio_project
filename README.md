# Portfolio Project

A full-stack portfolio website built with React, TypeScript, Express, and MongoDB.

## Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Routing

### Backend
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Deployment
- **Vercel** - Hosting platform

## Project Structure

```
Portfolio_project/
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Layout.tsx       # Main layout wrapper with footer
│   │   │   └── Navigation.tsx   # Navigation bar with dark mode toggle
│   │   ├── context/             # React context providers
│   │   │   └── ThemeContext.tsx # Dark/Light theme management
│   │   ├── pages/               # Page components
│   │   │   ├── admin/           # Admin pages
│   │   │   │   ├── AdminDashboard.tsx  # Admin dashboard
│   │   │   │   └── AdminLogin.tsx      # Admin login page
│   │   │   ├── About.tsx        # About page
│   │   │   ├── Contact.tsx      # Contact page with form
│   │   │   ├── Home.tsx         # Home page with hero section
│   │   │   ├── Projects.tsx     # Projects showcase page
│   │   │   └── Skills.tsx       # Skills/tech stack page
│   │   ├── services/            # API service layer
│   │   │   └── api.ts           # Axios API client and endpoints
│   │   ├── types/               # TypeScript type definitions
│   │   │   └── index.ts         # Shared types/interfaces
│   │   ├── App.tsx              # Main app with routing
│   │   ├── main.tsx             # App entry point
│   │   └── index.css            # Global styles (Tailwind)
│   ├── .env                     # Environment variables
│   ├── .env.example             # Example environment file
│   ├── package.json             # Frontend dependencies
│   ├── postcss.config.js        # PostCSS configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── tsconfig.json            # TypeScript configuration
│   └── vite.config.ts           # Vite build configuration
│
├── server/                      # Express backend
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   └── database.ts      # MongoDB connection setup
│   │   ├── controllers/         # Route controllers (business logic)
│   │   │   ├── adminController.ts    # Admin authentication
│   │   │   ├── contactController.ts  # Contact form handling
│   │   │   └── projectController.ts  # Project CRUD operations
│   │   ├── middleware/          # Custom middleware
│   │   │   └── auth.ts          # JWT authentication middleware
│   │   ├── models/              # Mongoose schemas/models
│   │   │   ├── Admin.ts         # Admin user model
│   │   │   ├── Contact.ts       # Contact message model
│   │   │   └── Project.ts       # Project model
│   │   ├── routes/              # API route definitions
│   │   │   ├── adminRoutes.ts   # Admin routes
│   │   │   ├── contactRoutes.ts # Contact routes
│   │   │   └── projectRoutes.ts # Project routes
│   │   ├── services/            # External services
│   │   │   └── emailService.ts  # Nodemailer email service
│   │   └── index.ts             # Server entry point
│   ├── .env                     # Environment variables (not in git)
│   ├── .env.example             # Example environment file
│   ├── package.json             # Backend dependencies
│   └── tsconfig.json            # TypeScript configuration
│
├── .gitignore                   # Git ignore rules
├── package.json                 # Root package.json with scripts
├── vercel.json                  # Vercel deployment configuration
└── README.md                    # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Portfolio_project
```

2. Install dependencies for all packages:
```bash
npm run install:all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

3. Set up environment variables:

**Client** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

**Server** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Development

Run both client and server concurrently:
```bash
npm run dev
```

Or run them separately:
```bash
# Run client only (http://localhost:5173)
npm run dev:client

# Run server only (http://localhost:5000)
npm run dev:server
```

### Building for Production

Build both client and server:
```bash
npm run build
```

Or build separately:
```bash
# Build client only
npm run build:client

# Build server only
npm run build:server
```

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Health Check

- `GET /api/health` - Server health status

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI` - Your MongoDB connection string
   - `VITE_API_URL` - Your API URL (will be your Vercel URL + /api)

4. For production deployment:
```bash
vercel --prod
```

## Environment Variables

### Client
- `VITE_API_URL` - Backend API URL

### Server
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## Database Schema

### Project Model
```typescript
{
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Next Steps

1. Add authentication (JWT, OAuth)
2. Create additional models (Contact, Blog, etc.)
3. Implement file upload for project images
4. Add pagination for projects
5. Create frontend pages and components
6. Add form validation
7. Implement error boundaries
8. Add loading states
9. Set up testing (Jest, React Testing Library)
10. Add CI/CD pipeline

## License

MIT
