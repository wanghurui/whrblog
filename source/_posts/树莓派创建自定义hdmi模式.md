---
title: 树莓派创建自定义HDMI模式
tags:
  - IT
  - Linux
  - Raspi/Orapi
  - 折腾
id: '101'
categories:
  - - uncategorized
date: 2018-02-22 15:36:07
---

我们经常使用HDMI连接树莓派，但是有时候树莓派HDMI导致屏幕不能显现，让人很烦
<!-- more -->
在config.txt中使用以下配置字符串指定新模式

hdmi\_cvt=<width> <height> <framerate> <aspect> <margins> <interlace><rb> 
width            width in pixels
height           height in pixels
framerate        framerate in Hz aspect aspect ratio 1=4:3, 2=14:9, 3=16:9, 4=5:4, 5=16:10, 6=15:9
margins          0=margins disabled, 1=margins enabled
interlace        0=progressive, 1=interlaced
rb               0=normal, 1=reduced blanking

前三个参数是必需的。其余的是可选的。如果未指定，则方面默认为16：9 使自定义模式成为默认模式。 请注意。不能保证您的显示器将支持由此产生的分辨率/帧速率。 但是，如果您目前正在以非原生分辨率运行显示器，那么这可能值得一试。