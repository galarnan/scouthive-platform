const handleCreateRequest = (req, res, db) => {
  console.log('inside createrequest');
  db('playerrequests').insert(req.body)
    .returning('*')
    .then((request) => res.json(request[0]))
    .catch((err) => console.log(err));
};

module.exports = {
  handleCreateRequest,
};
