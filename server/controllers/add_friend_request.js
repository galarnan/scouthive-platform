const handleFriendRequest = (req, res, db) => {
  db('friends').insert(req.body)
    .returning('*')
    .then((connection) => res.json(connection[0]))
    .catch((err) => console.log(err));
};

module.exports = {
  handleFriendRequest,
};
