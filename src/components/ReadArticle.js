import React,{useEffect, useState} from 'react'
import './ReadArticle.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ReadArticle = () => {
  let content = {}

  const {articleid} = useParams()
  console.log(articleid);
  const [article,setArticle] = useState(null)
  const fetchArticle = async () => {
    const result = await axios.get(`https://jhadevansh0809.pythonanywhere.com/api/articles/${articleid}`);
    // console.log(result)
    setArticle(result.data)
  }

  useEffect(()=>{
    fetchArticle()
  },[])
  
  let dateAndTime;
  // console.log(article);
  if(article){
    content = article
    let articleDate = new Date(content.date)
    dateAndTime = articleDate.toDateString() + ' , ' + articleDate.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
  }
     
  // console.log(content);

  return (
    
    <div className='container'>
        <div className='header'>
            <h1>{content.title}</h1>
            <span>By,{content.author}</span>
            <span>{dateAndTime}</span>
        </div>
        <div className='imageContainer'>
            <img className='image' src={content.image} alt=''></img>
        </div>
        <div className='body'>
          <p>
          {content.article_body}
          </p>
      </div>
    </div>
  )
}

export default ReadArticle
