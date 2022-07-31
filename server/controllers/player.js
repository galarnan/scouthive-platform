const handleplayertable = (req, res, db) => {
  const { userid } = req.body;
  db.select('*')
    .from('allplayerdetails')
    .where('userid', '=', userid)
    .then((results) => res.json(results))
    .catch(() => res.status(400).json('unable to find player'));
};

module.exports = {
  handleplayertable,
};
