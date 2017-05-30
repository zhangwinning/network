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
