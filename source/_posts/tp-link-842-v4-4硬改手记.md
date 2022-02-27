---
title: TP link 842 v4.4硬改手记
tags:
  - IT
  - Linux
  - 折腾
id: '1111'
categories:
  - - uncategorized
date: 2019-01-21 20:50:56
---

TPlink家族的路由器都有一个很大的问题，新路由器买回来十分好用，在用了几年之后各种卡网，各种宕机......早在一年前就萌生了硬改的想法，只是一直忙于学业😌😌😌

* * *
<!-- more -->
趁着刚考完试的闲暇时间，买来了flash，ddr和编程器。买的时候犯了一个大错误-\_-，买flash没有查手册，看着w25q32v以为是32m的flash就下单了，在快递回来的几天左思右想找不到32m的固件，还去论坛询问，后来查手册才发现是4m的flash，可玩性大大降低了。(︶^︶)

* * *

# 0x01

某宝上购买了两块winbond的W25Q32V的flash和HY64的DDR内存，还有一个CH341A的编程器。开始吐槽编程器，有一个晶振竟然是虚焊的，差评...... ![kPbopd.jpg](https://history.whrblog.online/2019/04/07/image-bed-1/kPbopd.md.jpg?raw=true) ![kPqVNF.jpg](https://history.whrblog.online/2019/04/07/image-bed-1/kPqVNF.md.jpg?raw=true)

* * *

# 0x02

开始烧固件，系统是windows7 x64，没有出现不兼容的情况。刷入大H的breed，并在0001fc00写入在路由器背面的MAC地址，不然连网络都没有。店家给的转接板也不能用，无奈用手把flash摁在编程器上4分钟，刷了两次才成功，第一次手抖了一下卡在了83%，回想起论坛上各种spi flash坏道导致的问题，一阵阵冷汗不由自主地冒了出来。 还好没有什么大碍，又读了出来，摁的4分钟刷刷网页很快就过去了，手摁得有点僵，再一次差评.... ![](https://history.whrblog.online/2019/04/07/image-bed-1/kitSw4.md.png)

* * *

# 0x03

把这个66脚的ddr焊到主板上去，我承认我是在外面找人焊的，这个对我来说太困难了，哪怕焊上去也是灯全部亮，系统没有反应，更可能的是焊盘掉了两三个，路由器废了。 后果.jpg ![k3j6II.jpg](http://history.whrblog.online/2019/04/07/image-bed-1/k3j6II.jpg)

* * *

# 0x04

在电脑段设置静态ip，ip地址为192.168.1.1，掩码为255.255.255.0，网关为192.168.1.1 在路由器上电开机前，捅住restart，接上电源，当看到LED灯全部亮起后闪了一下松开，打开浏览器访问192.168.1.1，不出意外的情况下就是之前刷好的breed了 ![kitpTJ.md.png](https://history.whrblog.online/2019/04/07/image-bed-1/kitpTJ.md.png) 在固件中心刷入openwrt固件和art无线修正固件，刷入速度极快。openwrt固件用了恩山AndyX大神的4m精简固件[OpenWrt/LEDE 4M精简迷你固件-Luci界面-SFE加速-SQM分配-UPNP-IPv6-VLAN支持-WIFI计划](https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=270339) art无线修正的文件我上传到了git上[https://github.com/wanghurui/Router-art-firmware](https://github.com/wanghurui/Router-art-firmware) ![](https://history.whrblog.online/2019/04/07/image-bed-1/kiYvOU.md.png) SFE效果如下图，本地网速几乎增加了1m/s ![](https://history.whrblog.online/2019/04/07/image-bed-1/kmDnmD.jpg)

* * *

# 0x05

激动人心的时刻，刷完后的自动重启，在等了大概30s后跳出了下面这个页面 ![kiYjyT.png](https://history.whrblog.online/2019/04/07/image-bed-1/kiYjyT.png) 下图为Luci界面 ![kitPYR.md.png](https://history.whrblog.online//2019/04/07/image-bed-1/kitPYR.md.png) 在刷了机之后，无线性能只能用时间去测量它，掉线的情况应该少了，在家里的Xiaomi TV上测出来的峰值网速可以有5m/s，对于30m的有线通宽带已经心满意足了。 ![kitCk9.png](https://history.whrblog.online/2019/04/07/image-bed-1/kitCk9.png) 由于内存只有4m，而且刷完了之后只有150+k可以使用，一开始想在路由器上实现smartdns和koolproxy的都因为内存不足而放弃。不过我觉得在/tmp目录安装opkg和软件很ok😹😹😹

# 0x06 Bugs

貌似Andy X的固件crontab有问题：我正确配置了crontab设置了每天6点自动重启，可是没有一次成功😐

Wed May 29 06:00:43 2019 daemon.info hostapd: wlan0: STA 68:db:ca:23:1f:71 WPA: group key handshake completed (RSN)
Wed May 29 06:00:43 2019 daemon.info hostapd: wlan0: STA b0:65:bd:68:1a:9c WPA: group key handshake completed (RSN)