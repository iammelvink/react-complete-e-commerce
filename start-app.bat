@echo off
echo Starting React E-Commerce Application...
echo.

echo [1/3] Checking if MongoDB is running...
echo Make sure MongoDB is running on localhost:27017
echo.

echo [2/3] Starting Backend Server (Port 8000)...
start "Backend Server" cmd /k "npm run server"
timeout /t 3 >nul

echo [3/3] Starting Frontend Server (Port 3000)...
start "Frontend Server" cmd /k "npm run client"

echo.
echo ========================================
echo   React E-Commerce Application Started
echo ========================================
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo   Admin:    melvin@eg.com / 12345
echo ========================================
echo.
echo Press any key to close this window...
pause >nul
