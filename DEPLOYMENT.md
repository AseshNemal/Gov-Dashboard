# 🚀 Sri Lankan Government Dashboard - Production Deployment Guide

## Overview
This guide will help you deploy the Sri Lankan Government Dashboard to production using modern cloud platforms.

## 📋 Prerequisites
- GitHub account
- MongoDB Atlas database (already configured)
- Domain name (optional)

## 🌐 Recommended Hosting Architecture

### Frontend: Vercel (Free Tier Available)
- ✅ Automatic deployments from GitHub
- ✅ Global CDN
- ✅ Serverless functions support
- ✅ Custom domains

### Backend: Render (Free Tier Available)
- ✅ Auto-deploy from GitHub
- ✅ Built-in SSL certificates
- ✅ Environment variables management
- ✅ Health checks

### Database: MongoDB Atlas (Already Setup)
- ✅ Cloud-hosted MongoDB
- ✅ Built-in security and backups

## 🚀 Step-by-Step Deployment

### 1️⃣ Backend Deployment (Render)

1. **Create Render Account**: Go to [render.com](https://render.com) and sign up
2. **Connect GitHub**: Link your GitHub account
3. **Create Web Service**:
   - Repository: `AseshNemal/Gov-Dashboard`
   - Root Directory: `Gov-data-simulator/backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn api:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables** (Add in Render dashboard):
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   GOOGLE_API_KEY=your_google_gemini_api_key
   CORS_ORIGINS=["https://your-frontend-domain.vercel.app"]
   ```

5. **Deploy**: Render will automatically build and deploy

### 2️⃣ Frontend Deployment (Vercel)

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up
2. **Import Project**: 
   - Connect GitHub account
   - Import `AseshNemal/Gov-Dashboard` repository
   - Root Directory: `dashboard`
   - Framework: `Next.js`

3. **Environment Variables** (Add in Vercel dashboard):
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com
   ```

4. **Deploy**: Vercel will automatically build and deploy

### 3️⃣ Update API URL

After backend is deployed, update the frontend environment variable:
1. Copy your Render service URL (e.g., `https://sri-lanka-gov-api.onrender.com`)
2. Update `NEXT_PUBLIC_API_URL` in Vercel dashboard
3. Redeploy frontend

## 🔧 Configuration Files Created

- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `Dockerfile` - Container configuration for alternative deployments
- ✅ `render.yaml` - Render service configuration
- ✅ `.env.production` - Production environment templates
- ✅ GitHub Actions workflows for CI/CD

## 🛡️ Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS Configuration**: Update to specific domains in production
3. **Rate Limiting**: Consider implementing API rate limits
4. **SSL Certificates**: Both Vercel and Render provide automatic HTTPS

## 📊 Monitoring

- **Health Check**: Available at `/api/health`
- **Render Monitoring**: Built-in service monitoring
- **Vercel Analytics**: Available in dashboard

## 💰 Cost Estimation

### Free Tier Limits:
- **Vercel**: 100GB bandwidth, unlimited projects
- **Render**: 750 hours/month, auto-sleep after 15min inactivity
- **MongoDB Atlas**: 512MB storage

### Paid Upgrades (if needed):
- **Vercel Pro**: $20/month per team member
- **Render Starter**: $7/month (no auto-sleep)
- **MongoDB Atlas**: $9/month (2GB storage)

## 🚨 Common Issues

1. **Cold Starts**: Free tier services may have startup delays
2. **Auto-Sleep**: Render free tier sleeps after 15 minutes of inactivity
3. **Build Time**: Initial deployments may take 5-10 minutes

## 📞 Support

If you encounter issues:
1. Check service logs in Render/Vercel dashboards
2. Verify environment variables are set correctly
3. Test API endpoints manually
4. Review GitHub Actions for CI/CD issues

---

## 🎉 Quick Deploy Commands

After setting up accounts:

```bash
# Push to main branch to trigger automatic deployments
git add .
git commit -m "Setup production deployment"
git push origin main
```

Both services will automatically detect changes and deploy! 🚀
