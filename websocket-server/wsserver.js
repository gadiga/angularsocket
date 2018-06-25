let debounce = require('debounce');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let httpClient = require('https');


let isConnected = false;

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
    fetchPromiseData('https://my-json-server.typicode.com/gadiga/json-server-repo/sites')
        .then(result => {
            io.emit('message', { type: 'new-message', text: result });
        })
        .catch(err => {
            console.log('Error in fetch' + err);
            io.emit('message', { type: 'new-message', text: 'err' + err });
            i++;
        });

}

function fetchPromiseData(url) {
    let promise = new Promise((resolve, reject) => {
        httpClient.get(url, res => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                    reject(e.message);
                }
            });
        });
    });
    return promise;
}

http.listen(5000, () => console.log('Listening...on port:5000'));