const handleplayerdetails = (req, res, db) => {
  const { playerID } = req.body;
  db.select('*')
    .from('players')
    .where('playerID', '=', playerID)
    .then((results) => res.json(results))
    .catch(() => res.status(400).json('unable to find player'));
};

module.exports = {
  handleplayerdetails,
};
