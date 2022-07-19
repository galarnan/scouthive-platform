// eslint-disable-next-line consistent-return
const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
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
          joined: new Date(),
        })
        .then((user) => {
          res.json(user[0]);
        }))
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .catch(() => res.status(400).json('unable to register'));
};

module.exports = {
  handleRegister,
};
