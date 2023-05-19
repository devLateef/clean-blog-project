const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./models/Db');
const app = new express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const ejs = require('ejs');
const flash = require('connect-flash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(fileUpload());
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use(flash());
app.set('view engine', 'ejs');
global.loggedIn = null;
app.use('*', (req, res, next)=>{
    loggedIn = req.session.userId;
    next();
});
db();

const port = process.env.PORT;
app.listen(port, () => {
    console.log('App running on port ' + port);
})
// redirect handler if user already authenticated
const redirectIfAuthenticatedController = require('./middleware/redirectIfAuthenticatedMiddleware');
// homepage request handler
const homeController = require('./controllers/home');
app.get('/', homeController);
// app.get('/about', (req, res) => {
//     res.render('about');
// })
// app.get('/contact', (req, res) => {
//     res.render('contact');
// })
// viewing each blogpost by accessing them with each ID
const getPostController = require('./controllers/getPost');
app.get('/post/:id', getPostController);

// rendering new post form for filling

const newPostController = require('./controllers/newPost');
const authMiddleware = require('./middleware/authMiddleware');
app.get('/posts/new', authMiddleware, newPostController);

// handling POST request from form submission
const storePostController = require('./controllers/storePost');
const validateMiddleware = require('./middleware/validationMiddleware')
app.post('/posts/store', authMiddleware, validateMiddleware, storePostController);

// new user registration handler
const newUserController = require('./controllers/newUser');
app.get('/auth/register', redirectIfAuthenticatedController, newUserController);

// store user registration details handler
const storeUserController = require('./controllers/storeUser')
app.post('/users/register', redirectIfAuthenticatedController, storeUserController);

// login request handler
const loginController = require('./controllers/login');
app.get('/auth/login', redirectIfAuthenticatedController, loginController);

// store login details and validation handler
const loginUserController = require('./controllers/loginUser');
app.post('/users/login', redirectIfAuthenticatedController, loginUserController);

// logout request handler
const logoutUserController = require('./controllers/logoutUser');
app.get('/auth/logout/', logoutUserController);

app.use((req, res) => {
    res.render('404notfound');
})