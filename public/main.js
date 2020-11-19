//para crear una conexion al server
var socket = io.connect('http://localhost:8080', { 'forcenew': true });

//escucha un evento llamado messages 
socket.on('messages', function(data) {
    console.log(data);
    render(data);
});

// escribe el hml necesario para que todos los mensajes en el arreglo se escriban en el html
function render(data) {
    var html = data.map(function(elem, index) {
        return (`<div><strong>${elem.author}</strong>: <em>${elem.text}</em></div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

//obtiene el nombre y el texto de un mensaaje y lo agrega a el array para despues ser visible para todos
function addMessage(e) {
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', payload);
    return false;
}