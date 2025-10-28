# Mini AI Studio
A full-stack web application for simulating AI-powered image generation.<br/>
[Screen Recording Video](https://www.loom.com/share/239e97dfd66f4067ba714fa4ccc2ee62)

## Tech Stack

- **Frontend**: Next.js 15
- **Backend**: Node.js Fastify
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Styling**: Tailwind CSS
- **Containerization**: Docker

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
docker compose -f docker-compose-local.yaml --env-file .env.local down
docker compose -f docker-compose-local.yaml --env-file .env.local up --build
docker compose -f docker-compose-local.yaml --env-file .env.local up --build --force-recreate
npm run generate
```