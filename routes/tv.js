const express = require("express");
const router = express.Router();
const { controlTv } = require("../controllers/tv");

// POST: /api/tv/control
router.post("/control", controlTv);

module.exports = router;
