import React,{useState,useEffect,useContext} from 'react'
import Article from './Article'
import axios from 'axios'

import './Articles.css'

import AuthContext from '../context/AuthContext'

const Articles = () => {

  const {user} = useContext(AuthContext)

  let content = []

  const [articles,setArticles] = useState(null)

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


  const fetchArticles = async () => {
    const result = await axios.get('https://jhadevansh0809.pythonanywhere.com/api/articles/');
    // console.log(result.data)
    setArticles(result.data)
  }

  useEffect(()=>{
    fetchArticles()
  },[])
  
  // console.log(articles);
  if(articles)
      content = articles.map(article => <Article article={article} />)

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(content.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = content.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };
  
  return (
    <>
    <div>
      {user && <div className='welcome'><h1>Hey <h3 className='reddish'>@{user.username}</h3>, Welcome to <h3 className='reddish'>CricBlogs</h3></h1></div> }
      <h3 style={{margin:'30px auto',textAlign:'center',color:'white'}}>Latest articles</h3>
        {currentItems}
    </div>

     <div className='pagination'>
          <button onClick={handleLoadMore} className="loadmore">
             Load More
          </button>
          <ul className="pageNumbers">
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
          </ul>

      </div>
      </>
    
  )
}

export default Articles
