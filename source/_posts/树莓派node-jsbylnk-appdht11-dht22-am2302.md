title: 树莓派lot=Node.js+Bylnk+DHT11/DHT22
tags:
  - IT
  - Linux
  - Raspi/Orapi
  - 折腾
id: '1429'
categories:
  - - uncategorized
date: 2019-07-30 07:33:30
---
# [![](https://history.whrblog.online/2019/04/07/image-bed-1/IMG_20190731_160014.jpg)](https://history.whrblog.online/2019/04/07/image-bed-1/IMG_20190731_160014.jpg)
<!-- more -->
# 安装npm及Bylnk库

 
```linux
sudo apt install npm -y
sudo apt-get install build-essential
sudo npm install -g npm
sudo npm install -g onoff
sudo npm install -g blynk-library
```
# 安装传感器库

*   [bcm2835库](http://www.airspayce.com/mikem/bcm2835/)
*   [node-dht-sensor](https://github.com/momenso/node-dht-sensor) npm包

```linux
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.46.tar.gz
tar zxvf bcm2835-1.46.tar.gz
cd bcm2835-1.46
./configure
make
sudo make check
sudo make install
sudo npm install -g node-dht-sensor
```

#  连接传感器

*   GND至GND
*   DAT信号到GPIO7
*   VCC至3.3v

# 创建可执行文件
```linux
cd ~
git clone https://github.com/wanghurui/Blynk-dht11-22.git
```
或者
```js
var blynkLib = require('blynk-library');
var sensorLib = require('node-dht-sensor');

var AUTH = 'YOUR\_AUTH\_TOKEN';

// Setup Blynk
var blynk = new blynkLib.Blynk(AUTH);

// Setup sensor, exit if failed
var sensorType = 11; // 11 for DHT11, 22 for DHT22 and AM2302
var sensorPin  = 4;  // The GPIO pin number for sensor signal
if (!sensorLib.initialize(sensorType, sensorPin)) {
    console.warn('Failed to initialize sensor');
    process.exit(1);
}

// Automatically update sensor value every 2 seconds
setInterval(function() {
    var readout = sensorLib.read();
    blynk.virtualWrite(3, readout.temperature.toFixed(1));
    blynk.virtualWrite(4, readout.humidity.toFixed(1));
    
    console.log('Temperature:', readout.temperature.toFixed(1) + 'C');
    console.log('Humidity:   ', readout.humidity.toFixed(1)    + '%');
}, 2000);

将**YOUR\_AUTH\_TOKEN**替换为App中的令牌。
```
```
sudo NODE\_PATH =/usr/local/lib/node\_modules node ./blynk-sensor-test.js
```
输出应如下所示
```js
OnOff mode
Connecting to TCP: cloud.blynk.cc 8442
Connected
Temperature: 18.0C
Humidity:    26.0%
Temperature: 18.0C
Humidity:    26.0%
```
可以使用pm2将此程序放在后台守护进程并且开机自启动
```linux
npm install -g pm2
sudo NODE\_PATH=/usr/local/lib/node\_modules pm2 start ./blynk-sensor-test.js
sudo pm2 save
sudo pm2 startup
```
  [![](https://history.whrblog.online/2019/04/07/image-bed-1/20190730071339.png)](https://history.whrblog.online/2019/04/07/image-bed-1/20190730071339.png)