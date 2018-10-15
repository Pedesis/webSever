 //轮播图
 var slideshow = function () {
    var slideShowUl = document.querySelector(".slideshow ul");
    var aNode = document.querySelectorAll(".slideshow .dot>a");
    var slideShowLi = slideShowUl.querySelectorAll(".slideshow ul>li");
    var index = 0;
    var liWidth = slideShowLi[0].offsetWidth;
    var ulTimer=0;
   // function next() {
        
       // var speed=2;
        //slideShowUl.style.left = -(index * liWidth) + "px";
        // if (index == 4) {
        //     index = 0;
        //     }
           // console.log(index);
       
        //points();
    
   // }
    function getStyle(obj, name) {
        return window.getComputedStyle && getComputedStyle(obj, null)[name] || obj.currentStyle[name];
    }
    var ulMove=function(target,speed,callback){
            console.log(target);
            clearInterval(ulTimer);
            var current=parseInt(getStyle(slideShowUl, "left"));
            if(current > target) {
                speed = -speed;
            }
            ulTimer=setInterval(function(){
                var oldValue = parseInt(getStyle(slideShowUl, "left"));
                var newValue = oldValue + speed;
                if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
                    newValue = target;
                }
                slideShowUl.style.left=  newValue+"px";
                
                if(newValue==target){
                   // console.log(newValue,target);
                    clearInterval(ulTimer);
                    callback();
                    
                }
            },30)
    }
    // function prev() {
    //     if (index == 0) {
    //         index = 4;
    //     }
    //     index--;
    //     slideShowUl.style.left = -(index * liWidth) + "px";
    //     points();
    // }
    /*左右点击下一张
    nextNode.onclick=function(){
        clearInterval(timer);
        next();
        move();
    
    }
    prevNode.onclick=function(){
        clearInterval(timer);
        prev();
        move();
    }
    */
    var timer = 0;
    //move();
    function points() {

        if (index>=4) {
            console.log(index);
            index = 0;
            slideShowUl.style.left=0;
        }
        for (var i = 0; i < aNode.length; i++) {
            aNode[i].className = "";
        }
        aNode[index].className = "active";
    }
    for (let i = 0; i < aNode.length; i++) {
        //aNode[i].num = i;
        aNode[i].onclick = function () {
            clearInterval(timer);    
            index = i;
            slideShowUl.style.left = -(i * liWidth) + "px";
            points();
            ulMove(-800*index,20,function(){
                move();
            });
        }
    }
    function move() {
        clearInterval(timer);
        timer = setInterval(function () {
            
            index++;
            //if(index>=5){
                index=index%(aNode.length+1);
            //}
           console.log(index);
            ulMove(-800*index,20,function(){
                points();
            })
            //next();

        },3000)
    }
    move();
}
slideshow();