# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev \
  && mkdir -p node_modules \
  && npm cache clean --force

FROM gcr.io/distroless/nodejs20-debian12 AS runtime

ARG BUILD_VERSION=local
ARG VCS_REF=unknown
ARG BUILD_DATE=unknown

LABEL org.opencontainers.image.title="Docker Example Service" \
  org.opencontainers.image.description="Minimal Node.js service used to demonstrate Docker DevOps best practices." \
  org.opencontainers.image.version="${BUILD_VERSION}" \
  org.opencontainers.image.revision="${VCS_REF}" \
  org.opencontainers.image.created="${BUILD_DATE}" \
  org.opencontainers.image.source="https://github.com/0osmoz0/AIDE_DEVOPS"

WORKDIR /app

ENV NODE_ENV=production \
  PORT=3000

COPY --from=dependencies --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --chown=nonroot:nonroot package*.json ./
COPY --chown=nonroot:nonroot src ./src

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["/nodejs/bin/node", "-e", "fetch('http://127.0.0.1:3000/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["src/server.js"]
