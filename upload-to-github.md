# Upload Your TouristEventSys Project to GitHub

## Step 1: Initialize Git Repository
Open PowerShell/Command Prompt in your project folder and run:

```bash
# Navigate to your project directory
cd "C:\Users\d7ooo\OneDrive\سطح المكتب\TouristEventSys-master"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: TouristEventSys with security features"
```

## Step 2: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository" (green button)
3. Repository name: `TouristEventSys`
4. Description: `Tourist Event Management System with Security Features`
5. Make it **Public** (so you can share it)
6. **DON'T** initialize with README (you already have files)
7. Click "Create repository"

## Step 3: Connect Local Repository to GitHub
After creating the repository, GitHub will show you commands. Run these:

```bash
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/TouristEventSys.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Add Security Documentation
Create a `.env.example` file:

```bash
# Copy this to .env and fill in your values
JWT_SECRET=your-jwt-secret-here
MONGO_URI=mongodb://localhost:27017/touristeventsys
ENCRYPTION_SECRET=ac30172d140b08e8b9115bd2863730eb6aae0479ea0394825fda0df7f776b9df
RECORD_ENC_KEY=ac30172d140b08e8b9115bd2863730eb6aae0479ea0394825fda0df7f776b9df
LOGIN_RATE_LIMIT_MAX=5
LOGIN_RATE_LIMIT_WINDOW_MS=600000
LOGIN_LOCK_MINUTES=15
```

## Step 5: Update README.md
Add this to your README.md:

```markdown
## Security Features

### Login Protection
- **Rate Limiting**: 5 attempts per 10 minutes per IP
- **Account Lockout**: 15-minute lockout after 5 failed attempts
- **AES-256-GCM Encryption**: For sensitive data encryption

### Code Locations
- Rate Limiter: `server/src/middleware/rateLimit.ts`
- User Security: `server/src/models/User.ts`
- Login Route: `server/src/routes/auth.ts`

### Environment Variables
See `.env.example` for required configuration.
```

## Step 6: Final Push
```bash
git add .
git commit -m "Add security documentation and environment example"
git push
```

## Your Repository Will Include:
✅ Rate limiting middleware  
✅ Account lockout system  
✅ AES-256-GCM encryption  
✅ Complete security implementation  
✅ Documentation for screenshots  

**Your project is ready for your security report!** 🎉

