var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
function extractProfile (profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl
  };
}

	passport.use(new GoogleStrategy({
	    clientID: "495476823984-pjnqlbkhki1ffb6s2r12jddlbj82a66t.apps.googleusercontent.com",
	    clientSecret: "3gcL3s3SuAs__RXMI6jq0ggl",
	    callbackURL: "http://localhost:8080/auth/google/callback",
	    profileFields: ['id', 'displayName', 'photos', 'emails', 'gender']
	  },
	  function(accessToken, refreshToken, profile, done) {
	      console.log("autenticação");
	     process.nextTick(function () {
      	return done(null, profile);
    });
	  }
	));

	passport.serializeUser((user, cb) => {
	  cb(null, user);
	});
	passport.deserializeUser((obj, cb) => {
	  cb(null, obj);
	});
module.exports = passport;