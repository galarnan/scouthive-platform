const handleUsersList = (req, res, db) => {
  db.select('name', 'id')
    .from('users')
    .then((names) => res.json(names))
    .catch(() => res.status(400).json('unable to load users'));
};

module.exports = {
  handleUsersList,
};
