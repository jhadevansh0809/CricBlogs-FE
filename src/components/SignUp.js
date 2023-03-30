import {React,useContext} from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const SignUp = () => {
  let {signupUser} = useContext(AuthContext)
  return (
    <div className='form-container sign'>
    <h1>SignUp</h1>
    <form onSubmit={signupUser} method='POST'>
      <label for='fn'>First Name</label>
      <input type='text' name='firstname' placeholder='First Name...' id='fn' className='input' required></input>
      <label for='ln'>Last Name</label>
      <input type='text' name='lastname' placeholder='Last Name...' id='ln' className='input' required></input>
      <label for='ln'>Username</label>
      <input type='text' name='username' placeholder='Username...' id='un' className='input' required></input>
      <label for='em'>Email</label>
      <input type='text' name='email' placeholder='Enter Your Email...' id='em' className='input' required></input>
      <label for='pw1'>Password</label>
      <input type='password' name='password1' placeholder='Enter Your Password...' id='pw1' className='input' required></input>
      <label for='pw2'>Confirm Password</label>
      <input type='password' name='password2' placeholder='Confirm Your Password...' id='pw2' className='input' required></input>
      <button type='submit'>SignUp</button>
    </form>
    <p>Already registered? <Link to="/login" className='link'>Login Now</Link></p>
  </div>
  )
}

export default SignUp
