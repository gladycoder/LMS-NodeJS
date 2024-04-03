const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/course/:courseID/:chapterID',contentController.getAllContents);
router.post('/course/:courseId/:chapterId',contentController.createContent);
router.put('/course/:courseId/:chapterId',contentController.updateContent);
router.put('/deleteContent/:courseId/:chapterId',contentController.deleteContent);
module.exports = router;