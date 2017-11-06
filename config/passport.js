
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//var User            = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(id, done){
			console.log("id"+ id.email + "nome : " +id.displayName);
			done(null, id);
		
	});
	passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
		console.log("here: " + profile);
	    	return done(null,profile);
	    	});
	    }

	));


	


};
