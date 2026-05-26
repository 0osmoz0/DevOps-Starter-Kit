const http = require("node:http");
const os = require("node:os");

const port = Number.parseInt(process.env.PORT || "3000", 10);
const environment = process.env.APP_ENV || "development";

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload, null, 2));
}

const server = http.createServer((request, response) => {
  if (request.url === "/health") {
    sendJson(response, 200, {
      status: "ok",
      service: "docker-example-service",
    });
    return;
  }

  sendJson(response, 200, {
    message: "Docker example service is running.",
    environment,
    hostname: os.hostname(),
    endpoints: {
      home: "/",
      health: "/health",
    },
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`docker-example-service listening on port ${port}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}. Closing HTTP server.`);
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
