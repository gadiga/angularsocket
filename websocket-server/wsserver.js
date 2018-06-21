
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', websocket=> {
    console.log('User connection established...:)');

    websocket.on('disconnect', ()=>console.log('User disconnected...:('));

    websocket.on('message', message => {
        console.log('Message received..' + message);
        io.emit('message', {type: 'new-message', text: message});
    });
});

http.listen(5000, ()=> console.log('Listening...on port:5000'));