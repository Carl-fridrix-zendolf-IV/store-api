var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var path = require('path');
var _ = require('lodash');

var RequestHandlerBase = require("./RequestHandlerBase");
var UsersManager = require("../lib/UsersManager");
var DatabaseManager = require("../lib/DatabaseManager");
var Utils = require("../lib/Utils");
var Const = require("../const");
var async = require('async');
var formidable = require('formidable');
var fs = require('fs-extra');
var path = require('path'); 
var mime = require('mime');
var SocketAPIHandler = require('../SocketAPI/SocketAPIHandler');
var UserModel = require("../Models/UserModel");
var MessageModel = require("../Models/MessageModel");
var tokenChecker = require('../lib/Auth');

var SupportMessagesHandler = function(){
   
}   
    
_.extend(SupportMessagesHandler.prototype,RequestHandlerBase.prototype);

SupportMessagesHandler.prototype.attach = function(router){

    var self = this;

    router.get('/list', function(request, response) {
        console.log('request to support');
        MessageModel.findMessagesByRoomId('support',function(err, data){
            self.successResponse(response,Const.responsecodeSucceed,{messages:data});
            return;
        })
    })
}

new SupportMessagesHandler().attach(router);
module["exports"] = router;
