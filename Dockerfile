# Optimized multi-platform Dockerfile for Next.js
FROM --platform=$BUILDPLATFORM node:22-alpine AS base

# Install system dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install npm packages (runs on build platform for speed)
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --cache /root/.npm --prefer-offline

# Builder stage (runs on build platform)
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application with cache mounts
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/app/.next/cache \
    npm run build

# Runtime stage (uses target platform)
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create user group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set runtime configuration
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
