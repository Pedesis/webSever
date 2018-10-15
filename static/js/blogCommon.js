    //console.log封装
    var log=function(){
        console.log.apply(console,arguments);
    }
    //queryseletor封装
    var findElement=function(element){
        return document.querySelector(element)
    }
    //queryseletorAll封装
    var findElements=function(elements){
        return document.querySelectorAll(elements);
    }
var ajax=function(request){
    var r=new XMLHttpRequest();
    //目前设置成立同步执行，异步时会出现加载的问题，或用getbyId解决
    r.open(request.method,request.url,false);
    if(request.contentType!==undefined){
        r.setRequestHeader('Content-Type', request.contentType);
    }
    r.onreadystatechange=function(){
        if(r.readyState===4){
            request.callback(r.response);
        }
    }
    if(request.method==="GET"){
        r.send();
    }else{
        r.send(request.data);
    }
}
    //回到顶部,淡入淡出效果
    var toTop = function () {
        var toTop = findElement(".toTop");
        window.onscroll = function () {
            var st = document.documentElement.scrollTop || document.body.scrollTop;
            var wT = document.documentElement.clientHeight || document.body.clientHeight;
            
            //log(toTop.getBoundingClientRect());
            if (st > 50) {
                //toTop.style.display="block";
                toTop.style.opacity = 1;
            } else {
                // toTop.style.display="none";
                toTop.style.opacity = 0;
            }

        }
        toTop.onclick = function () {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        }
    }
    toTop();
