const express = require("express");
const cors = require("cors");
const { loadNuxt, build } = require("nuxt");
const { createServer } = require("http");
const socket = require("./socket");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

const server = createServer(app);

const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";

async function startServer() {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? "dev" : "start");

  // Render every route with Nuxt
  app.use(nuxt.render);

  // Build only in dev mode with hot-reloading
  if (isDev) {
    await build(nuxt);
  }
  // Listen the server
  server.listen(PORT, "0.0.0.0");
  socket(server);
  console.log("Server listening on `http://localhost:" + PORT + "`.");
}

startServer();
