# Multi-stage Dockerfile for Next.js (app in ./study) on Node 22
# 1) Dependencies layer
FROM node:22-bookworm-slim AS deps
WORKDIR /app

# Copy only package manifests from the study/ subfolder for caching
COPY study/package.json study/package-lock.json* study/.npmrc* ./

# Install dependencies (prefer clean install if lockfile exists)
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

# 2) Builder layer
FROM node:22-bookworm-slim AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy full project (only study/ is needed to build)
COPY study/ ./

# Build Next.js (standalone output recommended)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 3) Runtime layer
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user
RUN groupadd -r nextjs && useradd -r -g nextjs nextjs

# Copy minimal runtime from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
USER nextjs
CMD ["node", "server.js"]
