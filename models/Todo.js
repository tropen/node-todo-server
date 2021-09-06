const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  task: {
    type: String,
  },
  limit: {
    type: Date,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

TodoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
