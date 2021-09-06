const authKey = (req, res, next) => {
  let token = req.headers['authentication'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  if (token === process.env.AUTH_KEY) {
    return next();
  }

  return res.status(401).send({ message: 'Unauthorized!' });
};

module.exports = authKey;