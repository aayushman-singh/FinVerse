# Stage 1: Build the frontend
FROM node:22 AS frontend

# Set working directory for frontend
WORKDIR /usr/src/app/frontend

# Copy frontend package.json and package-lock.json to install dependencies
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the entire frontend source code
COPY frontend .

# Build the frontend (output goes to /usr/src/app/frontend/dist)
RUN npm run build

# Stage 2: Set up the backend
FROM node:22 AS backend

# Set working directory for backend
WORKDIR /usr/src/app/backend

# Copy backend package.json and package-lock.json to install dependencies
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the entire backend source code
COPY backend .

# Stage 3: Combine frontend and backend in a single container
FROM node:22 AS production

# Set working directory for production
WORKDIR /usr/src/app

# Copy backend and frontend build files from previous stages
COPY --from=backend /usr/src/app/backend ./backend
COPY --from=frontend /usr/src/app/frontend/dist ./frontend/dist

# Install a lightweight HTTP server to serve the frontend
RUN npm install -g serve

# Expose ports for frontend and backend
EXPOSE 5003 3000

# Start both frontend and backend using npm-run-all
CMD ["sh", "-c", "serve -s frontend/dist -l 3000 & npm --prefix backend start"]
