var keystone = require('keystone'),
    mongoose = require('mongoose'),
    https = require('https') // for SMS request
    User = keystone.list('User'); // connect to User model

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Handle unauthorized requests
    if (!req.user)
        return res.redirect(302, '/keystone/signin');

    locals.section = 'chats';
    locals.data = {};

    view.on('init', function(next) {
        let uri = ['https://butler-hero.org/spika/v1/message/support/list'].join('');

        https.get(uri, (response) => {
            var str = ''

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', () => {
                let parsedData = JSON.parse(str);

                let ids = new Array();
                let data = new Array();
                let promises = new Array();

                for(let i in parsedData.data.messages) {
                    let item = parsedData.data.messages[i];

                    if (!item.message.length) {
                        continue;
                    }

                    if (ids.indexOf(item.userID) > -1)
                        continue;
                    else
                        ids.push(item.userID)

                    let date = new Date(item.created);
                    item.date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

                    item.link = 'https://butler-hero.org/chat/detail?id=' + item.userID.toString() + '&room=' + item.roomID.toString();

                    promises.push(
                        new Promise((resolve, reject) => {
                            User.model.findOne({_id: item.userID}, {name: 1, professional: 1}, (err, result) => {
                                resolve(result);
                            })
                        })
                    );

                    data.push(item);
                }

                Promise.all(promises).then(promiseData => {
                    for(let i=0; i < promiseData.length; i++) {
                        if (!promiseData[i])
                            promiseData[i] = {name: { last: 'Test', first: 'Test' }, professional: false}

                        promiseData[i].textName = promiseData[i].name.first + ' ' + promiseData[i].name.last;
                        data[i].user_info = promiseData[i];
                    }

                    locals.data.messages = data;
                    next();
                });
            });

        }).on('error', (err) => {
            console.log('Network error ' + err);
        });
    })

    view.render('chats/chatslist');
}
