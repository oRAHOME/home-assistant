const express = require("express");
const router = express.Router();
const { toggleTv } = require("../controllers/tv");

// POST: /api/tv/control
router.post("/control", toggleTv);

module.exports = router;
