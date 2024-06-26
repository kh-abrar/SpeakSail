require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser");


//routes imports
const studentRoute = require('./routes/user/student-route')
const teacherRoute = require('./routes/user/teacher-route')
const homeRoute = require('./routes/home-route')
const profileRoute = require('./routes/profile-route')
const listeningPagesRoute = require('./routes/listening-route')
const speakingPagesRoute = require('./routes/speaking-route')
const readingPagesRoute = require('./routes/reading-route')
const writingPagesRoute = require('./routes/writing-route')
const materialRoute = require('./routes/material-route')
const extraExercises = require('./routes/extras-route')
const notifications = require('./routes/notification-route')
const submission = require('./routes/submission-route')

//middleware
app.use(express.json())
app.use(cors()) 

app.use(bodyParser.json()); // for JSON data
app.use(bodyParser.urlencoded({ extended: true })); // for URL-encoded data

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/student', studentRoute); 
app.use('/teacher', teacherRoute);
app.use('/home', homeRoute);
app.use('/profile',profileRoute);
app.use('/materials', materialRoute)
app.use('/extras',extraExercises)
app.use('/notifications', notifications)
app.use('/lessons/listening',listeningPagesRoute);
app.use('/lessons/speaking',speakingPagesRoute);
app.use('/lessons/reading',readingPagesRoute);
app.use('/lessons/writing',writingPagesRoute);
app.use('/submission', submission)



//mongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        //listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db & listening on port', process.env.PORT,"\n.................................")
        })

    })
    .catch(err=>{
        console.log(err)
    })