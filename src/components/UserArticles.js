import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import MyArticleCard from './MyArticleCard'

const UserArticles = () => {
    
let content = []

let {user} = useContext(AuthContext)

const [articles,setArticles] = useState(null)


const [currentPage, setcurrentPage] = useState(1);
const [itemsPerPage, setitemsPerPage] = useState(5);

const [pageNumberLimit, setpageNumberLimit] = useState(5);
const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


// console.log(`http://127.0.0.1:8000/api/${user.username}`)

const fetchArticles = async () => {
  const result = await axios.get(`https://jhadevansh0809.pythonanywhere.com/api/${user.username}`);
  // console.log(result.data)
  setArticles(result.data)
}

useEffect(()=>{
  fetchArticles()
},[])



if(articles){
    articles.forEach((article)=>{
      if(!article.image.includes("https://jhadevansh0809.pythonanywhere.com"))
        article.image = 'https://jhadevansh0809.pythonanywhere.com' + article.image
    }
    )
}

if(articles)
    content = articles.map(article => <MyArticleCard article={article} />)

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
      <h3 style={{margin:'30px auto',textAlign:'center',color:'white'}}>My articles</h3>
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

export default UserArticles
