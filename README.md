### Faux Chezie ERG Dashboard

> **Unprompted proof-of-concept** built to showcase my ability to architect and deliver a full-stack, real-time PWA-style application.

## Why I Built It

I created this Employee Resource Group (ERG) dashboard entirely on my own initiative to demonstrate to the team that I can take an idea from zero to production quality:

- End-to-end Angular + Node.js  
- Secure JWT auth  
- Live, RxJS-driven updates  
- Dynamic Chart.js visualizations  

## Tech Stack

- **Frontend:** Angular, RxJS, Service Worker (PWA)  
- **Backend:** Node.js, Express  
- **Charts:** Chart.js (via ng2-charts)  
- **Auth:** JWT (`jsonwebtoken`)  
- **Process Mgmt:** PM2  
- **Hosting *2022:** DigitalOcean  

---

## Setup & Run

1. **Backend:**  
   - `cd backend && npm install`  
   - Copy and rename `.env.example` to `.env`, then fill in `PORT=4000`, `SPA_PATH=../frontend/dist/<YOUR_APP_FOLDER>`, `JWT_SECRET=<YOUR_JWT_SECRET>`, and any database connection strings.  
   - Start the API in dev mode with `npm run dev` or in production with `npm start`.  
   - Verify it’s live at `http://localhost:4000`.  

2. **Frontend:**  
   - `cd frontend && npm install`  
   - Run in dev mode with `ng serve` or `npm start`.  
   - Open your browser to `http://localhost:4200`.  

3. **Production Build:**  
   - `cd frontend && npm run build`  
   - Return to the `backend` folder and run `npm start` to serve the built SPA from `SPA_PATH`.  

---

## 👀 Checklist Before You Begin

- Confirm npm scripts in `backend/package.json` and `frontend/package.json` (`start`, `dev`, `build`).  
- Verify all required environment variables in `.env.example` (DB URI, secrets, etc.).  
- Check the dist folder name under `frontend/dist` so `SPA_PATH` is correct.  

---

## License

MIT © Jesse Contreras
