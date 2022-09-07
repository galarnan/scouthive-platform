const handleSendPlayer = (req, res, db) => {
  // eslint-disable-next-line camelcase
  const { playerID, requestID } = req.body;
  db('playerrequests').select('offeredids')
    .where('requestID', '=', requestID)
    .then((returnedids) => {
      db('playerrequests').returning('*')
        .update('offeredids', `${returnedids[0].offeredids},${playerID}`)
        .where('requestID', '=', requestID)
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports = {
  handleSendPlayer,
};
