const handlePullOthersPlayerRequests = (req, res, db) => {
  const { userid } = req.body;
  db.select('user_sent').from('friends')
    .where('user_received', '=', userid)
    .andWhere('status', '=', 'Confirmed')
    .union(
      db.select('user_received').from('friends')
        .where('user_sent', '=', userid)
        .andWhere('status', '=', 'Confirmed'),
    )
    .then(
      (FriendIds) => {
        const ids = FriendIds.map((id) => id.user_sent);
        db.select('*').from('playerrequests').join('users', function () {
          this
            .on('playerrequests.userID', '=', 'users.id');
        })
          .whereIn('playerrequests.userID', ids)
          .then(
            // filtering out all 'false' attributes for response
            (request) => {
              request.forEach((reqObj, i) => {
                const entries = Object.entries(reqObj);
                entries.forEach(([key, value]) => {
                  if (value === false) {
                    delete request[i][key];
                  }
                });
              });
              res.json(request);
            },
          );
      },
    );
};

module.exports = {
  handlePullOthersPlayerRequests,
};
