require('dotenv').config();
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  const user = { user: email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    // eslint-disable-next-line consistent-return
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then((result) => {
            res.json({ loggedUser: result[0], Token: accessToken });
          })
          .catch(() => res.status(400).json('unable to get user'));
      }
      res.status(400).json('wrong credentials');
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleSignin,
};
