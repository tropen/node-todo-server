const User = require('../models/User');

exports.getAll = async (req, res) => {
  try {
    let user = await User.find().exec();
    res.send(user);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};