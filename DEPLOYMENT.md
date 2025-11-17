# 🚀 Deployment Guide

This guide will walk you through deploying your portfolio website to production.

## Architecture

- **Frontend**: React + Vite → Vercel
- **Backend**: Node.js + Express → Render
- **Database**: MongoDB → MongoDB Atlas

---

## 📋 Prerequisites

1. GitHub account (to push your code)
2. MongoDB Atlas account (free)
3. Render account (free)
4. Vercel account (free)

---

## Step 1: Prepare Your Code

### 1.1 Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Portfolio website"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 1.2 Create Environment Files

**Client** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

**Server** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
```

---

## Step 2: Set Up MongoDB Atlas (Database)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a **New Cluster** (choose the free M0 tier)
4. Wait for cluster to be created (2-3 minutes)

### Create Database User
1. Click **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `portfolioAdmin` (or your choice)
5. Password: Generate a strong password (save it!)
6. User Privileges: **Atlas admin**
7. Click **Add User**

### Whitelist All IPs
1. Click **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere**
4. Enter `0.0.0.0/0`
5. Click **Confirm**

### Get Connection String
1. Click **Database** in the left sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `portfolio`

Example:
```
mongodb+srv://portfolioAdmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Step 3: Deploy Backend (Render)

1. Go to [render.com](https://render.com)
2. Sign up (you can use GitHub)
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Configure the service:

### Basic Settings
- **Name**: `portfolio-api` (or your choice)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`

### Build & Start Commands
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

### Environment Variables
Click **Advanced** → **Add Environment Variable**

Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate a random string (use [random.org](https://www.random.org/strings/)) |
| `FRONTEND_URL` | `https://your-portfolio.vercel.app` (you'll update this later) |
| `PORT` | `5000` |

### Deploy
1. Click **Create Web Service**
2. Wait for deployment (3-5 minutes)
3. Copy your backend URL: `https://portfolio-api-xxxx.onrender.com`

⚠️ **Important**: Free tier on Render spins down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## Step 4: Seed Your Production Database

Before deploying the frontend, you need to add content to your production database.

### Option A: Use the Seed Route (Recommended)

1. First, create an admin user:
```bash
curl -X POST https://your-backend-url.onrender.com/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "your-email@example.com",
    "password": "YourSecurePassword123!"
  }'
```

2. Login to get your token:
```bash
curl -X POST https://your-backend-url.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "YourSecurePassword123!"
  }'
```

Copy the `token` from the response.

3. Temporarily change `NODE_ENV` to `development` in Render
4. Run the seed:
```bash
curl -X POST https://your-backend-url.onrender.com/api/content/seed \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

5. Change `NODE_ENV` back to `production` in Render

### Option B: Use the Admin Panel (After frontend is deployed)

You can also use the admin panel at `/admin` to add all your content manually.

---

## Step 5: Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Sign up (you can use GitHub)
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Configure the project:

### Framework Settings
- **Framework Preset**: Vite
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Environment Variables
Add this variable:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |

Replace with your actual Render backend URL.

### Deploy
1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. Your site will be live at `https://your-project-name.vercel.app`

---

## Step 6: Update Backend with Frontend URL

1. Go back to Render dashboard
2. Select your backend service
3. Go to **Environment**
4. Update `FRONTEND_URL` to your Vercel URL: `https://your-project-name.vercel.app`
5. Click **Save Changes**
6. Your service will redeploy

---

## Step 7: Test Your Deployment

1. Visit your Vercel URL
2. Check that all content loads
3. Test the contact form
4. Visit `/admin` and login with your credentials
5. Try creating/editing content

---

## 🎉 You're Live!

Your portfolio is now deployed and accessible worldwide!

### Custom Domain (Optional)

#### Vercel (Frontend)
1. Go to your project settings in Vercel
2. Click **Domains**
3. Add your custom domain
4. Follow DNS setup instructions

#### Render (Backend)
1. Go to your service settings
2. Click **Custom Domains**
3. Add your API subdomain (e.g., `api.yourdomain.com`)
4. Update `VITE_API_URL` in Vercel to use your custom domain

---

## 🔧 Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in Render matches your exact Vercel URL
- Include `https://` in the URL
- Redeploy backend after changing CORS settings

### Database Connection Failed
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string has correct password
- Check database user has proper permissions

### Backend Not Responding
- Free tier spins down after inactivity (first request may be slow)
- Check Render logs for errors
- Verify environment variables are set correctly

### Frontend Can't Reach Backend
- Verify `VITE_API_URL` includes `/api` at the end
- Check backend URL is correct
- Open browser developer tools to see network errors

---

## 📊 Monitoring

### Render
- View logs: Dashboard → Your Service → Logs
- View metrics: Dashboard → Your Service → Metrics

### Vercel
- View deployment logs: Project → Deployments → Click deployment
- View analytics: Project → Analytics

### MongoDB Atlas
- View metrics: Cluster → Metrics tab
- Monitor database size and operations

---

## 🔐 Security Checklist

- [ ] Strong JWT_SECRET in production
- [ ] Strong admin password
- [ ] MongoDB user has minimal required permissions
- [ ] CORS configured with specific frontend URL
- [ ] Seed route disabled in production (automatically done)
- [ ] Environment variables not committed to GitHub

---

## 💰 Cost

All services have generous free tiers:

- **MongoDB Atlas**: 512 MB storage (free forever)
- **Render**: 750 hours/month (free)
- **Vercel**: 100 GB bandwidth/month (free)

This is more than enough for a personal portfolio!

---

## 📱 Next Steps

1. Add your custom domain
2. Set up Google Analytics
3. Configure email notifications for contact form
4. Add more projects through admin panel
5. Share your portfolio!

---

Need help? Check the documentation or create an issue on GitHub.
