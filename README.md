## network
### 构建TCP服务器
#### TCP
* 属于传输层协议,是面向连接的,最为显著的特征是:传输之前需要经过3次握手形成会话
* 会话形成之后,客户端和服务器之间可以发送数据
  * 服务器和客户端分别提供一个套接字,这两个套接字共同形成了一个连接,
  服务器和客户端则通过套接字进行连接的操作

#### 构建TCP服务器端
   TCP服务器代码

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
   可以通过三种方式访问建立的TCP服务器
   1. 通过`telnet`工具作为客户端
   2. 通过`nc` 工具作为客户端
   3. 通过自定义客户端进行访问

    通过telnet访问
    telnet localhost 8124
    通过nc工具访问
    1. 修改server.listen('/tmp/scoket.sock');
    2. nc -U /tmp/scoket.sock
自定义客户端进行访问:

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

#### TCP服务的事件
##### 服务器事件
   net.createServer是一个基于事件的服务器，她是继承自EventEmitter,
 事实上,node.js中大部分模块都继承自EventEmitter，包括http、net等模块,它的
 自定义事件有

  `listening`: 在调用server.listen()绑定端口或者Domain Socket后触发.
  `conection` : 每个客户端套接字在连接服务器端时触发.

##### 连接事件
  服务器可以同时与多个客户端保持连接,对于每个连接而言是典型的可写可读的
  stream对象.stream对象用于服务器和客户端之间的通信,既可以通过data事件从
  一端读取数据,也可以通过write方法从一端向另一端发送数据.

  `data`: 当一端调用write()发送数据时,另一端会触发data事件,事件传递的数据
  就是write()发送的数据.<br>
  `end`: 当连接中任意一端发送FIN数据时,会触发此事件.




