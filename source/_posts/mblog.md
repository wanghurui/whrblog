---
title: Mblog
tags:
  - IT
  - MINICMS
  - 折腾
  - Hexo
id: '680'
categories:
  - - uncategorized
date: 2018-05-28 10:15:16
hidden: true
---

minicms停跟好久了，总共有三个修改版本 1. minicms（原版） 2. blogmi 3. mcblog 我把它们重新整合了一下，让它们共存在同一站点内取名为Mblog，想法的来源是博客精简mini
<!-- more -->
# Mblog

*   内置三个主题 1.minicms 2.blogmi 3.newred（自适应主题）
*   支持markdown编辑器，当然也支持html语法
*   增强了安全性（后台密码不再以明文储存）
*   美化后台（用了mcblog的后台）
*   部分主题支持友情链接

推荐php版本为php5.6，版本过高切换主题后前台可能白屏。 还是一如既往的不要数据库，因为部分主题内图片原因，整个博客系统比原来大了一点。总共400+k 本来编辑器想用xhreditor的，但是兼容性问题很大，最终没有保留。

# 主题修改注意事项

如果需要替换主题的图片，在ftp或者在线文件管理器中找到/mc-files/theme/修改对应的主题文件 newred封面照片命名为bg2.jpg 分辨率为1024\*480超出可能会变形 blogmi头像照片命名为photo.jpg 分辨率为256\*256

# DEMO

[![C4iyl9.png](https://history.whrblog.online/2019/04/07/image-bed-1/C4iyl9.md.png)](https://imgchr.com/i/C4iyl9) newred主题 [![C4iqmt.png](https://history.whrblog.online/2019/04/07/image-bed-1/C4iqmt.md.png)](https://imgchr.com/i/C4iqmt) minicms主题 [![C4ixfg.png](https://history.whrblog.online/2019/04/07/image-bed-1/C4ixfg.md.png)](https://imgchr.com/i/C4ixfg) blogmi主题 [![C4Fimq.png](https://history.whrblog.online/2019/04/07/image-bed-1/C4Fimq.md.png)](https://imgchr.com/i/C4Fimq) 自适应的后台

# 使用时注意事项

*   不要在后台模版处留空，如果留空，前台白屏
*   下载后请修改压缩包内文件/mc-files/mc-conf.php修改为自己的域名
*   解压密码admin
*   默认密码为123456

# 下载地址

百度云[https://pan.baidu.com/s/15KI6CPfnMxTl-YmIRB-tMw? errno=0&errmsg=Auth%20Login%20Sucess&&bduss=&ssnerror=0&traceid=](https://pan.baidu.com/s/15KI6CPfnMxTl-YmIRB-tMw?errno=0&errmsg=Auth%20Login%20Sucess&&bduss=&ssnerror=0&traceid=)

# Git项目地址

[https://github.com/wanghurui/Mblog](https://github.com/wanghurui/Mblog)