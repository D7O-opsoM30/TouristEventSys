# 🚀 Upload TouristEventSys to GitHub

## Step-by-Step Guide

### Option 1: Use PowerShell Scripts (Easiest)

1. **Open PowerShell in your project folder**
   - Right-click in the project folder → "Open in Terminal" or "Open PowerShell window here"

2. **Run the setup script:**
   ```powershell
   .\setup-github.ps1
   ```

3. **Create GitHub Repository:**
   - Go to [https://github.com/new](https://github.com/new)
   - Repository name: `TouristEventSys`
   - Description: `Tourist Event Management System with Security Features`
   - Make it **Public** ✅
   - **DON'T** check "Initialize with README" ❌
   - Click "Create repository"

4. **Push to GitHub:**
   ```powershell
   .\setup-github-push.ps1
   ```
   - Enter your GitHub username when prompted

### Option 2: Manual Commands

If the scripts don't work, follow these steps:

#### Step 1: Open Terminal in Project Folder
- Navigate to: `C:\Users\d7ooo\OneDrive\سطح المكتب\TouristEventSys-master`
- Or right-click folder → "Open in Terminal"

#### Step 2: Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: TouristEventSys with security features (rate limiting, account lockout, AES-256-GCM encryption)"
```

#### Step 3: Create GitHub Repository
1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `TouristEventSys`
3. Description: `Tourist Event Management System with Security Features`
4. Make it **Public**
5. **DON'T** initialize with README
6. Click "Create repository"

#### Step 4: Connect and Push
```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/TouristEventSys.git
git branch -M main
git push -u origin main
```

### What Gets Uploaded?

✅ **All your security features:**
- Rate limiting middleware (`server/src/middleware/rateLimit.ts`)
- Account lockout system (`server/src/models/User.ts`)
- AES-256-GCM encryption methods
- Login route with security (`server/src/routes/auth.ts`)

✅ **Complete project:**
- Frontend (React + TypeScript)
- Backend (Express + MongoDB)
- All components and pages
- Configuration files

❌ **NOT uploaded (protected by .gitignore):**
- `node_modules/`
- `.env` files (your secrets)
- Build artifacts

### After Upload

Your repository will be available at:
```
https://github.com/YOUR_USERNAME/TouristEventSys
```

### Troubleshooting

**If you get "remote origin already exists":**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/TouristEventSys.git
```

**If you need to authenticate:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**If push fails:**
- Make sure you created the repository on GitHub first
- Check that the repository name matches exactly
- Verify you have write access to the repository

### Security Note

Remember to:
- ✅ Keep your `.env` file local (never commit it)
- ✅ Use strong secrets in production
- ✅ Review the `.gitignore` file before pushing

---

**Your project is ready for your security report! 🎉**
