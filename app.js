var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayout = require('express-ejs-layouts');
var passport = require('passport');
var fabricanteService = require('./services/FabricanteService');
require('./config/passport')(passport);
var session = require("express-session");

//var passport = require('passport');
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//var passport = require('./passport');

var web = require('./web/routes/routesWeb');
var api = require('./api/routes/routesApi');

var app = express();

app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));
// view engine setup
app.set('views', path.join(__dirname+"/web/", 'views'));
app.set('view engine', 'ejs');

//app.use(session());
app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api', api);
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayout);
app.use('/web', web);

app.get('/auth/google', passport.authenticate('google', {scope: ['email','profile']}));

app.get('/auth/google/callback', 
	passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    fabricanteService.getFabricante(req.user.id, function(err,row){
        if(err || row.length <= 0){
          console.log("request " + req.user.id);
          res.render('cadastroFabricante',{ idfabricante: req.user.id}); 
        }else{
          res.redirect('/web/'+req.user.id); 
       }
    });
    
  });

/* GET home page. */
app.get('/', function(req, res, next) {	

  res.render('login'); 
  
});

app.post('/cadastrarfabricante',function(req,res){
  fabricanteService.cadastrarFabricante(req.body,function(err,row){
    if(err){      
      res.redirect("/");
    }else{      
      res.redirect("/web/"+row);
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
