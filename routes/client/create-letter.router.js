const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/create-letter.controller");
const upload = require("../../helpers/mullter");


router.get("/:idtemplate", controller.createLetter);
router.post("/create",upload.array("files", 5), controller.postCreateLetter);

module.exports = router;