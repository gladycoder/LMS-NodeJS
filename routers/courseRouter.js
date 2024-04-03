const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/fileupload');

const courseController = require('../controllers/courseController');

router.get("/allCourse",courseController.getAllCourses);
router.post("/courseCreate",fileUpload,courseController.createCourse);
router.put("/courseUpdate/:id",fileUpload,courseController.updateCourse);
router.delete("/courseDelete/:id",courseController.deleteCourse);

router.get("/allChapters/:courseID",courseController.getAllChapters);
router.get("/singleChapter/:courseId",courseController.getSingleChapter);
router.post("/chapterCreate/:id",courseController.createChapter);
router.put("/updateChapter/:courseId",courseController.updateChapter);
router.put("/deleteChapter/:courseId",courseController.deleteChapter);


module.exports = router;