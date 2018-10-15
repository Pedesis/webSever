//此为博客主页

var blogTemplate = function(blog) {
    var id = blog.id;
    var title = blog.title;
    var author = blog.author;
    var content=blog.content;
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
    <div class="blog-cell">
    <div class="blog-cell-left">
        <a class="blog-cell-img" href="blog/detial?id=${id}" data-id="${id}">
            <img src="https://pedesis.leanapp.cn/images/slide-1.png">
        </a>
    </div>
    <div class="blog-cell-right">
        <h2 class="blog-cell-title">
            <a href="blog/detial?id=${id}">${title}</a>
        </h2>
        
        <div class="blog-cell-content">${content}</div>
        <p class="blog-cell-info">
            <span>${author}</span><span>发布时间:${time}</span><span>评论</span>
        </p>
    </div>
</div>
    `
    return t
}
var insertBlogAll = function(blogs) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var t = blogTemplate(b)
        html += t
    }
    // 把数据写入 直接用覆盖式写入
    var div = document.querySelector('#blog-content')
    div.innerHTML = html
}


//刷新所有博客
var blogAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        //contentType: 'application/json',
        callback: function(response) {
            console.log('响应', response);
            var blogs = JSON.parse(response).reverse();
            window.blogs = blogs;
            insertBlogAll(blogs);
        }
    }
    ajax(request)
}

var _main=function(){
    blogAll();
    //bindEvents();
}
_main();