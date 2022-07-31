// Query filters out friends or friends pending
const handleUsersList = (req, res, db) => {
  const { userid } = req.body;
  db.select('user_sent').from('friends')
    .where('user_received', '=', userid)
    .union(
      db.select('user_received').from('friends')
        .where('user_sent', '=', userid),
    )
    .then(
      (FriendIds) => {
        const ids = FriendIds.map((id) => id.user_sent);
        ids.push(userid);
        db.select('*').from('users')
          .whereNotIn('id', ids)
          .then((results) => res.json(results));
      },
    )
    .catch(() => res.status(400).json('unable to pull users'));
};

module.exports = {
  handleUsersList,
};
