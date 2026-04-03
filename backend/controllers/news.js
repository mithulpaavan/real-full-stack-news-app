const express = require('express');

const User = require('../models/userModel.js');

const BookmarkNews = require('../models/bookmarkedNewsModel.js');

let baseURL = `https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&language=en`;

exports.fetchNews = async (req, res) => {
    try{

    const {category, q, removeDuplicate} = req.query;
    
    const params = new URLSearchParams({
        removeduplicate: removeDuplicate == "true" ? "1" : "0"
    })

    if(q){
        params.append("q",q);
    }
    if(category){
        params.append("category",category)
    }

    let url = `https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&language=en&${params}&removeduplicate=1`;

    const temp = await fetch(url);
    const data = await temp.json();

    if(!data.results || data.results.length === 0){
            return res.status(404).json({message: "news not found"});
    }

    console.log(data)

    const articles = data.results.map(article => ({
        articleId: article.article_id,
        title: article.title,
        description: article.description,
        category: article.category,
        image_url: article.image_url,
        source_name: article.source_name,
        link: article.link,
        pubDate: article.pubDate
    }));

    res.json({ articles });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "server error" });
    }
}

exports.bookMarkNewsById = async (req, res) => {
    try{
        const user = req.user.id;

        const id = req.params.id;


        console.log(user)

        const temp = await fetch(`https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&id=${id}`);
        const data = await temp.json();

        const news = data.results[0];

        if(!data.results || data.results.length === 0){
            return res.status(404).json({message: "news not found"});
        }

        console.log(news);

        const bookmarkedNews = BookmarkNews({
            articleId: news.article_id,
            user: user,
            link: news.link,
            title: news.title,
            description: news.description,
            category: news.category,
            image_url: news.image_url,
            source_name: news.source_name,
            pubDate: news.pubDate
        });

        await bookmarkedNews.save();

        res.status(200).json({success: true, message: "successfully saved"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "bad request"})
    }
}

exports.fetchNewsById = async (req, res) => {
    try{
        const id = req.params.id;

        const temp = await fetch(`https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&id=${id}`);
        const data = await temp.json();

        if(!data.results || data.results.length === 0){
            return res.staus(404).json({message: "news not found"});
        }

        const news = data.results[0];

        res.json({
            articleId: news.article_id,
            link: news.link,
            title: news.title,
            description: news.description,
            category: news.category,
            image_url: news.image_url,
            source_name: news.source_name,
            pubDate: news.pubDate
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "bad request"})
    }
}


exports.fetchBookmarks = async (req, res) => {
    try {

        console.log(req.user)
        const data = await BookmarkNews.find({user: req.user.id});

        res.status(200).json({success: true, data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "bad request"})
    }
}


exports.deleteBookmarkNewbyId = async (req, res) => {
     try {

        console.log(req.user);

        await BookmarkNews.findOneAndDelete({
            articleId: req.params.id,
            user: req.user.id
        })

        res.status(200).json({message: "succeeefully removed the bookmark"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "bad request"})
    }
}
        

const OpenAI =  require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});
exports.returnSummary = async (req, res) => {
    try{
        const { title, description, link } = req.body;

    const prompt = `
      Link: ${link}
      Title: ${title}
      Description: ${description}

      Summarize this news article in 2-3 sentences.
    `;

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 200,
    });

    const summary = completion.choices[0].message.content;

    res.status(200).json({ success: true, summary });

    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "bad request or server error"});
    }
}