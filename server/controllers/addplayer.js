const handlePlayerAdd = (req, res, db) => {
  console.log('into add player');
  db('players').insert(req.body)
    .returning('*')
    .then((player) => res.json(player[0]))
    .catch((err) => console.log(err));
};

module.exports = {
  handlePlayerAdd,
};
