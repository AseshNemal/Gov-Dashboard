# 🚄 Quick Railway Setup Commands

## Install Railway CLI (Optional but Recommended)

```bash
# macOS
brew install railway

# npm (all platforms)
npm install -g @railway/cli

# Direct download
curl -fsSL https://railway.app/install.sh | sh
```

## Login and Deploy

```bash
# Login to Railway
railway login

# Link to your project (run from backend directory)
cd Gov-data-simulator/backend
railway link

# Deploy manually (optional - auto-deploys on git push)
railway up

# View logs
railway logs

# Open service in browser
railway open
```

## Environment Variables via CLI

```bash
# Set environment variables
railway variables set MONGODB_URI="your_mongodb_connection_string"
railway variables set GOOGLE_API_KEY="your_google_api_key"
railway variables set CORS_ORIGINS='["https://your-frontend.vercel.app"]'

# List all variables
railway variables

# Delete a variable
railway variables delete VARIABLE_NAME
```

## Project Management

```bash
# View project status
railway status

# View deployments
railway logs --deployment

# Connect to service shell
railway shell

# View metrics
railway metrics
```

## 🎯 **Recommended Workflow**

1. **Development**: Code locally, test with `uvicorn api:app --reload`
2. **Commit**: `git add . && git commit -m "feature update"`
3. **Deploy**: `git push origin main` (triggers auto-deploy)
4. **Monitor**: `railway logs` or use Railway dashboard
5. **Debug**: `railway shell` if needed

## 🔗 **Useful Railway Commands**

```bash
# Quick service info
railway status

# Stream live logs
railway logs --follow

# Environment variables
railway variables

# Service metrics
railway metrics

# Connect database (if using Railway PostgreSQL)
railway connect

# Download service logs
railway logs --download
```

---

**Pro Tip**: Pin the Railway dashboard and use `railway logs --follow` during initial deployment to monitor the build process! 🚀
