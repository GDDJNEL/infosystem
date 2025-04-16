# Starting MongoDB
Write-Host "Starting MongoDB..." -ForegroundColor Green

# Check if MongoDB is installed at the expected path
$mongoPath = "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
if (Test-Path $mongoPath) {
    Start-Process -FilePath $mongoPath -ArgumentList "--dbpath=C:\data\db" -WindowStyle Minimized
    # Wait for MongoDB to start
    Write-Host "Waiting for MongoDB to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
} else {
    Write-Host "MongoDB not found at $mongoPath" -ForegroundColor Red
    Write-Host "Continuing without starting MongoDB..." -ForegroundColor Yellow
    Write-Host "Make sure MongoDB is running or the application may not work correctly." -ForegroundColor Yellow
}

# Starting the application
Write-Host "Starting Infosystem application..." -ForegroundColor Green
Set-Location -Path "C:\xampp\htdocs\paginas_web\infosystem\infosystem-master"
pnpm start

Write-Host "Application is running!" -ForegroundColor Green