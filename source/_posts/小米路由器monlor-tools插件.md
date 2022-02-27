---
title: 小米路由器monlor tools插件
tags:
  - IT
  - miwifi
  - 折腾
id: '27'
categories:
  - - uncategorized
date: 2018-02-02 12:53:16
---

### 小米路由器Shell工具箱，monlor大神制作，主要参考了小米的Misstar Tools制作，仅学习之用！

博主参与调试
<!-- more -->
工具箱正处于测试状态，更新比较频繁，安装要有一定的动手能力，出问题会用U盘刷固件。 arm路由: R1D R2D R3D , mips路由: R3 R3P R3G R1CM 目前支持了以下几种插件: 1. ShadowSocks 　　　影梭                        #成功 2. KoolProxy　　　　 去广告 3. Aria2　                       下载神器 4. VsFtpd　                    ftp服务器 5. kms                             Windows激活工具 6. Frpc                            内网穿透(占用资源较多，建议arm路由使用) 7. Ngrok                         内网穿透(比较轻量级) 8. WebShell　               网页ssh 9. TinyProxy                 http代理 10. Entware　               opkg软件包工具(仅支持arm路由) 11. KodExplorer　       可道云，在线文档管理器(依赖于Entware，仅支持arm路由) 12. EasyExplorer　      文件传输同步工具(仅支持arm路由) 13. HttpFile                     http文件查看工具(依赖于Entware，仅支持arm路由) 工具箱已经开发到了web界面，但是web界面插件不完全，插件的安装、卸载、配置由shell完成。 安装完成后执行monlor命令配置工具箱，Ctrl + c或者输入exit可以退出。 才疏学浅，但有一颗学习和折腾的心！

![](http://www.whrblog.online/wp-content/uploads/2018/02/IMG_20180202_211731.jpg)

### 安装方式

curl命令

```
sh -c "$(curl -kfsSl https://coding.net/u/monlor/p/Monlor-Tools/git/raw/master/install.sh)" && source /etc/profile &> /dev/null
```

### 工具箱命令

1\. 卸载：uninstall.sh 2. 更新：update.sh \[-f\] 3. 初始化：init.sh 4. 插件管理：appmanage.sh addupgradedel appname \[-f\] 5. 工具箱配置：monlor (任意界面Ctrl + c可以退出配置)

### Web界面预览

[![PZnpXF.md.png](https://s1.ax1x.com/2018/07/06/PZnpXF.md.png)](https://imgchr.com/i/PZnpXF) [![PZnS6U.md.png](https://s1.ax1x.com/2018/07/06/PZnS6U.md.png)](https://imgchr.com/i/PZnS6U) [![PZmzlT.md.png](https://s1.ax1x.com/2018/07/06/PZmzlT.md.png)](https://imgchr.com/i/PZmzlT)  

### 注意事项

1\. 如果插件和工具箱都有更新，请务必先更新工具箱！ 2. 工具箱没有web界面，完全靠Shell开发，插件的安装、卸载、配置由配置文件完成。 3. 安装完成后执行monlor命令配置工具箱，Ctrl + c或者输入exit可以退出。 4. ss插件推荐使用aes-256-cfb或rc4-md5加密方式，较新的加密方式可能不支持

## 目录结构

/ --- /etc --- /monlor        --- /apps/ --- 插件安装位置        --- /config/ --- 工具箱配置文件        --- /scripts/ --- 工具箱脚本 --- /tmp        --- /messages --- 系统日志，工具箱日志 --- /userdisk        --- /data/ --- 硬盘目录 --- /extdisks/        --- /sd\*/ --- 外接盘目录     _**这篇文章已经没有实效性，最新版monlor tools请移步到**__**[http://blog.whrblog.online/archives/1017](http://blog.whrblog.online/archives/1017)**_