# Navigate to project directory
$projectPath = "C:\Users\d7ooo\OneDrive\سطح المكتب\TouristEventSys-master"
Set-Location $projectPath

# Remove any existing .git in wrong location
if (Test-Path "$env:USERPROFILE\.git") {
    Write-Host "Removing git from home directory..."
    Remove-Item -Recurse -Force "$env:USERPROFILE\.git" -ErrorAction SilentlyContinue
}

# Initialize git in project directory
Write-Host "Initializing git repository..."
git init

# Add all files
Write-Host "Adding all files..."
git add .

# Create initial commit
Write-Host "Creating initial commit..."
git commit -m "Initial commit: TouristEventSys with security features (rate limiting, account lockout, AES-256-GCM encryption)"

Write-Host ""
Write-Host "✅ Git repository initialized successfully!"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Go to https://github.com and create a new repository named 'TouristEventSys'"
Write-Host "2. After creating the repo, run these commands:"
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/TouristEventSys.git"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "Or run: setup-github-push.ps1 after creating the GitHub repo"
