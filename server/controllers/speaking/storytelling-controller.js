const {SpeakingStorytelling, SpeakingStorytelling_Answers} = require('../../models/speaking/storytelling-model')
const cloudinary = require('../../utils/cloudinary')
const Student = require('../../models/user/student-model')



const name = "Storytelling";
const createLesson = async(req,res) =>{
    try{
        const newLesson = new SpeakingStorytelling(req.body);
        await newLesson.save();
        res.status(201).json(newLesson)
    }catch(err){
        console.error(err);
        res.status(400).json({message: "Error creating lesson"})
    }
};

const getLessons = async(req, res) =>{
    try{
        const lessons = await SpeakingStorytelling.find();
        res.json({lessons, name});
    }catch(err){
        console.error(err);
        res.status(400).json({message: 'Error retrieving lessons'})
    }
};

const getLessonByNumber = async (req,res) =>{
    try{
        const lessonNumber = req.params.lessonNumber;
        const lesson = await SpeakingStorytelling.findOne({lessonNumber});
        if(!lesson){
            return res.status(404).json({message: 'Lesson not found'});
        }
        res.json(lesson);
    }catch(err){
        console.error(err);
        res.status(400).json({message: 'Error retrieving lesson'});
    }
};

const createAnswers = async(req,res) =>{
    try{
  
        // Upload audio to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(
            req.file.path,
            { resource_type: 'auto' } 
        );
        // create a new answer script
        const newAnswer = new SpeakingStorytelling_Answers({
            lessonNumber: req.body.lessonNumber,
            audioFilePath: uploadResponse.secure_url, 
            lessonType: name,
            story: req.body.story,
            studentID: req.body.studentID,
            studentName: req.body.studentName

        });
        await newAnswer.save();
        res.status(201).json(newAnswer);
    }catch(err){
        console.error(err);
        res.status(400).json({message: 'Error creating answers'});
    }
};

const getAnswersByLesson = async(req, res) =>{
    try{
        const lessonNumber = req.params.lessonNumber;
        const answers = await SpeakingStorytelling_Answers.findOne({lessonNumber});
        res.json(answers);
    }catch(err){
        console.error(err);
        res.status(400).json({message: 'Error retrieving answers'});
    }
};

const getAnswersByStudentID = async(req, res) =>{
    try{
        const studentID = req.params.studentID;
        const answer = await SpeakingStorytelling_Answers.findOne({studentID})
        res.json(answer);
    }
    catch(error){
        console.error(err);
        res.status(400).json({message: 'Error retrieving answers'});
    }
};
const getAllAnswers = async(req, res) =>{
    try{ 
        const answers = await SpeakingStorytelling_Answers.find();
        res.json(answers);
    }catch(err){
        console.error(err);
        res.status(400).json({message: 'Error retrieving answers'});
    }
};

const updateFeedback = async(req, res) =>{
    try {
        const id = req.params.id
        const { feedback, lessonNumber, studentID, value1, value2} = req.body;
        const userID = studentID;
        const updatedLesson = await SpeakingStorytelling_Answers.findByIdAndUpdate(
            id,
            { feedback: feedback }
        );
        if (!updatedLesson) { 
            return res.status(404).send('Lesson answer feedback not updated!');
        }
        if(feedback == 'true'){
            const lesson = await SpeakingStorytelling.findOne({lessonNumber})
            if(!lesson){
                throw new Error('Completed by not updated!')
            }
            lesson.completedBy.push(studentID);
            await lesson.save();
        }
        const student = await Student.findOneAndUpdate(
            {userID},
            {speaking: value1, storytelling: value2 }
        )
        await student.save()
        

        res.status(200).json(updatedLesson);
      } catch (error) {
        res.status(500).send(error.message);
      }
}

module.exports = {updateFeedback, getAllAnswers, getAnswersByLesson, createAnswers, getLessonByNumber, getLessons, createLesson, getAnswersByStudentID}