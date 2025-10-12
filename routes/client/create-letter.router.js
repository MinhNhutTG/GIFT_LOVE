const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/create-letter.controller");
// const multer = require('multer')
// const uploadStream = require('../../helpers/uploadStream');

// const upload = multer();

router.get("/:idtemplate", controller.createLetter);


module.exports = router;