# Optimized multi-platform Dockerfile for Next.js
FROM node:22-alpine AS base

# Install system dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install npm packages (for the target platform)
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --cache /root/.npm --prefer-offline

# Builder stage (target platform, including native dependencies)
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public client configuration is deliberately supplied at build time.
ARG NEXT_PUBLIC_TEAMID
ENV NEXT_PUBLIC_TEAMID=$NEXT_PUBLIC_TEAMID

# Build the application with cache mounts
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/app/.next/cache \
    npm run build

# Runtime stage (uses target platform)
FROM node:22-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/jake-landersweb/pucknorris.com"
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Bound V8 old-space while leaving room for native allocations and buffers.
ENV NODE_OPTIONS="--max-old-space-size=256"

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

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server.js"]
