var tableData = require("../data/friends");       // liga a otro archivo

var friends = tableData;
module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(tableData);
  });

  app.post("/api/friends", function (req, res) {

    var newFriend = req.body;                         // aqui viene el array
    var lowestDiff = null;
    var bestMatch = null;

    for (var i = 0; i < friends.length; i++) {        // loop para comparar amigos
      var currentFriend = friends[i];
      var totalDiff = 0;

      for (var j = 0; j < currentFriend.scores.length; j++) {       // loop para comparar valores de amigos
        var diff = currentFriend.scores[j] - newFriend.scores[j];
        totalDiff += Math.abs(diff);
      }

      if (lowestDiff == null || totalDiff < lowestDiff) {
        lowestDiff = totalDiff;
        bestMatch = currentFriend;                                  // la menor diferencia
      }

    }

    friends.push(newFriend);
    res.send(bestMatch);

  });


  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    tableData.length = [];
    waitListData.length = [];

    res.json({ ok: true });
  });
};