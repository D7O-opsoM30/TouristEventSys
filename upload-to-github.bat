@echo off
chcp 65001 >nul
echo ========================================
echo TouristEventSys - GitHub Upload Setup
echo ========================================
echo.

cd /d "%~dp0"
echo Current directory: %CD%
echo.

echo [1/4] Initializing git repository...
if exist .git (
    echo Git already initialized. Removing old .git...
    rmdir /s /q .git
)
git init
if errorlevel 1 (
    echo ERROR: Git initialization failed!
    pause
    exit /b 1
)
echo ✓ Git initialized
echo.

echo [2/4] Adding all files...
git add .
if errorlevel 1 (
    echo ERROR: Failed to add files!
    pause
    exit /b 1
)
echo ✓ Files added
echo.

echo [3/4] Creating initial commit...
git commit -m "Initial commit: TouristEventSys with security features (rate limiting, account lockout, AES-256-GCM encryption)"
if errorlevel 1 (
    echo ERROR: Commit failed!
    pause
    exit /b 1
)
echo ✓ Commit created
echo.

echo ========================================
echo ✓ Git repository ready!
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: TouristEventSys
echo 3. Make it PUBLIC
echo 4. DO NOT initialize with README
echo 5. Click "Create repository"
echo.
echo Then run: upload-to-github-push.bat
echo.
pause
