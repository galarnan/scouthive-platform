const handlePullFriendRequests = (req, res, db) => {
  const { userid } = req.body;
  db.select('user_sent').from('friends')
    .where('user_received', '=', userid)
    .andWhere('status', '=', 'Pending')
    .then(
      (SendingUser) => {
        const ids = SendingUser.map((user) => user.user_sent);
        db.select('name', 'id').from('users')
          .whereIn('id', ids).then((results) => res.json(results));
      },
    );
};

module.exports = {
  handlePullFriendRequests,
};
