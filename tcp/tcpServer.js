/**
 * Created by zhangwenning on 17/5/25.
 */
var net = require('net');

var server = net.createServer((socket) => {
    //新的连接
    socket.on('data', (data) => {
        console.log('server invoking', data.toString());
        socket.write('hello:' + data);
    });

    socket.on('end', () => {
        console.log('断开连接');
    });
    //下面是三次握手的时候建立的连接
    socket.write('welcome to node.js');
});

server.listen(8124, () => {
    console.log('app is running');
});