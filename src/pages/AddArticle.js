import {React,useContext} from 'react'
import ArticleAddForm from '../components/ArticleAddForm'
import { Navigate,useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const AddArticle = () => {

  const location = useLocation()

  let {user} = useContext(AuthContext)
 
  if (!user) {
    return <Navigate to="/login" replace state={{from :location}}/>;
  } 
  else {
    
    return (
    <div>
      <ArticleAddForm/>
    </div>
    )
  }
}

export default AddArticle
