---
title: 小米路由器mini/mini青春版 刷入Openwrt固件
tags:
  - IT
  - Linux
  - miwifi
  - 折腾
id: '1162'
categories:
  - - uncategorized
date: 2019-02-19 22:42:41
---

[![mmexport1552791022636.jpg](https://history.whrblog.online/2019/04/07/image-bed-1/5c8db64171e04.jpg "mmexport1552791022636.jpg")](https://history.whrblog.online/2019/04/07/image-bed-1/5c8db64171e04.jpg)

1.  刷开发版
2.  打开ssh
3.  刷入breed
4.  刷入固件

* * *
<!-- more -->
# 0.1小米路由器刷入开发版

## 小米路由器mini

在MiWiFi官网[www.miwifi.com](www1.miwifi.com)，下载 ROM Mini的开发版,下载完毕后放入fat32格式U盘下的根目录，并将包名改为miwifi.bin 断开路由器的电源，将U盘插入路由器的USB接口，用细长的工具按住reset后，接通电源，待路由器指示灯变为黄灯闪烁时，松开reset。 大约3-5分钟后，指示灯变成黄色常亮状态时可以拔掉U盘，此时刷机已经完成正在重启，稍等片刻路由器指示灯变蓝就可以正常使用了。

## 小米路由器mini青春版

由于青春版没有usb的缺陷，只能使用后台的手动上传固件的方式进行刷入开发版 链接: [https://pan.baidu.com/s/1rG3qNVrbPKnj0G3orQU5Mg](https://pan.baidu.com/s/1rG3qNVrbPKnj0G3orQU5Mg) 提取码: i422 下载旧版本的青春版开发版，在后台“常用设置” -->“系统状态”-->“手动上传更新包”完成刷机

* * *

# 0.2开启路由器ssh

将小米路由器插上电源，这里不要让小米路由器联网（不需要小米路由器的Internet口连接另一台路由器的LAN口），连接小米路由器WiFi，打开后台页面[192.168.31.1](192.168.31.1)，配置小米路由器工作模式为“普通路由器工作模式”应该是默认，并且配置WiFi密码以及后台登录密码。 登录后台，在登录后可以在首页上看到小米路由器的sn，通过sn查询路由器ssh登录密码。 用一台可以联网的设备打开[http://www.iptvfans.cn/miwifi/passwd](http://www.iptvfans.cn/miwifi/passwd)复制sn到查询框中即可获取登录密码

![kg4mvQ.png](https://history.whrblog.online/2019/04/07/image-bed-1/kg4mvQ.png)

打开终端：

*   windows下推荐使用putty，在IP处填入小米路由器的ip，也就是192.168.31.1其他不动。然后会弹出一个关于密匙的窗口，点击yes即可。log as后填写root password是之前查询的密码。![mmexport1552791038364.jpg](https://history.whrblog.online/2019/04/07/image-bed-1/5c8db641deadc.jpg "mmexport1552791038364.jpg")
*   Mac OS下的终端可以参考这个[https://jingyan.baidu.com/article/f3e34a1289cda3f5eb6535c0.html](https://jingyan.baidu.com/article/f3e34a1289cda3f5eb6535c0.html)在终端中输入
    
    ssh root@192.168.31.1
    
    并按下回车后同windows

* * *

# 1.0全盘备份

插入U盘并新建文件夹（青春版请跳过）

cd /extdisks/sda1
mkdir xiaomi\_rom\_backup

备份

cat /proc/mtd

![kg7tBQ.png](https://history.whrblog.online/2019/04/07/image-bed-1/kg7tBQ.png)

dd if=/dev/mtd0 of=/extdisks/sda1/xiaomi\_rom\_backup/all.bin
dd if=/dev/mtd1 of=/extdisks/sda1/xiaomi\_rom\_backup/bootloader.bin
dd if=/dev/mtd2 of=/extdisks/sda1/xiaomi\_rom\_backup/config.bin
dd if=/dev/mtd3 of=/extdisks/sda1/xiaomi\_rom\_backup/factory.bin
dd if=/dev/mtd4 of=/extdisks/sda1/xiaomi\_rom\_backup/os1.bin
dd if=/dev/mtd5 of=/extdisks/sda1/xiaomi\_rom\_backup/rootfs.bin
dd if=/dev/mtd6 of=/extdisks/sda1/xiaomi\_rom\_backup/os2.bin
dd if=/dev/mtd7 of=/extdisks/sda1/xiaomi\_rom\_backup/overlay.bin
dd if=/dev/mtd8 of=/extdisks/sda1/xiaomi\_rom\_backup/crash.bin
dd if=/dev/mtd9 of=/extdisks/sda1/xiaomi\_rom\_backup/reserved.bin
dd if=/dev/mtd10 of=/extdisks/sda1/xiaomi\_rom\_backup/bdata.bin

如果是青春版的话请执行

dd if=/dev/mtd0 of=/tmp/all.bin
dd if=/dev/mtd1 of=/tmp/bootloader.bin
dd if=/dev/mtd2 of=/tmp/config.bin
dd if=/dev/mtd3 of=/tmp/factory.bin
dd if=/dev/mtd4 of=/tmp/os1.bin
dd if=/dev/mtd5 of=/tmp/rootfs.bin
dd if=/dev/mtd6 of=/tmp/os2.bin
dd if=/dev/mtd7 of=/tmp/overlay.bin
dd if=/dev/mtd8 of=/tmp/crash.bin
dd if=/dev/mtd9 of=/tmp/reserved.bin
dd if=/dev/mtd10 of=/tmp/bdata.bin

备份完成后请及时使用winscp把备份文件拷出，避免刷breed时内存不足导致路由器变砖。 输出应该是这样的

root@XiaoQiang:~# dd if=/dev/mtd0 of=/extdisks/sda1/xiaomi\_rom\_backup/all.bin
32768+0 records in
32768+0 records out
root@XiaoQiang:~# dd if=/dev/mtd1 of=/extdisks/sda1/xiaomi\_rom\_backup/bootloader.bin
384+0 records in
384+0 records out
root@XiaoQiang:~# dd if=/dev/mtd2 of=/extdisks/sda1/xiaomi\_rom\_backup/config.bin
128+0 records in
128+0 records out
root@XiaoQiang:~# dd if=/dev/mtd3 of=/extdisks/sda1/xiaomi\_rom\_backup/factory.bin
128+0 records in
128+0 records out
root@XiaoQiang:~# dd if=/dev/mtd4 of=/extdisks/sda1/xiaomi\_rom\_backup/os1.bin
25600+0 records in
25600+0 records out
root@XiaoQiang:~# dd if=/dev/mtd5 of=/extdisks/sda1/xiaomi\_rom\_backup/rootfs.bin
22716+1 records in
22716+1 records out
root@XiaoQiang:~# dd if=/dev/mtd6 of=/extdisks/sda1/xiaomi\_rom\_backup/os2.bin
4096+0 records in
4096+0 records out
root@XiaoQiang:~# dd if=/dev/mtd7 of=/extdisks/sda1/xiaomi\_rom\_backup/overlay.bin
2048+0 records in
2048+0 records out
root@XiaoQiang:~# dd if=/dev/mtd8 of=/extdisks/sda1/xiaomi\_rom\_backup/crash.bin
128+0 records in
128+0 records out
root@XiaoQiang:~# dd if=/dev/mtd9 of=/extdisks/sda1/xiaomi\_rom\_backup/reserved.bin
128+0 records in
128+0 records out
root@XiaoQiang:~# dd if=/dev/mtd10 of=/extdisks/sda1/xiaomi\_rom\_backup/bdata.bin
128+0 records in
128+0 records out

* * *

# 1.1刷入Bootloader

cd /tmp

在电脑上下载好小米路由器mini专用的breed[https://breed.hackpascal.net/breed-mt7620-xiaomi-mini.bin](https://breed.hackpascal.net/breed-mt7620-xiaomi-mini.bin)使用scp工具拷入路由器的/tmp目录中 青春版请使用https://breed.hackpascal.net/breed-mt7688-reset38.bin

*   windows下使用winscp
*   MacOS/unix/linux使用shell里的scp命令
*   密码还是之前sn查询的密码

Linux/Unix下详细命令

cd /tmp
wget https://breed.hackpascal.net/breed-mt7620-xiaomi-mini.bin
scp ./breed-mt7620-xiaomi-mini.bin root@192.168.31.1:/tmp

刷入Bootloader

mtd -r  write /tmp/breed-mt7620-xiaomi-mini.bin Bootloader

* * *

# 1.2刷入固件

## mini

下载固件[https://1jjklacnz-my.sharepoint.com/personal/alog\_1\_jjkl\_ac\_nz/\_layouts/15/download.aspx?share=ETxwSwq7ms9JoISMXlZpPB8BtTJ8lBaX270VraNKh3ZBTA&ithint=.bin](https://1jjklacnz-my.sharepoint.com/personal/alog_1_jjkl_ac_nz/_layouts/15/download.aspx?share=ETxwSwq7ms9JoISMXlZpPB8BtTJ8lBaX270VraNKh3ZBTA&ithint=.bin)

## 青春版

下载固件https://drive.google.com/file/d/1b-PJ9C1JQWO0\_gmVWNgFckuEbS43eM97/view?usp=sharing 断电关闭路由器 更改电脑适配器设置，并设置IPv4：IP是192.168.1.2，子网掩码：255.255.255.0，默认网关：192.168.1.1 捅路由器上的reset键开机，过一会浏览器打开192.168.1.1，上传你下载的固件。 ![kgbVdH.jpg](https://history.whrblog.online//2019/04/07/image-bed-1/kgbVdH.jpg) ![kgbEee.jpg](https://history.whrblog.online/2019/04/07/image-bed-1/kgbEee.jpg) 刷入方法可以借鉴一下我的[TPlink842硬改篇](http://www.whrblog.online/archives/1111) 等待刷完之后手动重启路由器，打开后台界面后台IP： 192.168.1.1 用户名：root或者是admin 密码： password 你成功打开了新世界的大门