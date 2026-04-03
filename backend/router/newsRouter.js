const express = require('express')

const router = express.Router();

const {fetchNews, bookMarkNewsById, fetchNewsById, fetchBookmarks, deleteBookmarkNewbyId, returnSummary} = require('../controllers/news.js');

const {validate} = require('../middlewares/authmiddleware.js');

router.get('/',validate,fetchNews);

router.get('/bookmarks', validate, fetchBookmarks);

router.get('/check', validate, (req, res)=>{
    res.status(200).json({success: true, message: "verified...", username: req.user.username})
})

router.post('/summary',validate, returnSummary)

router.get('/:id', validate, fetchNewsById);

router.post('/bookmark/:id', validate, bookMarkNewsById);

router.delete('/bookmark/:id', validate, deleteBookmarkNewbyId);




module.exports = router;