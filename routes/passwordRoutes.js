const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/passwordController");

router.post("/update-password", passwordController.updatePassword);

module.exports = router;
