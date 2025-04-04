# Home Assistant

## Setup Instructions

1. Install Node.js v16 or later.
2. Clone this repository and navigate to the project directory:
   cd ./home-assistant
3. Install the dependencies:
   npm install
5. Start the server in development mode:
   npm run dev

6. Or start the server in production mode:
   npm start

7. The server will run on:
   http://localhost:8080

---

### Environment Variables
Ensure you set up the following environment variables in a `.env` file:

```plaintext
DEV_FRONTEND_SERVER=http://localhost:3000
PROD_FRONTEND_SERVER=
PORT=8080
HA_API_URL=http://YOUR_HOME_ASSISTANT_IP:8123/api/
HA_ACCESS_TOKEN=YOUR_LONG_LIVED_ACCESS_TOKEN
```
---

## Available Scripts

npm run dev    # Start server with development environment
npm start      # Start server in production
npm test       # Run tests with Jest and generate coverage report

---

## API Routes

Base route prefix: /api

- POST /api/lights/control – Control light devices
- POST /api/switches/control – Control switches
- POST /api/tv/control – Control TV (basic route in place)

Routes for presence and temperature are scaffolded but currently disabled.

---
