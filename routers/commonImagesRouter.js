const express = require('express');
const router = express.Router();
const commonImagesController = require('../controllers/commonImagesController');

router.get("/allCommonImages",commonImagesController.getAllCommonImages);
router.post("/commonImagesCreate",commonImagesController.createCommonImages);
router.put("/commonImagesUpdate/:id",commonImagesController.updateCommonImages);
module.exports = router;