const express = require('express');
const router = express.Router();
const studentRegisterRoute = require('../controllers/studentRegisterController');
const validateToken = require('../middleware/validateTokenHandler');

router.get("/allStudent",studentRegisterRoute.getAllStudents);
router.post("/studentCreate",studentRegisterRoute.createStudent);
router.post("/login",studentRegisterRoute.loginStudent);
router.get("/current", validateToken, studentRegisterRoute.currentStudent);


// router.post("/studentCourse",studentRegisterRoute.enrollCourse);
// router.post("/students/:studentId/courses",studentRegisterRoute.enrollCourse);
module.exports = router;