var twit = require('twit');
var express = require('express');
var bodyParser=require('body-parser');
var app = express();
var config = require('./config');
var apiai = require('apiai');
var APIAII = apiai('2117802d445d4576bcf2ca717e95a09a');
var Twitter = new twit(config);
//var fs = require("fs");
var botfunction = require('./botfunctions');
//var uploadMedia = require("./uploadimage");
//var mens, womens, categories, menstypes, sizes;
var stream = Twitter.stream("user", { stringify_friend_ids: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
stream.on('direct_message', function (directMsg) { 
    var directms = directMsg.direct_message;
    var sender_id = directms.sender_id_str;
    var screen_name = directms.sender.name;
    var text = directms.text;
    var paramssend;
  
    if (text) {
        var request = APIAII.textRequest(text, {
            sessionId: 'APIAISESSIDSSS'
        });
        request.on('response', function (response) {
            let responseQuery = response.result.resolvedQuery;
            let result = response;
            // console.log(response.result);
            //console.log(text + "= >" + responseQuery);
            if (text == "Hi") {
                
                paramssend = botfunction.WelcomeParams(sender_id, screen_name);
                Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
                    //stream.stop();
                   // stream.start();
                })
            }
           
           
        });
        request.on('error', function (error) {
            //        console.log(error);
        });
        request.end();
    }

});


app.get("/",function(req,res){
    res.send("Localhost Server is  running!!!");
});
app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
}) 
