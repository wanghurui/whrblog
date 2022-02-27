---
title: DIY Arduino 入射式测光表
tags:
  - IT
  - 折腾
  - 摄影
id: '1657'
categories:
  - - uncategorized
date: 2020-11-23 19:24:46
---

> A Lightmeter/Flashmeter for photographers, based on Arduino. Components: 
>* Arduino NANO v.3 
>* BH1750 light sensor 
>* SSD1306 128\*96 OLED SPI Display 
>* Buttons   
>
>Thanks [@morozgrafix](https://github.com/morozgrafix) for creating schematic diagram for this device. The lightmeter based on Arduino as a main controller and BH1750 as a metering cell.   
> 
> Information is displayed on SSD1306 OLED display. The device is powered by 2 AAA batteries. Functions list:
> *   Ambient light metering
>*   Flash light metering
>*   ND filter correction
>*   Aperture priority
>*   Shutter speed priority
>*   ISO range 8 - 4 000 000
>*   Aperture range 1.0 - 3251
>*   Shutter speed range 1/10000 - 133 sec
>*   ND Filter range ND2 - ND8192
>*   Displaying amount of light in Lux.
>*   Displaying exposure value, EV
>*   Recalculating exposure pair while one of the parameter changing
>*   Battery information
>*   Power 2xAAA LR03 batteries

> Detailed information on my site: [https://www.pominchuk.com/lightmeter/](https://www.pominchuk.com/lightmeter/)

![](https://s2.loli.net/2022/02/03/s6LuUXAYDWKbwnT.jpg)
---
<!-- more -->

DIY测光表测光模式相当于相机内中央平均测光。在大多数拍摄情况下中央平均测光是一种非常实用的测光模式，在拍摄人像旅游照等对于中央亮度起到决定性作用的拍摄场景时，应用广泛。


# 所需元件

    1.  Arduino nano
    2.  BH1750光强度模块
    3.  0.96寸 7针SPI接口oled屏幕（SSD1306）

![](https://s2.loli.net/2022/02/03/25gABb6LoY4qKQu.jpg)
# 源码&&焊接
```
#include <SPI.h>
#include <Wire.h>
#include <Adafruit\_GFX.h>
#include <Adafruit\_SSD1306.h>
#include <BH1750.h>
#include <EEPROM.h>
#include <avr/sleep.h>
#define SCREEN\_WIDTH 128 // OLED display width, in pixels
#define SCREEN\_HEIGHT 64 // OLED display height, in pixels

// Declaration for SSD1306 display connected using software SPI (default case):
#define OLED\_DC                 11
#define OLED\_CS                 12
#define OLED\_CLK                8 //10
#define OLED\_MOSI               9 //9
#define OLED\_RESET              10 //13
Adafruit\_SSD1306 display(SCREEN\_WIDTH, SCREEN\_HEIGHT,
  OLED\_MOSI, OLED\_CLK, OLED\_DC, OLED\_RESET, OLED\_CS);

BH1750 lightMeter;

#define DomeMultiplier          2.17                    // Multiplier when using a white translucid Dome covering the lightmeter
#define MeteringButtonPin       2                       // Metering button pin
#define PlusButtonPin           3                       // Plus button pin
#define MinusButtonPin          4                       // Minus button pin
#define ModeButtonPin           5                       // Mode button pin
#define MenuButtonPin           6                       // ISO button pin
#define MeteringModeButtonPin   7                       // Metering Mode (Ambient / Flash)
//#define PowerButtonPin          2

#define MaxISOIndex             57
#define MaxApertureIndex        70
#define MaxTimeIndex            80
#define MaxNDIndex              13
#define MaxFlashMeteringTime    5000                    // ms

float   lux;
boolean Overflow = 0;                                   // Sensor got Saturated and Display "Overflow"
float   ISOND;
boolean ISOmode = 0;
boolean NDmode = 0;

boolean PlusButtonState;                // "+" button state
boolean MinusButtonState;               // "-" button state
boolean MeteringButtonState;            // Metering button state
boolean ModeButtonState;                // Mode button state
boolean MenuButtonState;                // ISO button state
boolean MeteringModeButtonState;        // Metering mode button state (Ambient / Flash)

boolean ISOMenu = false;
boolean NDMenu = false;
boolean mainScreen = false;

// EEPROM for memory recording
#define ISOIndexAddr        1
#define apertureIndexAddr   2
#define modeIndexAddr       3
#define T\_expIndexAddr      4
#define meteringModeAddr    5
#define ndIndexAddr         6

#define defaultApertureIndex 12
#define defaultISOIndex      11
#define defaultModeIndex     0
#define defaultT\_expIndex    19

uint8\_t ISOIndex =          EEPROM.read(ISOIndexAddr);
uint8\_t apertureIndex =     EEPROM.read(apertureIndexAddr);
uint8\_t T\_expIndex =        EEPROM.read(T\_expIndexAddr);
uint8\_t modeIndex =         EEPROM.read(modeIndexAddr);
uint8\_t meteringMode =      EEPROM.read(meteringModeAddr);
uint8\_t ndIndex =           EEPROM.read(ndIndexAddr);

int battVolts;
#define batteryInterval 10000
double lastBatteryTime = 0;

#include "lightmeter.h"

void setup() {  
  pinMode(PlusButtonPin, INPUT\_PULLUP);
  pinMode(MinusButtonPin, INPUT\_PULLUP);
  pinMode(MeteringButtonPin, INPUT\_PULLUP);
  pinMode(ModeButtonPin, INPUT\_PULLUP);
  pinMode(MenuButtonPin, INPUT\_PULLUP);
  pinMode(MeteringModeButtonPin, INPUT\_PULLUP);

  //Serial.begin(115200);

  battVolts = getBandgap();  //Determins what actual Vcc is, (X 100), based on known bandgap voltage

  Wire.begin();
  lightMeter.begin(BH1750::ONE\_TIME\_HIGH\_RES\_MODE\_2);
  //lightMeter.begin(BH1750::ONE\_TIME\_LOW\_RES\_MODE); // for low resolution but 16ms light measurement time.

  display.begin(SSD1306\_SWITCHCAPVCC, 0x3D);
  display.setTextColor(WHITE);
  display.clearDisplay();

  // IF NO MEMORY WAS RECORDED BEFORE, START WITH THIS VALUES otherwise it will read "255"
  if (apertureIndex > MaxApertureIndex) {
    apertureIndex = defaultApertureIndex;
  }

  if (ISOIndex > MaxISOIndex) {
    ISOIndex = defaultISOIndex;
  }

  if (T\_expIndex > MaxTimeIndex) {
    T\_expIndex = defaultT\_expIndex;
  }

  if (modeIndex < 0  modeIndex > 1) {
    // Aperture priority. Calculating shutter speed.
    modeIndex = 0;
  }

  if (meteringMode > 1) {
    meteringMode = 0;
  }

  if (ndIndex > MaxNDIndex) {
    ndIndex = 0;
  }

  lux = getLux();
  refresh();
}

void loop() {  
  if (millis() >= lastBatteryTime + batteryInterval) {
    lastBatteryTime = millis();
    battVolts = getBandgap();
  }
  
  readButtons();

  menu();

  if (MeteringButtonState == 0) {
    // Save setting if Metering button pressed.
    SaveSettings();

    lux = 0;
    refresh();
    
    if (meteringMode == 0) {
      // Ambient light meter mode.
      lightMeter.configure(BH1750::ONE\_TIME\_HIGH\_RES\_MODE\_2);

      lux = getLux();

      if (Overflow == 1) {
        delay(10);
        getLux();
      }

      refresh();
      delay(200);
    } else if (meteringMode == 1) {
      // Flash light metering
      lightMeter.configure(BH1750::CONTINUOUS\_LOW\_RES\_MODE);

      unsigned long startTime = millis();
      uint16\_t currentLux = 0;
      lux = 0;

      while (true) {
        // check max flash metering time
        if (startTime + MaxFlashMeteringTime < millis()) { break; } currentLux = getLux(); delay(16); if (currentLux > lux) {
          lux = currentLux;
        }
      }

      refresh();
    }
  }
}
```

## 运行库

- Adafruit_Circuit_Playground
- Adafruit_Sensor
- Adafruit_SSD1306
- Adafruit-GFX-Library
- BH1750

2020.11.23

# 立个flag 2022-02-03
- [ ] 重新设计PCB
