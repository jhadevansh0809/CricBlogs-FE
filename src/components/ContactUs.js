import React,{useRef} from 'react'
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const form = useRef();
  const navigate = useNavigate()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_27vkt79', 'template_yk4mplg', form.current, '3txzRVB3XTIRlZEIJ')
      .then((result) => {
          // console.log(result.text);
          navigate('/')
      }, (error) => {
          // console.log(error.text);
          navigate('/')
      });
    }
  return (
    <div className='form-container'>
      <form ref={form} onSubmit={sendEmail}>
        <label for='fn'>First Name</label>
        <input type='text' name='firstname' placeholder='First Name...' id='fn' className='input' required></input>
        <label for='ln'>Last Name</label>
        <input type='text' name='lastname' placeholder='Last Name...' id='ln' className='input' required></input>
        <label for='em'>Email</label>
        <input type='email' name='email' placeholder='Enter Your Email...' id='em' className='input' required></input>
        <label for='msg'>Message</label>
        <textarea name='message' id='msg' placeholder='Your Message...' style={{height:'35vh'}} required></textarea>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}


export default ContactUs
