---
title: Pi上传CPU温度到oneNet
tags: 
  - Hexo
id: '1249'
categories:
  - - uncategorized
date: 2018-07-22 12:20:10
---


<!-- more -->
## 参考代码

\# -\*- coding:utf-8 -\*-
# File: cputemp.py
#向平台已经创建的数据流发送数据点
import urllib2
import json
import time
import datetime



APIKEY = 'xxxxxxxxxxx'  #改成你的APIKEY

def get\_temp():
        # 打开文件 
        file = open("/sys/class/thermal/thermal\_zone0/temp") 
        # 读取结果，并转换为浮点数 
        temp = float(file.read()) / 1000 
        # 关闭文件 
        file.close() 
        # 向控制台打印结果 
        print "CPU的温度值为: %.3f" %temp 
        # 返回温度值
        return temp
        
        
def http\_put():
    temperature = get\_temp() #获取CPU温度并上传
    CurTime = datetime.datetime.now()
    url='http://api.heclouds.com/devices/xxxxx/datapoints' #改成你自己的①
    values={'datastreams':\[{"id":"temp","datapoints":\[{"at":CurTime.isoformat(),"value":temperature}\]}\]}

    print "当前的ISO时间为： %s" %CurTime.isoformat()
    print "上传的温度值为: %.3f" %temperature

    jdata = json.dumps(values)                  # 对数据进行JSON格式化编码
    #打印json内容
    print jdata
    request = urllib2.Request(url, jdata)
    request.add\_header('api-key', APIKEY)
    request.get\_method = lambda:'POST'          # 设置HTTP的访问方式
    request = urllib2.urlopen(request)
    return request.read()

while True:
        time.sleep(60)
        resp = http\_put()
        print "OneNET请求结果:\\n %s" %resp
        time.sleep(60)

##### 注：①为设备API地址

![1](https://s1.ax1x.com/2018/07/20/P8PJvq.jpg)

##### 执行效果

![2](https://s1.ax1x.com/2018/07/20/P8P88s.md.png)

###### 转自https://open.iot.10086.cn/bbs/thread-2533-1-1.html 有改动