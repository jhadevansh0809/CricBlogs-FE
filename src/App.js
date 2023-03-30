import { Routes, Route } from "react-router-dom"
import AuthContext, { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ArticleDetail from "./pages/ArticleDetail";
import AddArticle from "./pages/AddArticle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyArticles from "./pages/MyArticles";
import ArticleEdit from "./pages/ArticleEdit";
import ArticleDelete from "./pages/ArticleDelete";


function App() {

  return (
  <AuthProvider>
    <Navbar/>
     <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addarticle" element={<AddArticle/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/articles/:articleid" element={<ArticleDetail/>} exact/>
          <Route path="/articles/:articleid/edit" element={<ArticleEdit/>} exact/>
          <Route path="/articles/:articleid/delete" element={<ArticleDelete/>} exact/>
          <Route path='/myarticles' element={<MyArticles/>}/>      
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </AuthProvider> 
  );
}

export default App;



// Navbar

// Home(With Articles)
// Article-detail
// Create an Article
// Login
// Registration
