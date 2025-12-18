FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js server
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# NEXT_PUBLIC_API_URL will be set by docker-compose
CMD ["npm", "start"]
