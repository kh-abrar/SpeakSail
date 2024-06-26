const mongoose = require('mongoose');

const listeningQASchema = new mongoose.Schema({
  lessonNumber: {
    type: String,
    required: true,
    unique: true,
  },
  lessonName:{
    type: String,
    required: true
  },
  audioFilePath: {
    type: String,
    required: true,
  },
  questions: {
    type: [String],
    required: true,
  },
  completedBy:{
    type: [String],
    required: false
  },
  submittedBy:{
    type: [String],
    required: false
  },
  time : { 
    type : Date,
    default: Date.now
  }
});

const listeningQAAnswerSchema = new mongoose.Schema({
  lessonNumber: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: false,
  },
  answers: {
    type: [String],
    required: true,
  },
  feedback: {
    type: Boolean,
    required: false,
  },
  audioFilePath: {
    type: String,
    required: false,
  },
  questions: {
    type: [String],
    required: false,
  },
  time : { 
    type : Date,
    default: Date.now
  },
  comment:{
    type: String,
    required: false
  }
});

module.exports = {
  ListeningQA: mongoose.model('ListeningQA', listeningQASchema),
  ListeningQA_Answers: mongoose.model('ListeningQA_Answers', listeningQAAnswerSchema
  ),
};
