exports.signIn = (req, res) => {
  const authKey = process.env.AUTH_KEY;
  res.json({ authKey: authKey });
};