const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//Servidor http
		this.server = http.createServer(this.app);

		//Configuración de sockets
		this.io = socketio(this.server, {
			/*Configuración */
		});
	}

	middlewares() {
		const rootpath = path.resolve(__dirname, "../public");
		this.app.use(express.static(rootpath));

		this.app.use(cors());
	}

	configureSockets() {
		new Sockets(this.io);
	}

	execute() {
		this.middlewares();
		this.configureSockets();

		this.server.listen(this.port, () => {
			console.log(`Servidor corriendo en puerto ${this.port}`);
		});
	}
}

module.exports = Server;
