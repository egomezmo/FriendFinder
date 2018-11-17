var tableData = require("../data/friends"); // almacena los datos en variable local tableDatas

console.log(tableData.scores);

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(tableData);
  });



  app.post("/api/friends", function (req, res) {

    var bestmatch = { "name": "", "photo": "", "scores": "", "diference": 9999 };
    var userdata = req.body;
    var userscores = userdata.scores;
    var diference;

    for (i = 0; i < tableData.length; i++) {
      var friend = tableData[i];
      var diference = 0;
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


  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    tableData.length = [];
    waitListData.length = [];

    res.json({ ok: true });
  });
};