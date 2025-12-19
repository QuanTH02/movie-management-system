FROM node:18-alpine

WORKDIR /app

# Build args for environment variables (must be set at build time for Next.js)
ARG NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy project files
COPY . .

# Build Next.js app (NEXT_PUBLIC_* vars must be available at build time)
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js server
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["npm", "start"]
