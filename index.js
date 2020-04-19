const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req , res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/" , function(req , res){

    console.log(req.body.cityName);

       const query = req.body.cityName;
       const id = "14284dd24af1fe73eef2bdf257f91c1d";
       const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+id+"&units=metric";

         https.get(url , function(response){

           //console.log(response.statusCode);

           response.on("data",function(data){

            //**Converting Jason code to javascript
              const weatherData = JSON.parse(data);
               //console.log(weatherData.weather[0].main);
              const temp = weatherData.main.temp ;
              const description = "<h2>The weather description is "+ weatherData.weather[0].description+"</h2>";
              const icon =  weatherData.weather[0].icon
              const imagrUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
              //we can have multiple res.write

              res.write("<h1>The temperature in  "+ weatherData.name +" is "+temp+"</h1><br>"+description);
              res.write("<img src = "+imagrUrl+">")
              res.send();
           });
         });
});

app.listen(3000, function(){

    console.log("Im listening");
});
