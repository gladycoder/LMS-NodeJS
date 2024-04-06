const Course = require("../models/course");
const fs = require('fs');
const DIR = "./uploads/";
// create new course
const createCourse = async (req, res) => {
  console.log(req.body);
  //Image check if have then include image into payload
  var imgUrl = "";
  // let payload;
 
  try {
    // if (req.file) var imgUrl = `${req.file.filename}`;
    // req.body.avatar = imgUrl;
    var newCourse = {
      courseName: req.body.courseName,
      description: req.body.description,
      courseImage:req.body.courseImage,
      // avatar:imgUrl,
    };

    const courseData = new Course(newCourse);
    const savedCourseData = await courseData.save();
    res.status(200).json(savedCourseData);
  } catch (e) {
    console.log(e.message);
  }
};

//update course
const updateCourse = async (req, res) => {
  try {
    const courseId = req.body._id;
    console.log(courseId);
    //If File have then push file into reqBody then process update
    // var imgUrl = '';
    // if(req.file) var imgUrl = `${req.file.filename}`;
    // reqBody.avatar = imgUrl;

    //Check user have photo/image. if had then first delete local file then database
    const courseInfo = await Course.find({_id: courseId});
    const coursePhotoInfo = courseInfo[0].courseImage;
    console.log("courseInfo : ",courseInfo);
    console.log("userphotInfo : ",coursePhotoInfo);
    console.log("imgurl : ",imgUrl);
    // console.log("id : ",id);
    if(coursePhotoInfo){
      fs.unlinkSync( DIR + coursePhotoInfo);
    }


    var updateCourse = {
      courseName: req.body.courseName,
      description: req.body.description,
      courseImage:req.body.courseImage,
      // avatar:imgUrl,
    };

    const course = await Course.findByIdAndUpdate(courseId, updateCourse, {
        new: true,
      });
      
    if (!course) {
      console.error("Course not found");
      return res.status(404).json({ error: "Course not found" });
    }

    
    res.status(201).json(course);

    console.log("Courseupdated successfully");
  } catch (e) {
    console.log(e.message);
  }
};

//delete Course
const deleteCourse = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const courseInfo = await Course.findByIdAndDelete({_id: id});
        const {courseImage} = courseInfo
        
        if(courseImage){
          fs.unlinkSync(DIR + courseImage);
        }
      await Course.findByIdAndDelete(id);
      res.status(201).json({ message: "donation deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "internal server error" });
    }
  };

// create new chapter
const createChapter = async (req, res) => {
  // console.log("Body: ",req.body , "ID :",req.params.id);
  try {
    var courseId = req.params.id;
    var newChapter = {
      chapterTitle: req.body.chapterTitle,
    };
    // Find the course document by its ID
    const courseID = await Course.findById(courseId);

    if (!courseID) {
      console.error("Course not found");
      return res.status(404).json({ error: "Course not found" });
    }

    // Push the new chapter object into the `chapter` array
    courseID.chapter.push(newChapter);

    // Save the updated course document
    const savedCourseData = await courseID.save();

    console.log("Chapter inserted successfully");
    res.status(200).json(savedCourseData);
  } catch (e) {
    console.log(e.message);
  }
};

//update chapter
const updateChapter = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.body._id;
    const newChapterTitle = req.body.chapterTitle;

    // Find the course document by its ID
    const course = await Course.findById(courseId);

    if (!course) {
      console.error("Course not found");
      return res.status(404).json({ error: "Course not found" });
    }

    // Find the index of the chapter to update
    const chapterIndex = course.chapter.findIndex(
      (chapter) => chapter._id.toString() === chapterId
    );

    if (chapterIndex === -1) {
      console.error("Chapter not found");
      return res.status(404).json({ error: "Chapter not found" });
    }

    // Update the chapter title
    course.chapter[chapterIndex].chapterTitle = newChapterTitle;

    // Save the updated course document
    const savedCourseData = await course.save();

    console.log("Chapter title updated successfully");
    res.status(200).json(savedCourseData);
  } catch (e) {
    console.log(e.message);
  }
};

const deleteChapter = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.body._id;
    console.log("course Id " + courseId + " chapterId : " + chapterId);

    // Find the course document by its ID
    const course = await Course.findById(courseId);

    if (!course) {
      console.error("Course not found");
      return res.status(404).json({ error: "Course not found" });
    }

    if (!chapterId) {
      console.error("chapterId is empty");
      return res.status(404).json({ error: "chapterId is empty" });
    }

    // Find the index of the chapter to delete
    const chapterIndex = course.chapter.findIndex(
      (chapter) => chapter._id.toString() === chapterId
    );

    if (chapterIndex === -1) {
      console.error("Chapter not found");
      return res.status(404).json({ error: "Chapter not found" });
    }

    // Remove the chapter from the `chapter` array
    course.chapter.splice(chapterIndex, 1);

    // Save the updated course document
    const savedCourseData = await course.save();

    console.log("Chapter deleted successfully");
    res.status(200).json(savedCourseData);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get single chapter
const getSingleChapter = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.body._id;
    console.log(chapterId);
    // Find the course document by its ID
    const course = await Course.findById(courseId);

    if (!course) {
      console.error("Course not found");
      return res.status(404).json({ error: "Course not found" });
    }

    // Find the index of the chapter to update
    const chapterIndex = course.chapter.findIndex(
      (chapter) => chapter._id.toString() === chapterId
    );

    if (chapterIndex === -1) {
      console.error("Chapter not found");
      return res.status(404).json({ error: "Chapter not found" });
    }
    const chapterData = course.chapter[chapterIndex];
    // console.log(course.chapter[chapterIndex]);
    res.status(200).json(chapterData);
  } catch (e) {
    console.log(e.message);
  }
};

//get all courses
const getAllCourses = async (req, res) => {
  try {
    const allCourseData = await Course.find({}).populate("chapter.contentIds");
    // console.log(allCourseData);
    res.status(200).json(allCourseData);
  } catch (e) {
    console.log(e.message);
  }
};

const getAllChapters = async (req, res) => {
  try {
    const id = req.params.courseID;
    // console.log(id);
    const chapterData = await Course.findById(id);
    res.status(200).json(chapterData.chapter);
  } catch (e) {
    console.log(e.message);
  }
};



module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  createChapter,
  getAllChapters,
  updateChapter,
  getSingleChapter,
  deleteChapter,
};
