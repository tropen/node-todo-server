const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
  }
});

module.exports = mongoose.model('User', UserSchema);
