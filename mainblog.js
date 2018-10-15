//此为程序主文件
var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var ph=require("path");
//使用json数据格式
app.use(bodyParser.json());
//配置静态文件目录
//app.use(express.static("static"));
app.use(express.static(ph.join(__dirname, 'static')));
//引入文件
const blog=require("./model/blog");
const comment=require("./model/comment");
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




var server=app.listen(8081,function(){
    var host=server.address().address;
    var port=server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})