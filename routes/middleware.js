var _ = require('underscore'),
    keystone = require('keystone'),
    jwt = require('jsonwebtoken'), // for token generation
    index = require('./index'), // get token sectret word;

    User = keystone.list('User'); // connect to User model

/**
    Initialises the standard view locals.
    Include anything that should be initialised before route controllers are executed.
*/
exports.initLocals = function(req, res, next) {

    var locals = res.locals;

    locals.user = req.user;

    // Add your own local variables here

    next();

};

/**
    Inits the error handler functions into `res`
*/
exports.initErrorHandlers = function(req, res, next) {

    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    }

    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    }

    next();

};

/**
    Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function(req, res, next) {

    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };

    res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;

    next();

};

/**
    Force Authentication header
*/
exports.tokenAuthentication = (req, res, next) => {

    let freeMethods = [
        '/',
        '/api/public/v0/user/auth',
        '/api/public/v0/user/registration',
        '/api/public/v0/user/restore',
        '/api/public/v0/user/generate/sms',

        '/api/public/v0/facebook/ios/auth',
        '/api/public/v0/facebook/ios/callback',

        '/api/public/v0/facebook/auth',
        '/api/public/v0/facebook/registration'
    ]


    if (req.path.indexOf('/files/') > -1)
        return next();
    if (freeMethods.indexOf(req.path) > -1)
        return next();
    else if (freeMethods.indexOf(req.path) < 0 && !req.headers.authorization) {
        return res.status(401).json({result: 'Error', message: "Access is denied. User is unauthorized or has expired token"})
    }

    jwt.verify(req.headers.authorization, index.SECRET_WORD, (err, decoded) => {
        if (err)
            return res.status(401).json({result: 'Error', message: 'Invalid token'});

        User.model.findOne({_id: decoded._id}).then(data => {
            if (!data) {
                return res.status(401).json({result: 'Error', message: 'Undefined user'});
            }
            else {
                req.USER_TOKEN_DATA = decoded;
            }

            next();
        }, err => {
            return res.status(500).json({result: 'Error', message: err.message});
        })
    })
}
