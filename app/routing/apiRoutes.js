var friends = require('../data/friends.js');

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  app.post('/api/friends', function(req,res){
    const bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };
    // Take result of user's survey POST and parse it
    const userData = req.body;
    const userScores = userData.scores;
    let totalDifference;

    // Loop through all friend possibilities from database
    for (var i = 0; i < friends.length; i++) {
      let currentFriend = friends[i];
      totalDifference = 0;
      console.log(currentFriend.name);

      // Loop through scores from each friend
      for (var j = 0; j < currentFriend.length; j++) {
        let currentFriendScore = currentFriend.scores[j];
        let currentUserScore = userScores[j];

        // Calculate diff between scores and sum them into totalDifference
        totalDifference += Math.abs(
          parseInt(currentUserScore) - parseInt(currentFriendScore)
        );
      }
      // If sum of diff is less then the diff of current "best match"
      if (totalDifference <= bestMatch.friendDifference) {
        // Reset the bestMatch to be the new friend
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    friends.push(userData);
    res.json(bestMatch);
});
};


