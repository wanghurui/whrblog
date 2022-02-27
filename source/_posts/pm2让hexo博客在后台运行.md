---
title: pm2让hexo博客在后台运行
tags:
  - IT
  - Linux
  - Raspi/Orapi
  - 折腾
  - Hexo
id: '773'
categories:
  - - uncategorized
date: 2018-06-23 14:28:33
---

估计有好多人和我一样，在linux上部署成功hexo这个开源博客的时候，很高兴的用$ hexo server在服务上跑了起来。都遇到了 hexo 进程无法一直常驻后台。 ssh 一关，博客进程就死掉了。这可就扎心了，因为我们不可能一直本地开着ssh吧。 我也尝试过很多办法，比如screen，windows X system …… 于是经过一番大肆搜索，官方说用$ hexo s & 但是我在用的时候还是进程莫名奇妙的死掉了
<!-- more -->
# **安装pm2**

npm  install -g pm2

# **写一个执行脚本**

在博客根目录下面创建一个**hexo\_run.js**

//run
const { exec } = require('child\_process')
exec('hexo server',(error, stdout, stderr) => {
        if(error){
                console.log('exec error: ${error}')
                return
        }
        console.log('stdout: ${stdout}');
        console.log('stderr: ${stderr}');
})

# **运行脚本**

在根目录下

```bash
pm2 start hexo_run.js
```

多么完美的后台