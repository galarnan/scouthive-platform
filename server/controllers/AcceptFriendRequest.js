const handleFriendRequestAccept = (req, res, db) => {
  // eslint-disable-next-line camelcase
  const { user_sent, user_received } = req.body;
  db('friends').returning('*')
    .where('user_sent', '=', user_sent)
    .andWhere('user_received', '=', user_received)
    .update('status', 'Confirmed')
    .then((connection) => res.json(connection[0]))
    .catch((err) => console.log(err));
};

module.exports = {
  handleFriendRequestAccept,
};
