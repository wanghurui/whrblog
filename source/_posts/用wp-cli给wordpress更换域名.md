---
title: 用WP-CLI给WordPress更换域名
tags:
  - IT
  - Wordpress
  - 折腾
id: '1193'
categories:
  - - uncategorized
date: 2019-03-02 17:02:04
---

wp-cli 是一个命令行工具，可以让我们通过命令行安装、更新 WordPress，对 WordPress 执行一些批量操作，响应速度快，使用方便
<!-- more -->
![](https://history.whrblog.online/2019/04/07/image-bed-1/kqSUFU.png)

## 安装 wp-cli 工具

curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

## 搜索替换 WordPress 数据库中的域名

wp-cli 工具为我们提供了一个搜索替换数据库中字符的命令，**直接在 WordPress 的根目录执行**以下命令即可完成更换 WordPress 域名的操作，该命令支持一些选项方便我们自定义操作，具体查看 wp search-replace 命令的官方说明。

wp search-replace 'old.com' 'new.com'