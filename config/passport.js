
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var User            = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function(passport) {

	
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(id, done){
			console.log("id"+ id.id + "nome : " +id.displayName + " email:" + id.displayEmail);
			done(null, id.id);
		
	});
	passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){				
	    		return done(null,{id:profile.id,nome:profile.displayName});
	    	});
	    }

	));


	


};
