const mongoose = require('mongoose');

const commonImagesSchema = new mongoose.Schema({
    logo:String,
    certificate:String,
    banner1:String,
    banner2:String,
    banner3:String,
})

const CommonImagesModel = mongoose.model("CommonImages",commonImagesSchema);
module.exports = CommonImagesModel; 