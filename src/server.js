const express = require('express');
const app = express();
const { url } = require('./config/database');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//settings
mongoose.connect(url,{
});
require('./config/passport')(passport);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'palabraSecreta',
  resave:false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//routes
require('./app/routes/route-index')(app,passport);

//static files
app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'),()=>{
  console.log('server on port',app.get('port'));
});
