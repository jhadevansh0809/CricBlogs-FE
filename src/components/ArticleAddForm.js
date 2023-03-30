import {React,useState,useContext} from 'react'
import './ArticleAddForm.css'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const ArticleAddForm = (props) => {
  
  let {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState(null)
  const [image, setImage] = useState(null)
  const [content, setContent] = useState(null)

 
  let addarticle = async (e )=> {
    e.preventDefault()
    const uploadData = new FormData()
    uploadData.append('title',title);
    uploadData.append('author',user.username);
    uploadData.append('image',image);
    uploadData.append('article_body',content);

    await axios({
      method: 'post',
      url:'https://jhadevansh0809.pythonanywhere.com/api/articles/',
      data: uploadData
    }).then(response=>{
      // console.log(response.data);
      navigate('/')
    })
  }

  return (
    <div className='form-container'>
      <form onSubmit={addarticle}>
        <label for='title'>Article Title</label>
        <input type='text' name='articletitle' value={title} placeholder='Enter Article Title...' id='title' className='input' onChange={(e)=>setTitle(e.target.value)} required></input>
        <label for='img'>Add an Image</label>
        <input type='file' name='articleimage' src={image} id='img' onChange={(e)=>setImage(e.target.files[0])} required></input>
        <label for='body'>Article Content</label>
        <textarea name='content' value={content} id='body' placeholder='Write Article Content...' onChange={(e)=>setContent(e.target.value)} required></textarea>
        <button type='submit'>Add Article</button>
      </form>
    </div>
  )
}

export default ArticleAddForm
