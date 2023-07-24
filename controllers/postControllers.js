const BlogPost = require('../models/BlogPost');
const path = require('path');
const asyncHandler = require('express-async-handler');

const getPost = asyncHandler(async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');
    res.render('viewPost', {
        blogpost
    });
});

const newPost = asyncHandler((req, res)=>{
    if(req.session.userId){
        res.render('create', {
            createPost: true,
        });
    }else{
        res.redirect('/auth');
    }
});

const storePost = asyncHandler(async(req,res)=>{
    let image = req.files.image;
    const {title, body} = req.body;
    image.mv(path.resolve(__dirname,'..', 'public/img',image.name),
        async (error)=>{
          await BlogPost.create({
                title: title,
                body: body,
                image:'/img/' + image.name,
                userid: req.session.userId,
            });
            res.redirect('/');
        });
});

module.exports = {
    getPost,
    newPost,
    storePost,
}