@echo off
chcp 65001 >nul
echo ========================================
echo TouristEventSys - Push to GitHub
echo ========================================
echo.

cd /d "%~dp0"

set /p GITHUB_USERNAME="Enter your GitHub username: "

if "%GITHUB_USERNAME%"=="" (
    echo ERROR: Username cannot be empty!
    pause
    exit /b 1
)

echo.
echo [1/3] Setting up remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USERNAME%/TouristEventSys.git
if errorlevel 1 (
    echo ERROR: Failed to add remote!
    pause
    exit /b 1
)
echo ✓ Remote added
echo.

echo [2/3] Renaming branch to main...
git branch -M main
if errorlevel 1 (
    echo ERROR: Failed to rename branch!
    pause
    exit /b 1
)
echo ✓ Branch renamed
echo.

echo [3/3] Pushing to GitHub...
echo This may ask for your GitHub credentials...
git push -u origin main
if errorlevel 1 (
    echo.
    echo ERROR: Push failed!
    echo.
    echo Make sure:
    echo - You created the repository on GitHub
    echo - The repository name is exactly: TouristEventSys
    echo - You have the correct permissions
    echo - You're authenticated with GitHub
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ Successfully pushed to GitHub!
echo ========================================
echo.
echo Your repository: https://github.com/%GITHUB_USERNAME%/TouristEventSys
echo.
pause
