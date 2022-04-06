title: 自己动手建造WordPress全站Ajax
tags:
  - IT
  - 折腾
id: '804'
categories:
  - - uncategorized
date: 2018-07-06 08:19:29
---
全站 ajax 加载网站的用户体验是很奇妙的，全程浏览网站期间看不到任何浏览器刷新的迹象，点击网站上的链接，如果网站的速度可以的话，会给人一种瞬间加载的顺滑感觉，同时不失有高大上的感觉。 现在我看到很多 WordPress 网站已经部署上了全站 ajax 加载代码，效果也不错，所以我也在主题中设置了全站局部刷新的 ajax 代码。
<!-- more -->
全站 ajax 看似技术复杂，但是实际上操作起来非常简易，原因是已经有大神写好了相关的函数，任何开发者只要稍微修改一下参数，就可以轻松改造自己的网站。 全 站 ajax 代码的来源是从 WordPress 插件中提取出来的，作者是英国的卢克和威廉姆斯。这款代码适用范围非常广，不仅 WordPress 网站可以使用，只要结构统一完整的网站都可以使用，只需要简单的几部就可以改造完成。
```js
var ajaxhome='';
var ajaxcontent = 'content';
var ajaxsearch\_class = 'searchform';
var ajaxignore\_string = new String('#, /wp-, .pdf, .zip, .rar, /goto');
var ajaxignore = ajaxignore\_string.split(', ');
var ajaxloading\_code = 'loading';
var ajaxloading\_error\_code = 'error';
var ajaxreloadDocumentReady = false;
var ajaxtrack\_analytics = false
var ajaxscroll\_top = true
var ajaxisLoad = false;
var ajaxstarted = false;
var ajaxsearchPath = null;
var ajaxua = jQuery.browser;
jQuery(document).ready(function() {
    ajaxloadPageInit("");
});
window.onpopstate = function(event) {
    if (ajaxstarted === true && ajaxcheck\_ignore(document.location.toString()) == true) {
        ajaxloadPage(document.location.toString(),1);
    }
};
function ajaxloadPageInit(scope){
    jQuery(scope + "a").click(function(event){
        if (this.href.indexOf(ajaxhome) >= 0 && ajaxcheck\_ignore(this.href) == true){
            event.preventDefault();
            this.blur();
            var caption = this.title  this.name  "";
            var group = this.rel  false;
            try {
                ajaxclick\_code(this);
            } catch(err) {
            }
            ajaxloadPage(this.href);
        }
    });
    jQuery('.' + ajaxsearch\_class).each(function(index) {
        if (jQuery(this).attr("action")) {
            ajaxsearchPath = jQuery(this).attr("action");;
            jQuery(this).submit(function() {
                submitSearch(jQuery(this).serialize());
                return false;
            });
        }
    });
    if (jQuery('.' + ajaxsearch\_class).attr("action")) {} else {
    }
}
function ajaxloadPage(url, push, getData){
    if (!ajaxisLoad){
        if (ajaxscroll\_top == true) {
            jQuery('html,body').animate({scrollTop: 0}, 1500);
        }
        ajaxisLoad = true;
        ajaxstarted = true;
        nohttp = url.replace("http://","").replace("https://","");
        firstsla = nohttp.indexOf("/");
        pathpos = url.indexOf(nohttp);
        path = url.substring(pathpos + firstsla);
        if (push != 1) {
            if (typeof window.history.pushState == "function") {
                var stateObj = { foo: 1000 + Math.random()\*1001 };
                history.pushState(stateObj, "ajax page loaded...", path);
            } else {
            }
        }
        if (!jQuery('#' + ajaxcontent)) {
        }
        jQuery('#' + ajaxcontent).append(ajaxloading\_code);
        jQuery('#' + ajaxcontent).fadeTo("slow", 0.4,function() {
            jQuery('#' + ajaxcontent).fadeIn("slow", function() {
                jQuery.ajax({
                    type: "GET",
                    url: url,
                    data: getData,
                    cache: false,
                    dataType: "html",
                    success: function(data) {
                        ajaxisLoad = false;
                        datax = data.split('<title>');
                        titlesx = data.split('</title>');
                        if (datax.length == 2  titlesx.length == 2) {
                            data = data.split('<title>')\[1\];
                            titles = data.split('</title>')\[0\];
                            jQuery(document).attr('title', (jQuery("<div/>").html(titles).text()));
                        } else {
                        }
                        if (ajaxtrack\_analytics == true) {
                            if(typeof \_gaq != "undefined") {
                                if (typeof getData == "undefined") {
                                    getData = "";
                                } else {
                                    getData = "?" + getData;
                                }
                                \_gaq.push(\['\_trackPageview', path + getData\]);
                            }
                        }
                        data = data.split('id="' + ajaxcontent + '"')\[1\];
                        data = data.substring(data.indexOf('>') + 1);
                        var depth = 1;
                        var output = '';
                        while(depth > 0) {
                            temp = data.split('</div>')\[0\];
                            i = 0;
                            pos = temp.indexOf("<div");
                            while (pos != -1) {
                                i++;
                                pos = temp.indexOf("<div", pos + 1);
                            }
                            depth=depth+i-1;
                            output=output+data.split('</div>')\[0\] + '</div>';
                            data = data.substring(data.indexOf('</div>') + 6);
                        }
                        document.getElementById(ajaxcontent).innerHTML = output;
                        jQuery('#' + ajaxcontent).css("position", "absolute");
                        jQuery('#' + ajaxcontent).css("left", "20000px");
                        jQuery('#' + ajaxcontent).show();
                        ajaxloadPageInit("#" + ajaxcontent + " ");
                        if (ajaxreloadDocumentReady == true) {
                            jQuery(document).trigger("ready");
                        }
                        try {
                            ajaxreload\_code();
                        } catch(err) {
                        }
                        jQuery('#' + ajaxcontent).hide();
                        jQuery('#' + ajaxcontent).css("position", "");
                        jQuery('#' + ajaxcontent).css("left", "");
                        jQuery('#' + ajaxcontent).fadeTo("slow", 1, function() {});
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        ajaxisLoad = false;
                        document.title = "Error loading requested page!";
                        document.getElementById(ajaxcontent).innerHTML = ajaxloading\_error\_code;
                    }
                });
            });
        });
    }
}
function submitSearch(param){
    if (!ajaxisLoad){
        ajaxloadPage(ajaxsearchPath, 0, param);
    }
}
function ajaxcheck\_ignore(url) {
    for (var i in ajaxignore) {
        if (url.indexOf(ajaxignore\[i\]) >= 0) {
            return false;
        }
    }
    return true;
}
function ajaxreload\_code() {
    //add code here   
}
function ajaxclick\_code(thiss) {
    jQuery('ul.nav li').each(function() {
        jQuery(this).removeClass('current-menu-item');
    });
    jQuery(thiss).parents('li').addClass('current-menu-item');
}
```
代码部分需要根据自己的实际修改一小部分：
1. 第一行 ajaxhome 填写网站的访问网址；   
2. 第二行 ajaxcontent 填写网站文章的容器id名称，即异步加载的部分；   
3. 第三行 ajaxsearch\_class 填写网站搜索框的容器名称，一般都是“searchform”；   
4. 第四行 ajaxignore\_string 是忽略使用ajax加载的链接，比如说feed源等等；   
5. 第六行 ajaxloading\_code 加载时显示的内容，可以设定动画；   
6. 第七行 ajaxloading\_error\_code 加载失败时显示的内容，可以设定动画。  

只要按照上述要求修改好代码，单独存放为 JS 文件并且引入网页之中，效果立竿见影。有木有很神奇的感觉。 ajax异步加载影响其他jQuery特效： 部署上 ajax 异步加载代码后，会出现一个问题，首次打开网站后，jQuery 动画都会正常运行，但是点击网页执行了 ajax 异步加载之后，所有的动画都会失效。 这是因为进行异步加载后 jQuery 代码无法获取元素，特效自然消失，为解决这个问题，还需要对 jQuery 代码进行改造。 解决方式是使用 `live()` 事件，`live()`事件的用法如下
```js
$(selector).live(event,data,function)
```
event 用来替换 click()、hover() 等动作；data 可选，是参数；function 是需要执行的动作。 举个例子，一个 `click()` 事件改写为 `live()` 事件，原本代码是这样：
```js
$(".menu-item").click(function(){$(".topmenu").fadeOut(500)});
```
修改之后
```js
(".menu-item").live("click",function(){$(".topmenu").fadeOut(500)});
```

原文出自KRUNK ZHOU 原文链接:[https://krunk.cn/kblog325/](https://krunk.cn/kblog325/)