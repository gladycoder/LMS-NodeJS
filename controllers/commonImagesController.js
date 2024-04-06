const CommonImages = require("../models/commonImages");

// create new course
const createCommonImages = async (req, res) => {
    console.log(req.body);
   
    try {
     
      var newCommonImages = {
        logo: req.body.logo,
        certificate: req.body.certificate,
        banner1:req.body.banner1,
        banner2:req.body.banner2,
        banner3:req.body.banner3,
      };
  
      const commonImagesData = new CommonImages(newCommonImages);
      const savedcommonImagesData = await commonImagesData.save();
      res.status(200).json(savedcommonImagesData);
    } catch (e) {
      console.log(e.message);
    }
  };
  
  //update course
  const updateCommonImages = async (req, res) => {
    try {
      const commonImagesId = req.body._id;
      console.log(commonImagesId);
  
      //Check user have photo/image. if had then first delete local file then database
      const courseInfo = await CommonImages.find({_id: commonImagesId});
    //   const coursePhotoInfo = courseInfo[0].avatar;
    //   console.log("courseInfo : ",courseInfo);
    //   console.log("userphotInfo : ",coursePhotoInfo);
    //   console.log("imgurl : ",imgUrl);
    //   // console.log("id : ",id);
    //   if(coursePhotoInfo){
    //     fs.unlinkSync( DIR + coursePhotoInfo);
    //   }
  
  
      var updateCommonImages = {
        logo: req.body.logo,
        certificate: req.body.certificate,
        banner1:req.body.banner1,
        banner2:req.body.banner2,
        banner3:req.body.banner3,
      };
  
      const commonImagesData = await CommonImages.findByIdAndUpdate(commonImagesId, updateCommonImages, {
          new: true,
        });
        
      if (!commonImagesData) {
        console.error("Course not found");
        return res.status(404).json({ error: "Course not found" });
      }
  
      
      res.status(201).json(commonImagesData);
  
      console.log("Courseupdated successfully");
    } catch (e) {
      console.log(e.message);
    }
  };

  //get all courses
const getAllCommonImages = async (req, res) => {
    try {
      const allCommonImagesData = await CommonImages.find({});
      // console.log(allCommonImagesData);
      res.status(200).json(allCommonImagesData);
    } catch (e) {
      console.log(e.message);
    }
  };

  module.exports ={
    createCommonImages,updateCommonImages,getAllCommonImages
}