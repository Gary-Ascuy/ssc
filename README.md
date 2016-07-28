# Serial Servo Controller (SSC)

The main objective of this repository (module), it is compile and have in only one place all the imformation required to use a SSC from computer, like design, software and other kind of things. also the propouse it's have code to manage servos.

## TODO - High level commands configuration
```
# Example
const robot = new Robot("commands.yaml");
robot.do('move-arm');
robot.do('stand-up');

## When commands.yaml is
defaults:
  time: 0
commands:
  move-arm: sequence of actions ... to-be-define maybe same to key-frames.json
  stand-up: sequence of actions ...
  ...

# yep, you can configure with a file a robot and this provides high level commands
```
## Draft - Video Tutorial

https://www.youtube.com/watch?v=YV9r7CbM9Zc

## CP210x USB to UART Bridge Virtual COM Port (VCP) Drivers
Install this is required to have a way to control the SSC from computer
https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx

## How Can I use this?

### Install
```
$ npm i --global serial-servo-control
```

### Show available devices (Serial Ports)
```
$ ssc devices
```

### Show available examples
```
$ ssc list
```

### Execute examples
```
$ ssc run open
$ ssc run interactive
$ ssc run sequence --input key-frames.json # JSON OR YAML files
```

```
# Sequence YAML File Example
# First executes pin "0" to pwm "500", after "2000" milliseconds from start
# Second executes pin "0" to pwm "2500" and pin "1" to pwd "500",
# after "4000" milliseconds from previus step
---
  defaults:
    time: 2000
  keyframes:
    -
      time: 2000
      actions:
        0: 500
    -
      time: 4000
      actions:
        0: 2500
        1: 500
```

## Diagram
![Serial Servo Controller](https://raw.githubusercontent.com/Gary-Ascuy/ssc/master/assets/ssc-components.png)

## Robots that use SSC

### Robo-Soul CR-6 Hexapod Robtics Six-legged 18DOF Spider Robot [aliexpress](http://es.aliexpress.com/item/Robo-Soul-CR-6-Hexapod-Robtics-Six-legged-18DOF-Spider-Robot-Kit-w-32CH-Controller-Digital/32244938744.html?spm=2114.10010108.1000013.8.4EXno8&scm=1007.13339.33133.0&pvid=cc30f5d0-fdc2-49d0-a313-199c5ceddaba&tpp=0)

![Hexapod](http://g03.a.alicdn.com/kf/HTB1xkDEHVXXXXaYXpXXq6xXFXXXY/Robo-Soul-CR-6-Hexapod-Robtics-Six-legged-18DOF-Spider-Robot-Kit-w-32CH-Controller-Digital.jpg)

### 18DOF Aluminium Hexapod Spider 6Legs Robot Kit w/MG996R Servos [ebay](http://www.ebay.com/itm/18DOF-Aluminium-Hexapod-Spider-6Legs-Robot-Kit-w-MG996R-Servos-32CH-Controller-/281584338794?hash=item418fbc076a:g:c~4AAOSwstxU6-tK)

![Hexapod Spider](http://i.ebayimg.com/images/g/c~4AAOSwstxU6-tK/s-l500.jpg)

### 9DOF LTR-4 Turtle Robot Four Feet Frame Kits + LD-2015 Servo [aliexpress](http://es.aliexpress.com/item/9DOF-LTR-4-Turtle-Robot-Four-Feet-Frame-Kits-LD-2015-Servo-32Bits-Control-Board-PS2/32375525968.html?spm=2114.01010208.3.145.KMCkNQ&ws_ab_test=searchweb201556_0,searchweb201602_2_10049_10017_405_404_407_406_10040,searchweb201603_8&btsid=3a725e80-9459-47a3-bf68-b48af010b022)

![Turtle](http://g03.a.alicdn.com/kf/HTB1AurPLFXXXXcBXXXXq6xXFXXXF/9DOF-LTR-4-Turtle-Robot-Four-Feet-Frame-Kits-LD-2015-Servo-32Bits-Control-Board-PS.jpg)

### 6DOF Aluminium Clamp Claw Mount kit Mechanical Robotic Arm+Servo [ebay](http://www.ebay.com/itm/6DOF-Aluminium-Clamp-Claw-Mount-kit-Mechanical-Robotic-Arm-Servo-32CH-Controller/251888871234?_trksid=p2047675.c100623.m-1&_trkparms=aid%3D222007%26algo%3DSIC.MBE%26ao%3D1%26asc%3D20160323102634%26meid%3D3515c5b5131f473ab44b54d04418212a%26pid%3D100623%26rk%3D3%26rkt%3D6%26sd%3D281584338794)

![Arm](http://i.ebayimg.com/images/g/lPsAAOSw5ZBWGIax/s-l300.jpg)

## Contributions
Help me !!! we can create a great module. email me to sync (gary.ascuy@gmail.com) and let's do it, we can have a good module working together T^T)9

![We want you for this Project](https://cdn.meme.am/instances/400x/64337504.jpg)
