var express = require('express');
const path = require('path')

var app = express();

app.use(express.static(path.join(__dirname, 'demo')));
app.use((req, res, next) =>{
    res.sendFile( path.join( __dirname, req.url))
})


var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})