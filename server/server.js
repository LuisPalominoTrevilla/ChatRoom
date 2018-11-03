const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static('client'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res, next) => {
    res.status(200).send("Hola Mundo");
});

let messages = [
    {
        id: 1,
        text: "Welcome to Socket.io Chat room and Node.js created by Luis Palomino",
        nickname: "Bot - Luis Palomibot"
    }
];

io.on('connection', (socket) => {
    console.log("Cliente con IP: ", socket.handshake.address, " se ha conectado");

    socket.emit('messages', messages);

    socket.on('add-message', (message) => {
        messages.push(message);

        io.emit('messages', messages);
    });
});

server.listen(80, () => console.log("Server running at http://localhost::000"));