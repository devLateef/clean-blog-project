// MEAN: MongoDB, Express, Angular.js, Nodejs
// http://www.facebook.com === 192.168.20.200
// 100 to 199 is informational
// 200 to 299 is success
// 300 to 399 redirection
// 400 to 499 error from client end
// 500 to 500 error from the server

// const http = require('http');
const express = require('express');
// const path = require('path');
const dotenv = require('dotenv');
const db = require('./models/Db');
const BlogPost = require('./models/BlogPost.js');
const app = new express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));
dotenv.config();
db();
// blogpost.create({
//     title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
//     body: 'If you have been here a long time, you might remember when I went on ITV Tonight to'
// }, (error) =>{
// console.log(error);
// });
// blogpost.deleteMany({title: 'The Mythbuster’s Guide to Saving Money on Energy Bills'}, (err) => { console.log(err)});
const port = process.env.PORT
app.listen(port, () => {
    console.log('App running on port ' + port);
})
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/post', (req, res) => {
    res.render('post');
})
app.get('/new', (req, res) => {
    res.render('new');
})
app.post('/posts/store', async (req,res)=>{
    console.log(req.body);
    await BlogPost.create(req.body, (err, blogpost) => {
        console.log(err, blogpost);
    })
    res.redirect('/');
})