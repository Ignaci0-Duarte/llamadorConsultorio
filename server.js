const WebSocket = require("ws");

// Crear un nuevo servidor WebSocket
const wss = new WebSocket.Server({ host: "0.0.0.0", port: 3000 });

// Mantener una referencia a los clientes conectados
const clients = new Set();

// Manejar la conexión de un cliente WebSocket
wss.on("connection", function connection(ws) {
  console.log("Nuevo cliente conectado");

  // Agregar el cliente a la lista de clientes conectados
  clients.add(ws);

  // Manejar mensajes entrantes
  ws.on("message", function incoming(message) {
    console.log("Mensaje recibido:", message);

    // Enviar el mensaje a todos los clientes conectados excepto al remitente
    clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Manejar cierre de conexión
  ws.on("close", function () {
    console.log("Cliente desconectado");
    // Remover el cliente de la lista de clientes conectados
    clients.delete(ws);
  });
});
