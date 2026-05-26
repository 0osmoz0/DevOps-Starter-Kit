const http = require("node:http");
const os = require("node:os");
const { randomUUID } = require("node:crypto");

const port = Number.parseInt(process.env.PORT || "3000", 10);
const environment = process.env.APP_ENV || "development";
const serviceName = process.env.SERVICE_NAME || "docker-example-service";
const serviceVersion = process.env.SERVICE_VERSION || "local";
const startedAt = new Date();

function log(level, message, metadata = {}) {
  console.log(
    JSON.stringify({
      level,
      message,
      service: serviceName,
      timestamp: new Date().toISOString(),
      ...metadata,
    }),
  );
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload, null, 2));
}

const server = http.createServer((request, response) => {
  const requestId = request.headers["x-request-id"] || randomUUID();
  const startedAtMs = Date.now();

  response.setHeader("X-Request-Id", requestId);

  response.on("finish", () => {
    log("info", "request completed", {
      requestId,
      method: request.method,
      path: request.url,
      statusCode: response.statusCode,
      durationMs: Date.now() - startedAtMs,
    });
  });

  if (request.url === "/health") {
    sendJson(response, 200, {
      status: "ok",
      service: serviceName,
    });
    return;
  }

  if (request.url === "/ready") {
    sendJson(response, 200, {
      status: "ready",
      service: serviceName,
    });
    return;
  }

  sendJson(response, 200, {
    message: "Docker example service is running.",
    service: serviceName,
    version: serviceVersion,
    environment,
    hostname: os.hostname(),
    uptimeSeconds: Math.round(process.uptime()),
    startedAt: startedAt.toISOString(),
    endpoints: {
      home: "/",
      health: "/health",
      ready: "/ready",
    },
  });
});

server.listen(port, "0.0.0.0", () => {
  log("info", "server started", {
    environment,
    port,
    version: serviceVersion,
  });
});

function shutdown(signal) {
  log("info", "shutdown signal received", { signal });

  const timeout = setTimeout(() => {
    log("error", "forced shutdown after timeout", { signal });
    process.exit(1);
  }, 10000);

  timeout.unref();

  server.close(() => {
    log("info", "server stopped", { signal });
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
