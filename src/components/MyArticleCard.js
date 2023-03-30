import React from 'react'
import './MyArticleCard.css'
import { Link } from 'react-router-dom'

const MyArticleCard = ({article}) => {
    let articleDate = new Date(article.date)
    let dateAndTime = articleDate.toDateString() + ' , ' + articleDate.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    return (
      <div className='article-container myblogscontainer'>
          <div className='text-content'>
              <h3>{article.title}</h3>
              <span>{dateAndTime}</span>
              <Link to={`/articles/${article.id}`} className="link"> <button>Read Article</button></Link>
              <Link to={`/articles/${article.id}/edit`} className="link"> <button className='edit-button'>Edit Article</button></Link>
              <Link to={`/articles/${article.id}/delete`} className="link"> <button className='delete-button'>Delete Article</button></Link>
             
          </div>
          <div className='image-content'>
              <img src={article.image} alt=''></img>
          </div>
  
      </div>

  )
}

export default MyArticleCard
