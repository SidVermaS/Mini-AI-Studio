## Backend
### Local Setup
1. Create a `.env.local` file in the `backend` directory based on the `.env.example` file.
2. Install the dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Run docker-compose-local.yaml to set up the PostgreSQL database and start the backend server:
   ```bash
   docker compose -f docker-compose-local.yaml --env-file .env.local up
   ```

## Frontend





##### Handy Commands
###### Backend
```bash
œ
docker compose -f docker-compose-local.yaml --env-file .env.local up --build
npm run generate
```