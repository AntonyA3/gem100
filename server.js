var express = require('express');
var app = express();


app.use(express.static(__dirname + '/demo'));

app.get('/', function (req, res) {
   res.send('Hello World');
})


app.get('/demo/hello_cube/index.html', (req, res) =>{
    res.sendFile( __dirname + '/demo/hello_cube/index.html')
})


app.get('/demo/gl-matrix-min.js',(req, res) =>{
    res.sendFile( __dirname + '/demo/gl-matrix-min.js')

})

app.get('/demo/gl-matrix.js',(req, res) =>{
    res.sendFile( __dirname + '/demo/gl-matrix.js')

})

app.get('/demo/hello_cube/hello_cube.js',(req, res) =>{
    res.sendFile( __dirname + '/demo/hello_cube/hello_cube.js')

})

app.get('/hello_cube/shader/flat.vert', (req, res) =>{
    res.sendFile( __dirname + "/demo/hello_cube/flat.vert" )
})
app.get('/hello_cube/shader/flat.frag', (req, res) =>{
    res.sendFile( __dirname + "/demo/hello_cube/flat.frag" )
})


app.get('/hello_cube/shader/flat.frag', (req, res) =>{
    res.sendFile('./demo/hello_cube/flat.frag')
})

var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})