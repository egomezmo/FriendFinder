var tableData = require("../data/friends"); // almacena los datos en variable local tableDatas
var friends =tableData;

console.log(tableData.scores);

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(tableData);
  });

  app.post("/api/friends", function (req, res) {

    var newFriend = req.body;  // aqui viene el array
    var lowestDiff = null;
    var bestMatch = null;
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      var totalDiff = 0;
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var diff = currentFriend.scores[j] - newFriend.scores[j];
        totalDiff += Math.abs(diff);
      }

      if (lowestDiff == null || totalDiff < lowestDiff) {
        lowestDiff = totalDiff;
        bestMatch = currentFriend;
      }

    }

    friends.push(newFriend);
    res.send(bestMatch);

  });


  /*
  var bestmatch = { "name": "", "photo": "", "scores": "", "diference": 9999 };
  var userdata = req.body;
  var diference;

  var userscores = userdata.scores; // del array que viene de fuera

  

  for (i = 0; i < tableData.length; i++) {    //array

    var friend = tableData[i];
    var diference = 0;

    console.log(friend.scores.length);

    for (j = 0; j < friend.scores.length; j++) {

      var friendScore = friend.scores[j];
      var userscores = userscores[j];
      diference += Math.abs(friendScore - userscores);

    }
    if (diference <= bestmatch.diference) {
      bestmatch.name = friend.name;
      bestmatch.photo = friend.photo;
      bestmatch.diference = diference;

    }
  }
 


  tableData.push(req.body);
  res.json(bestmatch);


});
*/


app.post("/api/clear", function (req, res) {
  // Empty out the arrays of data
  tableData.length = [];
  waitListData.length = [];

  res.json({ ok: true });
});
};