const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes import
const tasklist = require('./routes/api/tasklist');

// Routes operations
app.use('/api/taskslist', tasklist);

// How to we start listening to the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(` Server started on port ${port}`));