const express = require('express');
const Todo = require('../models/Todo');
const User = require('../models/User');
const TodoRoute = express.Router();
const { body } = require('express-validator');

const controller = require('../controllers/TodoController');

TodoRoute.get('/', controller.getAll);

TodoRoute.post('/',
  body('title').isString(),
  body('user_id').exists()
    .isMongoId().bail()
    .custom(async (user_id, { req }) => {
      const existingUser =
        await User.findOne({ _id: user_id });
      if (!existingUser) {
        throw new Error('Not found');
      }
      req.body.user = existingUser;
    }),
  body('task').isString(),
  body('limit').isISO8601(),
  body('done').isBoolean(),
  controller.add);

TodoRoute.patch('/toggle',
  body('id')
    .exists()
    .isMongoId().bail()
    .custom(async (id) => {
      const existingTodo = await Todo.findOne({ _id: id });
      if (!existingTodo) {
        throw new Error('Not found');
      }
    }),
  body('done').isBoolean(),
  controller.changeCheck);

TodoRoute.delete('/',
  body('id').exists()
    .isMongoId().bail()
    .custom(async (id) => {
      const existingTodo = await Todo.findOne({ _id: id });
      if (!existingTodo) {
        throw new Error('Not found');
      }
    }),
  controller.delete
);

module.exports = TodoRoute;