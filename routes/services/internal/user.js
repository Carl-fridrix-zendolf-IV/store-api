const keystone = require('keystone'),
    index = require('../../index'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'), // for token generation
    User = keystone.list('User'); // connect to User model

const tokenGenerator = (data) => {
    let token = jwt.sign(data, index.ADMIN_SECRET_WORD, {expiresIn: '5 days'});

    return token;
};

module.exports ={
    auth: (req, res) => {
        User.model.findOne({email: req.body.login}).then(result => {
            if (!result) {
                return res.status(401).json({
                    result: 'Error',
                    message: 'Login or password is incorrect'
                })
            }

            if (!result.canAccessKeystone) {
                return res.status(401).json({
                    result: 'Error',
                    message: `User with login ${req.body.login} haven't got an access to Admin UI`
                });
            }

            if (!result.user_active) {
                return res.status(401).json({
                    result: 'Error',
                    message: `User inactive!`
                });
            }

            result._.password.compare(req.body.password, (err, data) => {
                if (!data) {
                    return res.status(401).json({result: 'Error', message: 'Login or password is incorrect'});
                }
                else {
                    let token = tokenGenerator({
                       _id: result._id,
                        canAccessKeystone: result.canAccessKeystone,
                        email: result.email,
                        name: result.name
                    });

                    return res.status(200).json({
                        result: 'Success',
                        message: '',
                        data: {
                            'auth-token': token,
                            _id: result._id
                        }
                    });
                }
            })
        }, err => {
            return res.status(500).json({result: 'Error', message: err.message});
        })
    },

    list: (req, res) => {
        User.model.find({user_active: true})
            .select({
                password: 0,
                passCode: 0,
                user_active: 0,
                __v: 0
            })
            .skip(Number(req.query.skip) || 0)
            .limit(Number(req.query.limit) || 0)
            .then(result => {
                return res.json({
                    result: 'Success',
                    message: '',
                    data: result
                });
            }, err => {
                return res.status(500).json({result: 'Error', message: err.message});
            })
    }
};