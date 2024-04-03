const express = require('express');
const router = express.Router();

const learnerCourse = require('../controllers/learnerCourseController');

router.post('/createLearnerCourse',learnerCourse.createLearnerCourse);
router.post('/createLearnerCourseChapter',learnerCourse.createLearnerCourseChapter);
router.get('/learnerCourse',learnerCourse.getLearnerCourseDetails);
router.get('/singleLearnerCourse/:learnerID/:courseID',learnerCourse.getSingleLearnerCourse);
router.delete('/deleteLearnerCourse/:id',learnerCourse.deleteLearnerCourse);
router.put('/certificateUpdate',learnerCourse.updateCertificate);
module.exports = router;