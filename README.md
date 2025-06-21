Faux Chezie ERG Dashboard

Unprompted proof-of-concept built to showcase my ability to architect and deliver a full-stack, real-time PWA-style application.

Why I Built It

I created this Employee Resource Group (ERG) dashboard entirely on my own initiative to demonstrate to the team that I can take an idea from zero to production quality:

End-to-end Angular + Node.js
Secure JWT auth
Live, RxJS-driven updates
Dynamic Chart.js visualizations

Tech Stack

Frontend: Angular, RxJS, Service Worker (PWA)
Backend: Node.js, Express
Charts: Chart.js (via ng2-charts)
Auth: JWT (jsonwebtoken)
Process Mgmt: PM2
Hosting (2022*): DigitalOcean 

Setup & Run
1. Backend

cd backend
npm install

Copy & rename .env.example to .env, then fill in:

PORT=4000
SPA_PATH=../frontend/dist/<YOUR_APP_FOLDER>
JWT_SECRET=<YOUR_JWT_SECRET>
# …and any DB connection strings you need…

Start the API:

Dev mode: npm run dev
Production: npm start

Verify it’s live at http://localhost:4000

2. Frontend
cd frontend
npm install
Angular CLI: ng serve
Via npm script: npm start

Open your browser to http://localhost:4200

3. Production Build

cd frontend
npm run build

# Then back in backend, start it so it serves your built SPA from SPA_PATH
cd ../backend
npm start

👀 Checklist Before You Begin

Confirm npm scripts in backend/package.json and frontend/package.json (start, dev, build).

Verify all required env vars listed in .env.example (DB URI, secrets, etc.).

Check dist folder name under frontend/dist so SPA_PATH is correct.

License

MIT © Jesse Contreras
