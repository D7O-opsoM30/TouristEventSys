# Script to push to GitHub after creating repository
# Replace YOUR_USERNAME with your actual GitHub username

$projectPath = "C:\Users\d7ooo\OneDrive\سطح المكتب\TouristEventSys-master"
Set-Location $projectPath

$username = Read-Host "Enter your GitHub username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Username cannot be empty!"
    exit 1
}

Write-Host "Setting up remote origin..."
git remote add origin "https://github.com/$username/TouristEventSys.git" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Remote might already exist, updating..."
    git remote set-url origin "https://github.com/$username/TouristEventSys.git"
}

Write-Host "Renaming branch to main..."
git branch -M main

Write-Host "Pushing to GitHub..."
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!"
    Write-Host "Your repository: https://github.com/$username/TouristEventSys"
} else {
    Write-Host ""
    Write-Host "❌ Push failed. Make sure:"
    Write-Host "1. You've created the repository on GitHub"
    Write-Host "2. You have the correct permissions"
    Write-Host "3. You're authenticated with GitHub (use: git config --global user.name and git config --global user.email)"
}
