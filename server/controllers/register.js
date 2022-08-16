require('dotenv').config();
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const handleRegister = (req, res, db, bcrypt) => {
  const {
    email, name, password, type,
  } = req.body;
  const user = { user: email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  if (!email || !name || !password || !type) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx.insert({
      hash,
      email,
    })
      .into('login')
      .returning('email')
      .then((loginEmail) => trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0].email,
          name,
          type,
          joined: new Date(),
        })
        .then((result) => {
          res.json({ loggedUser: result[0], Token: accessToken });
        }))
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .catch(() => res.status(400).json('unable to register'));
};

module.exports = {
  handleRegister,
};
