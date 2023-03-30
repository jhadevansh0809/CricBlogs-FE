import {React,useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const LogIn = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div className='form-container sign log'>
    <h1>LogIn</h1>
    <form onSubmit={loginUser} method='POST'>
      <label for='ln'>Username</label>
      <input type='text' name='username' placeholder='Username...' id='un' className='input'></input>
      <label for='pw'>Password</label>
      <input type='password' name='password' placeholder='Enter Your Password...' id='pw' className='input'></input>
      <button type='submit'>LogIn</button>
    </form>
    <p>Not registered? <Link to="/signup" className='link'>Register Now</Link></p>
    </div>
  )
}

export default LogIn
