const express = require("express");
const controller = require("../controllers/AuthController");
const AuthRoute = express.Router();

AuthRoute.post('/', controller.signIn);

module.exports = AuthRoute;