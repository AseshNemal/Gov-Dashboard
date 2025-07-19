# 🚄 Railway + Vercel Deployment Guide

## 🎯 **Chosen Architecture: Option 1 with Railway Backend**

- **Frontend**: Vercel (Free Tier)
- **Backend**: Railway (Free Tier) 
- **Database**: MongoDB Atlas (Already configured)
- **Total Cost**: $0/month

## 🚀 **Step-by-Step Railway Deployment**

### 1️⃣ **Backend Deployment (Railway)**

#### Setup Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub account
3. Verify your account

#### Deploy Backend Service
1. **Create New Project**:
   - Click "Deploy from GitHub repo"
   - Select `AseshNemal/Gov-Dashboard`
   - Choose "Gov-data-simulator/backend" as root directory

2. **Configure Service**:
   - Service Name: `sri-lanka-gov-api`
   - Runtime: Auto-detected (Python)
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn api:app --host 0.0.0.0 --port $PORT`

3. **Add Environment Variables**:
   ```bash
   MONGODB_URI=your_mongodb_atlas_connection_string
   GOOGLE_API_KEY=your_google_gemini_api_key
   CORS_ORIGINS=["*"]  # Update after frontend deployment
   PORT=8000
   PYTHONPATH=/app
   ENVIRONMENT=production
   ```

4. **Deploy**: Railway will automatically build and deploy
5. **Get Service URL**: Copy the generated URL (e.g., `https://sri-lanka-gov-api.up.railway.app`)

### 2️⃣ **Frontend Deployment (Vercel)**

#### Deploy Frontend
1. Go to [vercel.com](https://vercel.com) and sign up
2. **Import Project**:
   - Connect GitHub account
   - Import `AseshNemal/Gov-Dashboard`
   - Root Directory: `dashboard`
   - Framework: Next.js

3. **Environment Variables**:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-service-name.up.railway.app
   ```

4. **Deploy**: Vercel builds and deploys automatically

### 3️⃣ **Update CORS Configuration**

After both services are deployed:

1. **Get Frontend URL** from Vercel (e.g., `https://gov-dashboard.vercel.app`)
2. **Update Railway Environment Variables**:
   ```bash
   CORS_ORIGINS=["https://gov-dashboard.vercel.app"]
   ```
3. **Redeploy** backend service

## 🔧 **Railway-Specific Configuration Files**

Created for your project:
- ✅ `railway.toml` - Railway deployment configuration
- ✅ `Procfile` - Process definition for Railway
- ✅ `package.json` - Start script definition
- ✅ Updated GitHub Actions for Railway deployment

## 💰 **Railway Free Tier Limits**

- **Execution Time**: $5 worth of credits per month (~87 hours runtime)
- **Memory**: Up to 8GB RAM
- **Storage**: 1GB persistent disk
- **Bandwidth**: Unlimited
- **Custom Domains**: Supported
- **No Auto-Sleep**: Unlike other free tiers!

## 🛠️ **Railway Advantages**

1. **No Cold Starts**: Your service stays warm
2. **Instant Deployments**: Fast build and deploy times
3. **Automatic HTTPS**: SSL certificates included
4. **Environment Management**: Easy variable management
5. **GitHub Integration**: Auto-deploy on push
6. **PostgreSQL Add-on**: If you need SQL database later
7. **Monitoring**: Built-in metrics and logs

## 📊 **Monitoring Your Deployment**

### Railway Dashboard
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Deployments**: Build and deploy history
- **Environment**: Variable management

### Health Check Endpoint
```bash
curl https://your-service.up.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-07-19T12:00:00Z",
  "version": "1.0.0"
}
```

## 🚨 **Troubleshooting Railway**

### Common Issues:
1. **Build Fails**: Check Python version in requirements.txt
2. **Port Error**: Ensure your app uses `$PORT` environment variable
3. **Database Connection**: Verify MONGODB_URI format
4. **CORS Errors**: Update CORS_ORIGINS after frontend deployment

### Debug Commands:
```bash
# Check Railway CLI
railway login
railway status
railway logs

# Test locally
uvicorn api:app --host 0.0.0.0 --port 8000
```

## 🎉 **Quick Deploy Commands**

```bash
# Push to trigger automatic deployments
git add .
git commit -m "Deploy to Railway + Vercel"
git push origin main
```

## 📈 **Scaling Options**

When you outgrow free tier:
- **Railway Pro**: $5/month starter plan
- **Vercel Pro**: $20/month per team
- **Total**: $25/month for production-ready hosting

## 🔗 **Useful Links**

- [Railway Documentation](https://docs.railway.app)
- [Railway CLI](https://docs.railway.app/develop/cli)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [MongoDB Atlas](https://cloud.mongodb.com)

---

**Your Sri Lankan Government Dashboard will be live at:**
- **Frontend**: `https://your-project.vercel.app`
- **API**: `https://your-service.up.railway.app`
- **Health Check**: `https://your-service.up.railway.app/api/health`

🚀 **Happy Deploying!**
