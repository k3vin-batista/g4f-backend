# =========================
# Build stage
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build


# =========================
# Runtime stage
# =========================
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled output
COPY --from=builder /app/dist ./dist

# Expose API port (documentation only)
EXPOSE 4501

# Start application
CMD ["node", "dist/main.js"]
