const axios = require("axios");
require("dotenv").config();

const isDevelopment = () => process.env.NODE_ENV === "development";

const apiClient = axios.create({
  baseURL: process.env.HA_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.HA_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

module.exports = { isDevelopment, apiClient };
