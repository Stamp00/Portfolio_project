# ⚡ Quick Start Guide

## Local Development

### 1️⃣ Setup (First Time Only)

```bash
# Run the setup script
./setup.sh

# Or manually:
cp server/.env.example server/.env
cp client/.env.example client/.env
cd server && npm install
cd ../client && npm install
```

### 2️⃣ Configure Environment

Edit `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key-here
```

### 3️⃣ Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Visit: `http://localhost:5173`

### 4️⃣ Create Admin User

```bash
# Using curl
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "Admin123!"
  }'

# Or use Postman/Insomnia
POST http://localhost:5000/api/admin/register
Body: {
  "username": "admin",
  "email": "admin@example.com",
  "password": "Admin123!"
}
```

### 5️⃣ Access Admin Panel

Go to: `http://localhost:5173/admin`

Login with your credentials.

---

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment guide.

### Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Create MongoDB Atlas cluster
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Vercel
- [ ] Seed production database
- [ ] Test everything works

---

## 🆘 Common Issues

### "Cannot connect to MongoDB"
- Make sure MongoDB is running locally: `mongod`
- Or update MONGODB_URI in `.env` to use MongoDB Atlas

### "CORS Error"
- Check that backend URL in client matches `http://localhost:5000`
- Restart both servers

### "Port already in use"
- Frontend: Change port in `vite.config.ts`
- Backend: Change PORT in `server/.env`

### "Admin login not working"
- Make sure you created an admin user first
- Check JWT_SECRET is set in `server/.env`

---

## 📁 Project Structure

```
Portfolio_project/
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API calls
│   │   └── types/       # TypeScript types
│   └── public/          # Static assets
│
├── server/              # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Auth, etc.
│   └── dist/            # Compiled JavaScript
│
└── DEPLOYMENT.md        # Full deployment guide
```

---

## 🔗 Useful URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Admin Panel: http://localhost:5173/admin
- API Health: http://localhost:5000/api/health

---

## 💡 Development Tips

### Adding a New Project
1. Go to Admin Panel (`/admin`)
2. Click "Add New Project"
3. Fill in details and save
4. Project appears on homepage automatically

### Customizing Content
- Hero section: Admin → Hero Info
- About section: Admin → About Info
- Skills: Admin → Skills
- Contact: Admin → Contact Info

### Styling
- Main styles: `client/src/index.css`
- Component styles: `client/src/components/*.css`
- Color scheme: CSS variables in `index.css`

---

Need more help? Check the [full deployment guide](./DEPLOYMENT.md) or open an issue!
