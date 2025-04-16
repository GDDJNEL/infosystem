# Setting up pnpm global bin directory
Write-Host "Setting up pnpm global bin directory..." -ForegroundColor Green
pnpm setup

# Refreshing environment variables
Write-Host "Refreshing environment variables..." -ForegroundColor Yellow
Write-Host "Please close and reopen your terminal after this script finishes." -ForegroundColor Red

# Installing PM2 globally
Write-Host "Installing PM2 globally..." -ForegroundColor Green
pnpm add -g pm2

# Starting application with PM2
Write-Host "Starting application with PM2..." -ForegroundColor Green
Set-Location -Path "C:\xampp\htdocs\paginas_web\infosystem\infosystem-master"
pm2 start dist/server/index.js --name "infosystem"

Write-Host "PM2 setup complete! Your application should now be running." -ForegroundColor Green
Write-Host "To check status, run: pm2 status" -ForegroundColor Cyan
Write-Host "To stop the application, run: pm2 stop infosystem" -ForegroundColor Cyan
Write-Host "To restart the application, run: pm2 restart infosystem" -ForegroundColor Cyan
Write-Host "To view logs, run: pm2 logs infosystem" -ForegroundColor Cyan