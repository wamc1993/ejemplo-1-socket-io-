//Cargar variables de entorno
require("dotenv").config();

//Inicializar servidor
const Server = require("./models/server");
const server = new Server();
server.execute();
