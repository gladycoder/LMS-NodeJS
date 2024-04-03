const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    photo:{
        type: String,
    },
    createdAt:{
        type:Date,
        default:()=>Date.now(),
        immutable:true,
    },
    updatedAt:{
        type:Date,
        default:()=>Date.now(),
        immutable:true,
    }
})

const photoModel = mongoose.model('photo',photoSchema);
module.exports = photoModel;
