﻿var cluster = require('cluster');
var http = require('http');
if (cluster.isMaster) {
    var worker=cluster.fork();
    console.log('这段代码被运行在主进程中。');
    worker.on('online', function() {
        console.log("已接收到子进程"+worker.id.toString()+"的反馈信息。");
    });
    /*worker.on('listening',function(address) {
        console.log("子进程中的服务器开始监听，地址为：" + address.address + ":" + address.port);
    });*/
} 
else {
    http.createServer(function(req, res) {
        if(req.url!=="/favicon.ico"){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<head><meta charset="utf-8"/></head>');
            res.end('你好\n');
            console.log("这段代码被运行在子进程中。");
        }
    }).listen(1337);
}