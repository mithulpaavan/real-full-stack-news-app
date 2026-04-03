import HomePage from "./pages/homepage.jsx"
import BookMarks from "./pages/bookmarks.jsx"
import News from "./pages/news.jsx"
import NewsDetail from './pages/newsdetail.jsx';


import {Route, Routes} from "react-router-dom"
import SignUp from "./pages/signup.jsx"
import SignIn from "./pages/singin.jsx"

function App() {
  return (
    <div className="container">
        <Routes>
        <Route />

        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>

        <Route path='/' element={<News />}/>
        <Route path='/news/:id' element={<NewsDetail />}/>
        <Route path='/bookmarks' element={<BookMarks />}/> 
        </Routes> 
    </div>
  )
}

export default App
