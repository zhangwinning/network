/**
 * Created by zhangwenning on 17/5/25.
 */


var net = require('net');

var server = net.createServer((socket) => {
    //新的连接
    socket.on('data', (data) => {
        socket.write('hello', data, 'test');
    });

    socket.on('end', () => {
        console.log('断开连接');
    });

    socket.write('welcome to node.js \n');
});

/**
 * 通过Domain Socket 进行监听
 */
server.listen('/tmp/echo.sock2', () => {
    console.log('app is running');
});