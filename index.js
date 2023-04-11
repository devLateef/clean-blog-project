const express = require('express');
const dotenv = require('dotenv');
const db = require('./models/Db');
const app = new express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));
const fileUpload = require('express-fileupload');
app.use(fileUpload());
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat'
}));
dotenv.config();
db();

const port = process.env.PORT;
app.listen(port, () => {
    console.log('App running on port ' + port);
})

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
app.get('/auth/register', newUserController);

// store user registration details handler
const storeUserController = require('./controllers/storeUser')
app.post('/users/register', storeUserController);

// login request handler
const loginController = require('./controllers/login');
app.get('/auth/login', loginController);

// store login details and validation handler
const loginUserController = require('./controllers/loginUser');
app.post('/users/login', loginUserController);