---
title: 树莓派打开powersave
tags:
  - IT
  - Linux
  - Raspi/Orapi
  - 折腾
id: '744'
categories:
  - - uncategorized
date: 2018-06-06 22:04:46
---

powersave顾名思义，减少功耗，这个功能在有些供电不足的情况下十分好用，可以减少树莓派宕机的次数。
<!-- more -->
举个栗子我的一台供电不足树莓派上搭了个web server，再叫几个好伙伴访问一下，写两篇文章或者评论什么的，第一个访客还没有什么问题，第二个一来，503了。。。 通过powersave功能可以将Pi的CPU主频降到最低

sudo -i

echo powersave > /sys/devices/system/cpu/cpu0/cpufreq/scaling\_governor

然后

sudo cat/sys/devices/system/cpu/cpu0/cpufreq/scaling\_cur\_freq

我的Orangepi的主频已经降到了480mhz了，毕竟windowsX system玩的少，在shell里面这点主频足够了 编辑/etc/rc.local把降频功能加入到自启动项目中

echo powersave > /sys/devices/system/cpu/cpu0/cpufreq/scaling\_governor

  完美节能