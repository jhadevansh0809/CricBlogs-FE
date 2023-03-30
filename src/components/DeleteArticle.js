import React from 'react'
import './DeleteArticle.css'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const DeleteArticle = () => {

  const {articleid} = useParams()
  const navigate = useNavigate()

  let deletearticle = async ()=>{
      await axios({
        method: 'delete',
        url:`https://jhadevansh0809.pythonanywhere.com/api/articles/${articleid}/`,
      }).then(response=>{
        // console.log(response.data);
        navigate('/myarticles')
      })
    }
  
    let takeback = () => {
      navigate('/myarticles')
    }

  return (
    <div className='delete-container'>
      <h3>Are you sure, you want to delete this article?</h3>
      <button className='edit-button' onClick={takeback}>Take Me Back</button>
      <button className='delete-button' onClick={deletearticle}>Delete Now</button>
    </div>
  )
}

export default DeleteArticle
