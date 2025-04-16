@echo off
echo Starting MongoDB...
start "" "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"

echo Waiting for MongoDB to start...
timeout /t 5

echo Starting Infosystem application...
cd C:\xampp\htdocs\paginas_web\infosystem\infosystem-master
pnpm start

echo Application is running!