const Todo = require('../models/Todo');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const todo = await Todo.find().populate('user').exec();
    res.send(todo);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

exports.add = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array().reduce((index, item) => {
        console.log(index, item);
      })
    });
  }
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    user: req.body.user._id,
    title: req.body.title,
    task: req.body.task,
    limit: req.body.limit,
    done: req.body.done,
  });

  try {
    const result = await todo.save();
    if (result) {
      result.user = req.body.user;
      res.status(201).json({ message: 'Todo created', todo: result });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.changeCheck = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    await Todo.updateOne(
      { _id: req.body.id },
      { done: req.body.done },
    ).exec();
    res.status(200).json({ message: req.body.done ? 'Checked' : 'Unchecked' });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

exports.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
      await Todo.deleteOne({ _id: req.body.id }).exec();
      res.status(200).json({ message: 'Todo deleted' });
  } catch (e) {
    return res.status(500).json({ message: e });
  }

};