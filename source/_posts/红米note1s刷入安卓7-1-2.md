---
title: 红米note1s刷入安卓7.1.2
tags: 
  - Hexo
id: '1375'
categories:
  - - uncategorized
date: 2019-06-18 08:31:58
hidden: true
---

_**刷机会导致手机中内容全部清空，在一定情况下甚至有可能不可逆的硬件损伤。如果刷机出了问题，与Whr和这篇文章无关**_

1.  降级到最后一个开发版
2.  刷入twrp
3.  刷入系统

* * *
<!-- more -->
# 1.降级

安装小米助手——>[link](http://zhushou.xiaomi.com/) 在手机中打开fast boot 手机连接上电脑后点击：刷机-->通过fast boot刷机-->选择最新开发版刷机包 内容不再赘述 tips：进度条一跳一跳的，0%会卡很久然后直接跳到50~60%。请耐心等待 ![](https://history.whrblog.online/2019/04/07/image-bed-1/20190617221818.png)

* * *

# 2.通过adb刷入twrp

在[http://www.miui.com/unlock/](http://www.miui.com/unlock/) 上通过官方工具解锁小米的bootloader ![](https://history.whrblog.online/2019/04/07/image-bed-1/35aa049cc6f76087.png) 在手机>设置>权限管理中打开root权限，并且在[开发者选项](https://jingyan.baidu.com/article/574c52196529b26c8d9dc1fa.html)中打开adb调试 手机连接电脑，安装[adb](https://blog.csdn.net/yuewen2008/article/details/80538663) 打开cmd，输入`adb reboot bootloader`等待重启完成 `fastboot devices -l` 若出来一串序列号，说明安卓设备已连接 刷入TWRP ——>[专用twrp传送门](https://www.androidfilehost.com/?fid=1395089523397938486) `cd X:\` 打开到你的twrp目录 `fastboot flash recovery twrp-xxxxxx.img` 等待出现 `finished total time`后表示刷入成功 `fastboot reboot` 或者断电重启也行😂 进入recovery界面 `adb reboot recovery` 进入twrp验证刷入成功 ![](https://history.whrblog.online/2019/04/07/image-bed-1/IMG_0141.JPG)

* * *

# 3.刷入系统

魔趣系统传送门—>[link](https://download.mokeedev.com/gucci.html) 将刷机包拷入手机后重启进入twrp ![](https://history.whrblog.online/2019/04/07/image-bed-1/IMG_0143.JPG)

## 格式化手机

点击主界面的 WIPE 按钮。 点击 Format Data 执行格式化过程。_**这将删除加密以及存储在内部存储上的所有文件。**_

## 刷入固件

定位到您存储在内部存储上的魔趣ROM包，并执行安装过程 ![](https://history.whrblog.online/2019/04/07/image-bed-1/IMG_0144.JPG) 等待刷机完成后进入系统 ![](https://history.whrblog.online/2019/04/07/image-bed-1/IMG_0146.JPG)  

* * *

# BUGS

1.  前置相机不可用
2.  状态灯有bug
3.  桌面有时会停止运行
4.  .....