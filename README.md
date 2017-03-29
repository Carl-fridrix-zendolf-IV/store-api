[git-repo-url]: <https://github.com/Carl-fridrix-zendolf-IV/store-api.git>

# Butler Hero Node JS admin
Simple Node JS admin based on Keystone JS.

### Installation
You need Node (ver > 6.0.0), Mongo DB (ver > 3.0) and Git installed globally.
For hosting deployment, I recommend to user PM2 (https://github.com/Unitech/pm2)

Before Node start you will need to change web.js file and enter your connections to Mongo:
```javascript
'mongo': 'mongodb://localhost:27017/butler'
```

After you change web.js file, you will need to start Mongo DB
```sh
$ monogod
```

```sh
$ git clone [git-repo-url]
$ cd butler-hero
$ npm install
$ npm start
```

### How to use?
When code started, you need to open you Browser and enter one of this links:
http://localhost:3000 - for API welcome message
http://localhost:3000/apidoc - for API documentation
http://localhost:3000/keystone - for Admin UI

### License
MIT
