const express = require("express");
const router = express.Router();
const { controlLights } = require("../controllers/lights");

// POST: /api/lights/control
router.post("/control", controlLights);

module.exports = router;
