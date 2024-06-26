import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import image1 from '../../assets/images/pana.png'
import image2 from '../../assets/images/rafiki.png'

const SpeakingMain = () => {
  const navigate = useNavigate();
  const handleLinkClick = (lessonType) => {
    console.log(lessonType)
    navigate(`/lessons-table/${lessonType}`); 
  };
  return (
    <div>
      <Navbar/>
      <div className='container-listeningMain'>
        <div className='listeningMain-header'> <h1>Speaking Lessons</h1></div>
        <div className="listeningMain-section"> 
            <div className='listeningMain-section-half' onClick={()=>handleLinkClick('storytelling')}>
                <div className="listeningMain-section-half-left">
                    <h2>Storytelling</h2>
                    <p>A prompt will be given to talk about a situation and you will have to
                        record your story.
                    </p>
                </div>
                <div className="listeningMain-section-half-right">
                    <img src={image1} alt="" width="120px"/>
                </div>
            </div>
            
            <div className='listeningMain-section-half' onClick={()=>handleLinkClick('conversation-exchange')}>
                <div className="listeningMain-section-half-left">
                    <h2>Conversation Exchange</h2>
                    <p>Not available yet. Coming soon!</p>
                </div>
                <div className="listeningMain-section-half-right">
                    <img src={image2} alt="" width="120px"/>
                </div>
                    
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default SpeakingMain;
