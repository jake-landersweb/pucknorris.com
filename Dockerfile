# FROM https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:18-alpine AS base


# install system deps
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# install npm packages
COPY package.json package-lock.json ./
RUN npm ci

# use a builder step
FROM base AS builder
WORKDIR /app

# copy the source code and build
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# create a user group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# copy the public assets
COPY --from=builder /app/public ./public

# copy the compiled bundle
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# set the runtime environment
USER nextjs
EXPOSE 3000
ENV PORT=3000

# run the server
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
