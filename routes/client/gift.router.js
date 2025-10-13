const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/gift.controller");
const controllerCreateLetter = require("../../controllers/client/create-letter.controller");


router.get("/:id", controller.gift);


module.exports = router;