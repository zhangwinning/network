/**
 * Created by zhangwenning on 17/5/29.
 */

let net = require('net');
var client = net.connect({port: 8124}, () => {
    console.log('client connected');
    client.write('world');
});

client.on('data', (data) => {
    console.log(data.toString());
    //client.end();
});

client.on('end', ()=> {
    console.log('client disconnected');
});


