import React, { useState, useEffect } from 'react'

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Validate from '../components/validater.jsx'

function BookMarks() {



  const navigate = useNavigate();

  const [news, setNews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [message, setMessage] = useState("");

  useEffect(()=>{
    const fetchBookmarks = async () => {
      try{
        const response = await axios.get('https://fullstack-chat-app-backend.up.railway.app/api/news/bookmarks', {
          withCredentials: true
        });
        console.log(response.data);
        setIsLoading(false);
        setNews(response.data.data)
        setMessage("")
      }
      catch(err){
        console.log(err);
        setMessage("something went wrong")
      }
    }

    fetchBookmarks();
  }, [])

  return (
    <>
    <Validate />
    <h1 style={{textAlign: "center"}}>Bookmarks</h1>
      {
        isLoading ? 
        <h1 style={{textAlign: "center"}}>loading...</h1> :
    <div className='news-container'>
      {
        message != "" ? 
        message 
        : 
        Array.from(
  new Map(news.map(item => [item.articleId, item])).values()
).map(c => (
          <div className="news-card news" key={c.articleId}>
            <img src={c.image_url || "/noimage.png"} alt="image not given" className="news-img" />
            <div className="news-content">
              <h3 className="news-title">{c.title}</h3>
              <p className="news-description">{c.description}</p>
              <button className="btn btn-view-details" 
                onClick={()=> navigate(`/news/${c.articleId}`,{
    state: { ...c, isBookmarked: true }
  })}
              >
                view details
              </button>
            </div>
          </div>
        ))
      }
    </div>
       }

       <button className="btn btn-view-details" onClick={()=>{navigate('/')}}>
        main page
      </button>
    </>
  )
}

export default BookMarks;