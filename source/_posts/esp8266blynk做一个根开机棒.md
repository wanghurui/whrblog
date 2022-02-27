---
title: ESP8266+Blynk做一个根开机棒
tags:
  - IT
  - Linux
  - Raspi/Orapi
  - 折腾
id: '1513'
categories:
  - - uncategorized
date: 2020-01-24 14:32:36
---

[![IMG_20200124_131834-01.jpg](https://image.krunk.cn/images/2020/01/24/IMG_20200124_131834-01.md.jpg)](https://image.krunk.cn/images/2020/01/24/IMG_20200124_131834-01.jpg)
<!-- more -->
# 介绍

这个应用程序是为启动服务器编写的，只支持启动一个设备。它需要在源码中配置WOL服务器以及配置服务器的静态IP。

# Devices

1.  ESP8266
2.  Arduino IDE（所需库文件[ESP8266Ping](https://github.com/dancol90/ESP8266Ping),[ESP8266 Plug-in](https://github.com/esp8266/Arduino),[Blynk](https://github.com/blynkkk/blynk-library/releases/download/)）
3.  Blynk

Variable name | Default value | Comment
----- | ---------- | -------------------------
auth | Blynk_AuthToken | Blynk Auth Token (You get after the project was created in Blynk)
ssid | WiFi_SSID | Your WiFi network name
pass | WiFi_Password | Your WiFi network password
ip | 192.168.0.123 | Static IP for your WOL Server
gateway | 192.168.0.1 | Your Gateway IP address
bcastAddr | 192.168.0.255 | Your Broadcast IP address
subnet | 255.255.255.0 | Your Subnet Mask IP address
dns | 1.1.1.1 | IP address of your preferred DNS server
device_ip | 192.168.0.234 | Static IP address of device to be turned on (used for ping)
macAddr | aa:bb:cc:dd:ee:ff | Mac address of device to be turned on (important for the magic packet)
email | example@example.com | Email address for notifications (when the device could not be turned on within the set time limit)
device_name | NAS | The short name of your device that turns on
boot_time | 45 | Maximum time to wait for the device to turn on (used for notification, read the known issues!)
--------------------


# 需要更改的代码
```
//WiFi config
const char auth\[\] = "Blynk\_AuthToken";  //Blynk Auth Token (You get after the project was created in Blynk)
const char ssid\[\] = "WiFi\_SSID"; 
const char pass\[\] = "WiFi\_Password";

const IPAddress ip(192, 168, 0, 123); //Static IP for your WOL Server
const IPAddress gateway(192, 168, 0, 1);
const IPAddress bcastAddr(192, 168, 0, 255);
const IPAddress subnet(255, 255, 255, 0);
const IPAddress dns(1, 1, 1, 1);  //IP address of your preferred DNS server

//WOL device config
const IPAddress device\_ip(192, 168, 0, 234); //Static IP address of device to be turned on (used for ping)
byte macAddr\[6\] = {0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff};  //Mac address of device to be turned on (important for the magic packet)

//Alert config
const char email\[\] = "example@example.com";
const char device\_name\[\] = "NAS";
const uint16\_t boot\_time = 45;//number for countdown (It does not represent seconds, but it's close, read the known issues!)
```
[![-1.jpg](https://image.krunk.cn/images/2020/01/24/-1.jpg)](https://image.krunk.cn/images/2020/01/24/-1.jpg)

# Code
```
//#define DEBUG
#ifdef DEBUG
#define BLYNK\_PRINT Serial
//#define BLYNK\_DEBUG
//#define ENABLE\_DEBUG\_PING
#endif

#define BLYNK\_NO\_BUILTIN//disable built-in analog and digital operations.
//#define BLYNK\_NO\_INFO//disable providing info about device to the server. (saving time)

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <WiFiUdp.h>
#include <ESP8266Ping.h> 

//blynk colors
#define BLYNK\_GREEN"#23C48E"
#define BLYNK\_BLUE"#04C0F8"
#define BLYNK\_YELLOW"#ED9D00"
#define BLYNK\_RED"#D3435C"
#define BLYNK\_DARK\_BLUE"#5F7CD8"

//WiFi config
const char auth\[\] = "Blynk\_AuthToken";
const char ssid\[\] = "WiFi\_SSID";
const char pass\[\] = "WiFi\_Password";

const IPAddress ip(192, 168, 0, 123);
const IPAddress gateway(192, 168, 0, 1);
const IPAddress bcastAddr(192, 168, 0, 255);
const IPAddress subnet(255, 255, 255, 0);
const IPAddress dns(1, 1, 1, 1);

//WOL device config
const IPAddress device\_ip(192, 168, 0, 234);
byte macAddr\[6\] = {0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff};

//Alert config
const char email\[\] = "example@example.com";
const char device\_name\[\] = "NAS";
const uint16\_t boot\_time = 45;//number for countdown (It does not represent seconds, read the known issues!)

//WOL
#define MAGIC\_PACKET\_LENGTH 102
#define PORT\_WAKEONLAN 9
byte magicPacket\[MAGIC\_PACKET\_LENGTH\];
unsigned int localPort = 9;

WiFiUDP udp;

//pins
#define STATE\_PINV0
#define BUTTON\_PINV1
#define PING\_TIME\_PINV2
#define RSSI\_PINV3

//state
struct WOLServerState {
bool IsOnline;
uint16\_t boot\_time;
bool boot\_error;
uint16\_t ping;
uint32\_t previousMillis;
uint32\_t interval;
};
WOLServerState currentState = { false, 0, false, 0, 0, 5000UL };

void setup() {
#ifdef DEBUG
Serial.begin(115200);
#endif

connectWiFi();
connectBlynk();

//if (Blynk.connected()) {
if (udp.begin(localPort) == 1) {
BLYNK\_LOG("udp begin OK");
buildMagicPacket();
} else {
delay(500);
ESP.restart();
}
//}
}

void connectWiFi() {
WiFi.mode(WIFI\_STA);
WiFi.hostname("WOL server");
WiFi.config(ip, dns, gateway, subnet);
WiFi.begin(ssid, pass);

int count = 0;
while (WiFi.status() != WL\_CONNECTED) {
delay(250);
digitalWrite(LED\_BUILTIN, HIGH);
delay(250);
digitalWrite(LED\_BUILTIN, LOW);

count++;
if (count > 20) {
delay(500);
ESP.restart();
}
}

//BLYNK\_LOG("WiFi connected, IP: %s", WiFi.localIP().toString());
}

void connectBlynk() {
Blynk.config(auth);
Blynk.disconnect();

int count = 0;
while (Blynk.connect(10000) == false) {
delay(250);
digitalWrite(LED\_BUILTIN, HIGH);
delay(250);
digitalWrite(LED\_BUILTIN, LOW);

count++;
if (count > 20) {
delay(500);
ESP.restart();
}
}

BLYNK\_LOG("Blynk connected");
}

void loop() {
// Reconnect WiFi
if (WiFi.status() != WL\_CONNECTED) {
connectWiFi();
return;
}

// Reconnect to Blynk Cloud
if (!Blynk.connected()) {
connectBlynk();
return;
}

uint32\_t currentMillis = millis();
if (currentMillis - currentState.previousMillis >= currentState.interval) {
currentState.previousMillis = currentMillis;

if (currentState.boot\_time == 0) {
currentState.interval = 5000UL;
} else {
currentState.boot\_time--;
if (currentState.boot\_time == 0) {
currentState.boot\_error = true;
Blynk.email(email, "{DEVICE\_NAME} : Alert", String(device\_name) + " could not be turned on!");
}
}

if (Ping.ping(device\_ip, 1)) {
currentState.IsOnline = true;
currentState.boot\_error = false;
currentState.boot\_time = 0;
currentState.ping = Ping.averageTime();
} else {
currentState.IsOnline = false;
currentState.ping = 0;
}
}

Blynk.run();
}

// Generate magic packet
void buildMagicPacket() {
memset(magicPacket, 0xFF, 6);
for (int i = 0; i < 16; i++) { int ofs = i \* sizeof(macAddr) + 6; memcpy(&magicPacket\[ofs\], macAddr, sizeof(macAddr)); } } //BLYNK\_CONNECTED() { // Blynk.syncVirtual(BUTTON\_PIN); //} // BOOT PC button handler of application BLYNK\_WRITE(BUTTON\_PIN) { if (!currentState.IsOnline && currentState.boot\_time == 0) { BLYNK\_LOG("AppButtonWakeOnLan: value=%d", param.asInt()); udp.beginPacket(bcastAddr, PORT\_WAKEONLAN); udp.write(magicPacket, MAGIC\_PACKET\_LENGTH); udp.endPacket(); currentState.boot\_time = boot\_time; currentState.interval = 1000UL; } } BLYNK\_READ(STATE\_PIN) { Blynk.virtualWrite(RSSI\_PIN, WiFi.RSSI()); Blynk.virtualWrite(PING\_TIME\_PIN, currentState.ping); if (currentState.IsOnline) { Blynk.setProperty(STATE\_PIN, "color", BLYNK\_GREEN); Blynk.virtualWrite(STATE\_PIN, String(device\_name) + " is Online"); Blynk.setProperty(BUTTON\_PIN, "color", BLYNK\_DARK\_BLUE); Blynk.setProperty(BUTTON\_PIN, "offLabel", String(device\_name) + " running..."); Blynk.setProperty(BUTTON\_PIN, "onLabel", String(device\_name) + " running..."); } else if (!currentState.IsOnline && currentState.boot\_time > 0) {
Blynk.setProperty(STATE\_PIN, "color", BLYNK\_BLUE);
Blynk.virtualWrite(STATE\_PIN, "Waiting for ping...");

Blynk.setProperty(BUTTON\_PIN, "color", BLYNK\_YELLOW);
Blynk.setProperty(BUTTON\_PIN, "offLabel", currentState.boot\_time);
Blynk.setProperty(BUTTON\_PIN, "onLabel", "Waiting for ping...");
} else if (!currentState.IsOnline && currentState.boot\_time == 0 && currentState.boot\_error) {
Blynk.setProperty(STATE\_PIN, "color", BLYNK\_RED);
Blynk.virtualWrite(STATE\_PIN, "Oops! Something happened, Try It Again!");

Blynk.setProperty(BUTTON\_PIN, "color", BLYNK\_YELLOW);
Blynk.setProperty(BUTTON\_PIN, "offLabel", "Try It Again");
Blynk.setProperty(BUTTON\_PIN, "onLabel", "Magic Packet has been sent");
} else {
Blynk.setProperty(STATE\_PIN, "color", BLYNK\_RED);
Blynk.virtualWrite(STATE\_PIN, String(device\_name) + " is Offline");

Blynk.setProperty(BUTTON\_PIN, "color", BLYNK\_BLUE);
Blynk.setProperty(BUTTON\_PIN, "offLabel", "Turn On");
Blynk.setProperty(BUTTON\_PIN, "onLabel", "Magic Packet has been sent");
}
}
```

# Blynk

![TIM20200124142924.jpg](https://image.krunk.cn/images/2020/01/24/TIM20200124142924.md.jpg) ![](https://camo.githubusercontent.com/51545377e6fb634a2db39a6f43c8f83f7cafd31c/68747470733a2f2f7777772e656d7369742e736b2f536861726564436f6e74656e742f4769744875622f455350383236365f426c796e6b5f574f4c5f5365727665722f325f7468756d626e61696c2e706e67)  

[via](https://github.com/Pnoxi/ESP8266_Blynk_WOL_Server)
