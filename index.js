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
    //console.log("Text is "+text);
    //console.log(JSON.stringify(directms.sender));
    //console.log(JSON.stringify(directMsg));
    //fs.writeFileSync("./data.json", JSON.stringify(directMsg), "utf8");
    if (text) {
        var request = APIAII.textRequest(text, {
            sessionId: 'APIAISESSID'
        });
        request.on('response', function (response) {
            let responseQuery = response.result.resolvedQuery;
            let result = response;
            // console.log(response.result);
            //console.log(text + "= >" + responseQuery);
            if (text == "hi") {
                //mens='', womens='', categories='', menstypes='', sizes='';
                //var image_media = JSON.parse(uploadMedia.TwitterUpload());
                paramssend = botfunction.WelcomeParams(sender_id, screen_name);
                Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
                    //stream.stop();
                   // stream.start();
                })
            }
            // else if (text == "Mens") {
            //     categories = "Mens";
            //     paramssend = botfunction.CategoryParams(sender_id, text);
            //     Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
            //         stream.stop();
            //         stream.start();
            //     })
            // }
            // else if (text == "Womens") {
            //     categories = "Womens";
            //     paramssend = botfunction.WomensParams(sender_id, text);
            //     Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
            //         stream.stop();
            //         stream.start();
            //     })
            // }
            // else if (text == "Childrens") {
            //     categories = "Childrens";
            //     // paramssend = botfunction.ChildrensParams(sender_id, responseQuery);
            // }
            // else if (text == "Tshirts") {
            //     mens = "Tshirts";
            //     paramssend = botfunction.TshirtParams(sender_id, text);
            //     Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
            //         stream.stop();
            //         stream.start();
            //     })
            // }
            // else if (text == "Trousers" || text == "Jeans" || text == "Shirts" || text == "Shorts") {
            //     mens = text;
            //     paramssend = botfunction.SizeParams1(sender_id, text);
            //     Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
            //         stream.stop();
            //         stream.start();
            //     })
            // }
            //  else if (text == "Kurti" || text == "Sari" || text == "Salwar" || text == "Lehenga") {
            //     womens = text;
            //     paramssend = botfunction.SizeParams1(sender_id, text);
            //     Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
            //         stream.stop();
            //         stream.start();
            //     })
            // }
            // else if (text == "Grey" || text == "Black" || text == "Blue") {
            //     paramssend = botfunction.SizeParams(sender_id, text);
            //     menstypes = text;
            //     Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
            //         stream.stop();
            //         stream.start();
            //     })
            // } else if ((text == "XL" || text == "S" || text == "M"
            //     || text == "L" || text == "XS" || text == "2XL" || text == "3XL"
            //     || text == "4XL" || text == "5XL" || text == "6XL") && mens == "Tshirts") {
            //     // console.log(JSON.stringify(result.result.fulfillment));
            //     // fs.writeFileSync("./data.json",JSON.stringify(result.result),"utf8");
            //     sizes = text;
            //     paramssend = botfunction.ResultParams(sender_id, categories, mens, menstypes, text);
            //     Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
            //         console.log(err);
            //         stream.stop();
            //         stream.start();
            //     })
            // }
            // else if ((text == "XL" || text == "S" || text == "M"
            //     || text == "L" || text == "XS" || text == "2XL" || text == "3XL"
            //     || text == "4XL" || text == "5XL" || text == "6XL") && (mens == "Trousers" || mens == "Jeans" || mens == "Shirts" || mens == "Shorts" || womens == "Kurti" || womens == "Sari" || womens == "Salwar" || womens == "Lehenga")) {
            //     // console.log(JSON.stringify(result.result.fulfillment));
            //     // fs.writeFileSync("./data.json",JSON.stringify(result.result),"utf8");
            //     sizes = text;
            //     paramssend = botfunction.ResultParams1(sender_id, categories, mens || womens, text);
            //     Twitter.post("direct_messages/events/new", paramssend, function (err, data, response) {
            //         console.log(err);
            //         stream.stop();
            //         stream.start();
            //     })
            // }
           
        });
        request.on('error', function (error) {
            //        console.log(error);
        });
        request.end();
    }

});

// var retweet = function () {
//     var params = {
//         q: '#nodejs,#Nodejs',
//         result_type: 'recent',
//         count: 10,
//         lang: 'en'
//     }
//     Twitter.get("search/tweets", params, function (err, data) {
//         if (!err) {
//             let retweetId = data.statuses[1].id_str;
//             Twitter.post("status/retweet/:id", { id: retweetId }, function (err, response) {
//                 console.log("Retweeted!!!" + JSON.stringify(response));
//             })


//         } else {
//             console.log(JSON.stringify(err));
//         }
//     })
// }
// retweet();
app.get("/",function(req,res){
    res.send("Localhost Server is  running!!!");
});
app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
}) 
