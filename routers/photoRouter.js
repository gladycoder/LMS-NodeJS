const express = require('express');
const router = express.Router();
const photoUpload = require('../middleware/photoUpload');

const photoController = require('../controllers/photoController');

router.post("/createPhoto",photoUpload,photoController.createPhoto);
router.delete("/deletePhoto/:id",photoController.deletePhoto);
router.get('/photos',photoController.getAllPhoto);

module.exports = router;