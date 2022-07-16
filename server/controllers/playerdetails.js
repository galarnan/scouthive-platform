const handleplayerdetails = (req,res,db) => {
  const {playerID} = req.body;
  db.select('*')
  .from('allplayerdetails')
  .where('playerID','=', playerID)
  .then(results => res.json(results))
  .catch(err => res.status(400).json('unable to find player')) 
}

module.exports = {
handleplayerdetails: handleplayerdetails
}


