const controller = require("../controllers/UserController");
const express = require("express");
const UserRoute = express.Router();

UserRoute.get('/', controller.getAll);

module.exports = UserRoute;