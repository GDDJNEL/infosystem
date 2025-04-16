@echo off
echo Starting deployment process...

echo Building application...
call pnpm run build

echo Starting server...
call pnpm start

echo Deployment complete!