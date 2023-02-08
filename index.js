const express = require('express');
const dotenv = require('dotenv');
const db = require('./models/Db');
const BlogPost = require('./models/BlogPost.js');
const app = new express();
const bodyParser = require('body-parser');
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:true}));
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));
dotenv.config();
db();

const port = process.env.PORT
app.listen(port, () => {
    console.log('App running on port ' + port);
})
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    // console.log(blogposts)
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
    await BlogPost.create(req.body, (err, blogpost) => {
        console.log(err, blogpost);
    })
    res.redirect('/');
})