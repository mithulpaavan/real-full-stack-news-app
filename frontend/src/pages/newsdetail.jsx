import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Validate from '../components/validater';
import { useNavigate } from 'react-router-dom';

import { useLocation } from "react-router-dom";




function NewsDetail() {
const VAU = "https://fullstack-chat-app-backend.up.railway.app";

const location = useLocation();

const isBookmarkedInitial = location.state?.isBookmarked || false;

const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitial);
  
  const navigate = useNavigate();

   const {id} = useParams();

    

  const [message, setMessage] = useState(null);


  const [article, setArticle] = useState(null);

  const [summary, setSummary] = useState(null);

  const [summaryError, setSummaryError] = useState(null);

  useEffect(()=>{

    const fetchNews = async () => {
        try{
            const response  = await axios.get(`${VAU}/api/news/${id}`, {withCredentials: true});

            console.log(response.data);
            setArticle(response.data);
        }
        catch(err){
            console.log(err);
            setMessage("couldnt fetch the news!!...");
        }
    }

    setSummaryError("");

    fetchNews();
  },[]);

  function handleBookmarkAdd() {
        const add = async () => {
            try{
                const response = await axios.post(`${VAU}/api/news/bookmark/${article.articleId}`,{},{withCredentials: true});
                console.log(response)
                if(response.data.success){
                    setIsBookmarked(true);
                }
            }
            catch(err){
                console.log(err);
                console.log("failed to add bookmark")
            }
        }

        add();
  }

  function handleBookmarkDelete() {
    const deletebookmark = async () => {
        try{
            const response = await axios.delete(`${VAU}/api/news/bookmark/${article.articleId}`, {
                withCredentials: true
            }) 
            console.log(response.data);
            setIsBookmarked(false)
        }
        catch(err){
            console.log(err);
        }
    }

    deletebookmark();
  }

  function getSummary() {

    const getIt = async() => {
    try{
        const response =  await axios.post(`${VAU}/api/news/summary`, {
            link : article.link,
            title: article.link,
            description: article.description
        }, {withCredentials: true})

        setSummary(response.data.summary);
        console.log(response.data)
    }
    catch(err){
        console.log(err);
        setSummaryError("dont have enough api calls amigo")
    }
    }

    getIt();
  }

    if(message){
        return <h1 style={{textAlign: "center"}}>cant fetch the news... sorry amigo...</h1>
    }

    if(!article){
        return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
    }

    return (
    <div className="newsdetail-container">
        <Validate />
        <img src={article.image_url || "/noimage.png"} alt="" className="newsdetail-img" />

        <div className="newsdetails-content">
              <h3 className="newsdetails-title">{article.title}</h3>
              <p className="newsdetails-description">{article.description}</p>
              <div className="btn-links">
                <button className="btn-aisummary" onClick={getSummary}>
                AI Summary
              </button>
              <a className="main-article" href={article.link} target='_blank' rel='noopener noreferrer'>
                View Article
              </a>

              {
                isBookmarked ? (<button className="addBookmark" style={{backgroundColor: "red", color: "#fff"}} onClick={handleBookmarkDelete}>
                remove from Bookmarks
              </button>) : (<button className="addBookmark" onClick={handleBookmarkAdd}>
                Add to Bookmarks
              </button>)
              }
             
              </div>
        </div>

        <p className="pubdate" style={{textAlign: "center", fontWeight: 700}}>published date {article.pubDate.slice(0, 10)}</p>
        <p className="categories" style={{textAlign: "center", fontWeight: 700}}>categories: </p>
        <ul className="categories">
            {
                article.category.map(cat => (
                    <li key={cat}>{cat}</li>
                ))
            }
        </ul>

        <div className="ai-summary">
            {
                summary != null ? <p style={{fontWeight: 700, textAlign:"center"}}>AI summary: </p>: ""
            }
            {  
                summary != null ? summary : summaryError
            }
        </div>

        <button className="main-page" onClick={()=>{
            navigate('/')
        }}>
            main page
        </button>
    </div>
  )
}

export default NewsDetail