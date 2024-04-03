const LearnerCourse = require("../models/learnerCourse");

const getSingleLearnerCourse = async (req, res) => {
  try {
    // console.log("single learner Course : " + JSON.stringify(req.params));
    const { learnerID, courseID } = req.params;

    if (!learnerID || !courseID) {
      console.error("all id required");
      return res.status(400).json({ error: "all id required" });
    }

    // Query to find a LearnerCourse document with the given learnerID and courseID
    const existingLearnerCourse = await LearnerCourse.findOne({
      learnerID,
      courseID,
    });
    res.status(200).json(existingLearnerCourse);
  } catch (e) {
    console.log(e.message);
  }
};

const updateCertificate = async (req, res) => {
  try {
    // console.log("single learner Course : " + JSON.stringify(req.params));
    const { learnerID, courseID } = req.body;

    if (!learnerID || !courseID) {
      console.error("all id required");
      return res.status(400).json({ error: "all id required" });
    }

    // Query to find a LearnerCourse document with the given learnerID and courseID
    const existingLearnerCourse = await LearnerCourse.findOne({
      learnerID,
      courseID,
    });
    
    if(!existingLearnerCourse.isShowCertificate){
        existingLearnerCourse.isShowCertificate = true;
        existingLearnerCourse.updatedAt = new Date();
        await existingLearnerCourse.save();
    }
    else{
        console.error("certificate show true");
        return res.status(400).json({ error: "all id required" });
    }
    

    res.status(200).json(existingLearnerCourse);
  } catch (e) {
    console.log(e.message);
  }
};

const createLearnerCourse = async (req, res) => {
  try {
    console.log("learner Course : " + JSON.stringify(req.body));
    const { learnerID, courseID } = req.body;

    if (!learnerID || !courseID) {
      console.error("all id required");
      return res.status(400).json({ error: "all id required" });
    }

    const LearnerCourseData = new LearnerCourse({
      learnerID: learnerID,
      courseID: courseID,
    });

    // Query to find a LearnerCourse document with the given learnerID and courseID
    const existingLearnerCourse = await LearnerCourse.findOne({
      learnerID,
      courseID,
    });

    if (existingLearnerCourse) {
      console.error("LearnerCourse already exists");
      return res.status(400).json({ error: "LearnerCourse already exists" });
    }
    // Save the updated course document
    const savedData = await LearnerCourseData.save();

    console.log("Course inserted successfully");
    res.status(200).json(savedData);
  } catch (e) {
    console.log(e.message);
  }
};

const createLearnerCourseChapter = async (req, res) => {
  // var courseId = req.params.id1;
  // var data = {
  //     chpaterIDS:req.params.id2
  // }
  try {
    const { learnerID, courseId, chpaterIDS } = req.body;
    console.log(
      "CourseID : " + courseId,
      "Chapter ID: " + chpaterIDS,
      "Learner ID : " + learnerID
    );
    // Find the course document by its ID
    const courseID = await LearnerCourse.findOne({
      courseID: courseId,
      learnerID: learnerID,
    });

    if (!courseID) {
      console.error("Course not found");
      return res.status(404).json({ error: "Course not found" });
    }

    if (!courseID || !learnerID || !chpaterIDS) {
      console.error("all id required");
      return res.status(404).json({ error: "all id required" });
    }

    // Check if the chapterID already exists in the chapterIDS array
    if (courseID.chapterIDS.includes(chpaterIDS)) {
      console.error("Chapter already exists");
      return res.status(400).json({ error: "Chapter already exists" });
    }

    // Push the new chapter object into the `chapterIDS` array
    courseID.chapterIDS.push(chpaterIDS);

    // Save the updated course document
    const savedData = await courseID.save();

    console.log("Chapter Id inserted successfully");
    res.status(200).json(savedData);
    console.log(savedData);
  } catch (e) {
    console.log(e.message);
  }
};

const getLearnerCourseDetails = async (req, res) => {
  try {
    const allData = await LearnerCourse.find({})
      .populate("learnerID") // Populate the learnerID field
      .populate("courseID"); // Populate the courseID field;
    console.log(allData);
    res.status(200).json(allData);
  } catch (e) {
    console.log(e.message);
  }
};

const deleteLearnerCourse = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await LearnerCourse.findByIdAndDelete(id);
    res.status(201).json({ message: "Learner deleted successfully" });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  createLearnerCourse,
  createLearnerCourseChapter,
  getLearnerCourseDetails,
  deleteLearnerCourse,
  getSingleLearnerCourse,
  updateCertificate
};
