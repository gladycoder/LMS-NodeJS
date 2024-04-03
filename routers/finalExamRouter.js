const express = require('express');
const router = express.Router();
const finalExamController = require('../controllers/finalExamController');

router.post('/createExam/:id',finalExamController.createQuestion);
router.get('/allExam/:id',finalExamController.viewQuestions);
router.put('/deleteExam/:id',finalExamController.deleteQuestion);
module.exports = router;