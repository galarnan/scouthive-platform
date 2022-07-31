// eslint-disable-next-line consistent-return
const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    // eslint-disable-next-line consistent-return
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        console.log('signed in');
        return db.select('*').from('users')
          .where('email', '=', email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch(() => res.status(400).json('unable to get user'));
      }
      res.status(400).json('wrong credentials');
    })
    .catch((err) => res.status(400).json(console.log(err)));
};

module.exports = {
  handleSignin,
};
