const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { isDevelopment } = require("./utils/helpers");
const lightsRouter = require("./routes/lights");
// const presenceRouter = require("./routes/presence");
const switchesRouter = require("./routes/switches");
// const temperatureRouter = require("./routes/temperature");
const tvRouter = require("./routes/tv");

// Environment variables
const clientProdServer = process.env.PROD_FRONTEND_SERVER || "";
const clientDevServer = process.env.DEV_FRONTEND_SERVER || "";
const app = express();

// Middleware
app.use(
  cors({
    origin: isDevelopment() ? clientDevServer : clientProdServer,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    isDevelopment() ? clientDevServer : clientProdServer
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/lights", lightsRouter);
// app.use("/api/presence", presenceRouter);
app.use("/api/switches", switchesRouter);
// app.use("/api/temperature", temperatureRouter);
app.use("/api/tv", tvRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(`Error Handler: ${err.message}`);
  res.status(500).send({ message: err.message });
});

// 404 route
app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 8080;
console.log(`Running on ${process.env.NODE_ENV} mode`);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
