import React, { useState ,useContext} from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import AuthContext from '../context/AuthContext'
const Navbar = () => {
    const [isMobile,setIsMobile] = useState(false);
    let {user, logoutUser} = useContext(AuthContext)
  return (
    
    <div>
      <nav className='navbar'>
        <h3 className='logo'>CricBlogs</h3> 
        <ul className={isMobile ? 'nav-links-mobile' : 'nav-links'}
        onClick={()=>setIsMobile(false)}
        >
           <Link to="/" className="home">Home</Link>
           <Link to="/addarticle" className="addarticle">Add Article</Link>
           <Link to="/about" className="about">About Us</Link>
           <Link to="/contact" className="contact">Contact Us</Link>
           {/* <Link to="/login" className="login">LogIn</Link> */}
           {user ? (
                 <Link to="/myarticles" className="login" >My Articles</Link>
            ): (
                <Link to="/login" className="login" >Login</Link>
            )}
            {user ? (
                 <button className="login"  onClick={logoutUser}>Logout</button>
            ): (
              <Link to="/signup" className="signup">SignUp</Link>
            )}
           
        </ul>
        <button className='mobile-menu-icon'
        onClick={()=>setIsMobile(!isMobile)}
        >
            {isMobile ? (
            <i className='fas fa-times'></i>
            ) : (
            <i className='fas fa-bars'></i>     
            )}
        </button>

      </nav>
    </div>
  )
}

export default Navbar
