// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1021930321158941', // your App ID
        'clientSecret'  : 'f2622fd960cec9a244dd46031c6a38fe', // your App Secret
        'callbackURL'   : 'http://localhost:8082/auth/facebook/callback'
    }
    };