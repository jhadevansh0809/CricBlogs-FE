import React from 'react'
import './Article.css'
import { Link } from 'react-router-dom'

const Article = ({article}) => {
  let articleDate = new Date(article.date)
  let dateAndTime = articleDate.toDateString() + ' , ' + articleDate.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
  return (
    <div className='article-container'>
        <div className='text-content'>
            <h3>{article.title}</h3>
            <span>By, {article.author}</span>
            <span>{dateAndTime}</span>
            <Link to={`/articles/${article.id}`} className="link"> <button>Read Article</button></Link>
           
        </div>
        <div className='image-content'>
            <img src={article.image} alt=''></img>
        </div>

    </div>
  )
}

export default Article
