const studentRegister = require('../models/studentRegister');
const course = require('../models/course');
const validateToken = require("../middleware/validateTokenHandler");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config();

const createStudent = async(req,res) =>{
    console.log(req.body);
try{
  const { name, email, password, DOB,gender,phoneNo,city} = req.body;
  if (!name || !email || !password || !DOB || !gender || !city || !phoneNo ) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
    

    const userAvailable = await studentRegister.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);

  var newStudent = {
    name:req.body.name,
    DOB:req.body.DOB,
    gender:req.body.gender,
    phoneNo:req.body.phoneNo,
    email:req.body.email,
    password:hashedPassword,
    city:req.body.city,
}

    const studentData = new studentRegister(newStudent);
    const savedStudentData = await studentData.save();
    res.status(200).json(savedStudentData);
}
catch(e){
console.log(e.message);
}
}

const getAllStudents = async (req,res)=>{
try{
const students = await studentRegister.find({});
res.status(200).json(students);
}
catch(e){
console.log(e.message);
}
}

const loginStudent = async (req, res) => {
  try{
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const student = await studentRegister.findOne({ email });
    // console.log(student);

    //compare password with hashedpassword
  if (student && (await bcrypt.compare(password, student.password))) {
    // console.log(student);
    const accessToken = jwt.sign(
      {
        _id:student._id,
        name:student.name,
        email:student.email,
        phoneNo:student.phoneNo,
        password:'',
        city:student.city,
        DOB:student.DOB,
        gender:student.gender
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }

    // if (student.email && student.password) {
      
    //   res.status(200).json(student);
    // } else {
    //   res.status(401);
    //   throw new Error("email or password is not valid");
    // }
    // res.status(200).json(student);
  }
  catch(e){
    console.log(e.message);
  }
    
  }
  
  const currentStudent = asyncHandler(async (req, res) => {
    res.json(req.user);
    // console.log(req.user);
    // console.log(req.student);
    // console.log(req.studentRegister);
  });

// update coures id 
// const enrollCourse = async (req,res)=>{
// try{
// const { studentId, courseId } = req.body;
//     const student = await studentRegister.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     // Push the course ID into the student's courses array
//     student.courses.push(courseId);
//     await student.save();
//     res.status(200).json({ message: 'Course added to student successfully' });

// // try {
// //     const studentId = req.params.studentId;
// //     console.log(studentId);
// //     const student = await studentRegister.findById(studentId).populate('courses');
// //     res.json(student);
// //   } catch (error) {
// //     console.error(error);
// //   }
//   //output

//   /*
  
// {
//     "_id": "65ddc96954226199bd71f1af",
//     "name": "dilip",
//     "email": "dilipgmai.com",
//     "phoneNo": "9597743752",
//     "DOB": "29.08.1995",
//     "password": "dilip123",
//     "city": "madurai",
//     "createdAt": "2024-02-27T11:37:13.763Z",
//     "updatedAt": "2024-02-27T11:37:13.763Z",
//     "__v": 2,
//     "courses": [
//         {
//             "_id": "65ddd46b3de748882a5ef334",
//             "courseTitle": "HTML",
//             "category": "Web Development",
//             "createdAt": "2024-02-27T12:24:11.163Z",
//             "updatedAt": "2024-02-27T12:24:11.163Z",
//             "__v": 0
//         },
//         {
//             "_id": "65ddd48b3de748882a5ef338",
//             "courseTitle": "MONGODB",
//             "category": "Database",
//             "createdAt": "2024-02-27T12:24:43.546Z",
//             "updatedAt": "2024-02-27T12:24:43.546Z",
//             "__v": 0
//         }
//     ]
// }

//   */
// }
// catch(e){
//     console.log(e.message);
// }
// }

module.exports = {createStudent,getAllStudents,loginStudent,currentStudent}