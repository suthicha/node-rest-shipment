const http = require('http');
const app = require('./app');
const settings = require('./settings');

const port = process.env.PORT || settings.PORT;
const server = http.createServer(app);

server.listen(port);
console.log('RESTful Service start at http://localhost:'+ settings.PORT);

