# 🚄 Quick Railway Deployment Steps

## 1. Deploy Backend to Railway

1. **Visit**: https://railway.app
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select**: `AseshNemal/Gov-Dashboard`
5. **Root Directory**: `Gov-data-simulator/backend`

## 2. Add Environment Variables in Railway

```bash
MONGODB_URI=mongodb+srv://aseshnemal:asesh@cluster0.s5idn.mongodb.net/reviveNation?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true
GOOGLE_API_KEY=AIzaSyAD9hUL3L4qdxGlB4EVevwhP9HlBNB92uw
PORT=8000
CORS_ORIGINS=["https://gov-dashboard-xi.vercel.app"]
```

## 3. Get Your Railway URL

After deployment, Railway will give you a URL like:
`https://[service-name]-production.up.railway.app`

## 4. Update Frontend

Once you have the Railway URL, I'll help you update the Vercel configuration to point to your Railway backend.

---

## 🔧 Current Issue

Your Vercel frontend (https://gov-dashboard-xi.vercel.app/) is working perfectly! 
The error is because it's trying to call an API that doesn't exist yet.

**Frontend**: ✅ Deployed on Vercel  
**Backend**: ❌ Needs to be deployed on Railway  
**Database**: ✅ MongoDB Atlas ready

Once backend is deployed, your dashboard will show real data! 🎉
