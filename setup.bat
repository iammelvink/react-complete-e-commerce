@echo off
echo Setting up React E-Commerce Application...
echo.

echo [1/5] Installing backend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing backend dependencies!
    pause
    exit /b 1
)

echo [2/5] Installing frontend dependencies...
call npm install --prefix frontend
if %ERRORLEVEL% NEQ 0 (
    echo Error installing frontend dependencies!
    pause
    exit /b 1
)

echo [3/5] Creating environment files...
if not exist ".env" (
    echo Creating root .env file...
    echo NODE_ENV=development > .env
    echo PORT=8000 >> .env
    echo MONGO_URI=mongodb://localhost:27017/react-ecommerce >> .env
    echo JWT_SECRET=abc123 >> .env
    echo PAYPAL_CLIENT_ID=your_paypal_client_id_here >> .env
)

if not exist "backend\.env" (
    echo Creating backend .env file...
    echo NODE_ENV=development > backend\.env
    echo PORT=8000 >> backend\.env
    echo MONGO_URI=mongodb://localhost:27017/react-ecommerce >> backend\.env
    echo JWT_SECRET=abc123 >> backend\.env
    echo PAYPAL_CLIENT_ID=your_paypal_client_id_here >> backend\.env
)

if not exist "frontend\.env" (
    echo Creating frontend .env file...
    echo SKIP_PREFLIGHT_CHECK=true > frontend\.env
    echo NODE_OPTIONS=--openssl-legacy-provider >> frontend\.env
    echo GENERATE_SOURCEMAP=false >> frontend\.env
)

echo [4/5] Setting up database with sample data...
call npm run data:import
if %ERRORLEVEL% NEQ 0 (
    echo Error importing sample data!
    pause
    exit /b 1
)

echo [5/5] Setup complete!
echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo   You can now run from any directory:
echo   - Root: npm run dev
echo   - Backend: cd backend && nodemon server.js
echo   - Frontend: cd frontend && npm start
echo ========================================
echo.
pause
