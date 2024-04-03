const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyparser = require('body-parser');

const studentRoute = require('./routers/studentRegisterRouter');
const courseRoute = require('./routers/courseRouter');
const contentRoute = require('./routers/contentRouter');
const learnerCourseRoute = require('./routers/learnerCourseRouter');
const finalExam = require('./routers/finalExamRouter');
const photoRoute = require('./routers/photoRouter');
const adminRoute = require('./routers/adminRouter');

const app = express();
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;
app.use(bodyparser.json());


mongoose.connect(DBURL).then(()=>{
    console.log("DB Connected Successfully");
    app.listen(PORT, ()=>{
        console.log("Server is running on port :"+ PORT);
    })
})
.catch(error => console.log(error));

app.use('/courseImage',express.static('uploads'));

app.use('/api/',studentRoute);
app.use('/api/',courseRoute);
app.use('/api/',contentRoute);
app.use('/api/',learnerCourseRoute);
app.use('/api/',finalExam);
app.use('/api/',adminRoute);
app.use('/api/',photoRoute);