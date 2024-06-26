import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useHistory } from 'react-router-dom'
import avatar1 from '../../../assets/images/PFP.png'
import avatar2 from '../../../assets/images/teacherAvatar.png'
import { DUMMY_POST } from './data'
import { DUMMY_POST1 } from './data2'
import { DUMMY_POST2 } from './data3'
import { FiChevronRight } from 'react-icons/fi';

import { useEvaluation } from '../../../contexts/EvaluationContext'
import { useAnswer } from '../../../contexts/AnswerContext'


const Dashboard = () => {
  const navigate = useNavigate();
  const {lesson_types, lessons, selectedLesson, handleLessonTypeClick} = useEvaluation();

  const redirectToEvaluationPage = (lesson) => {
    navigate('/teachers/evaluation', { lesson });
  };

  const {answer} = useAnswer()
  console.log(answer)

  const [totalClasses, setTotalClasses] = useState(5);
  const [studentImg, setStudentImg] = useState(avatar1);
  const [teachertImg, setTeacherImg] = useState(avatar2);
 
  const [recents, setRecents] = useState([]);
  const [deadlines, setDeadlines] = useState(DUMMY_POST2);
  
  const [teacher, setTeacher] = useState()
  const [students, setStudents] = useState([])
  const userID = localStorage.getItem('user')
  const [totalLessons, setTotalLessons] = useState()

  
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const response = await fetch(`http://localhost:4000/teacher/${userID}`)
        const response2 = await fetch(`http://localhost:4000/student/`)
        const response3 = await fetch(`http://localhost:4000/home/`)
        const response4 = await fetch('http://localhost:4000/submission/all')

        if(!response.ok && !response2.ok && !response3.ok && !response4.ok){
          throw new Error('Data can not be fetched!')
        }
        const userData = await response.json();
        const userData2 = await response2.json();
        const userData3 = await response3.json();
        const userData4 = await response4.json();
        console.log(userData4)
        setTeacher(userData)
        setStudents(userData2)
        setTotalLessons(userData3.listeningSEN + userData3.listeningQA + userData3.speaking + userData3.reading + userData3.writing)
        setRecents(userData4)


      }catch(error){
        console.log( error.message)
      }
    }
    fetchData();
  },[userID])

 // Calculate total lessons completed for each student
 const calculateTotalLessons = (student) => {
    return (
      student.listening +
      student.speaking +
      student.writing +
      student.reading 
    );
  };
  
  // Sort students by total lessons completed
  const sortedStudents = [...students].sort(
    (a, b) => calculateTotalLessons(b) - calculateTotalLessons(a)
  );
  const topStudents = sortedStudents.slice(0, 4);

  {(!teacher || !answer || !students || !topStudents || !recents) && <div>...Loading</div>}


  return (
        <div className='middle'>
          {console.log(answer)}
          <div className='middle-left'>
            <div className='upper'>
              <div className='stats-banner' id='ban1'>
                <h2>Total Students</h2>
                <h1>{students.length}</h1>
              </div>

              <div className='stats-banner' id='ban2'>
                <h2>Total Classes</h2>
                <h1>{totalClasses}</h1>
              </div>

              <div className='stats-banner' id='ban3'>
                <h2>Total Lessons</h2>
                <h1>{totalLessons}</h1>
              </div>
            </div>
            <div className='top-students'>
            <h2 id='headers2'>Top Performing Students</h2>
            <div className='mid'>
              {topStudents.slice(0,4).map((student, key)=>{
                return(
                  <div className='student-info'>
                      <div className='img-block'>
                        <img src={studentImg}></img>
                      </div>
                      <div className='info-block'>
                        <div className='info-block-sub'>
                          <h2>{student.fullName}</h2>
                          <h3>Class: {student.class}</h3>
                        </div>
                        <h3>{Math.ceil((calculateTotalLessons(student) / totalLessons) * 100)}%</h3>
                      </div>
                  </div>
                )
              })}
              
            </div>

            </div>
            {console.log(recents)}
            <div className='accessed-class'>
            <h2 id='headers2'>Recently checked submissions</h2>
            <div className='bot'>
                {recents.map((item, key)=>{
                  return(
                    <div className='class-info'>
                        <div className='class-box'><h1>{item.lessonType}</h1></div>
                        <div className='class-box'><h3>Lesson Number: {item.lessonNumber}</h3></div>
                        <div className='class-box'><h3>Completed By: {item.studentName}</h3></div>
                    </div>
                  )
                  })}
              </div>
            </div>
            </div>
            
          
          <div className='middle-right'>
                  {teacher && 
                    <div className='profile-box'>
                      <img src={teachertImg} alt='Teacher Avatar'></img>
                      <h2>{teacher.fullName}</h2>
                      <h3>{teacher.userID}</h3>
                      
                      <div className='total-classes-taught'>
                        <h3>{teacher.takenClasses} </h3>
                        <span>Total Classes Taught</span>
                      </div>
                      <div className='profile-box-profile-button'>
                        <Link>Edit Profile</Link>
                      </div>
                  </div>
                  }


                
                <div className='evaluation-submissions'>
                  <div className='evaluation-submissions-top'>
                    <h1>Pending Evaluations</h1>
                  </div>
                  <div className='evaluation-submissions-bottom'>
                    {lesson_types.map((object, index) => (
                      <div
                        key={index}
                        className='submissions-section-indv'
                        onClick={() => handleLessonTypeClick(object.lesson)}
                      >
                        <div className='submissions-section-indv-top'>
                          <div className='letterbox'>
                            <h3>{object.lesson}</h3>
                            <span style={{ background: object.background }}>{object.type}</span>
                          </div>
                          <FiChevronRight size={30} />
                        </div>
                        {selectedLesson === object.lesson && lessons && (
                          <div className='submissions-section-indv-drop'>
                            {lessons.map(
                              (object2, index) =>
                                object2.feedback !== true && (
                                  <div
                                    className='submissions-section-indv-drop-indv'
                                    onClick={() => redirectToEvaluationPage() }
                                    key={index}
                                  >
                                    <span>
                                      Lesson {object2.lessonNumber}: {object2.studentName}
                                    </span>
                                    <span>{object2.studentID}</span>
                                  </div>
                                )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                </div>



                {/* <div className='deadline-box'>
                    <h1>Upcoming Deadlines</h1>
                    {deadlines.slice(0,3).map((item, key)=>{
                      return(
                        <div className='deadline-info'>
                          <div className='deadline-info-sub'>
                            <h2>{item.lessonName}</h2>
                            <h3>Assigned to class: {item.class}</h3>
                            <p>Deadline: {item.deadline}</p>
                          </div>
                            <button>Remind Class</button>
                        </div>
                      )
                    })}
                </div> */}
          
        </div>
      
  )
}

export default Dashboard