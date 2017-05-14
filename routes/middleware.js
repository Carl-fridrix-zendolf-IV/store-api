const _ = require('underscore'),
    keystone = require('keystone'),
    jwt = require('jsonwebtoken'), // for token generation
    index = require('./index'), // get token sectret word;
    expressValidator = require('express-validator'),

    User = keystone.list('User'); // connect to User model

const FREE_METHODS = [
    '/',
    '/keystone',
    '/chats',
    '/chat/detail',
    '/api/public/v0/user/auth',
    '/api/public/v0/user/registration',
    '/api/public/v0/user/restore',
    '/api/public/v0/user/generate/sms',

    '/api/public/v0/services/skills',
    '/api/public/v0/services/languages',

    '/api/public/v0/facebook/ios/auth',
    '/api/public/v0/facebook/ios/callback',

    '/api/public/v0/facebook/auth',
    '/api/public/v0/facebook/registration',
    '/api/internal/v1/user/auth'
];
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
    };

    res.notfound = function(title, message) {
        res.status(404).json({result: 'Error', message: 'Not found'});
    };

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
    if (req.path.indexOf('internal') > -1)
        return next();


    if (req.path.indexOf('/files/') > -1)
        return next();
    if (FREE_METHODS.indexOf(req.path) > -1)
        return next();
    else if (FREE_METHODS.indexOf(req.path) < 0 && !req.headers.authorization) {
        return res.status(401).json({result: 'Error', message: "Access is denied. User is unauthorized or has expired token"});
    }

    jwt.verify(req.headers.authorization, index.SECRET_WORD, (err, decoded) => {
        if (err)
            return res.status(401).json({result: 'Error', message: 'Invalid token'});

        User.model.findOne({_id: decoded._id}).then(data => {
            if (!data) {
                return res.status(401).json({result: 'Error', message: 'Undefined user'});
            }
            else if ((req.path.indexOf('/orders/') > -1) && data.professional && !data.reviewed) {
                return res.status(403).json({result: 'Error', message: 'Professional unreviewed'});
            }
            else {
                req.USER_TOKEN_DATA = decoded;
            }

            next();
        }, err => {
            return res.status(500).json({result: 'Error', message: err.message});
        })
    })
};

exports.internalTokenVerification = (req, res, next) => {
    if (req.path.indexOf('public') > -1)
        return next();

    if (FREE_METHODS.indexOf(req.path) > -1)
        return next()

    if (!req.headers.authorization) {
        return res.status(401).json({result: 'Error', message: "Access is denied. User is unauthorized or has expired token"})
    }

    jwt.verify(req.headers.authorization, index.ADMIN_SECRET_WORD, (err, decoded) => {
        if (err)
            return res.status(401).json({result: 'Error', message: 'Invalid token'});

        User.model.findOne({_id: decoded._id}).then(data => {
            if (!data) {
                return res.status(401).json({result: 'Error', message: 'Undefined user'});
            }
            else if (!data.canAccessKeystone) {
                return res.json(401).json({result: 'Error', message: `User with login ${data.email} haven't got an access to Admin UI`});
            }
            else {
                req.USER_TOKEN_DATA = decoded;
            }

            next();
        }, err => {
            return res.status(500).json({result: 'Error', message: err.message});
        })
    })
};