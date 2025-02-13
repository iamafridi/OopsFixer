const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller"); //calling ai controller from controller that we created in src folder

router.get("/get-response",aiController.getResponse);

module.exports = router;
