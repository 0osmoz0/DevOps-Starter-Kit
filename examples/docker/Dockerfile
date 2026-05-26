# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app

FROM base AS dependencies

COPY package*.json ./
RUN npm ci --omit=dev

FROM base AS runtime

COPY --from=dependencies /app/node_modules ./node_modules
COPY --chown=app:app package*.json ./
COPY --chown=app:app src ./src

USER app

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "src/server.js"]
