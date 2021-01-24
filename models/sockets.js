class Sockets {
	constructor(io) {
		this.io = io;
		this.defineEvents();
	}

	defineEvents() {
		this.io.on("connection", (socket) => {
			console.log(`Cliente conectado. Id: ${socket.id}`);

			/*Enviar mensaje de bienvenida al cliente */
			socket.emit("mensaje-bienvenida", {
				fecha: new Date(),
				mensaje: "Hola! Bienvenido a nuestro modesto sitio 😚",
			});

			/*Recibir saludo de bienvenida del cliente */
			socket.on("mensaje-cliente", ({ mensaje, nombre }) => {
				console.log(
					`El cliente ${nombre} (id ${socket.id}) nos escribe: ${mensaje}`
				);
			});

			/*Recibir mensaje de chat del cliente */
			socket.on("mensaje-chat-a-servidor", ({ texto }) => {
				console.log(
					"%csockets.js, defineEvents, evento mensaje-chat-a-servidor 🔥",
					"color:#BB390A;"
				);
				socket.emit("mensaje-chat-a-cliente", { texto });

				//Para enviar un mensaje a TODOS los sockets/clientes conectados, usar io en vez de socket
				//this.io.emit("mensaje-chat-a-cliente", { texto });
			});
		});
	}
}

module.exports = Sockets;
