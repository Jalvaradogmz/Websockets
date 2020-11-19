var express = require('express'); //libreria express
const { ftruncateSync } = require('fs');
var app = express(); //aplicacion express
var server = require('http').Server(app); //http viene por defecto en node
var io = require('socket.io')(server); //va a tener las funcionalidades de los sockets, contiene la
//aplicacion express con servidor http

//array de los mensajes que han mandado en el chat
var messages = [{
    id: 1,
    text: "Hola, todo bien?",
    author: "Junior Alvarado"
}]

//para que por defecto habra  la pagina index.html de la carpeta public
app.use(express.static("public"));

//cuando se hace un get de la pagina de inicio escribe un hola mundo en consola
app.get('/', function(req, res) {
    res.status(200).send("Hola Mundo!!");
});


//cuando alguna persona se conecta a la pagina escribe en consola que se ha conectado,
//y recibe lo que hay en el chat
//ademas hay un metodo para agregar mensajes al chat y que todos lo reciban en tiempo real 
io.on('connection', function(socket) {
    console.log("Alguien se ha conectado con sockets");
    socket.emit('messages', messages);

    socket.on('new-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages); //emite messages
    });
});

//habilita un server que corre en http://localhost:8080
server.listen(8080, function() {
    console.log("Servidor corriendo en http://localhost:8080");
});