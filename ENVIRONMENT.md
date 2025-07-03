# Environment Configuration

## Required Environment Variables

Create a `.env` file in the root directory with these variables:

```
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb://localhost:27017/react-ecommerce
JWT_SECRET=abc123
PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

## MongoDB Setup

1. Install MongoDB on your local machine
2. Start MongoDB service
3. Database `react-ecommerce` will be created automatically

## Frontend Environment

Create `frontend/.env` with:

```
SKIP_PREFLIGHT_CHECK=true
NODE_OPTIONS=--openssl-legacy-provider
GENERATE_SOURCEMAP=false
```

## Admin User

Default admin credentials:
- Email: melvin@eg.com
- Password: 12345

## Quick Start

1. Run `setup.bat` for first-time setup
2. Run `start-app.bat` to start both servers
3. Or use `npm run dev` from command line
