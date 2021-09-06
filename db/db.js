const mongoose = require('mongoose');

exports.connect = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('connected', function () {
    console.log(this, `Mongoose connected to ${this.connection.host}`);
  });
  db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
  });
  db.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });

// If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function () {
    db.close(function () {
      console.log('[INFO] Mongoose disconnected on app termination');
      process.exit(0);
    });
  });
};