import { Express } from "express";
import debug from "debug";
import http from "http";

import connect from "../database/db";
import app from "../app";

/**
 * Normalize a port into a number, string, or false.
 * @param val port
 * @returns port into a number, string, or false
 */
const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Setup and start express http server
 * @param app express instance
 */
const setupServer = async (app: Express) => {
  // Setup debug
  debug("server:server");

  // Connect to database
  await connect(process.env.DB_URL as string);

  // Get port from environment and store in Express.
  const port = normalizePort(process.env.PORT || "3000");
  app.set("port", port);

  // Create HTTP server
  const server = http.createServer(app);

  // Listen on provided port, on all network interfaces
  server.listen(port);

  // Setup Event listener for HTTP server "error" event.
  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  // Setup Event listener for HTTP server "listening" event.
  server.on("listening", () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
    debug("Listening on " + bind);
  });
};

// Start server
setupServer(app);
