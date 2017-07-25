// server.js
// where your node app starts

// init project
var express = require('express');
var request = require('request')
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

app.get("/api/imagesearch/:QUERY", function(req,res){
  var query = req.params.QUERY;
  var offset = 1;
  if(parseInt(req.query.offset) < 101 && req.query.offset != undefined && Number.isInteger(parseInt(req.query.offset))){
    console.log('...');
    offset = req.query.offset;
  }
    
  
  request("https://www.googleapis.com/customsearch/v1?q="+query+"&start="+offset+"&cx=001155240601967223546%3Abezrztyneyq&searchtype=image&num=10&filetype=jpg" +  "&key=" + process.env.SECRET, function(err, r, body){
    var object = JSON.parse(body);
    console.log(body);
    object = object["items"];
    var array = [];
    for(var i=0;i<object.length;i++){
      try{
        array.push({
        "url" : object[i]["pagemap"]["cse_image"][0]["src"],
        "snippet" : object[i]["snippet"],
        "thumbnail" : object[i]["pagemap"]["cse_thumbnail"][0]["src"],
        "context": object[i]["link"]
      });
    }
      catch(err){
       console.log();
    }
    }
     
    res.end(JSON.stringify(array));
  });

});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
