'use strict';

var express = require('express');
//var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AV = require('leanengine');


//配置静态文件目录

//app.use(express.static(ph.join(__dirname, 'static')));
//引入文件
const blog=require("./model/blog");
const comment=require("./model/comment");
// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(express.static('public'));
//app.use(express.static("static"));
app.use(express.static(path.join(__dirname, 'static')));
// 设置默认超时时间
//app.use(timeout('15s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.get('/', function(req, res) {
//   res.render('index', { currentTime: new Date() });
// });

//获取首页
app.get("/",function(request, response) {
        var path = 'blog_home.html';
        sendHtml(path, response);
})
//获取写博客页面
app.get("/blog/write",function(request, response) {
    var path = 'blog_write.html'
    sendHtml(path, response)
})
//获取详情页
app.get("/blog/detial",function(request, response) {
    //console.log(request.query.id);
    var path = 'blog_detial.html';
    sendHtml(path, response);
})


var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path="template/"+path;
    fs.readFile(path, options, function(err, data){
        //console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data);
    })
}

app.get("/api/blog/all",function(request,response){
    var blogs=blog.all();
    var r=JSON.stringify(blogs);
    response.send(r);
})

app.post("/api/blog/add",function(request,response){
    var form=request.body;
    //console.log("request",request);
    //插入道blog。js的b中
    var b=blog.new(form);
    var r=JSON.stringify(b);
    response.send(r);

})


app.post("/api/comment/add",function(request,response){
    var form=request.body;
    //console.log("request",request);
    //插入道blog.js的b中
    var b=comment.new(form);
    var r=JSON.stringify(b);
    response.send(r);

})
app.get("/api/comment/all",function(request,response){
    var comments=comment.all();
    var r=JSON.stringify(comments);
    response.send(r);
})





// app.use(function(req, res, next) {
//   // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
//   if (!res.headersSent) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   }
// });

// // error handlers
// app.use(function(err, req, res, next) {
//   if (req.timedout && req.headers.upgrade === 'websocket') {
//     // 忽略 websocket 的超时
//     return;
//   }

//   var statusCode = err.status || 500;
//   if (statusCode === 500) {
//     console.error(err.stack || err);
//   }
//   if (req.timedout) {
//     console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
//   }
//   res.status(statusCode);
//   // 默认不输出异常详情
//   var error = {};
//   if (app.get('env') === 'development') {
//     // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
//     error = err;
//   }
//   res.render('error', {
//     message: err.message,
//     error: error
//   });
// });

module.exports = app;
