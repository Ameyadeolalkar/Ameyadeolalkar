var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var LocalStrategy   = require('passport-local').Strategy;
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express, passport) {

var apiRouter = express.Router();

apiRouter.get('/', routes.index);
apiRouter.get('/users', auth, user.list); 

apiRouter.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});


apiRouter.post('/login', function(req,res,next){
	passport.authenticate('local-login',function(err,user,info)) {
		if(err)
		{
			console.log(err);
			return next(err)
		}
		if(!user){
			return res.json(400,info);
		}
		req.logIn(user,function(err){
			if(err){
				return next(err);
			}
			return res.json(200,req.user)
			});
		})(req,res,next);
    });


apiRouter.post('/logout',function(req,res){
	req.logout();
	res.send(200)
})

}