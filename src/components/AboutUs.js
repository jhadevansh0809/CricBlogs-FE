import React from 'react'
import aboutus from '../images/aboutus.jpg'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className='about-container'>
      <div className='about-image'>
        <img src={aboutus} alt=''></img>
      </div>
      <div className='about-details'>
        <p>
        Cricket is a sport that is loved by millions of fans around the world, and the role of the fans is critical in shaping the culture and community of the game. As a cricket blog website, we understand the importance of providing high-quality content that is informative, engaging, and relevant to our readers.
          </p> 
          <p>
          At the heart of our website is a passionate community of cricket fans who come together to discuss the latest news, analyze matches, share their opinions, and connect with fellow fans from around the world. We strive to create a welcoming and inclusive space where all fans can feel comfortable expressing their views and engaging in meaningful conversations about the game they love.
          </p>   
          <p>
          Above all, we are dedicated to providing our readers with the highest quality content and creating a community that celebrates the joy and excitement of cricket. Whether you're a die-hard fan or a casual observer, we welcome you to join us on our journey as we explore the world of cricket together.
          </p>   
          <p>
            -Team CricBlogs
         </p> 
      </div>
    </div>
  )
}

export default AboutUs
