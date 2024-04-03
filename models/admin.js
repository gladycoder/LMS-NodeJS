const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
    },
    password:{
        type:String,
        
    },
    isLogin:{
        type:Boolean,
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

const adminModel = mongoose.model('admin',adminSchema);
module.exports = adminModel;
