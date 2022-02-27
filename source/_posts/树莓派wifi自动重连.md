---
title: 树莓派WIFI自动重连
tags:
  - IT
  - Linux
  - Raspi/Orapi
  - 折腾
id: '606'
categories:
  - - uncategorized
date: 2018-05-09 15:12:09
---

python代码autowifi.py，放在/home/pi目录下
<!-- more -->
#!/usr/bin/python
import os, time

while True:
    if '192' not in os.popen('ifconfig  grep 192').read():
        print '\\n\*\*\*\*\*\* wifi is down, restart... \*\*\*\*\*\*\\n'
        os.system('sudo /etc/init.d/networking restart')
    time.sleep(5\*60) #5 minutes

shell脚本autowifi.sh，也放在/home/pi目录下

#!/bin/sh
python /home/pi/autowifi.py &

开机自动启动以上脚本：在终端窗口执行以下命令即可

sudo cp -f /home/pi/autowifi.sh /etc/init.d/
sudo chmod +x /etc/init.d/autowifi.sh
sudo chown root:root /etc/init.d/autowifi.sh 
sudo update-rc.d autowifi.sh defaults 

脚本会每5分钟检测一次，若wifi断线，则自动重新连接 如果出现 "insserv: warning: script 'xxxx' missing LSB tags and overrides" 移除wolfram-engine

sudo apt-get remove wolfram-engine

  转自创客社区 原文链接[http://bbs.nxez.com/thread-99-1-1.html](http://bbs.nxez.com/thread-99-1-1.html)