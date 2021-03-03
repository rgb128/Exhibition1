'use strict';

const express = require('express');
const http = require('http');
const app = express();


const PORT = 8080;

app.use(express.static('docs'));

// app.listen(PORT, () => {
//     console.log(`Server started at http://localhost:${ PORT }`);
// });

const server = http.createServer(app);
server.listen(PORT, '192.168.0.106', function () {
    console.log(`Server started at http://192.168.0.106:${ PORT }`);
    // server.close(function(){
    //   server.listen(8001,'192.168.0.202')
    // })
});
