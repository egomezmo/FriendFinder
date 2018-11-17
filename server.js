var express = require("express");                   //  dependencias
var app = express();                                //  se crea un puerto
var PORT = process.env.PORT || 8080;                // se inicia el puerto
app.use(express.urlencoded({ extended: true }));    // para que express maneje los datos
app.use(express.json());

require("./app/routing/apiRoutes")(app);            // enruta la respuesta a los usuarios
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function () {                       // arranca el servidor
  console.log("App listening on PORT: " + PORT);
});