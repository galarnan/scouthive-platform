const handlePullMyPlayerRequests = (req, res, db) => {
  const { userid } = req.body;
  db.select('*').from('playerrequests')
    .where('userID', '=', userid)
    .then(// filtering out all 'false' attributes for response
      (requests) => {
        requests.forEach((reqObj, i) => {
          const entries = Object.entries(reqObj);
          entries.forEach(([key, value]) => {
            if (value === false) {
              // eslint-disable-next-line no-param-reassign
              delete requests[i][key];
            }
          });
        });
        res.json(requests);
      },
    );
};

module.exports = {
  handlePullMyPlayerRequests,
};
