const express = require("express");
const controller = require('../controllers/WebWorkerController');
const WebWorkerRoute = express.Router();

WebWorkerRoute.get('/', controller.start);

module.exports = WebWorkerRoute;