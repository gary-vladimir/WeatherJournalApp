/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('Weather'));

const port = 8000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
    console.log(server);
    console.log(`running on localhost: ${port}`);
}
//

// GET route
app.get('/return', getData);

function getData(request, response) {
    response.send(projectData);
}

// POST route
app.post('/add', postData);

function postData(request, response) {
    projectData = request.body;
    response.send({ message: 'Post received' });
    console.log(projectData);
}
