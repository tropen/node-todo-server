<<<<<<< HEAD
'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({ path: './.env' });

const db = require('./db/db');
db.connect();

const todoRoute = require('./routes/TodoRoute');
const authRoute = require('./routes/AuthRoute');
const userRoute = require('./routes/UserRoute');
const authKey = require('./middlewares/authKey');

const app = express();

if (process.env.NODE_ENV == 'dev') {
  const corsOptions = {
    origin: process.env.DEV_CLIENT_URI,
  };
  app.use(cors(corsOptions));
}

app.use(express.json()); //application/json
app.use(express.urlencoded({ extended: true })); //application/x-www-form-urlencoded


app.use('/api/v1/signin', authRoute);
app.use('/api/v1/todo', authKey, todoRoute);
app.use('/api/v1/user', authKey, userRoute);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({
      error: true,
      message: error.message
    });
});

app.listen(process.env.PORT, process.env.HOST);
console.log(`[INFO] Server started. Api is available at http://${process.env.HOST}:${process.env.PORT}/api/v1`);
=======
'use strict'

// const express = require('express')
// const dotenv = require('dotenv')
// dotenv.config({ path: './.env' })
//
// const app = express()


const http = require('http');

const hostname  = '127.0.0.1';
const port =  3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
>>>>>>> initial
