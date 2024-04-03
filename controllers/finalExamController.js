const finalExam = require('../models/finalExam');
const Course = require('../models/course');
const mongoose = require('mongoose');


const createQuestion = async (req,res)=>{
// console.log(req.params.id);
try{
    console.log(req.body);

 var data ={
    courseID : req.params.id,
    questions:{
        questionType:req.body.questionType,
        question:req.body.question,
        answers: req.body.answers,
    }
}

var courseId = await finalExam.findOne({courseID:req.params.id}); 
if(!courseId){
    const FinalExamData = new finalExam(data)
// Save the updated course document
const savedData = await FinalExamData.save();
console.log('Final Exam inserted successfully');
res.status(200).json(savedData);
// console.log(data);
}
else{
    courseId.questions.push(data.questions);
    // courseId.answers.push(data.answers);
    const savedData = await courseId.save();
    console.log('Chapter inserted successfully');
    res.status(200).json(savedData);
    // console.log(data);
}
}
catch(e){
    console.log(e.message);
}
}

const viewQuestions = async(req,res)=>{

    try{
// id = new mongoose.Types.ObjectId(req.params.id);
id= req.params.id;
console.log(id);
const saveData = await finalExam.findOne({courseID:id})

// console.log(saveData);
res.status(200).json(saveData.questions);
    }
    catch(e){
        console.log(e.message);
    }
}

const deleteQuestion = async(req,res)=>{
    try {
        const courseId = req.params.id;
        const questionId = req.body._id;

        // Find the document by its course ID
        const course = await finalExam.findOne({ courseID: courseId });

        if (!course) {
            console.error('Course not found');
            return res.status(404).json({ error: 'Course not found' });
        }

        // Use the $pull operator to remove the question from the questions array
        course.questions.pull({ _id: questionId });

        // Save the updated document
        const savedData = await course.save();

        console.log('Question deleted successfully');
        res.status(200).json(savedData);
    }
catch(e){
    console.log(e.message);
}
}
module.exports = {createQuestion,viewQuestions,deleteQuestion}