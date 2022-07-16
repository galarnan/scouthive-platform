const handlePlayerAdd = (req, res, db) => {
  // const columns = Object.getOwnPropertyNames(req.body)
  // const {Name, Nationality,Birthdate, Age, Club, Foot, Agency, Position, LongPassing,ShortPassing, BallControl, Heading,WeakFoot,Pressing,LongShot,Tackling,Aggression,Finishing,BoxtoBox,JoinsAttack
  //   ,DeepLying} = req.body;
    db('allplayerdetails').insert(req.body)
    .returning('*')
    .then(player => res.json(player[0]))
    .catch(err => console.log(err)) 

}

module.exports = {
  handlePlayerAdd: handlePlayerAdd
};
