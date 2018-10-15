//此页面为对json数据的处理
var filePath="json/comment.json";
var fs = require('fs');
//此用来存储每条blog数据
const ModelComment=function(form){
    this.title=form.title||"";
    this.content=form.content||"";
    this.id=form.id||0;
    this.blog_id=form.blog_id||0;
}
//加载数据
const loadBlogs=function(){
    var content=fs.readFileSync(filePath,"utf8");
    var blogs=JSON.parse(content);
    return blogs;
}

var b={
    data:loadBlogs()
}
b.all=function(){
    return this.data;
}
b.new=function(form){
    var m=new ModelComment(form);
    var d=this.data[this.data.length-1];
    if(d==undefined){
        m.id=1;
    }else{
        m.id=d.id+1;
        
    }
    this.data.push(m);
    this.save();
    return m;
}
b.save=function(){
    var s=JSON.stringify(this.data);
    fs.writeFile(filePath,s,function(err){
        if(err){
            console.log(err);
        }else{
            console.log("保存成功");
        }
    })
}
module.exports=b;