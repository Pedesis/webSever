//此页面为对json数据的处理
var blogFilePath="json/blog.json";
 var fs = require('fs');
//此用来存储每条blog数据
const ModelBlog=function(form){
    this.title=form.title||"";
    this.author=form.author||"";
    this.content=form.content||"";
    this.created_time=Math.floor(new Date()/1000);
}
//加载数据
const loadBlogs=function(){
   
    var content=fs.readFileSync(blogFilePath,"utf8");
    var blogs=JSON.parse(content);
    return blogs;
}


var b={
    data:loadBlogs()
}
b.all=function(){
    var blogs=this.data;
    const comment=require("./comment");
    var comments=comment.all();
    for(var i=0;i<blogs.length;i++){
        var b=blogs[i];
        var cs=[];
        for(var j=0;j<comments.length;j++){
            var c=comments[j];
            if(b.id==c.blog_id){
                cs.push(c);
            }
        }
        b.comments=cs;
    }
    return blogs;
}
b.new=function(form){
    var m=new ModelBlog(form);
    var d=this.data[this.data.length-1];
    if(d==undefined){
        m.id=1;
    }else{
        m.id=d.id+1;
        console.log("d.id",d.id,d);
    }
    this.data.push(m);
    this.save();
    return m;
}
b.save=function(){
    var s=JSON.stringify(this.data);
    fs.writeFile(blogFilePath,s,function(err){
        if(err){
            console.log(err);
        }else{
            console.log("保存成功");
        }
    })
}
module.exports=b;