const handleMyFriends = (req, res, db) => {
  const { userid } = req.body;
  db.select('user_sent').from('friends')
    .where('user_received', '=', userid)
    .andWhere('status', 'Confirmed')
    .union(
      db.select('user_received').from('friends')
        .where('user_sent', '=', userid)
        .andWhere('status', 'Confirmed'),
    )
    .then(
      (FriendIds) => {
        const ids = FriendIds.map((id) => id.user_sent);
        db.select('*').from('users')
          .whereIn('id', ids)
          .then((results) => res.json(results));
      },
    )
    .catch(() => res.status(400).json('unable to pull users'));
};

module.exports = {
  handleMyFriends,
};
