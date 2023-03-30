import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const EditArticle = () => {

    let {user} = useContext(AuthContext)
    const {articleid} = useParams()
    const navigate = useNavigate()


    const [title, setTitle] = useState()
    const [image, setImage] = useState()
    const [content, setContent] = useState(null)
    
    const fetchArticle = async () => {
      const result = await axios.get(`https://jhadevansh0809.pythonanywhere.com/api/articles/${articleid}`);
      // console.log(result)
      setTitle(result.data.title)
      setImage(result.data.image)
      setContent(result.data.article_body)
    }
  
    useEffect(()=>{
      fetchArticle()  
    },[])
    
    
    let editarticle = async (e )=> {
      e.preventDefault()
      const uploadData = new FormData()
      uploadData.append('title',title);
      uploadData.append('author',user.username);
      uploadData.append('image',image);
      uploadData.append('article_body',content);
  
      await axios({
        method: 'put',
        url:`http://127.0.0.1:8000/api/articles/${articleid}/`,
        data: uploadData
      }).then(response=>{
        // console.log(response.data);
        navigate('/')
      })
    }

  return (
    <div className='form-container'>
      <form onSubmit={editarticle}>
        <label for='title'>Article Title</label>
        <input type='text' name='articletitle' value={title}  placeholder='Enter Article Title...' id='title' className='input' onChange={(e)=>setTitle(e.target.value)} required></input>
        <label for='img'>Add an Image</label>
        <input type='file' name='articleimage' src={image} id='img' onChange={(e)=>setImage(e.target.files[0])} required></input>
        <label for='body'>Article Content</label>
        <textarea name='content' value={content} id='body' placeholder='Write Article Content...' onChange={(e)=>setContent(e.target.value)} required></textarea>
        <button type='submit'>Edit Article</button>
      </form>
    </div>
  )
}


export default EditArticle
