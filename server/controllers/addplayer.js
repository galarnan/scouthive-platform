const handlePlayerAdd = (req, res, db) => {
  db('allplayerdetails').insert(req.body)
    .returning('*')
    .then((player) => res.json(player[0]))
    .catch((err) => console.log(err));
};

module.exports = {
  handlePlayerAdd,
};
