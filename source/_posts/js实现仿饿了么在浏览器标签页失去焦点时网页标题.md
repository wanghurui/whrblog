---
title: JS实现仿饿了么在浏览器标签页失去焦点时网页标题改变
tags:
  - Date
  - IT
  - 折腾
id: '521'
categories:
  - - uncategorized
date: 2018-04-17 07:31:59
---

S实现浏览器标签页失去焦点时网页Title的改变 这个 API 本身非常简单，由以下三部分组成。
<!-- more -->
document.hidden：表示页面是否隐藏的布尔值。页面隐藏包括 页面在后台标签页中 或者 浏览器最小化 document.visibilityState：表示下面 4 个可能状态的值 hidden：页面在后台标签页中或者浏览器最小化 visible：页面在前台标签页中 prerender：页面在屏幕外执行预渲染处理 document.hidden 的值为 true unloaded：页面正在从内存中卸载 Visibilitychange事件：当文档从可见变为不可见或者从不可见变为可见时，会触发该事件。 这样，我们可以监听 Visibilitychange 事件，当该事件触发时，获取 document.hidden 的值，根据该值进行页面一些事件的处理。 记住：必须是基于支持H5的浏览器才可以

* * *

var OriginTitile = document.title;
var titleTime;
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = '(つェ⊂)我藏好了哦~ ' + OriginTitile;
            clearTimeout(titleTime);
        }
        else {
            document.title = '(\*´∇｀\*) 被你发现啦~ ' + OriginTitile;
            titleTime = setTimeout(function() {
                document.title = OriginTitile;
            }, 2000);
        }
    });

* * *

最后在Wordpress中使用Custom Javascript插件启用 本文来源于KRUNK BLOG( [http://86k.xyz](http://86k.xyz/))，