const express = require("express");
const router = express.Router();
const { controlSwitch } = require("../controllers/switches");

// POST: /api/switches/control
router.post("/control", controlSwitch);

module.exports = router;
