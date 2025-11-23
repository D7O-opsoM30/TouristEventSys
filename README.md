# Welcome to your MrDev project

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in MrDev.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Backend API

Start the API locally (from the `server` folder):

```bash
npm run dev
```

### Login security (rate limit + account lockout)

The login endpoint `POST /api/auth/login` is protected with:

- IP-based rate limiting using an in-memory sliding window
- Per-user account lockout after repeated failures

You can tweak limits via environment variables (defaults shown):

```bash
LOGIN_RATE_LIMIT_MAX=5            # attempts per window
LOGIN_RATE_LIMIT_WINDOW_MS=600000 # 10 minutes
LOGIN_LOCK_MINUTES=15             # lockout duration after threshold
```

Code locations to review/screenshot:

- `server/src/middleware/rateLimit.ts`: `rateLimitLogin` middleware
- `server/src/models/User.ts`: `failedLoginAttempts`, `lockUntil`, helpers
- `server/src/routes/auth.ts`: middleware usage and lockout logic

### Security Features

- **Rate Limiting**: IP-based sliding window (5 attempts per 10 minutes)
- **Account Lockout**: 15-minute lockout after 5 failed attempts
- **AES-256-GCM Encryption**: For sensitive data encryption (`encryptRecord`/`decryptRecord` methods)
- **Email Enumeration Protection**: Dummy password checks prevent user discovery

## Upload to GitHub

### Quick Setup (PowerShell)

1. **Open PowerShell in your project folder**
2. **Run the setup script:**
   ```powershell
   .\setup-github.ps1
   ```

3. **Create GitHub Repository:**
   - Go to [GitHub.com](https://github.com)
   - Click "New repository"
   - Name: `TouristEventSys`
   - Make it **Public**
   - **DON'T** initialize with README
   - Click "Create repository"

4. **Push to GitHub:**
   ```powershell
   .\setup-github-push.ps1
   ```
   (Enter your GitHub username when prompted)

### Manual Setup

If scripts don't work, run these commands manually:

```bash
# 1. Initialize git (in project directory)
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: TouristEventSys with security features"

# 4. After creating GitHub repo, add remote:
git remote add origin https://github.com/YOUR_USERNAME/TouristEventSys.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Make sure to add a `.env` file (not committed) with your secrets:
- `JWT_SECRET`
- `MONGO_URI`
- `ENCRYPTION_SECRET`
- `RECORD_ENC_KEY`