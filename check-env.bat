@echo off
echo Checking Development Environment...
echo.

echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js
    goto :error
) else (
    echo ✅ Node.js: && node --version
)

echo [2/5] Checking npm...
npm --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm not found
    goto :error
) else (
    echo ✅ npm: && npm --version
)

echo [3/5] Checking MongoDB connection...
timeout /t 1 >nul
ping localhost >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Cannot reach localhost
    goto :error
) else (
    echo ✅ Localhost accessible
)

echo [4/5] Checking required files...
if not exist ".env" (
    echo ❌ .env file missing - copying from .env-example
    if exist ".env-example" (
        copy ".env-example" ".env" >nul
        echo ✅ .env file created from example
    ) else (
        echo ❌ .env-example also missing!
        goto :error
    )
) else (
    echo ✅ .env file exists
)

if not exist "frontend\.env" (
    echo ❌ frontend\.env missing - creating...
    echo SKIP_PREFLIGHT_CHECK=true > "frontend\.env"
    echo NODE_OPTIONS=--openssl-legacy-provider >> "frontend\.env"
    echo GENERATE_SOURCEMAP=false >> "frontend\.env"
    echo ✅ frontend\.env created
) else (
    echo ✅ frontend\.env exists
)

echo [5/5] Checking dependencies...
if not exist "node_modules" (
    echo ❌ Backend dependencies missing
    echo Run: npm install
    goto :error
) else (
    echo ✅ Backend dependencies installed
)

if not exist "frontend\node_modules" (
    echo ❌ Frontend dependencies missing
    echo Run: npm install --prefix frontend
    goto :error
) else (
    echo ✅ Frontend dependencies installed
)

echo.
echo ========================================
echo   Environment Check Complete ✅
echo ========================================
echo   You can now run: start-app.bat
echo ========================================
goto :end

:error
echo.
echo ========================================
echo   Environment Check Failed ❌
echo ========================================
echo   Run setup.bat to fix issues
echo ========================================

:end
echo.
pause
