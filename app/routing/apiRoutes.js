var friends = require('../data/friends.js');

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  app.post('/api/friends', function(req,res){
  var userData = req.body;

  var userResponses = userData.scores;

  var matchName = '';
  var matchImage = '';
  var totalDifference = 1000;

  for(var i = 0; i < friends.length; i++) {
    var difference = 0;
    for(var h = 0; h < userResponses.length; h++) {
      difference += Math.abs(friends[i].scores[h] - userResponses[h]);
    }
  if(difference < totalDifference) {
    totalDifference = difference;
    matchName = friends[i].name;
    matchImage = friends[i].photo;
    }
  }
friends.push(userData);

res.json({status: 'Ok', matchName: matchName, matchImage: matchImage});
  });
};


