const http = require('http');
const app = require('./app');


require('dotenv').config();

const server = http.createServer(app);

const port = process.env.PORT || process.env.API_PORT;

server.listen(port,(req,res)=>{
    console.log(`server is listening on http://localhost:${port}`)
})