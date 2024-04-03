const Photo = require("../models/photos");
const fs = require('fs');
const DIR = "./uploads/";


const createPhoto = async (req, res) => {
    console.log(req.body);
    //Image check if have then include image into payload
    var imgUrl = "";
    // let payload;
   
    try {
      if (req.file) var imgUrl = `${req.file.filename}`;
      // req.body.avatar = imgUrl;
      var newPhoto = {
        photo:imgUrl,
      };
  
      const photoData = new Photo(newPhoto);
      const savedPhotoData = await photoData.save();
      res.status(200).json(savedPhotoData);
    } catch (e) {
      console.log(e.message);
    }
  };


  //delete Course
const deletePhoto = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const photoInfo = await Photo.findByIdAndDelete({_id: id});
        const {photo} = photoInfo
        
        if(photo){
          fs.unlinkSync(DIR + photo);
        }
      await Photo.findByIdAndDelete(id);
      res.status(201).json({ message: "donation deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "internal server error" });
    }
  };

  const getAllPhoto = async (req,res) =>{
    try{
const data = await Photo.find({});
res.status(201).json(data);

    }
    catch(e){
        console.log(e.message);
    }
  }

  module.exports = {
    createPhoto,
    deletePhoto,
    getAllPhoto,
  };
  