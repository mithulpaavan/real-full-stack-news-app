import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

import Select from "react-select";

import Validate from '../components/validater.jsx'

import axios from 'axios';
import Navbar from '../components/navbar.jsx';


function News() {

  const VAU = "https://fullstack-chat-app-backend.up.railway.app";

  const options = [
    {value: "breaking", label: "Breaking"},
    {value: "business", label: "Business"},
    {value: "crime", label: "Crime"},
    {value: "domestic", label: "Domestic"},
    {value: "education", label: "Education"},
    {value: "entertainment", label: "Entertainment"},
    {value: "environment", label: "Environment"},
    {value: "food", label: "Food"},
    {value: "health", label: "Health"},
    {value: "lifestyle", label: "Lifestyle"},
    {value: "other", label: "Other"},
    {value: "politics", label: "Politics"},
    {value: "science", label: "Science"},
    {value: "sports", label: "Sports"},
    {value: "technology", label: "Technology"},
    {value: "top", label: "Top"},
    {value: "tourism", label: "Tourism"},
    {value: "world", label: "World"},
  ]

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [messageOptions, setMessageOptions] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{

    const fetchUsername = async () => {
      try{
        const response = await axios.get(`${VAU}/api/news/check`, {withCredentials: true});
        console.log(response.data);
        console.log(response.data.username)
        setUsername(response.data.username)
      }
      catch(err){
        console.log(err);
        setUsername("guest")
      }
    }

    const fetchNews = async () => {
    try{
      const response = await axios.get(`${VAU}/api/news`, {withCredentials: true});
      console.log(response);
      setNews(response.data.articles);
      setIsLoading(false);
      setMessage("");
    }
    catch(err){
      console.log(err);
      setMessage("error in loading content")
    }
  }

  fetchUsername();
  fetchNews();
  }, [])

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleChangeSelect(selected) {
    if(selected.length <= 5){
    setSelectedOptions(selected);
    setMessageOptions("");
    }
    else{
      setMessageOptions("please select only upto 5 categories");
    }
  }

  function handleFilter() {
    const fetchNews = async () => {
    try{
      console.log("yoo")
      setIsLoading(true);
      const categories = selectedOptions.map(o => o.value).join(',');
      const response = await axios.get(`${VAU}/api/news?category=${categories}&q=${search}`, {withCredentials: true});
      console.log(response);
      setNews(response.data.articles);
      setIsLoading(false);
      setMessage("");

      if(response.data.articles.length === 0){
        setMessage("no news found...")
      }
    }
    catch(err){
      console.log(err);
      setMessage("error in loading content")
    }
  }

  fetchNews();
  }

  const logout = async () => {
    try{
      const response = await axios.post(`${VAU}/api/auth/signout`,{}, {withCredentials: true});
      console.log(response);
      navigate('/signin');
    }
    catch(err){
      console.log(err);
      console.log("cant log out")
    }
  }

  return (
    <div className="news-wrap">
      <Validate />
      <Navbar logout={logout} username={username}/>
       <div className="input-wrap">
        <input 
        type="text" 
        placeholder='search for news'
        onChange={handleChange} 
        />
        

       <div className="categories">
        <h3 className='category-title'>Select Categories</h3>
    <Select 
      options={options}
      isMulti
      value={selectedOptions}
      onChange={handleChangeSelect}
      placeholder="select upto 5 categories"
    />
       </div>
       {messageOptions && messageOptions}

       <button className="btn-apply" onClick={handleFilter}>
        filter
       </button>
       </div>
       {
        isLoading ? 
        <h1 style={{textAlign: "center"}}>loading...</h1> :
    <div className='news-container'>
      {
        message != "" ? 
        message 
        : 
        news.map(c => (
          <div className="news-card news" key={c.articleId}>
            <img src={c.image_url || "/noimage.png"} alt="image not given" className="news-img" />
            <div className="news-content">
              <h3 className="news-title">{c.title}</h3>
              <p className="news-description">{c.description}</p>
              <button className="btn btn-view-details" 
                onClick={()=> navigate(`/news/${c.articleId}`, {state: c})}
              >
                view details
              </button>
            </div>
          </div>
        ))
      }
    </div>
       }
    </div>
   
  )
}

export default News