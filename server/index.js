const http = require('http');
const express = require('express')
const cors = require('cors')
require('dotenv').config();


app = express()
app.use(cors());
//app.use(express.json())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

/*const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello Yall World!");
});*/

const port = process.env.PORT || 1337;

const Image = require('./image');
const Authorize = require('./authorize')

app.use('/image', Image)
app.use('/authorize', Authorize)




app.listen(port);




console.log("Server running in http://localhost:%d", port);
