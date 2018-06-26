let debounce = require('debounce');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let socketData = require('./socketdata');

io.on('connection', websocket => {
    console.log('User connection established...:)');
    isConnected = true;

    websocket.on('disconnect', () => {
        console.log('User disconnected...:(');
        listnr.flush();
        isConnected = false;
    });

    let listnr = debounce(emitMessage, 200);

    websocket.on('message', listnr);


});

function emitMessage(msg) {
    console.log('sending continuous message...');
    socketData.fetchData('https://my-json-server.typicode.com/gadiga/json-server-repo/sites')
    .then(result => {
            io.emit('message', { type: 'new-message', text: result });
    })
    .catch(err => {
        console.log('Error in fetch' + err);
        io.emit('message', { type: 'new-message', text: 'err' + err });
        i++;
    });

}

http.listen(5000, () => console.log('Listening...on port:5000'));