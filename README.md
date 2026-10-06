# AccessHub — Angular 12+ Role-Based SPA

A creative assessment project demonstrating Angular modules, reactive forms, routing/guards, services, async API calls, role-based access, and a TypeScript/Node.js dummy REST API.

## Architecture
- `frontend/`: Angular 12.2 SPA
  - `core/`: API, auth state, guards, models
  - `auth/`: login
  - `layout/`: protected shell/navigation
  - `dashboard/`: role-filtered records
  - `admin/`: admin-only user management
- `backend/`: Express + TypeScript REST API
  - JSON file acts as the dummy database
  - `delay` query parameter intentionally delays responses (0–5000 ms)

## Run
Terminal 1:
```bash
cd backend
npm install
npm run dev
```

Terminal 2:
```bash
cd frontend
npm install
npm start
```
Open `http://localhost:4200`.

## Demo accounts
- General User: `general01` / `Pass@123`
- Admin: `admin01` / `Admin@123`

## Assessment mapping
1. Login: User ID + Password + Role, dummy API, local JSON storage.
2. Logged-in page: user details + asynchronous record API + table + role-based records.
3. Admin: user CRUD-style management, configurable API delay, async loading states, modular `User`/API service architecture.

For production, replace the demo token/localStorage flow with JWT/OIDC, hash passwords, add request authentication middleware, validation, and MongoDB/DynamoDB persistence.
