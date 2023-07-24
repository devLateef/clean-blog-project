const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./models/Db');
const app = new express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const ejs = require('ejs');
const flash = require('connect-flash');


const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(fileUpload());
app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.set('view engine', 'ejs');


global.loggedIn = null;
app.use('*', (req, res, next)=>{
    loggedIn = req.session.userId;
    next();
});
const port = process.env.PORT || 4001;

db();

app.use('/', userRoutes);
app.use('/post', postRoutes);

app.use((req, res) => {
    res.render('404notfound');
})


app.listen(port, () => {
    console.log('App running on port ' + port);
})
