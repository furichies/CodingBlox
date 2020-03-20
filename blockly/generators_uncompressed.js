'use strict';

Blockly.Arduino = new Blockly.Generator("Arduino");
Blockly.Arduino.addReservedWords("setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts,Servo,servo,keypad,Keypad,serial,Serial,Serial1, Serial2, Serial3,HardwareSerial,irremote,lcd,Lcd,stepper,Stepper,SoftwareSerial,bt_serial,fnc_bt_serial_namepin,LiquidCrystal_I2C,encoder,rtc,bt_serial,gps,gps_serial,fnc_gps_update,gps_lat,gps_lon,gps_speed_kmph,gps_speed_mph,gps_altitude,gps_course,gps_fixed,gps_day,gps_month,gps_year,gps_hour,gps_min,gps_sec,gps_hund,sd_file,fnc_sd_print,fnc_sd_filesize,fnc_sd_readbyte,fnc_sd_writebyte,fnc_EEPROM_readDouble,fnc_EEPROM_writeDouble,keypad_3x4_keys,keypad_3x4_rp,keypad_3x4_cp,keypad_3x4,fnc_adxl335,mqtt_mac,mqtt_broker,mqtt_port,mqtt_clientid,mqtt_user,mqtt_pass,mqtt_state,mqtt_payload,mqtt_ipclient,mqtt_client,mqtt_payload2double,mqtt_loop,mqtt_callback,mqtt_subscribe,mqtt_publish,mqtt_payload2string,pi,PI,Pi,pI,neo_pixel,lcd_customchar_,mfrc522,fnc_rfid_readID,l298n,l298n_,l298n_in1,l298_in2,l298n_in3,l298n_in4,l298n_ena,l298n_enb,button_debounced,button,Button,ir_rx,ir_tx,otto,robot_otto,Otto,AFMotor,AF_Stepper,AF_DCMotor,motorshield,fnc_dynamic_analogWrite,fnc_dynamic_analogRead,fnc_dynamic_digitalRead,fnc_dynamic_digitalWrite,_3dbot,fnc_3dbot_move,fnc_3dbot_motor,_3dbot_encoder,fnc_3dbot_distance,fnc_3dbot_ntc,nunchuk,ledmatrix,adxl345,fnc_adxl345,l298p,l298p_en1,l298p_en2,l298p_m1,l298p_m2,fnc_pm25,fnc_tcs34725_capturecolor,fnc_tcs34725_iscolor,tcs34725,Adafruit_TCS34725,tcs34725_r,tcs34725_g,tcs34725_b,tcs34725_clear,tcs34725_h,tcs34725_s,tcs34725_v,time_timer,fnc_interruptHandler,attachInterrupt,digitalPinToInterrupt,oscillator,pzem,pcf8574,bmp180,ds18b20,ina219,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15,d16,time_snooze_sleeping,fnc_snooze,fnc_snooze_wakeup,fnc_snooze_sleep,rtc_time_text,rtc_date_text,rtcbuffer,mp3_player,paj7620,ccs811");
Blockly.Arduino.ORDER_ATOMIC = 0;
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3;
Blockly.Arduino.ORDER_ADDITIVE = 4;
Blockly.Arduino.ORDER_SHIFT = 5;
Blockly.Arduino.ORDER_RELATIONAL = 6;
Blockly.Arduino.ORDER_EQUALITY = 7;
Blockly.Arduino.ORDER_BITWISE_AND = 8;
Blockly.Arduino.ORDER_BITWISE_XOR = 9;
Blockly.Arduino.ORDER_BITWISE_OR = 10;
Blockly.Arduino.ORDER_LOGICAL_AND = 11;
Blockly.Arduino.ORDER_LOGICAL_OR = 12;
Blockly.Arduino.ORDER_CONDITIONAL = 13;
Blockly.Arduino.ORDER_ASSIGNMENT = 14;
Blockly.Arduino.ORDER_NONE = 99;
var profile = {
    wemos_d1: {
        description: "WeMos D1 / Mini",
        micro: "esp8266",
        digital: [
            ["D0", "16"],
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        rxtx: [
            ["D0", "16"],
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        PWM: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        analog: [
            ["A0", "A0"]
        ],
        ir_rx: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3",
                "0"
            ],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"]
        ],
        ir_tx: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"]
        ],
        encoder_clk: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"]
        ],
        encoder_dt: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"]
        ],
        spi_mosi: [
            ["D7", "13"]
        ],
        spi_miso: [
            ["D6", "12"]
        ],
        spi_clk: [
            ["D5", "14"]
        ],
        sd_cs: [
            ["D8", "15"]
        ],
        picture: "media/WeMosD1.jpg",
        miniPicture: "media/WeMosD1_mini.jpg",
        serial: 9600,
        logic_levels: [
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ],
        ids: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ],
        sensor_range: [
            ["%", "PERCENT"],
            ["0..1023", "RAW"]
        ],
        intPins: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        setupCode: [""],
        loopCode: ["\tyield();\n"]
    },
    nodemcu: {
        description: "NodeMCU",
        micro: "esp8266",
        digital: [
            ["D0", "16"],
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        rxtx: [
            ["D0",
                "16"
            ],
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        PWM: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        analog: [
            ["A0", "A0"]
        ],
        ir_rx: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        ir_tx: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        encoder_clk: [
            ["D1",
                "5"
            ],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        encoder_dt: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        spi_mosi: [
            ["D7", "13"]
        ],
        spi_miso: [
            ["D6", "12"]
        ],
        spi_clk: [
            ["D5", "14"]
        ],
        sd_cs: [
            ["D8", "15"]
        ],
        picture: "media/NodeMCU.jpg",
        miniPicture: "media/ModeMCU_mini.jpg",
        serial: 9600,
        logic_levels: [
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ],
        ids: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ],
        sensor_range: [
            ["%",
                "PERCENT"
            ],
            ["0..1023", "RAW"]
        ],
        intPins: [
            ["D1", "5"],
            ["D2", "4"],
            ["D3", "0"],
            ["D4", "2"],
            ["D5", "14"],
            ["D6", "12"],
            ["D7", "13"],
            ["D8", "15"],
            ["RX", "3"],
            ["TX", "1"]
        ],
        setupCode: [""],
        loopCode: ["\tyield();\n"]
    },
    arduino_promicro: {
        description: "Arduino Pro Micro",
        micro: "atmelavr",
        digital: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6",
                "A6"
            ],
            ["A7", "A7"]
        ],
        rxtx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"]
        ],
        PWM: [
            ["3", "3"],
            ["5", "5"],
            ["6", "6"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"]
        ],
        analog: [
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"]
        ],
        ir_rx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"]
        ],
        ir_tx: [
            ["3", "3"]
        ],
        encoder_clk: [
            ["2", "2"]
        ],
        encoder_dt: [
            ["3", "3"]
        ],
        spi_mosi: [
            ["11", "11"]
        ],
        spi_miso: [
            ["12", "12"]
        ],
        spi_clk: [
            ["13", "13"]
        ],
        sd_cs: [
            ["10", "10"]
        ],
        picture: "media/Arduino-Nano-Pinout.jpg",
        miniPicture: "media/Arduino-Nano-Pinout-mini.jpg",
        serial: 9600,
        logic_levels: [
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ],
        ids: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ],
        sensor_range: [
            ["%", "PERCENT"],
            ["0..1023", "RAW"]
        ],
        intPins: [
            ["2", "2"],
            ["3", "3"]
        ],
        setupCode: [""],
        loopCode: [""]
    },
    arduino_leonardo: {
        description: "Arduino Leonardo",
        micro: "atmelavr",
        digital: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"]
        ],
        rxtx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"]
        ],
        PWM: [
            ["3", "3"],
            ["5", "5"],
            ["6", "6"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"]
        ],
        analog: [
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"]
        ],
        ir_rx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"]
        ],
        ir_tx: [
            ["3", "3"]
        ],
        encoder_clk: [
            ["2", "2"]
        ],
        encoder_dt: [
            ["3", "3"]
        ],
        spi_mosi: [
            ["11", "11"]
        ],
        spi_miso: [
            ["12", "12"]
        ],
        spi_clk: [
            ["13", "13"]
        ],
        sd_cs: [
            ["4", "4"]
        ],
        picture: "media/Arduino-Uno-Pinout.jpg",
        miniPicture: "media/Arduino-Uno-Pinout-mini.jpg",
        serial: 9600,
        logic_levels: [
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ],
        ids: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ],
        sensor_range: [
            ["%", "PERCENT"],
            ["0..1023", "RAW"]
        ],
        intPins: [
            ["2", "2"],
            ["3", "3"]
        ],
        setupCode: [""],
        loopCode: [""]
    },
    arduino_uno: {
        description: "Arduino Uno",
        micro: "atmelavr",
        digital: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"]
        ],
        rxtx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4",
                "4"
            ],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"]
        ],
        PWM: [
            ["3", "3"],
            ["5", "5"],
            ["6", "6"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"]
        ],
        analog: [
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"]
        ],
        ir_rx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"]
        ],
        ir_tx: [
            ["3", "3"]
        ],
        encoder_clk: [
            ["2",
                "2"
            ]
        ],
        encoder_dt: [
            ["3", "3"]
        ],
        spi_mosi: [
            ["11", "11"]
        ],
        spi_miso: [
            ["12", "12"]
        ],
        spi_clk: [
            ["13", "13"]
        ],
        sd_cs: [
            ["4", "4"]
        ],
        picture: "media/Arduino-Uno-Pinout.jpg",
        miniPicture: "media/Arduino-Uno-Pinout-mini.jpg",
        serial: 9600,
        logic_levels: [
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ],
        ids: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ],
        sensor_range: [
            ["%", "PERCENT"],
            ["0..1023", "RAW"]
        ],
        intPins: [
            ["2", "2"],
            ["3", "3"]
        ],
        setupCode: [""],
        loopCode: [""]
    },
    arduino_uno_easyplug: {
        description: "Arduino Uno",
        micro: "atmelavr",
        digital: [
            ["D5", "5"],
            ["D6",
                "6"
            ],
            ["D7", "7"],
            ["D8", "8"],
            ["D9", "9"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"]
        ],
        rxtx: [
            ["COM-RX", "0"],
            ["COM-TX", "1"],
            ["D3", "3"],
            ["D4", "4"]
        ],
        PWM: [
            ["D5", "5"],
            ["D6", "6"],
            ["D9", "9"]
        ],
        analog: [
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"]
        ],
        analog2: [
            ["A6", "A6"],
            ["A7", "A7"]
        ],
        ir_rx: [
            ["D5", "5"],
            ["D6", "6"],
            ["D7", "7"],
            ["D8", "8"],
            ["D9", "9"]
        ],
        ir_tx: [
            ["D3", "3"]
        ],
        encoder_clk: [
            ["D2", "2"]
        ],
        encoder_dt: [
            ["D3", "3"]
        ],
        spi_mosi: [
            ["D11", "11"]
        ],
        spi_miso: [
            ["D12", "12"]
        ],
        spi_clk: [
            ["D13", "13"]
        ],
        sd_cs: [
            ["D4", "4"]
        ],
        picture: "media/easyplug.jpg",
        miniPicture: "media/easyplug_icon.jpg",
        serial: 9600,
        logic_levels: [
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ],
        ids: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ],
        sensor_range: [
            ["%", "PERCENT"],
            ["0..1023", "RAW"]
        ],
        intPins: [
            ["2", "2"],
            ["3", "3"]
        ],
        setupCode: [""],
        loopCode: [""]
    },
    arduino_uno_keybot: {
        description: "Arduino Uno",
        micro: "atmelavr",
        digital: [
            ["D3", "3"],
            ["D8", "8"],
            ["D9", "9"],
            ["D10", "10"],
            ["D11", "11"],
            ["D12", "12"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"]
        ],
        rxtx: [
            ["COM-RX", "0"],
            ["COM-TX", "1"],
            ["D3", "3"],
            ["D4", "4"]
        ],
        PWM: [
            ["D9",
                "9"
            ]
        ],
        analog: [
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"]
        ],
        ir_rx: [
            ["D11", "11"]
        ],
        ir_tx: [
            ["D3", "3"]
        ],
        encoder_clk: [
            ["D2", "2"]
        ],
        encoder_dt: [
            ["D3", "3"]
        ],
        spi_mosi: [
            ["D11", "11"]
        ],
        spi_miso: [
            ["D12", "12"]
        ],
        spi_clk: [
            ["D13", "13"]
        ],
        sd_cs: [
            ["D4", "4"]
        ],
        picture: "media/keybot.jpg",
        miniPicture: "media/keybot_icon.jpg",
        serial: 9600,
        logic_levels: [
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ],
        ids: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ],
        sensor_range: [
            ["%", "PERCENT"],
            ["0..1023", "RAW"]
        ],
        intPins: [
            ["2", "2"],
            ["3", "3"]
        ],
        setupCode: [""],
        loopCode: [""]
    },
    arduino_nano: {
        description: "Arduino Nano",
        micro: "atmelavr",
        digital: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"]
        ],
        rxtx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"]
        ],
        PWM: [
            ["3", "3"],
            ["5", "5"],
            ["6", "6"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"]
        ],
        analog: [
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"]
        ],
        ir_rx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"]
        ],
        ir_tx: [
            ["3", "3"]
        ],
        encoder_clk: [
            ["2", "2"]
        ],
        encoder_dt: [
            ["3", "3"]
        ],
        spi_mosi: [
            ["11", "11"]
        ],
        spi_miso: [
            ["12",
                "12"
            ]
        ],
        spi_clk: [
            ["13", "13"]
        ],
        sd_cs: [
            ["10", "10"]
        ],
        picture: "media/Arduino-Nano-Pinout.jpg",
        miniPicture: "media/Arduino-Nano-Pinout-mini.jpg",
        serial: 9600,
        logic_levels: [
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ],
        ids: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ],
        sensor_range: [
            ["%", "PERCENT"],
            ["0..1023", "RAW"]
        ],
        intPins: [
            ["2", "2"],
            ["3", "3"]
        ],
        setupCode: [""],
        loopCode: [""]
    },
    arduino_mega: {
        description: "Arduino Mega",
        micro: "atmelavr",
        digital: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["14-TX(3)", "14"],
            ["15-RX(3)", "15"],
            ["16-TX(2)", "16"],
            ["17-RX(2)", "17"],
            ["18-TX(1)", "18"],
            ["19-RX(1)", "19"],
            ["20", "20"],
            ["21", "21"],
            ["22", "22"],
            ["23", "23"],
            ["24", "24"],
            ["25", "25"],
            ["26", "26"],
            ["27", "27"],
            ["28", "28"],
            ["29", "29"],
            ["30", "30"],
            ["31", "31"],
            ["32", "32"],
            ["33", "33"],
            ["34", "34"],
            ["35", "35"],
            ["36", "36"],
            ["37", "37"],
            ["38", "38"],
            ["39", "39"],
            ["40", "40"],
            ["41", "41"],
            ["42", "42"],
            ["43", "43"],
            ["44", "44"],
            ["45", "45"],
            ["46", "46"],
            ["47",
                "47"
            ],
            ["48", "48"],
            ["49", "49"],
            ["50", "50"],
            ["51", "51"],
            ["52", "52"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"],
            ["A8", "A8"],
            ["A9", "A9"],
            ["A10", "A10"],
            ["A11", "A11"],
            ["A12", "A12"],
            ["A13", "A13"],
            ["A14", "A14"],
            ["A15", "A15"]
        ],
        rxtx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["14-TX(3)", "14"],
            ["15-RX(3)", "15"],
            ["16-TX(2)", "16"],
            ["17-RX(2)", "17"],
            ["18-TX(1)", "18"],
            ["19-RX(1)", "19"],
            ["50", "50"],
            ["51", "51"],
            ["52", "52"]
        ],
        PWM: [
            ["2",
                "2"
            ],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["44", "44"],
            ["45", "45"],
            ["46", "46"]
        ],
        analog: [
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"],
            ["A8", "A8"],
            ["A9", "A9"],
            ["A10", "A10"],
            ["A11", "A11"],
            ["A12", "A12"],
            ["A13", "A13"],
            ["A14", "A14"],
            ["A15", "A15"]
        ],
        ir_rx: [
            ["0-RX", "0"],
            ["1-TX", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11",
                "11"
            ],
            ["12", "12"],
            ["13", "13"],
            ["14-TX(3)", "14"],
            ["15-RX(3)", "15"],
            ["16-TX(2)", "16"],
            ["17-RX(2)", "17"],
            ["18-TX(1)", "18"],
            ["19-RX(1)", "19"],
            ["20", "20"],
            ["21", "21"],
            ["22", "22"],
            ["23", "23"],
            ["24", "24"],
            ["25", "25"],
            ["26", "26"],
            ["27", "27"],
            ["28", "28"],
            ["29", "29"],
            ["30", "30"],
            ["31", "31"],
            ["32", "32"],
            ["33", "33"],
            ["34", "34"],
            ["35", "35"],
            ["36", "36"],
            ["37", "37"],
            ["38", "38"],
            ["39", "39"],
            ["40", "40"],
            ["41", "41"],
            ["42", "42"],
            ["43", "43"],
            ["44", "44"],
            ["45", "45"],
            ["46", "46"],
            ["47", "47"],
            ["48", "48"],
            ["49", "49"],
            ["50",
                "50"
            ],
            ["51", "51"],
            ["52", "52"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"],
            ["A8", "A8"],
            ["A9", "A9"],
            ["A10", "A10"],
            ["A11", "A11"],
            ["A12", "A12"],
            ["A13", "A13"],
            ["A14", "A14"],
            ["A15", "A15"]
        ],
        ir_tx: [
            ["3", "3"]
        ],
        encoder_clk: [
            ["2", "2"]
        ],
        encoder_dt: [
            ["3", "3"]
        ],
        spi_mosi: [
            ["51", "51"]
        ],
        spi_miso: [
            ["50", "50"]
        ],
        spi_clk: [
            ["52", "52"]
        ],
        sd_cs: [
            ["4", "4"]
        ],
        picture: "media/Arduino-Mega-2560-Pinout.jpg",
        miniPicture: "media/Arduino-Mega-2560-Pinout-mini.jpg",
        serial: 9600,
        logic_levels: [
            ["ON",
                "HIGH"
            ],
            ["OFF", "LOW"]
        ],
        ids: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ],
        sensor_range: [
            ["%", "PERCENT"],
            ["0..1023", "RAW"]
        ],
        intPins: [
            ["2", "2"],
            ["3", "3"],
            ["18", "18"],
            ["19", "19"],
            ["20", "20"],
            ["21", "21"]
        ],
        setupCode: [""],
        loopCode: [""]
    }
};
profile["default"] = profile.arduino_uno;
Blockly.Arduino.init = function(a) {
    Blockly.gencode_allowed_blocks = ["control_arduino_setup", "control_arduino_loop", "procedures_defnoreturn", "procedures_defreturn", "io_interrupt"];
    Blockly.Arduino.neopixel_count = 0;
    Blockly.Arduino.ledmatrix_count = 0;
    Blockly.Arduino.oled_count = 0;
    Blockly.Arduino.definitions_ = Object.create(null);
    Blockly.Arduino.definitions_fnc_ = Object.create(null);
    Blockly.Arduino.setups_ = Object.create(null);
    Blockly.Arduino.loops_ = Object.create(null);
    Blockly.Arduino.mqtt_sub_ = Object.create(null);
    Blockly.Arduino.functionNames_ = Object.create(null);
    if (Blockly.Variables) {
        Blockly.Arduino.variableDB_ ? (Blockly.Arduino.variableDB_.reset(), Blockly.Arduino.variableDB_Text_.reset(), Blockly.Arduino.variableDB_Bool_.reset()) : (Blockly.Arduino.variableDB_ = new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_), Blockly.Arduino.variableDB_Text_ = new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_), Blockly.Arduino.variableDB_Bool_ = new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_));
        for (var b = [], c = Blockly.Variables.allVariables(a),
                d = 0; d < c.length; d++) b[d] = "double " + Blockly.Arduino.variableDB_.getName(c[d], Blockly.Variables.NAME_TYPE) + ";";
        Blockly.Arduino.definitions_.variables = b.join("\n") + "\n";
        b = Blockly.Variables.allVariablesText(a);
        c = [];
        for (d = 0; d < b.length; d++) c[d] = "String s_" + Blockly.Arduino.variableDB_Text_.getName(b[d], Blockly.Variables.NAME_TYPE) + ";";
        Blockly.Arduino.definitions_.variables_text = c.join("\n") + "\n";
        a = Blockly.Variables.allVariablesBool(a);
        b = [];
        for (d = 0; d < a.length; d++) b[d] = "boolean b_" + Blockly.Arduino.variableDB_Bool_.getName(a[d],
            Blockly.Variables.NAME_TYPE) + ";";
        Blockly.Arduino.definitions_.variables_bool = b.join("\n") + "\n"
    }
};
Blockly.Arduino.finish = function(a) {
    for (var b = [], c = 0; c < profile["default"].loopCode.length; c++) "" != profile["default"].loopCode[c] && b.push(profile["default"].loopCode[c]);
    for (var d in Blockly.Arduino.loops_) c = Blockly.Arduino.loops_[d], b.push(c);
    a = "  " + a.replace(/\n/g, "\n  ");
    a = a.replace(/\n\s+$/, "\n");
    a = "void loop() \n{\n" + b.join("\n") + "\n" + a + "\n}";
    b = [];
    var f = [];
    for (d in Blockly.Arduino.definitions_) c = Blockly.Arduino.definitions_[d], c.match(/^#include/) ? b.push(c) : f.push(c);
    var e = [];
    for (d in Blockly.Arduino.definitions_fnc_) c =
        Blockly.Arduino.definitions_fnc_[d], e.push(c);
    var g = [];
    for (c = 0; c < profile["default"].setupCode.length; c++) "" != profile["default"].setupCode[c] && g.push(profile["default"].setupCode[c]);
    for (d in Blockly.Arduino.setups_) "arduino_setup" != d && g.push(Blockly.Arduino.setups_[d]);
    (d = Blockly.Arduino.setups_.arduino_setup) && g.push(d);
    return (b.join("\n") + "\n\n" + f.join("\n") + "\n\n" + e.join("\n") + "\n\nvoid setup() \n{\n  " + g.join("\n") + "\n}\n\n").replace(/\n\n+/g, "\n\n").replace(/\n*$/, "\n\n\n") + a
};
Blockly.Arduino.scrubNakedValue = function(a) {
    return a + ";\n"
};
Blockly.Arduino.quote_ = function(a) {
    a = a.replace(/\\/g, "\\\\").replace(/\n/g, "\\\n").replace(/'/g, "\\'");
    return '"' + a + '"'
};
Blockly.Arduino.scrub_ = function(a, b) {
    if (null === b) return "";
    var c = "";
    if (!a.outputConnection || !a.outputConnection.targetConnection) {
        var d = a.getCommentText();
        d && (c += Blockly.Arduino.prefixLines(d, "// ") + "\n");
        for (var f = 0; f < a.inputList.length; f++) a.inputList[f].type == Blockly.INPUT_VALUE && (d = a.inputList[f].connection.targetBlock()) && (d = Blockly.Arduino.allNestedComments(d)) && (c += Blockly.Arduino.prefixLines(d, "// "))
    }
    f = a.nextConnection && a.nextConnection.targetBlock();
    f = Blockly.Arduino.blockToCode(f);
    return c +
        b + f
};
Blockly.Arduino.pinDigitalValidator = function(a) {
    return 0 > profile.defaultBoard.digital.indexOf(a) ? null : a
};
Blockly.Arduino.pinGroveDigitalValidator = function(a) {
    var b = profile.defaultBoard.digital.indexOf(a);
    0 <= b && (b = parseInt(a) + 1, b = profile.defaultBoard.digital.indexOf(String(b)));
    return 0 > b ? null : a
};
Blockly.Arduino.pinPWMValidator = function(a) {
    return 0 > profile.defaultBoard.PWM.indexOf(a) ? null : a
};
Blockly.Arduino.pinAnalogValidator = function(a) {
    return 0 > profile.defaultBoard.analog.indexOf(a) ? null : a
};
Blockly.Arduino.pinGroveAnalogValidator = function(a) {
    var b = profile.defaultBoard.analog.indexOf(a);
    0 <= b && (b = "A" + (parseInt(a.slice(1, a.length)) + 1), b = profile.defaultBoard.analog.indexOf(String(b)));
    return 0 > b ? null : a
};
Blockly.Arduino.pinDualValidator = function(a) {
    var b = profile.defaultBoard.analog.indexOf(a),
        c = profile.defaultBoard.digital.indexOf(a);
    return 0 > b + c ? null : a
};
Blockly.Arduino.control = {};
Blockly.Arduino.control_arduino_loop = function() {
    return Blockly.Arduino.statementToCode(this, "DO")
};
Blockly.Arduino.control_group = function() {
    return Blockly.Arduino.statementToCode(this, "DO")
};
Blockly.Arduino.control_arduino_setup = function() {
    var a = Blockly.Arduino.statementToCode(this, "DO");
    a && (Blockly.Arduino.setups_.arduino_setup = a);
    return null
};
Blockly.Arduino.controls_for = function() {
    var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        b = Blockly.Arduino.valueToCode(this, "FROM", Blockly.Arduino.ORDER_ASSIGNMENT) || "0",
        c = Blockly.Arduino.valueToCode(this, "TO", Blockly.Arduino.ORDER_ASSIGNMENT) || "0",
        d = Blockly.Arduino.valueToCode(this, "BY", Blockly.Arduino.ORDER_ASSIGNMENT) || "0",
        f = Blockly.Arduino.statementToCode(this, "DO");
    Blockly.Arduino.INFINITE_LOOP_TRAP && (f = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        "'" + this.id + "'") + f);
    if (b.match(/^-?\d+(\.\d+)?$/) && c.match(/^-?\d+(\.\d+)?$/)) {
        var e = parseFloat(b) <= parseFloat(c);
        e = "for (" + a + " = " + b + "; " + a + (e ? " <= " : " >= ") + c + "; " + a + "=" + a + (e ? "+" : "-") + d + ") {\n" + f + "}\n"
    } else {
        e = "";
        var g = b;
        b.match(/^\w+$/) || b.match(/^-?\d+(\.\d+)?$/) || (g = Blockly.Arduino.variableDB_.getDistinctName(a + "_start", Blockly.Variables.NAME_TYPE), e += "int " + g + " = " + b + ";\n");
        b = c;
        c.match(/^\w+$/) || c.match(/^-?\d+(\.\d+)?$/) || (b = Blockly.Arduino.variableDB_.getDistinctName(a + "_end", Blockly.Variables.NAME_TYPE),
            e += "int " + b + " = " + c + ";\n");
        e += "for (" + a + " = " + g + ";\n    (" + g + " <= " + b + ") ? " + a + " <= " + b + " : " + a + " >= " + b + ";\n    " + a + " += (" + g + " <= " + b + ") ? +" + d + " : -" + d + ") {\n" + f + "}\n"
    }
    return e
};
Blockly.Arduino.controls_repeat_ext = function() {
    var a = Blockly.Arduino.valueToCode(this, "TIMES", Blockly.Arduino.ORDER_ASSIGNMENT) || "0",
        b = Blockly.Arduino.statementToCode(this, "DO");
    Blockly.Arduino.INFINITE_LOOP_TRAP && (b = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + this.id + "'") + b);
    var c = Blockly.Arduino.variableDB_.getName("count", Blockly.Variables.NAME_TYPE);
    return "for (int " + c + " = 0; " + c + " < " + a + "; " + c + "++) {\n" + b + "}\n"
};
Blockly.Arduino.controls_whileUntil = function() {
    var a = Blockly.Arduino.valueToCode(this, "BOOL", Blockly.Arduino.ORDER_NONE) || "false",
        b = Blockly.Arduino.statementToCode(this, "DO");
    Blockly.Arduino.INFINITE_LOOP_TRAP && (b = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + this.id + "'") + b);
    "UNTIL" == this.getTitleValue("MODE") && (a.match(/^\w+$/) || (a = "(" + a + ")"), a = "!" + a);
    return "while (" + a + ") {\n" + b + "}\n"
};
Blockly.Arduino.control_wait_whileUntil = function() {
    var a = Blockly.Arduino.valueToCode(this, "CONDITION", Blockly.Arduino.ORDER_ATOMIC) || "0";
    return "WHILE" == this.getFieldValue("MODE") ? "while(" + a + ");\n" : "while(!(" + a + "));\n"
};
Blockly.Arduino.lists = {};
Blockly.Arduino.lists_create_with = function() {
    this.getFieldValue("TYPE");
    for (var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE), b = this.itemCount_, c = Array(this.itemCount_), d = 0; d < this.itemCount_; d++) c[d] = Blockly.Arduino.valueToCode(this, "ADD" + d, Blockly.Arduino.ORDER_NONE) || "0";
    Blockly.Arduino.definitions_["var_ld_" + a] = "double ld_" + a + "[" + b + "]={" + c.join(", ") + "};\n";
    Blockly.Arduino.definitions_["var_ld_" + a + "_size"] = "int ld_" + a + "_size=" + b + ";\n";
    return ""
};
Blockly.Arduino.lists_getIndex = function() {
    var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        b = Blockly.Arduino.valueToCode(this, "AT", Blockly.Arduino.ORDER_ADDITIVE) || "0";
    b.match(/^\d+$/) && (b = parseInt(b, 10));
    return ["ld_" + a + "[(int)(" + b + ")]", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.lists_setIndex = function() {
    var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        b = Blockly.Arduino.valueToCode(this, "AT", Blockly.Arduino.ORDER_ADDITIVE) || "0",
        c = Blockly.Arduino.valueToCode(this, "TO", Blockly.Arduino.ORDER_ASSIGNMENT) || "0";
    b.match(/^\d+$/) && (b = parseInt(b, 10));
    return "ld_" + a + "[(int)(" + b + ")] = " + c + ";\n"
};
Blockly.Arduino.lists_length = function() {
    return ["ld_" + Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + "_size", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.lists_create_with_text = function() {
    this.getFieldValue("TYPE");
    for (var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE), b = this.itemCount_, c = Array(this.itemCount_), d = 0; d < this.itemCount_; d++) c[d] = Blockly.Arduino.valueToCode(this, "ADD" + d, Blockly.Arduino.ORDER_NONE) || 'String("")';
    Blockly.Arduino.definitions_["var_ls_" + a] = "String ls_" + a + "[" + b + "]={" + c.join(", ") + "};\n";
    Blockly.Arduino.definitions_["var_ls_" + a + "_size"] = "int ls_" + a + "_size=" + b + ";\n";
    return ""
};
Blockly.Arduino.lists_getIndex_text = function() {
    var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        b = Blockly.Arduino.valueToCode(this, "AT", Blockly.Arduino.ORDER_ADDITIVE) || "0";
    b.match(/^\d+$/) && (b = parseInt(b, 10));
    return ["ls_" + a + "[(int)(" + b + ")]", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.lists_setIndex_text = function() {
    var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        b = Blockly.Arduino.valueToCode(this, "AT", Blockly.Arduino.ORDER_ADDITIVE) || "0",
        c = Blockly.Arduino.valueToCode(this, "TO", Blockly.Arduino.ORDER_ASSIGNMENT) || "0";
    b.match(/^\d+$/) && (b = parseInt(b, 10));
    return "ls_" + a + "[(int)(" + b + ")] = " + c + ";\n"
};
Blockly.Arduino.lists_length_text = function() {
    return ["ls_" + Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + "_size", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.logic = {};
Blockly.Arduino.controls_if = function() {
    var a = 0,
        b = Blockly.Arduino.valueToCode(this, "IF" + a, Blockly.Arduino.ORDER_NONE) || "false",
        c = Blockly.Arduino.statementToCode(this, "DO" + a),
        d = "if (" + b + ") {\n" + c + "\n}";
    for (a = 1; a <= this.elseifCount_; a++) b = Blockly.Arduino.valueToCode(this, "IF" + a, Blockly.Arduino.ORDER_NONE) || "false", c = Blockly.Arduino.statementToCode(this, "DO" + a), d += " else if (" + b + ") {\n" + c + "}";
    this.elseCount_ && (c = Blockly.Arduino.statementToCode(this, "ELSE"), d += " else {\n" + c + "\n}");
    return d + "\n"
};
Blockly.Arduino.logic_compare = function() {
    var a = this.getFieldValue("OP");
    a = Blockly.Arduino.logic_compare.OPERATORS[a];
    var b = "==" == a || "!=" == a ? Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL,
        c = Blockly.Arduino.valueToCode(this, "A", b) || "0",
        d = Blockly.Arduino.valueToCode(this, "B", b) || "0";
    return ["(" + c + " " + a + " " + d + ")", b]
};
Blockly.Arduino.logic_compare.OPERATORS = {
    EQ: "==",
    NEQ: "!=",
    LT: "<",
    LTE: "<=",
    GT: ">",
    GTE: ">="
};
Blockly.Arduino.logic_compare_bool = function() {
    var a = this.getFieldValue("OP");
    a = Blockly.Arduino.logic_compare.OPERATORS[a];
    var b = "==" == a || "!=" == a ? Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL,
        c = Blockly.Arduino.valueToCode(this, "A", b) || "0",
        d = Blockly.Arduino.valueToCode(this, "B", b) || "0";
    return ["(" + c + " " + a + " " + d + ")", b]
};
Blockly.Arduino.logic_operation = function() {
    var a = "AND" == this.getFieldValue("OP") ? "&&" : "||",
        b = "&&" == a ? Blockly.Arduino.ORDER_LOGICAL_AND : Blockly.Arduino.ORDER_LOGICAL_OR,
        c = Blockly.Arduino.valueToCode(this, "A", b) || "false",
        d = Blockly.Arduino.valueToCode(this, "B", b) || "false";
    return ["(" + c + " " + a + " " + d + ")", b]
};
Blockly.Arduino.logic_negate = function() {
    var a = Blockly.Arduino.ORDER_UNARY_PREFIX;
    return ["(!" + (Blockly.Arduino.valueToCode(this, "BOOL", a) || "false") + ")", a]
};
Blockly.Arduino.logic_boolean = function() {
    return ["TRUE" == this.getFieldValue("BOOL") ? "true" : "false", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.logic_boolean2 = function() {
    return ["TRUE" == this.getFieldValue("BOOL") ? "true" : "false", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.math = {};
Blockly.Arduino.math_number = function() {
    var a = window.parseFloat(this.getFieldValue("NUM"));
    return [a, 0 > a ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.math_to_int = function() {
    var a = "(long)(" + (Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC) || "0") + ")";
    return [a, 0 > a ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.math_to_uint = function() {
    var a = "(unsigned long)(" + (Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC) || "0") + ")";
    return [a, 0 > a ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.math_angle = function() {
    var a = window.parseInt(this.getFieldValue("ANGLE"));
    return [a, 0 > a ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.math_atan2 = function() {
    var a = Blockly.Arduino.valueToCode(this, "NUM1", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "NUM2", Blockly.Arduino.ORDER_ATOMIC) || "0";
    return ["atan2(" + a + "," + b + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.math_arithmetic = function() {
    var a = this.getFieldValue("OP"),
        b = Blockly.Arduino.math_arithmetic.OPERATORS[a];
    a = b[0];
    b = b[1];
    var c = Blockly.Arduino.valueToCode(this, "A", b) || "0",
        d = Blockly.Arduino.valueToCode(this, "B", b) || "0";
    return a ? ["(" + c + a + d + ")", b] : ["pow(" + c + ", " + d + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.math_arithmetic.OPERATORS = {
    ADD: [" + ", Blockly.Arduino.ORDER_ADDITIVE],
    MINUS: [" - ", Blockly.Arduino.ORDER_ADDITIVE],
    MULTIPLY: [" * ", Blockly.Arduino.ORDER_MULTIPLICATIVE],
    DIVIDE: [" / ", Blockly.Arduino.ORDER_MULTIPLICATIVE],
    POWER: [null, Blockly.Arduino.ORDER_NONE]
};
Blockly.Arduino.math_single = function() {
    var a = this.getFieldValue("OP");
    if ("NEG" == a) {
        var b = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_UNARY_PREFIX) || "0";
        "-" == b[0] && (b = " " + b);
        return ["-" + b, Blockly.Arduino.ORDER_UNARY_PREFIX]
    }
    b = "ABS" == a || "ROUND" == a.substring(0, 5) ? Blockly.Arduino.valueToCode(block, "NUM", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "0" : "SIN" == a || "COS" == a || "TAN" == a || "ASIN" == a || "ACOS" == a || "ATAN" == a ? Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_MULTIPLICATIVE) || "0" :
        Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_NONE) || "0";
    switch (a) {
        case "ROOT":
            a = "sqrt(" + b + ")";
            break;
        case "LOG":
            a = "log(" + b + ")";
            break;
        case "LOG10":
            a = "log10(" + b + ")";
            break;
        case "ABS":
            a = "abs(" + b + ")";
            break;
        case "ROUND":
            a = "round(" + b + ")";
            break;
        case "ROUNDUP":
            a = "ceil(" + b + ")";
            break;
        case "ROUNDDOWN":
            a = "floor(" + b + ")";
            break;
        case "SIN":
            a = "sin(" + b + ")";
            break;
        case "COS":
            a = "cos(" + b + ")";
            break;
        case "TAN":
            a = "tan(" + b + ")";
            break;
        case "ASIN":
            a = "asin(" + b + ")";
            break;
        case "ACOS":
            a = "acos(" + b + ")";
            break;
        case "ATAN":
            a =
                "atan(" + b + ")";
            break;
        default:
            throw "Unknown math operator: " + a;
    }
    return a ? [a, Blockly.Arduino.ORDER_UNARY_POSTFIX] : [a, Blockly.Arduino.ORDER_MULTIPLICATIVE]
};
Blockly.Arduino.math_change = function() {
    var a = Blockly.Arduino.valueToCode(this, "DELTA", Blockly.Arduino.ORDER_ADDITIVE) || "0",
        b = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    return b + "=" + b + "+(" + a + ");\n"
};
Blockly.Arduino.math_round = Blockly.Arduino.math_single;
Blockly.Arduino.math_trig = Blockly.Arduino.math_single;
Blockly.Arduino.math_modulo = function() {
    var a = Blockly.Arduino.valueToCode(this, "DIVIDEND", Blockly.Arduino.ORDER_MULTIPLICATIVE) || "0",
        b = Blockly.Arduino.valueToCode(this, "DIVISOR", Blockly.Arduino.ORDER_MULTIPLICATIVE) || "0";
    return ["(((int)" + a + ") % ((int)" + b + "))", Blockly.Arduino.ORDER_MULTIPLICATIVE]
};
Blockly.Arduino.math_map = function() {
    var a = Blockly.Arduino.valueToCode(this, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "FROMLOW", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = Blockly.Arduino.valueToCode(this, "FROMHIGH", Blockly.Arduino.ORDER_ATOMIC) || "Infinity",
        d = Blockly.Arduino.valueToCode(this, "TOLOW", Blockly.Arduino.ORDER_ATOMIC) || "0",
        f = Blockly.Arduino.valueToCode(this, "TOHIGH", Blockly.Arduino.ORDER_ATOMIC) || "Infinity";
    return ["map(" + a + ", " + b + "," + c + "," + d + "," + f + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.math_constrain = function() {
    var a = Blockly.Arduino.valueToCode(this, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "LOW", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = Blockly.Arduino.valueToCode(this, "HIGH", Blockly.Arduino.ORDER_ATOMIC) || "Infinity";
    return ["constrain(" + a + ", " + b + "," + c + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.math_random_int = function() {
    Blockly.Arduino.setups_.setup_random = "randomSeed(analogRead(0));";
    var a = Blockly.Arduino.valueToCode(this, "FROM", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "TO", Blockly.Arduino.ORDER_ATOMIC) || "0";
    return [Blockly.Arduino.provideFunction_("math_random_int", ["double " + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ + "(int a,int b) {", "  if (a > b) {", "    int c = a;", "    a = b;", "    b = c;", "  }", "  return (double)random(a,b+1);", "}"]) +
        "(" + a + ", " + b + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX
    ]
};
Blockly.Arduino.procedures = {};
Blockly.Arduino.procedures_defreturn = function() {
    var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("NAME"), Blockly.Procedures.NAME_TYPE),
        b = Blockly.Arduino.statementToCode(this, "STACK");
    Blockly.Arduino.INFINITE_LOOP_TRAP && (b = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + this.id + "'") + b);
    var c = Blockly.Arduino.valueToCode(this, "RETURN", Blockly.Arduino.ORDER_NONE) || "";
    c && (c = "  return " + c + ";\n");
    for (var d = c ? "double" : "void", f = [], e = 0; e < this.arguments_.length; e++) f[e] = "double " + Blockly.Arduino.variableDB_.getName(this.arguments_[e],
        Blockly.Variables.NAME_TYPE);
    b = d + " " + a + "(" + f.join(", ") + ") {\n" + b + c + "}\n";
    b = Blockly.Arduino.scrub_(this, b);
    Blockly.Arduino.definitions_fnc_[a] = b;
    return null
};
Blockly.Arduino.procedures_defnoreturn = Blockly.Arduino.procedures_defreturn;
Blockly.Arduino.procedures_callreturn = function() {
    for (var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("NAME"), Blockly.Procedures.NAME_TYPE), b = [], c = 0; c < this.arguments_.length; c++) b[c] = Blockly.Arduino.valueToCode(this, "ARG" + c, Blockly.Arduino.ORDER_NONE) || "null";
    return [a + "(" + b.join(", ") + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.procedures_callnoreturn = function() {
    for (var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("NAME"), Blockly.Procedures.NAME_TYPE), b = [], c = 0; c < this.arguments_.length; c++) b[c] = Blockly.Arduino.valueToCode(this, "ARG" + c, Blockly.Arduino.ORDER_NONE) || "null";
    return a + "(" + b.join(", ") + ");\n"
};
Blockly.Arduino.texts = {};
Blockly.Arduino.text = function() {
    return ["String(" + Blockly.Arduino.quote_(this.getFieldValue("TEXT")) + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.text_format = function() {
    var a = this.getFieldValue("FORMAT");
    return ["String((long)" + (Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC) || "0") + "," + a + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.text_tonumber = function() {
    return ["String(" + (Blockly.Arduino.valueToCode(this, "TXT", Blockly.Arduino.ORDER_ATOMIC) || "") + ").toFloat()", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.text_format_decimal = function() {
    var a = this.getFieldValue("DECIMALS");
    return ["String(" + (Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC) || "0") + "," + a + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.text_join = function(a) {
    for (var b = "", c = 0; c < a.itemCount_; c++) {
        var d = Blockly.Arduino.valueToCode(a, "ADD" + c, Blockly.Arduino.ORDER_ATOMIC) || "";
        "" != d && ("" != b && (b += "+"), b = d.startsWith("String(") ? b + d : b + ("String(" + d + ")"))
    }
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.text_length = function(a) {
    return ["String(" + (Blockly.Arduino.valueToCode(a, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '""') + ").length()", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.text_compare = function(a) {
    var b = Blockly.Arduino.valueToCode(a, "TEXT1", Blockly.Arduino.ORDER_ATOMIC) || '""';
    a = Blockly.Arduino.valueToCode(a, "TEXT2", Blockly.Arduino.ORDER_ATOMIC) || '""';
    var c = this.getFieldValue("TYPE"),
        d = "";
    "equals" == c && (d = "String(" + b + ").equals(" + a + ")");
    "startswith" == c && (d = "String(" + b + ").startsWith(" + a + ")");
    "endswith" == c && (d = "String(" + b + ").endsWith(" + a + ")");
    return [d, Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.text_indexof = function(a) {
    var b = Blockly.Arduino.valueToCode(a, "TEXT1", Blockly.Arduino.ORDER_ATOMIC) || '""';
    a = Blockly.Arduino.valueToCode(a, "TEXT2", Blockly.Arduino.ORDER_ATOMIC) || '""';
    var c = this.getFieldValue("TYPE"),
        d = "";
    "indexof" == c && (d = "(String(" + b + ").indexOf(" + a + ")+1)");
    "lastindexof" == c && (d = "(String(" + b + ").lastIndexOf(" + a + ")+1)");
    return [d, Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.text_replace = function(a) {
    var b = this.getFieldValue("VARTEXT"),
        c = Blockly.Arduino.valueToCode(a, "TEXT2", Blockly.Arduino.ORDER_ATOMIC) || '""';
    a = Blockly.Arduino.valueToCode(a, "TEXT3", Blockly.Arduino.ORDER_ATOMIC) || '""';
    return "s_" + b + ".replace(" + c + "," + a + ");\n"
};
Blockly.Arduino.text_contains = function(a) {
    var b = Blockly.Arduino.valueToCode(a, "TEXT1", Blockly.Arduino.ORDER_ATOMIC) || '""';
    a = Blockly.Arduino.valueToCode(a, "TEXT2", Blockly.Arduino.ORDER_ATOMIC) || '""';
    return ["(String(" + b + ").indexOf(" + a + ")!=-1)", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.text_substring = function(a) {
    a = Blockly.Arduino.valueToCode(a, "TEXT1", Blockly.Arduino.ORDER_ATOMIC) || '""';
    var b = Blockly.Arduino.valueToCode(this, "START", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = Blockly.Arduino.valueToCode(this, "END", Blockly.Arduino.ORDER_ATOMIC) || "0";
    return ["String(" + a + ").substring((" + b + ")-1," + c + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX]
};
Blockly.Arduino.text_ascii = function(a) {
    return ["('" + this.getFieldValue("CHAR") + "')", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.variables = {};
Blockly.Arduino.variables_set = function() {
    var a = Blockly.Arduino.valueToCode(this, "VALUE", Blockly.Arduino.ORDER_ASSIGNMENT) || "0";
    return Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + " = " + a + ";\n"
};
Blockly.Arduino.variables_get = function() {
    return [Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE), Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.variables_set_text = function() {
    var a = Blockly.Arduino.valueToCode(this, "VALUE", Blockly.Arduino.ORDER_ASSIGNMENT) || '""';
    return "s_" + Blockly.Arduino.variableDB_Text_.getName(this.getFieldValue("VARTEXT"), Blockly.Variables.NAME_TYPE) + " = " + a + ";\n"
};
Blockly.Arduino.variables_get_text = function() {
    return ["s_" + Blockly.Arduino.variableDB_Text_.getName(this.getFieldValue("VARTEXT"), Blockly.Variables.NAME_TYPE), Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.variables_set_bool = function() {
    var a = Blockly.Arduino.valueToCode(this, "VALUE", Blockly.Arduino.ORDER_ASSIGNMENT) || "false";
    return "b_" + Blockly.Arduino.variableDB_Bool_.getName(this.getFieldValue("VARBOOL"), Blockly.Variables.NAME_TYPE) + " = " + a + ";\n"
};
Blockly.Arduino.variables_get_bool = function() {
    return ["b_" + Blockly.Arduino.variableDB_Bool_.getName(this.getFieldValue("VARBOOL"), Blockly.Variables.NAME_TYPE), Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_move = function() {
    var a = this.getFieldValue("MOV"),
        b = this.getFieldValue("SPEED");
    Blockly.Arduino.setups_.setup_output_7 = "pinMode(7, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_8 = "pinMode(8, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_9 = "pinMode(9, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_10 = "pinMode(10, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_12 = "pinMode(12, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_13 = "pinMode(13, OUTPUT);";
    Blockly.Arduino.definitions_fnc_.fnc_3dbot_move =
        "void fnc_3dbot_move(int _t, int _speed){\n\tswitch(_t){\n\t\tcase 0: //stop\n\t\t\tdigitalWrite(9, LOW);\n\t\t\tdigitalWrite(10, LOW);\n\t\t\tbreak;\n\t\tcase 1: //fw\n\t\t\tdigitalWrite(7, LOW);\n\t\t\tdigitalWrite(8, HIGH);\n\t\t\tdigitalWrite(12, LOW);\n\t\t\tdigitalWrite(13, HIGH);\n\t\t\tanalogWrite(9,_speed);\n\t\t\tanalogWrite(10,_speed);\n\t\t\tbreak;\n\t\tcase 2: //bw\n\t\t\tdigitalWrite(7, HIGH);\n\t\t\tdigitalWrite(8, LOW);\n\t\t\tdigitalWrite(12, HIGH);\n\t\t\tdigitalWrite(13, LOW);\n\t\t\tanalogWrite(9,_speed);\n\t\t\tanalogWrite(10,_speed);\n\t\t\tbreak;\n\t\tcase 3: //left\n\t\t\tdigitalWrite(7, LOW);\n\t\t\tdigitalWrite(8, HIGH);\n\t\t\tdigitalWrite(12, LOW);\n\t\t\tdigitalWrite(13, HIGH);\n\t\t\tanalogWrite(9,0);\n\t\t\tanalogWrite(10,_speed);\n\t\t\tbreak;\n\t\tcase 4: //right\n\t\t\tdigitalWrite(7, LOW);\n\t\t\tdigitalWrite(8, HIGH);\n\t\t\tdigitalWrite(12, LOW);\n\t\t\tdigitalWrite(13, HIGH);\n\t\t\tanalogWrite(9,_speed);\n\t\t\tanalogWrite(10,0);\n\t\t\tbreak;\n\t\tcase 5: //rotate left\n\t\t\tdigitalWrite(7, HIGH);\n\t\t\tdigitalWrite(8, LOW);\n\t\t\tdigitalWrite(12, LOW);\n\t\t\tdigitalWrite(13, HIGH);\n\t\t\tanalogWrite(9,_speed);\n\t\t\tanalogWrite(10,_speed);\n\t\t\tbreak;\n\t\tcase 6: //rotate right\n\t\t\tdigitalWrite(7, LOW);\n\t\t\tdigitalWrite(8, HIGH);\n\t\t\tdigitalWrite(12, HIGH);\n\t\t\tdigitalWrite(13, LOW);\n\t\t\tanalogWrite(9,_speed);\n\t\t\tanalogWrite(10,_speed);\n\t\t\tbreak;\n\t\tcase 7: //left bw\n\t\t\tdigitalWrite(7, HIGH);\n\t\t\tdigitalWrite(8, LOW);\n\t\t\tdigitalWrite(12, HIGH);\n\t\t\tdigitalWrite(13, LOW);\n\t\t\tanalogWrite(9,0);\n\t\t\tanalogWrite(10,_speed);\n\t\t\tbreak;\n\t\tcase 8: //right bw\n\t\t\tdigitalWrite(7, HIGH);\n\t\t\tdigitalWrite(8, LOW);\n\t\t\tdigitalWrite(12, HIGH);\n\t\t\tdigitalWrite(13, LOW);\n\t\t\tanalogWrite(9,_speed);\n\t\t\tanalogWrite(10,0);\n\t\t\tbreak;\n\t}\n}\n\n";
    var c = "220";
    "FAST" == b && (c = 255);
    "NORMAL" == b && (c = 220);
    "SLOW" == b && (c = 180);
    return "fnc_3dbot_move(" + a + "," + c + ");\n"
};
Blockly.Arduino._3dbot_steps = function() {
    var a = Blockly.Arduino.valueToCode(this, "STEPS", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_.setup_output_A1 = "pinMode(A1, INPUT);";
    Blockly.Arduino.definitions_.define_button_debounced = '#include "ABlocks_Button.h"';
    Blockly.Arduino.definitions_.var_3dbot_encoder = "Button _3dbot_encoder(A1,5);\n";
    Blockly.Arduino.definitions_fnc_.fnc_3dbot_steps = "void fnc_3dbot_steps(int _s){\n\tint ns=0;\n\twhile(ns<_s){\n\t\tif(_3dbot_encoder.pressed()){\n\t\t\tns++;\n\t\t}\n\t}\n}\n";
    return "fnc_3dbot_steps(" + a + ");\n"
};
Blockly.Arduino._3dbot_motor = function() {
    var a = this.getFieldValue("MOTOR"),
        b = this.getFieldValue("DIR"),
        c = Blockly.Arduino.valueToCode(this, "SPEED", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_.setup_output_7 = "pinMode(7, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_8 = "pinMode(8, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_9 = "pinMode(9, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_10 = "pinMode(10, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_12 = "pinMode(12, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_13 =
        "pinMode(13, OUTPUT);";
    Blockly.Arduino.definitions_fnc_.fnc_3dbot_motor = "void fnc_3dbot_motor(int _m, int _dir, int _speed){\n\tint pin1=7;\n\tint pin2=8;\n\tint pin3=9;\n\tswitch(_m){\n\t\tcase 0: //left\n\t\t\tpin1=7;\n\t\t\tpin2=8;\n\t\t\tpin3=9;\n\t\t\tbreak;\n\t\tcase 1: //right\n\t\t\tpin1=12;\n\t\t\tpin2=13;\n\t\t\tpin3=10;\n\t\t\tbreak;\n\t}\n\tswitch(_dir){\n\t\tcase 0: //stop\n\t\t\tanalogWrite(pin3,0);\n\t\t\tbreak;\n\t\tcase 1: //forward\n\t\t\tdigitalWrite(pin1, LOW);\n\t\t\tdigitalWrite(pin2, HIGH);\n\t\t\tanalogWrite(pin3,_speed);\n\t\t\tbreak;\n\t\tcase 2: //backward\n\t\t\tdigitalWrite(pin1, HIGH);\n\t\t\tdigitalWrite(pin2, LOW);\n\t\t\tanalogWrite(pin3,_speed);\n\t\t\tbreak;\n\t}\n}\n\n";
    return "fnc_3dbot_motor(" + a + "," + b + "," + c + ");\n"
};

function setupUltrasonic3dBot() {
    Blockly.Arduino.definitions_fnc_.fnc_ultrasonic_3dbot = "double fnc_3dbot_distance(int _t, int _e){\n\tunsigned long dur=0;\n\tdigitalWrite(_t, LOW);\n\tdelayMicroseconds(5);\n\tdigitalWrite(_t, HIGH);\n\tdelayMicroseconds(10);\n\tdigitalWrite(_t, LOW);\n\tdur = pulseIn(_e, HIGH, 18000);\n\treturn (dur/57);\n}\n"
}
Blockly.Arduino._3dbot_distance = function() {
    Blockly.Arduino.setups_.setup_output_4 = "pinMode(4, OUTPUT);";
    Blockly.Arduino.setups_.setup_input_2 = "pinMode(2, INPUT);";
    setupUltrasonic3dBot();
    return ["fnc_3dbot_distance(4,2)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_distance2 = function() {
    Blockly.Arduino.setups_.setup_output_4 = "pinMode(4, OUTPUT);";
    Blockly.Arduino.setups_.setup_input_2 = "pinMode(2, INPUT);";
    Blockly.Arduino.valueToCode(this, "MAXDISTANCE", Blockly.Arduino.ORDER_ATOMIC);
    setupUltrasonic3dBot();
    return ["fnc_3dbot_distance(4,2)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_ldr = function() {
    Blockly.Arduino.setups_.setup_input_A2 = "pinMode(A2, INPUT);";
    return ["analogRead(A2)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_ntc = function() {
    Blockly.Arduino.setups_.setup_input_A3 = "pinMode(A3, INPUT);";
    Blockly.Arduino.definitions_.define_math = "#include <math.h>";
    Blockly.Arduino.definitions_fnc_.fnc_3dbot_ntc = "double fnc_3dbot_ntc(int _rawval){\n\tlong Resistance;\n\tdouble Temp;\n\tResistance=6000.0*((1024.0/_rawval) - 1); \n\tTemp = log(Resistance); \n\tTemp = 1 / (0.001129148 + (0.000234125 * Temp) + (0.0000000876741 * Temp * Temp * Temp)); \n\tTemp = Temp - 273.15;\n\treturn Temp;\n}\n";
    return ["fnc_3dbot_ntc(analogRead(A3))",
        Blockly.Arduino.ORDER_ATOMIC
    ]
};
Blockly.Arduino._3dbot_irsensor = function() {
    var a = this.getFieldValue("IRSENSOR"),
        b = 5;
    "LEFT" == a && (b = 5);
    "RIGHT" == a && (b = 6);
    Blockly.Arduino.setups_["setup_input_" + b] = "pinMode(" + b + ", INPUT);";
    return ["(!digitalRead(" + b + "))", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_buzzer = function() {
    Blockly.Arduino.definitions_.define_tone = '#include "ABLocks_TimerFreeTone.h"';
    var a = Blockly.Arduino.valueToCode(this, "TONE", Blockly.Arduino.ORDER_ATOMIC),
        b = Blockly.Arduino.valueToCode(this, "MS", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_.setup_output_A0 = "pinMode(A0, OUTPUT);";
    return "TimerFreeTone(A0," + a + "," + b + ");\n"
};

Blockly.Arduino._3dbot_buzzer_rttl = function() {
    Blockly.Arduino.definitions_.define_tone = "#include <ABLocks_TimerFreeTone.h>";
    this.getFieldValue("PIN");
    var a = Blockly.Arduino.valueToCode(this, "RTTTL", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_.setup_output_A0 = "pinMode(A0, OUTPUT);";
    return "TimerFreeToneRtttl(A0,(const char *)" + a + ".c_str());\n"
};
Blockly.Arduino._3dbot_buzzer_rttl_melody = function() {
    var a = this.getFieldValue("RTTTL_MELODY"),
        b = this.getField("RTTTL_MELODY"),
        c = '""';
    if (b) {
        for (var d = -1, f = b.getOptions_(), e = 0; e < f.length; e++) f[e][1] == b.value_ && (d = e);
        0 <= d && (Blockly.Arduino.definitions_["var_rttl_melody_" + d] = "String rtt_melody_" + d + '="' + a + '";', c = "rtt_melody_" + d)
    }
    return [c, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_led_pwm = function() {
    var a = this.getFieldValue("LED"),
        b = 6;
    "RED" == a && (b = 6);
    "YELLOW" == a && (b = 5);
    "GREEN" == a && (b = 3);
    a = Blockly.Arduino.valueToCode(this, "PWM", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_output_" + b] = "pinMode(" + b + ", OUTPUT);";
    return "analogWrite(" + b + "," + a + ");\n"
};
Blockly.Arduino._3dbot_button = function() {
    var a = this.getFieldValue("STATUS");
    Blockly.Arduino.setups_.setup_input_2 = "pinMode(2, INPUT);";
    Blockly.Arduino.definitions_.define_button_debounced = '#include "ABlocks_Button.h"';
    Blockly.Arduino.definitions_.var_3dbot_button = "Button _3dbot_button(2,50);\n";
    var b = "";
    "pressed" == a && (b = "_3dbot_button.pressed()");
    "released" == a && (b = "_3dbot_button.released()");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_irremote_rx = function() {
    Blockly.Arduino.irrx = !0;
    Blockly.Arduino.setups_.setup_ir_rx = "ir_rx.enableIRIn();";
    Blockly.Arduino.definitions_.define_ir_rx = '#include "IRremote.h"';
    Blockly.Arduino.definitions_.var_ir_rx = "IRrecv ir_rx(11);\ndecode_results ir_rx_results;";
    Blockly.Arduino.definitions_fnc_.fnc_ir_rx = "unsigned long fnc_3dbot_irrx()\n{\n\tbool decoded=false;\n\tif( ir_rx.decode(&ir_rx_results))\n\t{\n\t\tdecoded=true;\n\t\tir_rx.resume();\n\t}\n\t if(decoded) return ir_rx_results.value; else return 0;\n }\n";
    return ["(unsigned long)fnc_3dbot_irrx()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_irremote_keys = function() {
    return ["(" + this.getFieldValue("KEY") + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_irremote_tx = function() {
    Blockly.Arduino.definitions_.define_irremote = '#include "IRremote.h"';
    Blockly.Arduino.definitions_.var_ir_tx = "IRsend ir_tx;";
    var a = this.getFieldValue("PROTOCOL"),
        b = Blockly.Arduino.valueToCode(this, "CODE", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "BITS", Blockly.Arduino.ORDER_ATOMIC);
    d = "ir_tx.sendRC5(";
    "RC5" == a && (d = "ir_tx.sendRC5(");
    "RC6" == a && (d = "ir_tx.sendRC6(");
    "NEC" == a && (d = "ir_tx.sendNEC(");
    "SONY" == a && (d = "ir_tx.sendSony(");
    "JVC" ==
    a && (d = "ir_tx.sendJVC(");
    "SAMSUNG" == a && (d = "ir_tx.sendSAMSUNG(");
    "WHYNTER" == a && (d = "ir_tx.sendWhynter(");
    "AIWA" == a && (d = "ir_tx.sendAiwaRCT501(");
    "LG" == a && (d = "ir_tx.sendLG(");
    "DISH" == a && (d = "ir_tx.sendDISH(");
    "DENON" == a && (d = "ir_tx.sendDenon(");
    var d = d + "(unsigned long)" + b;
    d = "JVC" == a ? d + "," + c + ",1);\n" : "AIWA" == a ? d + ");\n" : d + "," + c + ");\n";
    Blockly.Arduino.setups_.setup_ir_rx && (d += "ir_rx.enableIRIn();\n");
    return d
};
Blockly.Arduino._3dbot_digital_write = function() {
    var a = Blockly.Arduino.valueToCode(this, "STAT", Blockly.Arduino.ORDER_ATOMIC) || "false";
    Blockly.Arduino.setups_.setup_output_A1 = "pinMode(A1, OUTPUT);";
    return "digitalWrite(A1, " + ("true" == a || "false" == a || "HIGH" == a || "LOW" == a ? "true" == a || "HIGH" == a ? "HIGH" : "LOW" : "(" + a + "!=0)") + ");\n"
};
Blockly.Arduino._3dbot_digital_read = function() {
    Blockly.Arduino.setups_.setup_input_A1 = "pinMode(A1, INPUT);";
    return ["digitalRead(A1)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_analog_read = function() {
    Blockly.Arduino.setups_.setup_input_A1 = "pinMode(A1, INPUT);";
    return ["analogRead(A1)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_nunchuk = function() {
    var a = this.getFieldValue("ID");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_nunchuck = '#include "ArduinoNunchuk.h"\n';
    Blockly.Arduino.definitions_.var_nunchuck = "ArduinoNunchuk nunchuk = ArduinoNunchuk();";
    Blockly.Arduino.setups_.setup_nunchuck = "nunchuk.init();";
    Blockly.Arduino.loops_.loop_nunchuck = "\tnunchuk.update();";
    return ["nunchuk." + a, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino._3dbot_irremote_keys = function() {
    return ["(" + this.getFieldValue("KEY") + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.actuator = {};

function hexToR(a) {
    return parseInt(cutHex(a).substring(0, 2), 16)
}

function hexToG(a) {
    return parseInt(cutHex(a).substring(2, 4), 16)
}

function hexToB(a) {
    return parseInt(cutHex(a).substring(4, 6), 16)
}

function cutHex(a) {
    return "#" == a.charAt(0) ? a.substring(1, 7) : a
}
Blockly.Arduino.actuator_led = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("STAT");
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    return "digitalWrite(" + a + "," + b + ");\n"
};
Blockly.Arduino.actuator_led_EP = Blockly.Arduino.actuator_led;
Blockly.Arduino.actuator_led_pwm = function() {
    var a = this.getFieldValue("PIN"),
        b = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    return "analogWrite(" + a + "," + b + ");\n"
};
Blockly.Arduino.actuator_led_pwm_EP = Blockly.Arduino.actuator_led_pwm;
Blockly.Arduino.actuator_led_rgb = function() {
    var a = this.getFieldValue("PIN_R"),
        b = this.getFieldValue("PIN_G"),
        c = this.getFieldValue("PIN_B"),
        d = this.getFieldValue("COLOR"),
        f = hexToR(d),
        e = hexToG(d);
    d = hexToB(d);
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + b] = "pinMode(" + b + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + c] = "pinMode(" + c + ", OUTPUT);";
    "CA" == this.getFieldValue("TYPE") && (f = 255 - f, e = 255 - e, d = 255 - d);
    return a = "analogWrite(" + a + "," +
        f + ");analogWrite(" + (b + "," + e + ");analogWrite(") + (c + "," + d + ");\n")
};
Blockly.Arduino.actuator_relay = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("STAT");
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    return "digitalWrite(" + a + "," + b + ");\n"
};
Blockly.Arduino.actuator_relay_EP = Blockly.Arduino.actuator_relay;
Blockly.Arduino.actuator_buzzer = function() {
    Blockly.Arduino.definitions_.define_tone = "#include <ABLocks_TimerFreeTone.h>";
    var a = this.getFieldValue("PIN"),
        b = Blockly.Arduino.valueToCode(this, "TONE", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "MS", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    return "TimerFreeTone(" + a + "," + b + "," + c + ");\n"
};
Blockly.Arduino.actuator_buzzer_blox = function() {
    var a = this.getFieldValue("PIN"),
        b = Blockly.Arduino.valueToCode(this, "TONE", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "MS", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    return "tone(" + a + "," + b + "," + c + ");\n"
};
Blockly.Arduino.actuator_buzzer_EP = Blockly.Arduino.actuator_buzzer;
Blockly.Arduino.actuator_buzzer_rttl = function() {
    Blockly.Arduino.definitions_.define_tone = "#include <ABLocks_TimerFreeTone.h>";
    var a = this.getFieldValue("PIN"),
        b = Blockly.Arduino.valueToCode(this, "RTTTL", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    return "TimerFreeToneRtttl(" + a + ",(const char *)" + b + ".c_str());\n"
};
Blockly.Arduino.actuator_buzzer_rttl_EP = Blockly.Arduino.actuator_buzzer_rttl;
Blockly.Arduino.actuator_buzzer_tone = function() {
    return [this.getFieldValue("NOTE"), Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.actuator_buzzer_rttl_melody = function() {
    var a = this.getFieldValue("RTTTL_MELODY"),
        b = this.getField("RTTTL_MELODY"),
        c = '""';
    if (b) {
        for (var d = -1, f = b.getOptions_(), e = 0; e < f.length; e++) f[e][1] == b.value_ && (d = e);
        0 <= d && (Blockly.Arduino.definitions_["var_rttl_melody_" + d] = "String rtt_melody_" + d + '="' + a + '";', c = "rtt_melody_" + d)
    }
    return [c, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.actuator_fanmotor_EP = function() {
    var a = this.getFieldValue("DIR");
    Blockly.Arduino.setups_.setup_output_4 = "pinMode(4, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_3 = "pinMode(3, OUTPUT);";
    return "L" == a ? "digitalWrite(4,HIGH);\ndigitalWrite(3,LOW);\n" : "R" == a ? "digitalWrite(4,LOW);\ndigitalWrite(3,HIGH);\n" : "digitalWrite(4,LOW);\ndigitalWrite(3,LOW);\n"
};
Blockly.Arduino.actuator_irtx = function() {
    Blockly.Arduino.definitions_.define_irremote = '#include "IRremote.h"';
    Blockly.Arduino.definitions_.var_ir_tx = "IRsend ir_tx;";
    var a = this.getFieldValue("PROTOCOL"),
        b = Blockly.Arduino.valueToCode(this, "CODE", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "BITS", Blockly.Arduino.ORDER_ATOMIC);
    d = "ir_tx.sendRC5(";
    "RC5" == a && (d = "ir_tx.sendRC5(");
    "RC6" == a && (d = "ir_tx.sendRC6(");
    "NEC" == a && (d = "ir_tx.sendNEC(");
    "SONY" == a && (d = "ir_tx.sendSony(");
    "JVC" == a &&
        (d = "ir_tx.sendJVC(");
    "SAMSUNG" == a && (d = "ir_tx.sendSAMSUNG(");
    "WHYNTER" == a && (d = "ir_tx.sendWhynter(");
    "AIWA" == a && (d = "ir_tx.sendAiwaRCT501(");
    "LG" == a && (d = "ir_tx.sendLG(");
    "DISH" == a && (d = "ir_tx.sendDISH(");
    "DENON" == a && (d = "ir_tx.sendDenon(");
    var d = d + "(unsigned long)" + b;
    d = "JVC" == a ? d + "," + c + ",1);\n" : "AIWA" == a ? d + ");\n" : d + "," + c + ");\n";
    Blockly.Arduino.setups_.setup_ir_rx && (d += "ir_rx.enableIRIn();\n");
    return d
};
Blockly.Arduino.actuator_irtx_EP = Blockly.Arduino.actuator_irtx;
Blockly.Arduino.bluetooth = {};

function bluetooth_varDef(a, b) {
    var c = "SoftwareSerial bt_serial(" + b + "," + a + ");";
    0 == b && 1 == a && (c = "HardwareSerial &bt_serial=Serial;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n");
    "Arduino Mega" == profile["default"].description && (19 == b && 18 == a && (c = "HardwareSerial &bt_serial=Serial1;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n"), 17 == b && 16 == a && (c = "HardwareSerial &bt_serial=Serial2;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n"),
        15 == b && 14 == a && (c = "HardwareSerial &bt_serial=Serial3;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n"));
    return c
}

function setupBluetooth() {
    Blockly.Arduino.definitions_.define_softserial = "#include <SoftwareSerial.h>\n";
    Blockly.Arduino.definitions_.var_bluetooth || (Blockly.Arduino.definitions_.var_bluetooth = bluetooth_varDef(2, 3));
    Blockly.Arduino.setups_.setup_bluetooth || (Blockly.Arduino.setups_.setup_bluetooth = "\tbt_serial.begin(9600);\n")
}
Blockly.Arduino.bluetooth_init = function() {
    var a = this.getFieldValue("BAUD"),
        b = this.getFieldValue("RX"),
        c = this.getFieldValue("TX");
    setupBluetooth();
    Blockly.Arduino.definitions_.var_bluetooth = bluetooth_varDef(b, c);
    Blockly.Arduino.setups_.setup_bluetooth = "bt_serial.begin(" + a + ");\n";
    return ""
};
Blockly.Arduino.bluetooth_init2 = function() {
    var a = this.getFieldValue("BAUD");
    Blockly.Arduino.definitions_.var_bluetooth = "HardwareSerial &bt_serial=Serial;";
    Blockly.Arduino.setups_.setup_bluetooth = "bt_serial.begin(" + a + ");\n";
    return ""
};
Blockly.Arduino.bluetooth_init2_EP = Blockly.Arduino.bluetooth_init2;
Blockly.Arduino.bluetooth_name = function() {
    setupBluetooth();
    Blockly.Arduino.definitions_fnc_.fnc_bt_serial_namepin = 'void fnc_bt_serial_namepin(String _name,String _pin){\n\tdelay(2000);\n\tbt_serial.print(String("AT+NAME")+_name);\n\tdelay(1000);\n\tbt_serial.print(String("AT+PIN")+_pin);\n\tdelay(1000);\n\twhile(bt_serial.available()>0)bt_serial.read();\n\tbt_serial.flush();\n}\n\n';
    var a = Blockly.Arduino.valueToCode(this, "DEVNAME", Blockly.Arduino.ORDER_ATOMIC) || "'ArduinoBlocks'",
        b = Blockly.Arduino.valueToCode(this,
            "DEVPIN", Blockly.Arduino.ORDER_ATOMIC) || "'1234'";
    return "fnc_bt_serial_namepin(" + a + "," + b + ");\n"
};
Blockly.Arduino.bluetooth_name2 = function() {
    var a = this.getFieldValue("VERSION");
    setupBluetooth();
    Blockly.Arduino.definitions_fnc_.fnc_bt_serial_namepin = "standard" == a ? 'void fnc_bt_serial_namepin(String _name,String _pin){\n\tdelay(2000);\n\tbt_serial.print(String("AT+NAME")+_name);\n\tdelay(1000);\n\tbt_serial.print(String("AT+PIN")+_pin);\n\tdelay(1000);\n\twhile(bt_serial.available()>0)bt_serial.read();\n\tbt_serial.flush();\n}\n\n' : 'void fnc_bt_serial_namepin(String _name,String _pin){\n\tdelay(2000);\n\tbt_serial.println(String("AT+NAME=")+_name);\n\tdelay(1000);\n\tbt_serial.println(String("AT+PSWD:\\"")+_pin+"\\"");\n\tdelay(1000);\n\twhile(bt_serial.available()>0)bt_serial.read();\n\tbt_serial.flush();\n}\n\n';
    a = Blockly.Arduino.valueToCode(this, "DEVNAME", Blockly.Arduino.ORDER_ATOMIC) || "'ArduinoBlocks'";
    var b = Blockly.Arduino.valueToCode(this, "DEVPIN", Blockly.Arduino.ORDER_ATOMIC) || "'1234'";
    return "fnc_bt_serial_namepin(" + a + "," + b + ");\n"
};
Blockly.Arduino.bluetooth_timeout = function() {
    setupBluetooth();
    return "bt_serial.setTimeout(" + Blockly.Arduino.valueToCode(this, "MS", Blockly.Arduino.ORDER_ATOMIC) + ");\n"
};
Blockly.Arduino.bluetooth_print = function() {
    setupBluetooth();
    var a = Blockly.Arduino.valueToCode(this, "STRINGOUTPUT", Blockly.Arduino.ORDER_ATOMIC) || "''";
    return "TRUE" == this.getFieldValue("NEWLINE") ? "bt_serial.println(" + a + ");\n" : "bt_serial.print(" + a + ");\n"
};
Blockly.Arduino.bluetooth_println = function() {
    setupBluetooth();
    return "bt_serial.println(" + (Blockly.Arduino.valueToCode(this, "STRINGOUTPUT", Blockly.Arduino.ORDER_ATOMIC) || "''") + ");\n"
};
Blockly.Arduino.bluetooth_write_byte = function() {
    setupBluetooth();
    return "bt_serial.write((byte)" + (Blockly.Arduino.valueToCode(this, "BYTE", Blockly.Arduino.ORDER_ATOMIC) || "0") + ");\n"
};
Blockly.Arduino.bluetooth_read_float = function() {
    setupBluetooth();
    return ["TRUE" == this.getFieldValue("NEWLINE") ? "atof((bt_serial.readStringUntil('\\n')).c_str())" : "bt_serial.parseFloat()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.bluetooth_read_byte = function() {
    setupBluetooth();
    return ["bt_serial.read()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.bluetooth_read_string = function() {
    setupBluetooth();
    return ["TRUE" == this.getFieldValue("NEWLINE") ? "bt_serial.readStringUntil('\\n')" : "bt_serial.readString()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.bluetooth_read_string_line = function() {
    setupBluetooth();
    return ["bt_serial.readStringUntil('\\n')", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.bluetooth_read_available = function() {
    setupBluetooth();
    return ["(bt_serial.available()>0)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.domotics = {};

function setupPzem004t(a, b) {
    Blockly.Arduino.definitions_.define_softserial = "#include <SoftwareSerial.h>\n";
    Blockly.Arduino.definitions_.define_pzem004t = '#include "PZEM004T.h"';
    Blockly.Arduino.definitions_.var_pzem004t || (Blockly.Arduino.definitions_.var_pzem004t = "PZEM004T pzem_004t(" + a + "," + b + ");")
}
Blockly.Arduino.domotics_pzem004t_init = function() {
    var a = this.getFieldValue("RX"),
        b = this.getFieldValue("TX");
    setupPzem004t(b, a);
    return ""
};
Blockly.Arduino.domotics_pzem004t_value = function() {
    var a = this.getFieldValue("ID"),
        b = this.getFieldValue("TYPE");
    Blockly.Arduino.definitions_["var_pzem004t_ip" + a] = "IPAddress pzem_004t_ip" + a + "(192,168,1," + a + ");";
    var c = "pzem_004t.";
    return [("V" == b ? c + "voltage" : "I" == b ? c + "current" : "W" == b ? c + "power" : "WH" == b ? c + "energy" : c + "voltage") + ("(pzem_004t_ip" + a + ")"), Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.domotics_pzem004t_setaddress = function() {
    var a = this.getFieldValue("ID");
    Blockly.Arduino.definitions_["var_pzem004t_ip" + a] = "IPAddress pzem_004t_ip" + a + "(192,168,1," + a + ");";
    return "pzem_004t.setAddress(pzem_004t_ip" + a + ");\n"
};
Blockly.Arduino.domotics_ina219_init = function() {
    var a = this.getFieldValue("ID"),
        b = this.getFieldValue("ADDR");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_ina219 = "#include <Adafruit_INA219.h>\n";
    Blockly.Arduino.definitions_["var_ina219_" + a] = "Adafruit_INA219 ina219_" + a + "(" + b + ");";
    Blockly.Arduino.setups_["setup_ina219_" + a] = "ina219_" + a + ".begin();"
};
Blockly.Arduino.domotics_ina219_value = function() {
    var a = this.getFieldValue("ID"),
        b = this.getFieldValue("TYPE");
    Blockly.Arduino.definitions_["var_ina219_" + a] ? (a = "ina219_" + a + ".", "V" == b ? a += "getBusVoltage_V()" : "I" == b ? a += "getCurrent_mA()" : "W" == b && (a += "getPower_mW()")) : a = "";
    return [a, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.eeprom = {};
Blockly.Arduino.eeprom_read_var = function() {
    Blockly.Arduino.definitions_.define_eeprom = "#include <EEPROM.h>\n";
    Blockly.Arduino.definitions_fnc_.fnc_eeprom_read = "double fnc_EEPROM_readDouble(int ee)\n{\ndouble value = 0.0;\nbyte* p = (byte*)(void*)&value;\nfor (int i = 0; i < sizeof(value); i++)\n*p++ = EEPROM.read(ee++);\nreturn value;\n}\n\n";
    return ["fnc_EEPROM_readDouble((int)(" + (Blockly.Arduino.valueToCode(this, "DIR", Blockly.Arduino.ORDER_ATOMIC) || "0") + "*4))", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.eeprom_write_var = function() {
    Blockly.Arduino.definitions_.define_eeprom = "#include <EEPROM.h>\n";
    Blockly.Arduino.definitions_fnc_.fnc_eeprom_write = "void fnc_EEPROM_writeDouble(int ee, double value)\n{\nbyte* p = (byte*)(void*)&value;\nfor (int i = 0; i < sizeof(value); i++)\nEEPROM.write(ee++, *p++);\n}\n\n";
    var a = Blockly.Arduino.valueToCode(this, "DIR", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "VAL", Blockly.Arduino.ORDER_ATOMIC) || "0";
    return "fnc_EEPROM_writeDouble((int)(" +
        a + "*4)," + b + ");\n"
};
Blockly.Arduino.ESP = {};
Blockly.Arduino.esp_wdt = function() {
    var a = this.getFieldValue("WDT"),
        b = Blockly.Arduino.valueToCode(this, "MS", Blockly.Arduino.ORDER_ATOMIC),
        c = "ESP.wdtDisable();\n";
    1 == a && (c = "ESP.wdtEnable(" + b + ");");
    return c
};
Blockly.Arduino.esp_wdt_reset = function() {
    return "ESP.wdtFeed();\n"
};
Blockly.Arduino.esp_restart = function() {
    return "ESP.restart();\n"
};
Blockly.Arduino.esp_chipid = function() {
    return ["String(ESP.getChipId(),HEX)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.esp_yield = function() {
    return "yield();\n"
};
Blockly.Arduino.gps = {};

function gps_varDef(a, b) {
    var c = "SoftwareSerial gps_serial(" + b + "," + a + ");";
    0 == b && 1 == a && (c = "HardwareSerial &bt_serial=Serial;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n");
    "Arduino Mega" == profile["default"].description && (19 == b && 18 == a && (c = "HardwareSerial &gps_serial=Serial1;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n"), 17 == b && 16 == a && (c = "HardwareSerial &gps_serial=Serial2;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n"),
        15 == b && 14 == a && (c = "HardwareSerial &gps_serial=Serial3;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n"));
    return c
}

function setupGps() {
    Blockly.Arduino.definitions_.define_softserial = "#include <SoftwareSerial.h>\n";
    Blockly.Arduino.definitions_.define_gps = '#include "ABlocks_TinyGPS.h"';
    Blockly.Arduino.definitions_.var_gps = "TinyGPS gps;";
    Blockly.Arduino.definitions_.var_gps_lat = "float gps_lat=0;";
    Blockly.Arduino.definitions_.var_gps_long = "float gps_long=0;";
    Blockly.Arduino.definitions_.var_gps_speed_kmph = "float gps_speed_kmph=0;";
    Blockly.Arduino.definitions_.var_gps_speed_mph = "float gps_speed_mph=0;";
    Blockly.Arduino.definitions_.var_gps_altitude =
        "float gps_altitude=0;";
    Blockly.Arduino.definitions_.var_gps_course = "float gps_course=0;";
    Blockly.Arduino.definitions_.var_gps_fixed = "bool gps_fixed=false;";
    Blockly.Arduino.definitions_.var_gps_day = "byte gps_day=0;";
    Blockly.Arduino.definitions_.var_gps_month = "byte gps_month=0;";
    Blockly.Arduino.definitions_.var_gps_year = "int gps_year=0;";
    Blockly.Arduino.definitions_.var_gps_hour = "byte gps_hour=0;";
    Blockly.Arduino.definitions_.var_gps_min = "byte gps_min=0;";
    Blockly.Arduino.definitions_.var_gps_sec = "byte gps_sec=0;";
    Blockly.Arduino.definitions_.var_gps_hund = "byte gps_hund=0;";
    Blockly.Arduino.definitions_.var_gps_serial || (Blockly.Arduino.definitions_.var_gps_serial = gps_varDef(2, 3));
    Blockly.Arduino.setups_.setup_gps = '\tgps_serial.begin(9600);\ngps_serial.println("$PMTK220,1000*1F");';
    var a = "void fnc_gps_update()\n{\n\tunsigned long fix_age;\n";
    var b = Blockly.Arduino.definitions_.var_gps_serial;
    b && b.startsWith("SoftwareSerial") && (a += "\tgps_serial.listen();\n");
    Blockly.Arduino.definitions_fnc_.fnc_gps = a + "\twhile (gps_serial.available()){\n\t\tif(gps.encode(gps_serial.read())){\n\t\t\tgps_fixed=false;\n\t\t\tgps_lat=gps_long=gps_speed_kmph=gps_speed_mph=gps_course=0;\n\t\t\tgps_day=gps_month=gps_year=gps_hour=gps_min=gps_sec=0;\n\t\t\tgps.f_get_position(&gps_lat, &gps_long, &fix_age);\n\t\t\tif (fix_age != TinyGPS::GPS_INVALID_AGE && fix_age<5000){\n\t\t\t\tgps_fixed=true;\n\t\t\t\tgps.crack_datetime(&gps_year, &gps_month, &gps_day,&gps_hour, &gps_min, &gps_sec, &gps_hund, &fix_age);\n\t\t\t\tgps_altitude=gps.f_altitude();\n\t\t\t\tgps_course=gps.f_course();\n\t\t\t\tgps_speed_kmph=gps.f_speed_kmph();\n\t\t\t\tgps_speed_mph=gps.f_speed_mph();\n\t\t\t}\n\t\t}\n\t}\n}\n\n";
    Blockly.Arduino.loops_.loop_gps = "\tfnc_gps_update();"
}
Blockly.Arduino.gps_init = function() {
    var a = this.getFieldValue("RX"),
        b = this.getFieldValue("TX");
    setupGps();
    Blockly.Arduino.definitions_.var_gps_serial = gps_varDef(a, b);
    return ""
};
Blockly.Arduino.gps_getposition = function() {
    setupGps();
    var a = this.getFieldValue("TYPE"),
        b = "gps_lat";
    "lat" == a && (b = "gps_lat");
    "long" == a && (b = "gps_long");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.gps_getdatetime = function() {
    setupGps();
    var a = this.getFieldValue("TYPE"),
        b = "gps_day";
    "day" == a && (b = "gps_day");
    "month" == a && (b = "gps_month");
    "year" == a && (b = "gps_year");
    "hour" == a && (b = "gps_hour");
    "min" == a && (b = "gps_min");
    "sec" == a && (b = "gps_sec");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.gps_getspeed = function() {
    setupGps();
    var a = this.getFieldValue("TYPE"),
        b = "gps_speed_kmph";
    "kph" == a && (b = "gps_speed_kmph");
    "mph" == a && (b = "gps_speed_mph");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.gps_getaltitude = function() {
    setupGps();
    return ["gps_altitude", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.gps_getcourse = function() {
    setupGps();
    return ["gps_course", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.gps_validdata = function() {
    setupGps();
    return ["gps_fixed", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.gps_distancebetween = function() {
    setupGps();
    var a = Blockly.Arduino.valueToCode(this, "LAT1", Blockly.Arduino.ORDER_ATOMIC),
        b = Blockly.Arduino.valueToCode(this, "LON1", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "LAT2", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "LON2", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_fnc_.fnc_gps_distance = "double fnc_gps_distance(float lat1,float lon1,float lat2, float lon2)\n{\n\tunsigned long dist=(unsigned long)TinyGPS::distance_between(lat1,lon1,lat2,lon2);\n\tif(dist== 0xFFFFFFFF)dist=0;\n\treturn (double)dist;}\n\n";
    return ["fnc_gps_distance(" + a + "," + b + "," + c + "," + d + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.io = {};
Blockly.Arduino.io_pinmode = function() {
    var a = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        b = this.getFieldValue("MODE");
    return "pinMode(" + a + "," + b + ");\n"
};
Blockly.Arduino.io_digital_write = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("STAT");
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    return "digitalWrite(" + a + ", " + b + ");\n"
};
Blockly.Arduino.io_digital_write2 = function() {
    var a = Blockly.Arduino.valueToCode(this, "PIN", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "STAT", Blockly.Arduino.ORDER_ATOMIC) || "false";
    Blockly.Arduino.definitions_fnc_.fnc_dynamic_digitalWrite = "\nvoid fnc_dynamic_digitalWrite(int _pin, int _e){\n\tpinMode(_pin,OUTPUT);\n\tdigitalWrite(_pin,_e);\n}\n";
    return "fnc_dynamic_digitalWrite(" + a + ", " + ("true" == b || "false" == b || "HIGH" == b || "LOW" == b ? "true" == b || "HIGH" == b ? "HIGH" : "LOW" : "(" + b + "!=0)") +
        ");\n"
};
Blockly.Arduino.io_digital_read = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.io_digital_read2 = function() {
    var a = Blockly.Arduino.valueToCode(this, "PIN", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.definitions_fnc_.fnc_dynamic_digitalRead = "\nint fnc_dynamic_digitalRead(int _pin){\n\tpinMode(_pin,INPUT);\n\treturn digitalRead(_pin);\n}\n";
    return ["fnc_dynamic_digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.io_analog_write = function() {
    var a = this.getFieldValue("PIN"),
        b = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    return "analogWrite(" + a + ", " + b + ");\n"
};
Blockly.Arduino.io_analog_write2 = function() {
    var a = Blockly.Arduino.valueToCode(this, "PIN", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.definitions_fnc_.fnc_dynamic_analogWrite = "\nvoid fnc_dynamic_analogWrite(int _pin, int _e){\n\tpinMode(_pin,OUTPUT);\n\tanalogWrite(_pin,_e);\n}\n";
    return "fnc_dynamic_analogWrite(" + a + ", " + b + ");\n"
};
Blockly.Arduino.io_analog_read = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["analogRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.io_analog_read2 = function() {
    var a = Blockly.Arduino.valueToCode(this, "PIN", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.definitions_fnc_.fnc_dynamic_analogRead = "\nint fnc_dynamic_analogRead(int _pin){\n\tpinMode(_pin,INPUT);\n\treturn analogRead(_pin);\n}\n";
    return ["fnc_dynamic_analogRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.io_pulsein = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("STAT"),
        c = Blockly.Arduino.valueToCode(this, "TIMEOUT", Blockly.Arduino.ORDER_ATOMIC) || "0";
    return ["pulseIn(" + a + "," + ("true" == b || "false" == b || "HIGH" == b || "LOW" == b ? "true" == b || "HIGH" == b ? "HIGH" : "LOW" : "(" + b + "!=0)") + "," + c + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.io_interrupt = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("MODE"),
        c = Blockly.Arduino.statementToCode(this, "DO");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    Blockly.Arduino.setups_["setup_interruptHandler_" + a] = "attachInterrupt(digitalPinToInterrupt(" + a + "),fnc_interruptHandler_" + a + "," + b + ");";
    b = "void fnc_interruptHandler_" + a + "(){\r\n" + (c + "\r\n}\r\n\r\n");
    Blockly.Arduino.definitions_fnc_["fnc_interruptHandler_" + a] = b;
    return ""
};
Blockly.Arduino.io_digital_write_i2c = function() {
    var a = this.getFieldValue("ADDR"),
        b = this.getFieldValue("PIN"),
        c = this.getFieldValue("STAT");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    "esp8266" == profile["default"].micro ? (Blockly.Arduino.definitions_.define_pcf8574 = "#include <PCF8574_esp.h>\n", Blockly.Arduino.definitions_["var_pcf8574_" + a] = "PCF8574_ESP pcf8574_" + a + "(" + a + ");\n", Blockly.Arduino.setups_["setup_pcf8574_" + a] = "pcf8574_" + a + ".begin();\n") : (Blockly.Arduino.definitions_.define_pcf8574 =
        "#include <PCF8574.h>\n", Blockly.Arduino.definitions_["var_pcf8574_" + a] = "PCF8574 pcf8574_" + a + ";\n", Blockly.Arduino.setups_["setup_pcf8574_" + a] = "pcf8574_" + a + ".begin(" + a + ");\n");
    Blockly.Arduino.setups_["setup_pcf8574_" + a + "_" + b] = "pcf8574_" + a + ".pinMode(" + b + ",OUTPUT);\n";
    return "pcf8574_" + a + ".digitalWrite(" + b + ", " + c + ");\n"
};
Blockly.Arduino.io_digital_write2_i2c = function() {
    var a = this.getFieldValue("ADDR"),
        b = Blockly.Arduino.valueToCode(this, "PIN", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = Blockly.Arduino.valueToCode(this, "STAT", Blockly.Arduino.ORDER_ATOMIC) || "false";
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    "esp8266" == profile["default"].micro ? (Blockly.Arduino.definitions_.define_pcf8574 = "#include <PCF8574_esp.h>\n", Blockly.Arduino.definitions_["var_pcf8574_" + a] = "PCF8574_ESP pcf8574_" + a + "(" + a + ");\n", Blockly.Arduino.setups_["setup_pcf8574_" +
        a] = "pcf8574_" + a + ".begin();\n") : (Blockly.Arduino.definitions_.define_pcf8574 = "#include <PCF8574.h>\n", Blockly.Arduino.definitions_["var_pcf8574_" + a] = "PCF8574 pcf8574_" + a + ";\n", Blockly.Arduino.setups_["setup_pcf8574_" + a] = "pcf8574_" + a + ".begin(" + a + ");\n");
    var d = "esp8266" == profile["default"].micro ? "\nvoid fnc_dynamic_digitalWrite_i2c(PCF8574_ESP *_pcf, int _pin, int _e){\n\t_pcf->pinMode(_pin,OUTPUT);\n\t_pcf->digitalWrite(_pin,_e);\n}\n" : "\nvoid fnc_dynamic_digitalWrite_i2c(PCF8574 *_pcf, int _pin, int _e){\n\t_pcf->pinMode(_pin,OUTPUT);\n\t_pcf->digitalWrite(_pin,_e);\n}\n";
    Blockly.Arduino.definitions_fnc_.fnc_dynamic_digitalWrite_i2c = d;
    return "fnc_dynamic_digitalWrite_i2c(&pcf8574_" + a + "," + b + ", " + ("true" == c || "false" == c || "HIGH" == c || "LOW" == c ? "true" == c || "HIGH" == c ? "HIGH" : "LOW" : "(" + c + "!=0)") + ");\n"
};
Blockly.Arduino.io_digital_read_i2c = function() {
    var a = this.getFieldValue("ADDR"),
        b = this.getFieldValue("PIN");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    "esp8266" == profile["default"].micro ? (Blockly.Arduino.definitions_.define_pcf8574 = "#include <PCF8574_esp.h>\n", Blockly.Arduino.definitions_["var_pcf8574_" + a] = "PCF8574_ESP pcf8574_" + a + "(" + a + ");\n", Blockly.Arduino.setups_["setup_pcf8574_" + a] = "pcf8574_" + a + ".begin();\n") : (Blockly.Arduino.definitions_.define_pcf8574 = "#include <PCF8574.h>\n",
        Blockly.Arduino.definitions_["var_pcf8574_" + a] = "PCF8574 pcf8574_" + a + ";\n", Blockly.Arduino.setups_["setup_pcf8574_" + a] = "pcf8574_" + a + ".begin(" + a + ");\n");
    Blockly.Arduino.setups_["setup_pcf8574_" + a + "_" + b] = "pcf8574_" + a + ".pinMode(" + b + ",INPUT);\n";
    return ["pcf8574_" + a + ".digitalRead(" + b + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.io_digital_read2_i2c = function() {
    var a = this.getFieldValue("ADDR"),
        b = Blockly.Arduino.valueToCode(this, "PIN", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    "esp8266" == profile["default"].micro ? (Blockly.Arduino.definitions_.define_pcf8574 = "#include <PCF8574_esp.h>\n", Blockly.Arduino.definitions_["var_pcf8574_" + a] = "PCF8574_ESP pcf8574_" + a + "(" + a + ");\n", Blockly.Arduino.setups_["setup_pcf8574_" + a] = "pcf8574_" + a + ".begin();\n") : (Blockly.Arduino.definitions_.define_pcf8574 =
        "#include <PCF8574.h>\n", Blockly.Arduino.definitions_["var_pcf8574_" + a] = "PCF8574 pcf8574_" + a + ";\n", Blockly.Arduino.setups_["setup_pcf8574_" + a] = "pcf8574_" + a + ".begin(" + a + ");\n");
    var c = "esp8266" == profile["default"].micro ? "\nint fnc_dynamic_digitalRead_i2c(PCF8574_ESP *_pcf, int _pin){\n\t_pcf->pinMode(_pin,INPUT);\n\treturn _pcf->digitalRead(_pin);\n}\n" : "\nint fnc_dynamic_digitalRead_i2c(PCF8574 *_pcf, int _pin){\n\t_pcf->pinMode(_pin,INPUT);\n\treturn _pcf->digitalRead(_pin);\n}\n";
    Blockly.Arduino.definitions_fnc_.fnc_dynamic_digitalRead_i2c =
        c;
    return ["fnc_dynamic_digitalRead_i2c(&pcf8574_" + a + "," + b + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.io_analog_write_i2c = function() {
    var a = this.getFieldValue("PIN"),
        b = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC),
        c = this.getFieldValue("ADDR");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_pca9685 = "#include <Adafruit_PWMServoDriver.h>\n";
    Blockly.Arduino.definitions_["var_pca9685_" + c] = "Adafruit_PWMServoDriver pca9685_" + c + ";\n";
    Blockly.Arduino.setups_["setup_pca9685_" + c] = "pca9685_" + c + ".begin();  pca9685_" + c + ".setPWMFreq(60); //servos optimal frequency \n";
    return "pca9685_" + c + ".setPWM(" + a + ",0," + b + ");\n"
};
Blockly.Arduino.io_analog_write2_i2c = function() {
    var a = Blockly.Arduino.valueToCode(this, "PIN", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = this.getFieldValue("ADDR");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_pca9685 = "#include <Adafruit_PWMServoDriver.h>\n";
    Blockly.Arduino.definitions_["var_pca9685_" + c] = "Adafruit_PWMServoDriver pca9685_" + c + ";\n";
    Blockly.Arduino.setups_["setup_pca9685_" +
        c] = "pca9685_" + c + ".begin();  pca9685_" + c + ".setPWMFreq(60); //servos optimal frequency \n";
    return "pca9685_" + c + ".setPWM(" + a + ",0," + b + ");\n"
};
Blockly.Arduino.keyboardmouse = {};
Blockly.Arduino.keyboard_code = function(a) {
    a = this.getFieldValue("CHAR");
    var b = "('" + a + "')";
    String(a).startsWith("0x") && (b = "(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.keyboard_key = function() {
    var a = Blockly.Arduino.valueToCode(this, "KEYCODE", Blockly.Arduino.ORDER_ATOMIC) || "''",
        b = this.getFieldValue("TYPE");
    Blockly.Arduino.setups_.setup_keyboard = "Keyboard.begin();\n";
    Blockly.Arduino.definitions_.define_keyboard = '#include "Keyboard.h"\n';
    return "PRESS" == b ? "Keyboard.press(" + a + ");\n" : "RELEASE" == b ? "Keyboard.release(" + a + ");\n" : "Keyboard.write(" + a + ");\n"
};
Blockly.Arduino.keyboard_print = function() {
    var a = Blockly.Arduino.valueToCode(this, "STRINGOUTPUT", Blockly.Arduino.ORDER_ATOMIC) || "''",
        b = this.getFieldValue("NEWLINE");
    Blockly.Arduino.setups_.setup_keyboard = "Keyboard.begin();\n";
    Blockly.Arduino.definitions_.define_keyboard = '#include "Keyboard.h"\n';
    return "TRUE" == b ? "Keyboard.println(" + a + ");\n" : "Keyboard.print(" + a + ");\n"
};
Blockly.Arduino.mouse_press = function() {
    var a = this.getFieldValue("TYPE"),
        b = this.getFieldValue("BUTTON");
    Blockly.Arduino.definitions_.define_mouse = '#include "Mouse.h"\n';
    Blockly.Arduino.setups_.setup_mouse = "Mouse.begin();\n";
    return "PRESS" == a ? "Mouse.press(" + b + ");\n" : "RELEASE" == a ? "Mouse.release(" + b + ");\n" : "Mouse.click(" + b + ");\n"
};
Blockly.Arduino.mouse_move = function() {
    var a = this.getFieldValue("TYPE"),
        b = Blockly.Arduino.valueToCode(this, "N", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.definitions_.define_mouse = '#include "Mouse.h"\n';
    Blockly.Arduino.setups_.setup_mouse = "Mouse.begin();\n";
    return "X" == a ? "Mouse.move(" + b + ",0,0);\n" : "Y" == a ? "Mouse.move(0," + b + ",0);\n" : "Mouse.move(0,0," + b + ");\n"
};
Blockly.Arduino.keybot_move = function() {
    var a = this.getFieldValue("MOV"),
        b = this.getFieldValue("SPEED");
    Blockly.Arduino.setups_.setup_output_4 = "pinMode(4, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_7 = "pinMode(7, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_5 = "pinMode(5, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_6 = "pinMode(6, OUTPUT);";
    Blockly.Arduino.definitions_fnc_.fnc_keybot_move = "void fnc_keybot_move(int _t, int _speed){\n\tswitch(_t){\n\t\tcase 0: //stop\n\t\t\tdigitalWrite(4, LOW);\n\t\t\tdigitalWrite(7, LOW);\n\t\t\tanalogWrite(5,0);\n\t\t\tanalogWrite(6,0);\n\t\t\tbreak;\n\t\tcase 1: //fw\n\t\t\tdigitalWrite(4, HIGH);\n\t\t\tdigitalWrite(7, HIGH);\n\t\t\tanalogWrite(5,_speed);\n\t\t\tanalogWrite(6,_speed);\n\t\t\tbreak;\n\t\tcase 2: //bw\n\t\t\tdigitalWrite(4, LOW);\n\t\t\tdigitalWrite(7, LOW);\n\t\t\tanalogWrite(5,_speed);\n\t\t\tanalogWrite(6,_speed);\n\t\t\tbreak;\n\t\tcase 3: //left\n\t\t\tdigitalWrite(4, HIGH);\n\t\t\tdigitalWrite(7, HIGH);\n\t\t\tanalogWrite(5,0);\n\t\t\tanalogWrite(6,_speed);\n\t\t\tbreak;\n\t\tcase 4: //right\n\t\t\tdigitalWrite(4, HIGH);\n\t\t\tdigitalWrite(7, HIGH);\n\t\t\tanalogWrite(5,_speed);\n\t\t\tanalogWrite(6,0);\n\t\t\tbreak;\n\t\tcase 5: //rotate left\n\t\t\tdigitalWrite(4, LOW);\n\t\t\tdigitalWrite(7, HIGH);\n\t\t\tanalogWrite(5,_speed);\n\t\t\tanalogWrite(6,_speed);\n\t\t\tbreak;\n\t\tcase 6: //rotate right\n\t\t\tdigitalWrite(4, HIGH);\n\t\t\tdigitalWrite(7, LOW);\n\t\t\tanalogWrite(5,_speed);\n\t\t\tanalogWrite(6,_speed);\n\t\t\tbreak;\n\t}\n}\n\n";
    var c = "220";
    "VERYFAST" == b && (c = 255);
    "FAST" == b && (c = 180);
    "NORMAL" == b && (c = 130);
    "SLOW" == b && (c = 90);
    "VERYSLOW" == b && (c = 60);
    return "fnc_keybot_move(" + a + "," + c + ");\n"
};
Blockly.Arduino.keybot_motor = function() {
    var a = this.getFieldValue("MOTOR"),
        b = this.getFieldValue("DIR"),
        c = Blockly.Arduino.valueToCode(this, "SPEED", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_.setup_output_4 = "pinMode(4, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_7 = "pinMode(7, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_5 = "pinMode(5, OUTPUT);";
    Blockly.Arduino.setups_.setup_output_6 = "pinMode(6, OUTPUT);";
    Blockly.Arduino.definitions_fnc_.fnc_keybot_motor = "void fnc_keybot_motor(int _m, int _dir, int _speed){\n\tint pin1=4;\n\tint pin2=5;\n\tswitch(_m){\n\t\tcase 0: //left\n\t\t\tpin1=4;\n\t\t\tpin2=5;\n\t\t\tbreak;\n\t\tcase 1: //right\n\t\t\tpin1=7;\n\t\t\tpin2=6;\n\t\t\tbreak;\n\t}\n\tswitch(_dir){\n\t\tcase 0: //stop\n\t\t\tanalogWrite(pin2,0);\n\t\t\tbreak;\n\t\tcase 1: //forward\n\t\t\tdigitalWrite(pin1, HIGH);\n\t\t\tanalogWrite(pin2,_speed);\n\t\t\tbreak;\n\t\tcase 2: //backward\n\t\t\tdigitalWrite(pin1, LOW);\n\t\t\tanalogWrite(pin2,_speed);\n\t\t\tbreak;\n\t}\n}\n\n";
    return "fnc_keybot_motor(" + a + "," + b + "," + c + ");\n"
};

function setupUltrasonicKeybot() {
    Blockly.Arduino.definitions_fnc_.fnc_ultrasonic_keybot = "double fnc_keybot_distance(int _t, int _e){\n\tunsigned long dur=0;\n\tdigitalWrite(_t, LOW);\n\tdelayMicroseconds(5);\n\tdigitalWrite(_t, HIGH);\n\tdelayMicroseconds(10);\n\tdigitalWrite(_t, LOW);\n\tdur = pulseIn(_e, HIGH, 18000);\n\treturn (dur/57);\n}\n"
}
Blockly.Arduino.keybot_distance = function() {
    Blockly.Arduino.setups_.setup_output_A0 = "pinMode(A0, OUTPUT);";
    Blockly.Arduino.setups_.setup_input_2 = "pinMode(2, INPUT);";
    setupUltrasonicKeybot();
    return ["fnc_keybot_distance(A0,2)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.keybot_distance2 = function() {
    Blockly.Arduino.setups_.setup_output_A0 = "pinMode(A0, OUTPUT);";
    Blockly.Arduino.setups_.setup_input_2 = "pinMode(2, INPUT);";
    Blockly.Arduino.valueToCode(this, "MAXDISTANCE", Blockly.Arduino.ORDER_ATOMIC);
    setupUltrasonicKeybot();
    return ["fnc_keybot_distance(A0,2)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.keybot_irsensor = function() {
    var a = this.getFieldValue("IRSENSOR"),
        b = "A2";
    "LEFT" == a && (b = "A3");
    "MIDDLE" == a && (b = "A2");
    "RIGHT" == a && (b = "A1");
    Blockly.Arduino.setups_["setup_input_" + b] = "pinMode(" + b + ", INPUT);";
    return ["digitalRead(" + b + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.keybot_buzzer = function() {
    Blockly.Arduino.definitions_.define_tone = '#include "ABLocks_TimerFreeTone.h"';
    var a = Blockly.Arduino.valueToCode(this, "TONE", Blockly.Arduino.ORDER_ATOMIC),
        b = Blockly.Arduino.valueToCode(this, "MS", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_.setup_output_13 = "pinMode(13, OUTPUT);";
    return "TimerFreeTone(13," + a + "," + b + ");\n"
};
Blockly.Arduino.keybot_buzzer_rttl = function() {
    Blockly.Arduino.definitions_.define_tone = "#include <ABLocks_TimerFreeTone.h>";
    this.getFieldValue("PIN");
    var a = Blockly.Arduino.valueToCode(this, "RTTTL", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_.setup_output_13 = "pinMode(13, OUTPUT);";
    return "TimerFreeToneRtttl(13,(const char *)" + a + ".c_str());\n"
};
Blockly.Arduino.keybot_buzzer_rttl_melody = function() {
    var a = this.getFieldValue("RTTTL_MELODY"),
        b = this.getField("RTTTL_MELODY"),
        c = '""';
    if (b) {
        for (var d = -1, f = b.getOptions_(), e = 0; e < f.length; e++) f[e][1] == b.value_ && (d = e);
        0 <= d && (Blockly.Arduino.definitions_["var_rttl_melody_" + d] = "String rtt_melody_" + d + '="' + a + '";', c = "rtt_melody_" + d)
    }
    return [c, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.keypad = {};

function setup_keypad_init() {
    Blockly.Arduino.definitions_fnc_.fnc_keypad_keystr = 'String fnc_keypad_keystr(int _key)\n{\n\tString v="";\n\tif(_key==1)v="1";\n\tif(_key==2)v="2";\n\tif(_key==3)v="3";\n\tif(_key==4)v="4";\n\tif(_key==5)v="5";\n\tif(_key==6)v="6";\n\tif(_key==7)v="7";\n\tif(_key==8)v="8";\n\tif(_key==9)v="9";\n\tif(_key==10)v="*";\n\tif(_key==11)v="0";\n\tif(_key==12)v="#";\n\tif(_key==13)v="A";\n\tif(_key==14)v="B";\n\tif(_key==15)v="C";\n\tif(_key==16)v="D";\n\treturn v;\n}\n'
}
Blockly.Arduino.keypad_init = function() {
    var a = this.getFieldValue("ROW1"),
        b = this.getFieldValue("ROW2"),
        c = this.getFieldValue("ROW3"),
        d = this.getFieldValue("ROW4"),
        f = this.getFieldValue("COL1"),
        e = this.getFieldValue("COL2"),
        g = this.getFieldValue("COL3");
    Blockly.Arduino.definitions_.define_keypad = '#include "ABlocks_Keypad.h"';
    Blockly.Arduino.definitions_.var_keypad = "char keypad_3x4_keys[4][3] = {{1,2,3},{4,5,6},{7,8,9},{10,11,12}};\nbyte keypad_3x4_rp[4] = {" + (a + "," + b + "," + c + "," + d + "};\nbyte keypad_3x4_cp[3] = {") +
        (f + "," + e + "," + g + "};\nKeypad keypad_3x4(makeKeymap(keypad_3x4_keys),keypad_3x4_rp,keypad_3x4_cp,4,3);\n");
    setup_keypad_init();
    return ""
};
Blockly.Arduino.keypad_init_34 = function() {
    var a = this.getFieldValue("ROW1"),
        b = this.getFieldValue("ROW2"),
        c = this.getFieldValue("ROW3"),
        d = this.getFieldValue("ROW4"),
        f = this.getFieldValue("COL1"),
        e = this.getFieldValue("COL2"),
        g = this.getFieldValue("COL3");
    Blockly.Arduino.definitions_.define_keypad = '#include "ABlocks_Keypad.h"';
    Blockly.Arduino.definitions_.var_keypad = "char keypad_keys[4][3] = {{1,2,3},{4,5,6},{7,8,9},{10,11,12}};\nbyte keypad_rp[4] = {" + (a + "," + b + "," + c + "," + d + "};\nbyte keypad_cp[3] = {") + (f +
        "," + e + "," + g + "};\nKeypad keypad(makeKeymap(keypad_keys),keypad_rp,keypad_cp,4,3);\n");
    setup_keypad_init();
    return ""
};
Blockly.Arduino.keypad_init_44 = function() {
    var a = this.getFieldValue("ROW1"),
        b = this.getFieldValue("ROW2"),
        c = this.getFieldValue("ROW3"),
        d = this.getFieldValue("ROW4"),
        f = this.getFieldValue("COL1"),
        e = this.getFieldValue("COL2"),
        g = this.getFieldValue("COL3"),
        h = this.getFieldValue("COL4");
    Blockly.Arduino.definitions_.define_keypad = '#include "ABlocks_Keypad.h"';
    Blockly.Arduino.definitions_.var_keypad = "char keypad_keys[4][4] = {{1,2,3,13},{4,5,6,14},{7,8,9,15},{10,11,12,16}};\nbyte keypad_rp[4] = {" + (a + "," + b + "," +
        c + "," + d + "};\nbyte keypad_cp[4] = {") + (f + "," + e + "," + g + "," + h + "};\nKeypad keypad(makeKeymap(keypad_keys),keypad_rp,keypad_cp,4,4);\n");
    return ""
};
Blockly.Arduino.keypad_getkey = function() {
    return ["keypad.getKey()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.keypad_getkey_str = function() {
    return ["fnc_keypad_keystr((int)keypad.getKey())", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.keypad_key = function() {
    return [this.getFieldValue("KEY"), Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.lcd = {};
Blockly.Language || (Blockly.Language = {});

function setupLCD() {
    Blockly.Arduino.definitions_.define_lcd || (Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>", Blockly.Arduino.definitions_.define_lcd = '#include "ABlocks_LiquidCrystal_I2C.h"');
    Blockly.Arduino.definitions_.var_lcd || (Blockly.Arduino.definitions_.var_lcd = "LiquidCrystal_I2C lcd(0x27,16,2);");
    Blockly.Arduino.setups_.setup_lcd || (Blockly.Arduino.setups_.setup_lcd = "lcd.begin();lcd.noCursor();lcd.backlight();")
}
Blockly.Arduino.lcd_customchar = function() {
    var a = this.getFieldValue("NUM");
    --a;
    var b = this.getFieldValue("DATA");
    "" != b && (Blockly.Arduino.definitions_["var_lcd_customchar_" + a] = "byte lcd_customchar_" + a + "[8]={" + b + "};\n", Blockly.Arduino.setups_["setup_lcd_customchar_" + a] = "lcd.createChar(" + a + ", lcd_customchar_" + a + ");");
    return ""
};
Blockly.Arduino.lcd_begin = function() {
    var a = this.getFieldValue("RS_PIN"),
        b = this.getFieldValue("ENABLE_PIN"),
        c = this.getFieldValue("D4_PIN"),
        d = this.getFieldValue("D5_PIN"),
        f = this.getFieldValue("D6_PIN"),
        e = this.getFieldValue("D7_PIN"),
        g = this.getFieldValue("SIZE"),
        h = "16",
        k = "2";
    "2x16" == g && (h = "16", k = "2");
    "4x20" == g && (h = "20", k = "4");
    Blockly.Arduino.definitions_.define_lcd = "#include <LiquidCrystal.h>";
    Blockly.Arduino.definitions_.var_lcd = "LiquidCrystal lcd(" + a + "," + b + "," + c + "," + d + "," + f + "," + e + ");\n";
    Blockly.Arduino.setups_.setup_lcd =
        "lcd.begin(" + h + ", " + k + ");\n";
    return ""
};
Blockly.Arduino.lcd_begin_i2c = function() {
    var a = this.getFieldValue("ADDR"),
        b = this.getFieldValue("SIZE"),
        c = "16",
        d = "2";
    "2x16" == b && (c = "16", d = "2");
    "4x20" == b && (c = "20", d = "4");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_lcd = '#include "ABlocks_LiquidCrystal_I2C.h"';
    Blockly.Arduino.definitions_.var_lcd = "LiquidCrystal_I2C lcd(" + a + "," + c + "," + d + ");";
    Blockly.Arduino.setups_.setup_lcd = "lcd.begin();lcd.noCursor();lcd.backlight();";
    return ""
};
Blockly.Arduino.lcd_begin_i2c_EP = Blockly.Arduino.lcd_begin_i2c;
Blockly.Arduino.lcd_print = function() {
    setupLCD();
    var a = this.getFieldValue("CURSOR_COLUMN"),
        b = this.getFieldValue("CURSOR_ROW"),
        c = Blockly.Arduino.valueToCode(this, "STRINGOUTPUT", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''";
    return "lcd.setCursor(" + a + ", " + b + ");\nlcd.print(" + c + ");\n"
};
Blockly.Arduino.lcd_print_customchar = function() {
    setupLCD();
    var a = this.getFieldValue("CURSOR_COLUMN"),
        b = this.getFieldValue("CURSOR_ROW"),
        c = this.getFieldValue("NUM");
    --c;
    var d = "";
    Blockly.Arduino.definitions_["var_lcd_customchar_" + c] && (d = "lcd.setCursor(" + a + ", " + b + ");\nlcd.write((byte)" + c + ");\n");
    return d
};
Blockly.Arduino.lcd_print2 = function() {
    setupLCD();
    var a = Blockly.Arduino.valueToCode(this, "CURSOR_COLUMN", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "CURSOR_ROW", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = Blockly.Arduino.valueToCode(this, "STRINGOUTPUT", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''";
    20 <= a && (a = 19);
    0 > a && (a = 0);
    4 <= b && (b = 3);
    0 > b && (a = 0);
    return "lcd.setCursor(" + a + ", " + b + ");\nlcd.print(" + c + ");\n"
};
Blockly.Arduino.lcd_print2_customchar = function() {
    setupLCD();
    var a = Blockly.Arduino.valueToCode(this, "CURSOR_COLUMN", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "CURSOR_ROW", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = this.getFieldValue("NUM");
    --c;
    20 <= a && (a = 19);
    0 > a && (a = 0);
    4 <= b && (b = 3);
    0 > b && (a = 0);
    var d = "";
    Blockly.Arduino.definitions_["var_lcd_customchar_" + c] && (d = "lcd.setCursor(" + a + ", " + b + ");\nlcd.write((byte)" + c + ");\n");
    return d
};
Blockly.Arduino.lcd_clear = function() {
    setupLCD();
    return "lcd.clear();\n"
};
Blockly.Arduino.lcd_display = function() {
    setupLCD();
    return "off" == this.getFieldValue("DISPLAY") ? "lcd.noDisplay();\n" : "lcd.display();\n"
};
Blockly.Arduino.lcd_backlight = function() {
    setupLCD();
    return "off" == this.getFieldValue("BACKLIGHT") ? "lcd.noBacklight();\n" : "lcd.backlight();\n"
};
Blockly.Arduino.lcd_cursor = function() {
    setupLCD();
    var a = this.getFieldValue("CURSOR");
    var b = "off" == a ? "lcd.noCursor();" : "lcd.cursor();";
    a = this.getFieldValue("BLINK");
    return "off" == a ? b + "lcd.noBlink();\n" : b + "lcd.blink();\n"
};
Blockly.Arduino.ledmatrix = {};
Blockly.Arduino.ledmatrix_init = function() {
    var a = this.getFieldValue("ADDR"),
        b = this.getFieldValue("ID"),
        c = this.getFieldValue("TYPE");
    Blockly.Arduino.definitions_.define_spi = "#include <SPI.h>";
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_adafruit_gfx = "#include <Adafruit_GFX.h>";
    Blockly.Arduino.definitions_.define_ledmatrix = "#include <Adafruit_LEDBackpack.h>";
    Blockly.Arduino.definitions_["var_ledmatrix_" + b] = "Adafruit_8x8matrix ledmatrix_" + b + " =Adafruit_8x8matrix();";
    Blockly.Arduino.setups_["setup_ledmatrix_" + b] = "\tledmatrix_" + b + ".begin(" + a + ");\n\tledmatrix_" + b + ".setType(" + c + ");\n\tledmatrix_" + b + ".setTextWrap(false);\n\tledmatrix_" + b + ".setTextSize(1);\n";
    return ""
};
Blockly.Arduino.ledmatrix_init_EP = Blockly.Arduino.ledmatrix_init;
Blockly.Arduino.ledmatrix_clear = function() {
    if (!Blockly.Arduino.definitions_.define_ledmatrix) return "";
    var a = this.getFieldValue("ID");
    return "ledmatrix_" + a + ".clear(); ledmatrix_" + a + ".writeDisplay();\n"
};
Blockly.Arduino.ledmatrix_clear_EP = Blockly.Arduino.ledmatrix_clear;
Blockly.Arduino.ledmatrix_drawpixel = function() {
    if (!Blockly.Arduino.definitions_.define_ledmatrix) return "";
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "X", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "Y", Blockly.Arduino.ORDER_ATOMIC),
        d = this.getFieldValue("COL");
    return "ledmatrix_" + a + ".drawPixel(" + b + "," + c + "," + d + "); ledmatrix_" + a + ".writeDisplay();\n"
};
Blockly.Arduino.ledmatrix_drawpixel_EP = Blockly.Arduino.ledmatrix_drawpixel;
Blockly.Arduino.ledmatrix_drawline = function() {
    if (!Blockly.Arduino.definitions_.define_ledmatrix) return "";
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "X1", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "Y1", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "X2", Blockly.Arduino.ORDER_ATOMIC),
        f = Blockly.Arduino.valueToCode(this, "Y2", Blockly.Arduino.ORDER_ATOMIC),
        e = this.getFieldValue("COL");
    return "ledmatrix_" + a + ".drawLine(" + b + "," + c + "," + d + "," + f + "," +
        e + "); ledmatrix_" + a + ".writeDisplay();\n"
};
Blockly.Arduino.ledmatrix_drawline_EP = Blockly.Arduino.ledmatrix_drawline;
Blockly.Arduino.ledmatrix_drawrectangle = function() {
    if (!Blockly.Arduino.definitions_.define_ledmatrix) return "";
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "X1", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "Y1", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "X2", Blockly.Arduino.ORDER_ATOMIC),
        f = Blockly.Arduino.valueToCode(this, "Y2", Blockly.Arduino.ORDER_ATOMIC),
        e = this.getFieldValue("COL"),
        g = "drawRect";
    "TRUE" == this.getFieldValue("FILL") && (g =
        "fillRect");
    return "ledmatrix_" + a + "." + g + "(" + b + "," + c + "," + d + "," + f + "," + e + "); ledmatrix_" + a + ".writeDisplay();\n"
};
Blockly.Arduino.ledmatrix_drawrectangle_EP = Blockly.Arduino.ledmatrix_drawrectangle;
Blockly.Arduino.ledmatrix_drawcircle = function() {
    if (!Blockly.Arduino.definitions_.define_ledmatrix) return "";
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "X", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "Y", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "R", Blockly.Arduino.ORDER_ATOMIC),
        f = this.getFieldValue("COL"),
        e = "drawCircle";
    "TRUE" == this.getFieldValue("FILL") && (e = "fillCircle");
    return "ledmatrix_" + a + "." + e + "(" + b + "," + c + "," + d + "," + f + "); ledmatrix_" +
        a + ".writeDisplay();\n"
};
Blockly.Arduino.ledmatrix_drawcircle_EP = Blockly.Arduino.ledmatrix_drawcircle;
Blockly.Arduino.ledmatrix_drawtext = function() {
    if (!Blockly.Arduino.definitions_.define_ledmatrix) return "";
    var a = Blockly.Arduino.valueToCode(this, "TXT", Blockly.Arduino.ORDER_ATOMIC) || "''",
        b = this.getFieldValue("ID"),
        c = Blockly.Arduino.valueToCode(this, "X", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "Y", Blockly.Arduino.ORDER_ATOMIC);
    this.getFieldValue("COL");
    return "ledmatrix_" + b + ".setCursor(" + c + "," + d + "); ledmatrix_" + b + ".print(" + a + "); ledmatrix_" + b + ".writeDisplay();\n"
};
Blockly.Arduino.ledmatrix_drawtext_EP = Blockly.Arduino.ledmatrix_drawtext;
Blockly.Arduino.ledmatrix_drawbitmap = function() {
    if (!Blockly.Arduino.definitions_.define_ledmatrix) return "";
    var a = this.getFieldValue("DATA"),
        b = this.getFieldValue("ID");
    Blockly.Arduino.definitions_["var_ledmatrixdata_" + Blockly.Arduino.ledmatrix_count] = "esp8266" == profile["default"].micro ? "static const uint8_t ledmatrix_data_" + Blockly.Arduino.ledmatrix_count + "[] = {" + a + "};" : "static const uint8_t PROGMEM ledmatrix_data_" + Blockly.Arduino.ledmatrix_count + "[] PROGMEM = {" + a + "};";
    a = "ledmatrix_" + b + ".clear(); ledmatrix_" +
        b + ".drawBitmap(0,0,ledmatrix_data_" + Blockly.Arduino.ledmatrix_count + ",8,8,LED_ON); ledmatrix_" + b + ".writeDisplay();\n";
    Blockly.Arduino.ledmatrix_count++;
    return a
};
Blockly.Arduino.ledmatrix_drawbitmap_EP = Blockly.Arduino.ledmatrix_drawbitmap;
Blockly.Arduino.ledmatrix_drawsprite = function() {
    var a = this.getFieldValue("ID"),
        b = this.getFieldValue("SPRITE"),
        c = "",
        d = "";
    "face_normal" == b && (c = "B00000000,B00000000,B01100110,B00000000,B00000000,B00000000,B11111111,B00000000");
    "face_happy" == b && (c = "B00000000,B01100110,B01100110,B00000000,B00000000,B11000011,B01100110,B00111100");
    "face_sad" == b && (c = "B00000000,B01100110,B00100100,B00000000,B00111100,B01100110,B11000011,B10000001");
    "face_angry" == b && (c = "B00000000,B01000010,B01100110,B00000000,B00000000,B11111111,B10100101,B11111111");
    "eye_normal" == b && (c = "B01111110,B10000001,B10000001,B10011001,B10011001,B10000001,B10000001,B01111110");
    "eye_medium" == b && (c = "B00000000,B00111100,B01000010,B01011010,B01011010,B01000010,B00111100,B00000000");
    "eye_small" == b && (c = "B00000000,B00000000,B01111110,B01000010,B01011010,B01111110,B00000000,B00000000");
    "eye_closed" == b && (c = "B00000000,B00000000,B00000000,B01111110,B01111110,B00000000,B00000000,B00000000");
    "eye_lookL" == b && (c = "B01111110,B10000001,B10000001,B11100001,B11100001,B10000001,B10000001,B01111110");
    "eye_lookR" == b && (c = "B01111110,B10000001,B10000001,B10000111,B10000111,B10000001,B10000001,B01111110");
    "eye_lookU" == b && (c = "B01111110,B10011001,B10011001,B10000001,B10000001,B10000001,B10000001,B01111110");
    "eye_lookD" == b && (c = "B01111110,B10000001,B10000001,B10000001,B10000001,B10011001,B10011001,B01111110");
    "eye_angryL" == b && (c = "B01110000,B10001000,B10000100,B10011010,B10011001,B10000001,B01000010,B00111100");
    "eye_angryR" == b && (c = "B00001110,B00010001,B00100001,B01011001,B10011001,B10000001,B01000010,B00111100");
    "eye_sad" == b && (c = "B00000000,B00000000,B00000000,B11111111,B11111111,B11000011,B01111110,B00000000");
    "eye_surprise" == b && (c = "B01111110,B10000001,B10011001,B10111101,B10111101,B10011001,B10000001,B01111110");
    "icon_heart" == b && (c = "B01101100,B11111110,B11111110,B11111110,B11111110,B01111100,B00111000,B00010000");
    "icon_user" == b && (c = "B00011000,B00111100,B00111100,B00011000,B00000000,B00111100,B01111110,B01111110");
    "icon_clock" == b && (c = "B00111100,B01000010,B10001001,B10101001,B10011001,B10000001,B01000010,B00111100");
    "icon_arrowU" == b && (c = "B00011000,B00111100,B01111110,B11111111,B00011000,B00011000,B00011000,B00011000");
    "icon_arrowD" == b && (c = "B00011000,B00011000,B00011000,B00011000,B11111111,B01111110,B00111100,B00011000");
    "icon_arrowL" == b && (c = "B00010000,B00110000,B01110000,B11111111,B11111111,B01110000,B00110000,B00010000");
    "icon_arrowR" == b && (c = "B00001000,B00001100,B00001110,B11111111,B11111111,B00001110,B00001100,B00001000");
    "icon_headphones" == b && (c = "B00111100,B01000010,B10000001,B10000001,B00100100,B11100111,B11100111,B00100100");
    "icon_ray" == b && (c = "B10000000,B01000000,B01101000,B00111100,B00111100,B00010110,B00000010,B00000001");
    "icon_invader" == b && (c = "B00111100,B01111110,B11011011,B11111111,B11111111,B00100100,B01011010,B10100101");
    "icon_moon" == b && (c = "B01111000,B00011100,B00001110,B00001110,B00001110,B00001110,B00011100,B01110000");
    "icon_glasses" == b && (c = "B00000000,B01000010,B10000001,B10000001,B00000000,B11111111,B10111111,B01100110");
    "icon_castle" == b && (c = "B10101000,B11111000,B01110000,B01010000,B01010101,B01111111,B01111001,B01111001");
    "icon_smile" == b && (c = "B00111100,B01111110,B11011011,B11111111,B10111101,B11000011,B01111110,B00111100");
    "icon_planet" == b && (c = "B00000111,B00111001,B01111101,B01111010,B01111010,B10100100,B10011000,B11100000");
    "icon_star" == b && (c = "B00010000,B00010000,B00111000,B11111110,B01111100,B00111000,B01101100,B01000100");
    "icon_cup" == b && (c = "B01111100,B10111111,B10111101,B10111101,B10111101,B10111111,B11111100,B01111000");
    "icon_home" == b && (c = "B00011000,B00111100,B01111110,B11111111,B01111110,B01100110,B01100110,B01100110");
    "battery_empty" == b && (c = "B00011100,B00110110,B00100010,B00100010,B00100010,B00100010,B00100010,B00111110");
    "battery_medium" == b && (c = "B00011100,B00110110,B00100010,B00100010,B00100010,B00111110,B00111110,B00111110");
    "battery_full" == b && (c = "B00011100,B00111110,B00111110,B00111110,B00111110,B00111110,B00111110,B00111110");
    "" != c && (Blockly.Arduino.definitions_["var_ledmatrixdata_sprite_" + b] = "esp8266" == profile["default"].micro ? "static const uint8_t ledmatrix_data_sprite_" + b + "[] = {" + c + "};" : "static const uint8_t PROGMEM ledmatrix_data_sprite_" +
        b + "[] PROGMEM = {" + c + "};", d = "ledmatrix_" + a + ".clear(); ledmatrix_" + a + ".drawBitmap(0,0,ledmatrix_data_sprite_" + b + ",8,8,LED_ON); ledmatrix_" + a + ".writeDisplay();\n");
    return d
};
Blockly.Arduino.ledmatrix_drawsprite_EP = Blockly.Arduino.ledmatrix_drawsprite;
Blockly.Arduino.ledmatrix_rotation = function() {
    if (!Blockly.Arduino.definitions_.define_ledmatrix) return "";
    var a = this.getFieldValue("ID"),
        b = this.getFieldValue("ROT");
    return "ledmatrix_" + a + ".setRotation(" + b + ");\n"
};
Blockly.Arduino.ledmatrix_rotation_EP = Blockly.Arduino.ledmatrix_rotation;
Blockly.Arduino.ledmatrix_show = function() {
    return Blockly.Arduino.definitions_.define_ledmatrix ? "ledmatrix_" + this.getFieldValue("ID") + ".writeDisplay();\n" : ""
};
Blockly.Arduino.ledmatrix_show_EP = Blockly.Arduino.ledmatrix_show;
Blockly.Arduino.motor_servo_move = function() {
    var a = this.getFieldValue("PIN"),
        b = Blockly.Arduino.valueToCode(this, "DEGREE", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "DELAY_TIME", Blockly.Arduino.ORDER_ATOMIC) || "1000";
    Blockly.Arduino.definitions_.define_servo = "#include <Servo.h>\n";
    Blockly.Arduino.definitions_["var_servo" + a] = "Servo servo_" + a + ";\n";
    Blockly.Arduino.setups_["setup_servo_" + a] = "servo_" + a + ".attach(" + a + ");\n";
    return "servo_" + a + ".write(" + b + ");\ndelay(" + c + ");\n"
};
Blockly.Arduino.motor_servo_move_i2c = function() {
    var a = this.getFieldValue("PIN"),
        b = Blockly.Arduino.valueToCode(this, "DEGREE", Blockly.Arduino.ORDER_ATOMIC),
        c = this.getFieldValue("ADDR");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_pca9685 = "#include <Adafruit_PWMServoDriver.h>\n";
    Blockly.Arduino.definitions_["var_pca9685_" + c] = "Adafruit_PWMServoDriver pca9685_" + c + ";\n";
    Blockly.Arduino.setups_["setup_pca9685_" + c] = "pca9685_" + c + ".begin();  pca9685_" + c + ".setPWMFreq(60); //servos optimal frequency \n";
    return "pca9685_" + c + ".setPWM(" + a + ",0,map(" + b + ",0,360,102,922));\n"
};
Blockly.Arduino.motor_servo_move_EP = Blockly.Arduino.motor_servo_move;
Blockly.Arduino.motor_servo_read_degrees = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.definitions_.define_servo = "#include <Servo.h>\n";
    Blockly.Arduino.definitions_["var_servo" + a] = "Servo servo_" + a + ";\n";
    Blockly.Arduino.setups_["setup_servo_" + a] = "servo_" + a + ".attach(" + a + ");\n";
    return "servo_" + a + ".read();"
};
Blockly.Arduino.motor_servo_oscillator_set = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("TYPE"),
        c = Blockly.Arduino.valueToCode(this, "VALUE", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_.define_servo = "#include <ServoOsc.h>";
    Blockly.Arduino.definitions_["var_oscillator_" + a] = "ServoOsc oscillator_" + a + ";\n";
    Blockly.Arduino.setups_["setup_oscillator_" + a] = "oscillator_" + a + ".attach(" + a + ");";
    var d = "";
    "A" == b && (d = "oscillator_" + a + ".setAmplitude(" + c + ");\n");
    "P" == b && (d = "oscillator_" +
        a + ".setPhase(" + c + ");\n");
    "T" == b && (d = "oscillator_" + a + ".setPeriod(" + c + ");\n");
    "O" == b && (d = "oscillator_" + a + ".setOffset(" + c + ");\n");
    return d
};
Blockly.Arduino.motor_servo_oscillator_action = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("TYPE");
    Blockly.Arduino.definitions_.define_servo = "#include <ServoOsc.h>";
    Blockly.Arduino.definitions_["var_oscillator_" + a] = "ServoOsc oscillator_" + a + ";\n";
    Blockly.Arduino.setups_["setup_oscillator_" + a] = "oscillator_" + a + ".attach(" + a + ");";
    var c = "";
    "UPDATE" == b && (c = "oscillator_" + a + ".update();\n");
    "START" == b && (c = "oscillator_" + a + ".start();\n");
    "STOP" == b && (c = "oscillator_" + a + ".stop();\n");
    "RESET" ==
    b && (c = "oscillator_" + a + ".resetToStart();\n");
    return c
};
Blockly.Arduino.motor_servo_oscillator_refresh = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.definitions_.define_servo = "#include <Servo.h>";
    Blockly.Arduino.definitions_.define_otto = '#include "Otto.h"';
    Blockly.Arduino.definitions_.define_oscillator = '#include "Oscillator.h"';
    Blockly.Arduino.definitions_["var_oscillator_" + a] = "Oscillator osc_" + a + ";\n";
    Blockly.Arduino.loops_["loop_oscillator_" + a] = "\tosc_" + a + ".refresh();";
    return "osc_" + a + ".refresh();\n"
};
Blockly.Arduino.motor_stepper_init = function() {
    var a = this.getFieldValue("ID"),
        b = this.getFieldValue("PIN1"),
        c = this.getFieldValue("PIN2"),
        d = this.getFieldValue("PIN3"),
        f = this.getFieldValue("PIN4"),
        e = Blockly.Arduino.valueToCode(this, "STEPS", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_.define_stepper = "#include <Stepper.h>\n";
    Blockly.Arduino.definitions_["var_stepper" + a] = "Stepper stepper_" + a + "(" + e + "," + b + "," + d + "," + c + "," + f + ");\n";
    return ""
};
Blockly.Arduino.motor_stepper_setspeed = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "RPM", Blockly.Arduino.ORDER_ATOMIC);
    return "stepper_" + a + ".setSpeed(" + b + ");\n"
};
Blockly.Arduino.motor_stepper_step = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "STEP", Blockly.Arduino.ORDER_ATOMIC);
    return "stepper_" + a + ".step(" + b + ");\n"
};
Blockly.Arduino.motor_dcpwm = function() {
    var a = this.getFieldValue("PIN1"),
        b = this.getFieldValue("PIN2"),
        c = this.getFieldValue("PIN3"),
        d = this.getFieldValue("PIN1STATUS"),
        f = this.getFieldValue("PIN2STATUS"),
        e = Blockly.Arduino.valueToCode(this, "PWMVAL", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + b] = "pinMode(" + b + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + c] = "pinMode(" + c + ", OUTPUT);";
    return "digitalWrite(" +
        a + "," + d + ");\ndigitalWrite(" + b + "," + f + ");\nanalogWrite(" + c + "," + e + ");\n"
};
Blockly.Arduino.motor_l298n_init = function() {
    var a = this.getFieldValue("EN-A"),
        b = this.getFieldValue("IN1"),
        c = this.getFieldValue("IN2"),
        d = this.getFieldValue("IN3"),
        f = this.getFieldValue("IN4"),
        e = this.getFieldValue("EN-B");
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + b] = "pinMode(" + b + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + c] = "pinMode(" + c + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + d] = "pinMode(" + d + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" +
        f] = "pinMode(" + f + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + e] = "pinMode(" + e + ", OUTPUT);";
    Blockly.Arduino.definitions_.var_l298n_ena = "int l298n_ena=" + a + ";";
    Blockly.Arduino.definitions_.var_l298n_in1 = "int l298n_in1=" + b + ";";
    Blockly.Arduino.definitions_.var_l298n_in2 = "int l298n_in2=" + c + ";";
    Blockly.Arduino.definitions_.var_l298n_in3 = "int l298n_in3=" + d + ";";
    Blockly.Arduino.definitions_.var_l298n_in4 = "int l298n_in4=" + f + ";";
    Blockly.Arduino.definitions_.var_l298n_enb = "int l298n_enb=" + e + ";";
    return ""
};
Blockly.Arduino.motor_l298n_move = function() {
    var a = this.getFieldValue("MOTOR"),
        b = this.getFieldValue("DIR"),
        c = Blockly.Arduino.valueToCode(this, "SPEED", Blockly.Arduino.ORDER_ATOMIC),
        d = "";
    "A" == a ? d = ("FW" == b ? "digitalWrite(l298n_in1,LOW);\ndigitalWrite(l298n_in2,HIGH);\n" : "digitalWrite(l298n_in1,HIGH);\ndigitalWrite(l298n_in2,LOW);\n") + ("analogWrite(l298n_ena,(" + c + "));\n") : "B" == a && (d = ("FW" == b ? "digitalWrite(l298n_in3,LOW);\ndigitalWrite(l298n_in4,HIGH);\n" : "digitalWrite(l298n_in3,HIGH);\ndigitalWrite(l298n_in4,LOW);\n") +
        ("analogWrite(l298n_enb,(" + c + "));\n"));
    return d
};
Blockly.Arduino.motor_l298p_init = function() {
    var a = this.getFieldValue("EN1"),
        b = this.getFieldValue("M1"),
        c = this.getFieldValue("EN2"),
        d = this.getFieldValue("M2");
    Blockly.Arduino.setups_["setup_output_" + a] = "pinMode(" + a + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + b] = "pinMode(" + b + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + c] = "pinMode(" + c + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_output_" + d] = "pinMode(" + d + ", OUTPUT);";
    Blockly.Arduino.definitions_.var_l298p_en1 = "int l298p_en1=" + a + ";";
    Blockly.Arduino.definitions_.var_l298p_m1 =
        "int l298p_m1=" + b + ";";
    Blockly.Arduino.definitions_.var_l298p_en2 = "int l298p_en2=" + c + ";";
    Blockly.Arduino.definitions_.var_l298p_m2 = "int l298p_m2=" + d + ";";
    return ""
};
Blockly.Arduino.motor_l298p_move = function() {
    if (!Blockly.Arduino.definitions_.var_l298p_en1 || !Blockly.Arduino.definitions_.var_l298p_en2) return "//no motor\n";
    var a = this.getFieldValue("MOTOR"),
        b = this.getFieldValue("DIR"),
        c = Blockly.Arduino.valueToCode(this, "SPEED", Blockly.Arduino.ORDER_ATOMIC),
        d = "";
    "A" == a ? d = ("FW" == b ? "digitalWrite(l298p_m1,HIGH);\n" : "digitalWrite(l298p_m1,LOW);\n") + ("analogWrite(l298p_en1,(" + c + "));\n") : "B" == a && (d = ("FW" == b ? "digitalWrite(l298p_m2,HIGH);\n" : "digitalWrite(l298p_m2,LOW);\n") +
        ("analogWrite(l298p_en2,(" + c + "));\n"));
    return d
};
Blockly.Arduino.motorshield_servo_move = function() {
    var a = this.getFieldValue("ID"),
        b = 10;
    1 == a && (b = 10);
    2 == a && (b = 9);
    a = Blockly.Arduino.valueToCode(this, "DEGREE", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_.define_servo = "#include <Servo.h>\n";
    Blockly.Arduino.definitions_["var_servo" + b] = "Servo servo_" + b + ";\n";
    Blockly.Arduino.setups_["setup_servo_" + b] = "servo_" + b + ".attach(" + b + ");\n";
    return "servo_" + b + ".write(" + a + ");\n"
};
Blockly.Arduino.motorshield_stepper_init = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "STEPS", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_.define_motorshield = "#include <AFMotor.h>\n";
    Blockly.Arduino.definitions_["var_motorshield_stepper" + a] = "AF_Stepper motorshield_stepper_" + a + "(" + b + "," + a + ");\n";
    return ""
};
Blockly.Arduino.motorshield_stepper_setspeed = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "RPM", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_.define_motorshield = "#include <AFMotor.h>\n";
    Blockly.Arduino.definitions_["var_motorshield_stepper" + a] || (Blockly.Arduino.definitions_["var_motorshield_stepper" + a] = "AF_Stepper motorshield_stepper_" + a + "(4096 ," + a + ");\n");
    return "motorshield_stepper_" + a + ".setSpeed(" + b + ");\n"
};
Blockly.Arduino.motorshield_stepper_step = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "STEP", Blockly.Arduino.ORDER_ATOMIC),
        c = this.getFieldValue("DIR");
    Blockly.Arduino.definitions_.define_motorshield = "#include <AFMotor.h>\n";
    Blockly.Arduino.definitions_["var_motorshield_stepper" + a] || (Blockly.Arduino.definitions_["var_motorshield_stepper" + a] = "AF_Stepper motorshield_stepper_" + a + "(4096 ," + a + ");\n");
    return "motorshield_stepper_" + a + ".step(" + b + "," + c + ",SINGLE);\n"
};
Blockly.Arduino.motorshield_dc_move = function() {
    var a = this.getFieldValue("ID"),
        b = this.getFieldValue("DIR");
    Blockly.Arduino.definitions_.define_motorshield = "#include <AFMotor.h>\n";
    Blockly.Arduino.definitions_["var_motorshield_dc" + a] = "AF_DCMotor motorshield_dc_" + a + "(" + a + ");\n";
    return "motorshield_dc_" + a + ".run(" + b + ");\n"
};
Blockly.Arduino.motorshield_dc_setspeed = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "SPEED", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_.define_motorshield = "#include <AFMotor.h>\n";
    Blockly.Arduino.definitions_["var_motorshield_dc" + a] || (Blockly.Arduino.definitions_["var_motorshield_dc" + a] = "AF_DCMotor motorshield_dc_" + a + "(" + a + ");\n");
    return "motorshield_dc_" + a + ".setSpeed(" + b + ");\n"
};
Blockly.Arduino.mp3 = {};
Blockly.Arduino.mp3_init = function() {
    var a = this.getFieldValue("RX"),
        b = this.getFieldValue("TX");
    Blockly.Arduino.definitions_.define_mp3 = "#include <MD_YX5300.h>";
    Blockly.Arduino.definitions_.var_mp3 = "MD_YX5300 mp3_player(" + b + "," + a + ");";
    Blockly.Arduino.setups_.setup_mp3 = "mp3_player.begin(); mp3_player.setCallback(0); mp3_player.setSynchronous(0); mp3_player.reset();\n";
    return ""
};
Blockly.Arduino.mp3_play_folderfile = function() {
    var a = Blockly.Arduino.valueToCode(this, "FOLDER", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "FILE", Blockly.Arduino.ORDER_ATOMIC) || "0";
    return "mp3_player.playSpecific((uint8_t)" + a + ",(uint8_t)" + b + ");\n"
};
Blockly.Arduino.mp3_volume = function() {
    return "mp3_player.volume((uint8_t)" + (Blockly.Arduino.valueToCode(this, "VOLUME", Blockly.Arduino.ORDER_ATOMIC) || "0") + ");\n"
};
Blockly.Arduino.mp3_eq = function() {
    return "mp3_player.equalizer((uint8_t)" + this.getFieldValue("EQ") + ");\n"
};
Blockly.Arduino.mp3_control = function() {
    var a = this.getFieldValue("CONTROL"),
        b = "mp3_player.";
    return ("PLAY" == a ? b + "playStart()" : "STOP" == a ? b + "playStop()" : "PAUSE" == a ? b + "playPause()" : "NEXT" == a ? b + "playNext()" : "PREV" == a ? b + "playPrev()" : b + "playStart()") + ";\n"
};
Blockly.Arduino.mp3_reset = function() {
    return "mp3_player.reset();\n"
};
Blockly.Arduino.mqtt = {};

function mqttserial_varDef(a, b) {
    var c = "SoftwareSerial mqtt_esp8266_serial(" + b + "," + a + ");";
    0 == b && 1 == a && (c = "HardwareSerial &mqtt_esp8266_serial=Serial;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n");
    "Arduino Mega" == profile["default"].description && (19 == b && 18 == a && (c = "HardwareSerial &mqtt_esp8266_serial=Serial1;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n"), 17 == b && 16 == a && (c = "HardwareSerial &mqtt_esp8266_serial=Serial2;", Blockly.Arduino.definitions_.define_hardserial =
        "#include <HardwareSerial.h>\n"), 15 == b && 14 == a && (c = "HardwareSerial &mqtt_esp8266_serial=Serial3;", Blockly.Arduino.definitions_.define_hardserial = "#include <HardwareSerial.h>\n"));
    return c
}

function setupMQTT(a, b, c) {
    "" != a && (Blockly.Arduino.definitions_.define_contype = "//ABlocksIOT: " + a);
    "ethernet" == a && (Blockly.Arduino.definitions_.define_spi = "#include <SPI.h>\n", Blockly.Arduino.definitions_.define_ethernet = "#include <Ethernet.h>\n", Blockly.Arduino.definitions_.define_mqtt = '#include "ABlocksIOTMQTTEthernet.h"\n', Blockly.Arduino.definitions_.var_mqtt_mac || (Blockly.Arduino.definitions_.var_mqtt_mac = "const byte mqtt_mac[] = {  0xDE, 0xED, 0xBA, 0xFE, 0xFE, 0x01 };"));
    "esp8266" == a && (Blockly.Arduino.definitions_.define_softserial =
        "#include <SoftwareSerial.h>\n", Blockly.Arduino.definitions_.define_mqtt = '#include "ABlocksIOTMQTTESP8266.h"\n', Blockly.Arduino.definitions_.var_mqtt_esp8266 = mqttserial_varDef(b, c) + "\nESP8266 mqtt_esp8266_wifi(&mqtt_esp8266_serial);");
    Blockly.Arduino.definitions_.var_mqtt_broker || (Blockly.Arduino.definitions_.var_mqtt_broker = 'const char mqtt_broker[]="iot.eclipse.org";');
    Blockly.Arduino.definitions_.var_mqtt_port || (Blockly.Arduino.definitions_.var_mqtt_port = "const int mqtt_port=1883;");
    Blockly.Arduino.definitions_.var_mqtt_user ||
        (Blockly.Arduino.definitions_.var_mqtt_user = 'const char mqtt_user[]="";');
    Blockly.Arduino.definitions_.var_mqtt_pass || (Blockly.Arduino.definitions_.var_mqtt_pass = 'const char mqtt_pass[]="";');
    Blockly.Arduino.definitions_.var_mqtt_clientid || (Blockly.Arduino.definitions_.var_mqtt_clientid = 'const char mqtt_clientid[]="AB_client";');
    Blockly.Arduino.definitions_.var_mqtt_payload = "char mqtt_payload[64];";
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_payload2double = "\ndouble mqtt_payload2double(unsigned char *_payload, int _length){\n\tint i;\n\tfor (i = 0; i<_length && i<64; i++){\n\t\tmqtt_payload[i] = _payload[i];\n\t}\n\tmqtt_payload[i] = 0;\n\treturn atof(mqtt_payload);\n}";
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_payload2string = "\nString mqtt_payload2string(unsigned char *_payload, int _length){\n\tint i;\n\tfor (i = 0; i<_length && i<64; i++){\n\t\tmqtt_payload[i] = _payload[i];\n\t}\n\tmqtt_payload[i] = 0;\n\treturn String(mqtt_payload);\n}";
    Blockly.Arduino.loops_.loop_iot = "\tABlocksIOT.loop();";
    Blockly.Arduino.definitions_.var_mqtt_esp8266 && (Blockly.Arduino.loops_.loop_iot = "\tmqtt_esp8266_serial.listen(); ABlocksIOT.loop();");
    (a = Blockly.Arduino.definitions_.var_mqtt_esp8266) &&
    a.startsWith("HardwareSerial") && (Blockly.Arduino.loops_.loop_iot = "\tABlocksIOT.loop();");
    var d;
    a = "void mqtt_callback(char* _topic, unsigned char* _payload, unsigned int _payloadlength){\n\tdouble v=mqtt_payload2double(_payload,_payloadlength);\n\tString vt=mqtt_payload2string(_payload,_payloadlength);\n";
    for (d in Blockly.Arduino.mqtt_sub_) b = Blockly.Arduino.mqtt_sub_[d], a = b.startsWith("s_") ? a + ("\tif(String(_topic)==String(" + d + "))" + b + "=vt;\n") : a + ("\tif(String(_topic)==String(" + d + "))" + b + "=v;\n");
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_callback =
        a + "}\n";
    a = "void mqtt_subscribe(){\n";
    for (d in Blockly.Arduino.mqtt_sub_) a += "\tABlocksIOT.Subscribe(String(" + d + "));\n";
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_subscribe = a + "}\n"
}
Blockly.Arduino.mqtt_init = function() {
    var a = Blockly.Arduino.quote_(this.getFieldValue("MAC")),
        b = Blockly.Arduino.quote_(this.getFieldValue("BROKER")),
        c = this.getFieldValue("PORT"),
        d = Blockly.Arduino.quote_(this.getFieldValue("USER")),
        f = Blockly.Arduino.quote_(this.getFieldValue("PASS")),
        e = Blockly.Arduino.quote_(this.getFieldValue("CLIENTID"));
    Blockly.Arduino.definitions_.var_mqtt_mac = "byte mqtt_mac[] = {" + a + "};";
    Blockly.Arduino.definitions_.var_mqtt_broker = "const char mqtt_broker[]=" + b + ";";
    Blockly.Arduino.definitions_.var_mqtt_port =
        "const int mqtt_port=" + c + ";";
    Blockly.Arduino.definitions_.var_mqtt_user = "const char mqtt_user[]=" + d + ";";
    Blockly.Arduino.definitions_.var_mqtt_pass = "const char mqtt_pass[]=" + f + ";";
    Blockly.Arduino.definitions_.var_mqtt_clientid = "const char mqtt_clientid[]=" + e + ";";
    setupMQTT("ethernet", 0, 0);
    Blockly.Arduino.setups_.setup_mqtt = "\t ABlocksIOT.begin(mqtt_broker,mqtt_port, mqtt_user,mqtt_pass, mqtt_clientid, mqtt_mac, mqtt_callback, mqtt_subscribe);";
    return ""
};
Blockly.Arduino.mqtt_init_EP = Blockly.Arduino.mqtt_init;
Blockly.Arduino.mqtt_init_esp8266 = function() {
    var a = Blockly.Arduino.quote_(this.getFieldValue("BROKER")),
        b = this.getFieldValue("PORT"),
        c = Blockly.Arduino.quote_(this.getFieldValue("USER")),
        d = Blockly.Arduino.quote_(this.getFieldValue("PASS")),
        f = Blockly.Arduino.quote_(this.getFieldValue("CLIENTID")),
        e = Blockly.Arduino.quote_(this.getFieldValue("WIFINAME")),
        g = Blockly.Arduino.quote_(this.getFieldValue("WIFIPASS")),
        h = this.getFieldValue("BAUD"),
        k = this.getFieldValue("RX"),
        l = this.getFieldValue("TX");
    Blockly.Arduino.definitions_.var_mqtt_broker =
        "const char mqtt_broker[]=" + a + ";";
    Blockly.Arduino.definitions_.var_mqtt_port = "const int mqtt_port=" + b + ";";
    Blockly.Arduino.definitions_.var_mqtt_user = "const char mqtt_user[]=" + c + ";";
    Blockly.Arduino.definitions_.var_mqtt_pass = "const char mqtt_pass[]=" + d + ";";
    Blockly.Arduino.definitions_.var_mqtt_clientid = "const char mqtt_clientid[]=" + f + ";";
    Blockly.Arduino.definitions_.var_mqtt_wifi_ssid = "const char mqtt_wifi_ssid[]=" + e + ";";
    Blockly.Arduino.definitions_.var_mqtt_wifi_pass = "const char mqtt_wifi_pass[]=" +
        g + ";";
    setupMQTT("esp8266", k, l, h);
    Blockly.Arduino.setups_.setup_mqtt = "\tmqtt_esp8266_serial.begin(" + h + ");\n\tABlocksIOT.begin(mqtt_broker,mqtt_port, mqtt_user,mqtt_pass, mqtt_clientid, mqtt_esp8266_wifi, mqtt_wifi_ssid, mqtt_wifi_pass, mqtt_callback, mqtt_subscribe);";
    return ""
};
Blockly.Arduino.mqtt_init_esp8266_EP = Blockly.Arduino.mqtt_init_esp8266;
Blockly.Arduino.mqtt_pub = function() {
    var a = Blockly.Arduino.valueToCode(this, "TOPIC", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''",
        b = Blockly.Arduino.valueToCode(this, "MSG", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''",
        c = "ABlocksIOT.Publish(String(" + a + "), String(" + b + "));\n";
    Blockly.Arduino.definitions_.var_mqtt_esp8266 && (c = "mqtt_esp8266_serial.listen(); ABlocksIOT.Publish(String(" + a + "), String(" + b + "));\n");
    var d = Blockly.Arduino.definitions_.var_mqtt_esp8266;
    d && d.startsWith("HardwareSerial") && (c = "ABlocksIOT.Publish(String(" +
        a + "), String(" + b + "));\n");
    "esp8266" == profile["default"].micro && (c = "mqtt_client.publish(String(" + a + ").c_str(),String(" + b + ").c_str());\n");
    return c
};
Blockly.Arduino.mqtt_sub = function() {
    var a = Blockly.Arduino.valueToCode(this, "TOPIC", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''",
        b = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.mqtt_sub_[a] = b;
    "esp8266" == profile["default"].micro ? setupMQTT_ESP() : setupMQTT("", 0, 0);
    return ""
};
Blockly.Arduino.mqtt_sub_text = function() {
    var a = Blockly.Arduino.valueToCode(this, "TOPIC", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''",
        b = Blockly.Arduino.variableDB_Text_.getName(this.getFieldValue("VARTEXT"), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.mqtt_sub_[a] = "s_" + b;
    "esp8266" == profile["default"].micro ? setupMQTT_ESP() : setupMQTT("", 0, 0);
    return ""
};
Blockly.Arduino.mqtt_isconnected = function() {
    var a = Blockly.Arduino.definitions_.var_mqtt_esp8266,
        b = "ABlocksIOT.isConnected()";
    Blockly.Arduino.definitions_.var_mqtt_esp8266 && (b = "mqtt_esp8266_serial.listen(); ABlocksIOT.isConnected()");
    a && a.startsWith("HardwareSerial") && (b = "ABlocksIOT.isConnected()");
    "esp8266" == profile["default"].micro && (b = "mqtt_client.connected()");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.mqtt_thingspeak_pub = function() {
    var a = this.getFieldValue("CHANNEL"),
        b = this.getFieldValue("FIELD"),
        c = this.getFieldValue("APIKEY");
    return [Blockly.Arduino.quote_("channels/" + a + "/publish/fields/" + b + "/" + c), Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.mqtt_thingspeak_sub = function() {
    var a = this.getFieldValue("CHANNEL"),
        b = this.getFieldValue("FIELD"),
        c = this.getFieldValue("APIKEY"),
        d = Blockly.Arduino.quote_("channels/" + a + "/subscribe/fields/" + b + "/" + c);
    "" == c && (d = Blockly.Arduino.quote_("channels/" + a + "/subscribe/fields/" + b));
    return [d, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.mqtt_adafruit_pub = function() {
    var a = this.getFieldValue("USER"),
        b = this.getFieldValue("FEED");
    return [Blockly.Arduino.quote_(a + "/f/" + b), Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.mqtt_adafruit_sub = function() {
    var a = this.getFieldValue("USER"),
        b = this.getFieldValue("FEED");
    return [Blockly.Arduino.quote_(a + "/f/" + b), Blockly.Arduino.ORDER_ATOMIC]
};

function setupMQTT_ESP() {
    Blockly.Arduino.definitions_.define_esp8266wifi = '#include "ESP8266WiFi.h"\n';
    Blockly.Arduino.definitions_.define_mqtt = '#include "PubSubClient.h"\n';
    Blockly.Arduino.definitions_.var_wificlient = "WiFiClient mqtt_wifiClient;";
    Blockly.Arduino.definitions_.var_mqtt = "PubSubClient mqtt_client(mqtt_wifiClient);";
    Blockly.Arduino.definitions_.var_mqtt_broker || (Blockly.Arduino.definitions_.var_mqtt_broker = 'const char mqtt_broker[]="iot.eclipse.org";');
    Blockly.Arduino.definitions_.var_mqtt_port ||
        (Blockly.Arduino.definitions_.var_mqtt_port = "const int mqtt_port=1883;");
    Blockly.Arduino.definitions_.var_mqtt_user || (Blockly.Arduino.definitions_.var_mqtt_user = 'const char mqtt_user[]="";');
    Blockly.Arduino.definitions_.var_mqtt_pass || (Blockly.Arduino.definitions_.var_mqtt_pass = 'const char mqtt_pass[]="";');
    Blockly.Arduino.definitions_.var_mqtt_clientid || (Blockly.Arduino.definitions_.var_mqtt_clientid = 'const char mqtt_clientid[]="AB_client";');
    Blockly.Arduino.definitions_.var_mqtt_payload = "char mqtt_payload[64];";
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_setupwifi = "\nvoid mqtt_setup(){\n\tdelay(10);;\n\tWiFi.begin(mqtt_wifi_ssid,mqtt_wifi_pass);\n\twhile (WiFi.status() != WL_CONNECTED) delay(500);\n\trandomSeed(micros());\n  mqtt_client.setServer(mqtt_broker, mqtt_port);\n  mqtt_client.setCallback(mqtt_callback);\n\tmqtt_subscribe();\n}";
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_loop = "\nvoid mqtt_loop(){\n\tif (!mqtt_client.connected()) {\n\t\tmqtt_client.connect(mqtt_clientid,mqtt_user,mqtt_pass);\n\t\tmqtt_subscribe();\n\t}\n\tif (mqtt_client.connected()) {\n  \tmqtt_client.loop();\n\t}\n}";
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_payload2double = "\ndouble mqtt_payload2double(unsigned char *_payload, int _length){\n\tint i;\n\tfor (i = 0; i<_length && i<64; i++){\n\t\tmqtt_payload[i] = _payload[i];\n\t}\n\tmqtt_payload[i] = 0;\n\treturn atof(mqtt_payload);\n}";
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_payload2string = "\nString mqtt_payload2string(unsigned char *_payload, int _length){\n\tint i;\n\tfor (i = 0; i<_length && i<64; i++){\n\t\tmqtt_payload[i] = _payload[i];\n\t}\n\tmqtt_payload[i] = 0;\n\treturn String(mqtt_payload);\n}";
    Blockly.Arduino.loops_.loop_mqtt = "\tmqtt_loop();";
    var a;
    var b = "void mqtt_callback(char* _topic, unsigned char* _payload, unsigned int _payloadlength){\n\tdouble v=mqtt_payload2double(_payload,_payloadlength);\n\tString vt=mqtt_payload2string(_payload,_payloadlength);\n";
    for (a in Blockly.Arduino.mqtt_sub_) {
        var c = Blockly.Arduino.mqtt_sub_[a];
        b = c.startsWith("s_") ? b + ("\tif(String(_topic)==String(" + a + "))" + c + "=vt;\n") : b + ("\tif(String(_topic)==String(" + a + "))" + c + "=v;\n")
    }
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_callback =
        b + "}\n";
    b = "void mqtt_subscribe(){\n";
    for (a in Blockly.Arduino.mqtt_sub_) b = "esp8266" == profile["default"].micro ? b + ("\tmqtt_client.subscribe(String(" + a + ").c_str());\n") : b + ("\tmqtt_client.Subscribe(String(" + a + "));\n");
    Blockly.Arduino.definitions_fnc_.fnc_mqtt_subscribe = b + "}\n"
}
Blockly.Arduino.mqtt_init_ESP = function() {
    var a = Blockly.Arduino.quote_(this.getFieldValue("BROKER")),
        b = this.getFieldValue("PORT"),
        c = Blockly.Arduino.quote_(this.getFieldValue("USER")),
        d = Blockly.Arduino.quote_(this.getFieldValue("PASS")),
        f = Blockly.Arduino.quote_(this.getFieldValue("CLIENTID")),
        e = Blockly.Arduino.quote_(this.getFieldValue("WIFINAME")),
        g = Blockly.Arduino.quote_(this.getFieldValue("WIFIPASS"));
    Blockly.Arduino.definitions_.var_mqtt_wifi_ssid = "const char mqtt_wifi_ssid[]=" + e + ";";
    Blockly.Arduino.definitions_.var_mqtt_wifi_pass =
        "const char mqtt_wifi_pass[]=" + g + ";";
    Blockly.Arduino.definitions_.var_mqtt_broker = "const char mqtt_broker[]=" + a + ";";
    Blockly.Arduino.definitions_.var_mqtt_port = "const int mqtt_port=" + b + ";";
    Blockly.Arduino.definitions_.var_mqtt_user = "const char mqtt_user[]=" + c + ";";
    Blockly.Arduino.definitions_.var_mqtt_pass = "const char mqtt_pass[]=" + d + ";";
    Blockly.Arduino.definitions_.var_mqtt_clientid = "const char mqtt_clientid[]=" + f + ";";
    setupMQTT_ESP();
    Blockly.Arduino.setups_.setup_mqtt = "\tmqtt_setup();";
    return ""
};
Blockly.Arduino.neopixel = {};

function hexToR(a) {
    return parseInt(cutHex(a).substring(0, 2), 16)
}

function hexToG(a) {
    return parseInt(cutHex(a).substring(2, 4), 16)
}

function hexToB(a) {
    return parseInt(cutHex(a).substring(4, 6), 16)
}

function cutHex(a) {
    return "#" == a.charAt(0) ? a.substring(1, 7) : a
}
Blockly.Arduino.neopixel_init = function() {
    var a = this.getFieldValue("RGBMODE"),
        b = this.getFieldValue("FREQ"),
        c = this.getFieldValue("PIN"),
        d = Blockly.Arduino.valueToCode(this, "LEDCOUNT", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_.define_neopixel = "#include <ABlocks_NeoPixel.h>\n";
    Blockly.Arduino.definitions_.var_neopixel = "Adafruit_NeoPixel neo_pixel = Adafruit_NeoPixel(" + d + "," + c + "," + a + "+" + b + ");\n";
    Blockly.Arduino.setups_.setup_neopixel = "neo_pixel.begin();\n";
    return ""
};
Blockly.Arduino.neopixel_clear = function() {
    return Blockly.Arduino.definitions_.define_neopixel ? "neo_pixel.clear();\n" : ""
};
Blockly.Arduino.neopixel_setled = function() {
    var a = Blockly.Arduino.valueToCode(this, "LEDNUMBER", Blockly.Arduino.ORDER_ATOMIC),
        b = Blockly.Arduino.valueToCode(this, "R", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "G", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "B", Blockly.Arduino.ORDER_ATOMIC);
    return "neo_pixel.setPixelColor(" + a + ", neo_pixel.Color(" + b + "," + c + "," + d + "));\n"
};
Blockly.Arduino.neopixel_setledxy = function() {
    var a = 8,
        b = 8,
        c = this.getFieldValue("MATRIXSIZE");
    "8x8" == c && (b = a = 8);
    "16x16" == c && (b = a = 16);
    "8x5" == c && (a = 8, b = 5);
    c = Blockly.Arduino.valueToCode(this, "X", Blockly.Arduino.ORDER_ATOMIC);
    var d = Blockly.Arduino.valueToCode(this, "Y", Blockly.Arduino.ORDER_ATOMIC);
    1 > c && (c = 1);
    1 > d && (c = 1);
    c > a && (c = a);
    d > b && (d = b);
    b = Blockly.Arduino.valueToCode(this, "R", Blockly.Arduino.ORDER_ATOMIC);
    var f = Blockly.Arduino.valueToCode(this, "G", Blockly.Arduino.ORDER_ATOMIC),
        e = Blockly.Arduino.valueToCode(this,
            "B", Blockly.Arduino.ORDER_ATOMIC);
    return "neo_pixel.setPixelColor(((" + d + "*" + a + ")+" + c + "), neo_pixel.Color(" + b + "," + f + "," + e + "));\n"
};
Blockly.Arduino.neopixel_setled2 = function() {
    var a = Blockly.Arduino.valueToCode(this, "LEDNUMBER", Blockly.Arduino.ORDER_ATOMIC),
        b = this.getFieldValue("COLOR"),
        c = hexToR(b),
        d = hexToG(b);
    b = hexToB(b);
    return "neo_pixel.setPixelColor(" + a + ", neo_pixel.Color(" + c + "," + d + "," + b + ") );\n"
};
Blockly.Arduino.neopixel_setled2xy = function() {
    var a = 8,
        b = 8,
        c = this.getFieldValue("MATRIXSIZE");
    "8x8" == c && (b = a = 8);
    "16x16" == c && (b = a = 16);
    "8x5" == c && (a = 8, b = 5);
    c = Blockly.Arduino.valueToCode(this, "X", Blockly.Arduino.ORDER_ATOMIC);
    var d = Blockly.Arduino.valueToCode(this, "Y", Blockly.Arduino.ORDER_ATOMIC);
    1 > c && (c = 1);
    1 > d && (c = 1);
    c > a && (c = a);
    d > b && (d = b);
    var f = this.getFieldValue("COLOR");
    b = hexToR(f);
    var e = hexToG(f);
    f = hexToB(f);
    return "neo_pixel.setPixelColor(((" + d + "*" + a + ")+" + c + "), neo_pixel.Color(" + b + "," + e + "," + f + "));\n"
};
Blockly.Arduino.neopixel_setdata = function() {
    var a = "",
        b = this.getFieldValue("DATA");
    null != b && "" != b && (Blockly.Arduino.definitions_fnc_.fnc_neopixel_setdata = "void neopixel_setdata(const unsigned long *_data){\r\n\tunsigned long _lcount=pgm_read_dword_near(_data);\r\n\tfor(int i=0;i<_lcount;i++){\r\n\t\tunsigned long _dd=pgm_read_dword_near(&_data[i+1]);\r\n\t\tneo_pixel.setPixelColor(i,_dd);\r\n\t}\r\n}\r\n", Blockly.Arduino.definitions_["var_neopixeldata_" + Blockly.Arduino.neopixel_count] = "const unsigned long neopixel_data_" +
        Blockly.Arduino.neopixel_count + "[] PROGMEM = {" + b + "};\r\n", a = "neopixel_setdata(neopixel_data_" + Blockly.Arduino.neopixel_count + ");\n", Blockly.Arduino.neopixel_count++);
    return a
};
Blockly.Arduino.neopixel_show = function() {
    return "neo_pixel.show();\n"
};
Blockly.Arduino.oled = {};
Blockly.Arduino.oled_init = function() {
    var a = this.getFieldValue("ADDR"),
        b = this.getFieldValue("ID");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_adafruit_gfx = "#include <Adafruit_GFX.h>";
    Blockly.Arduino.definitions_.define_oled = "#include <Adafruit_SSD1306.h>";
    Blockly.Arduino.definitions_["var_oled_" + b] = "Adafruit_SSD1306 oled_" + b + "(128,64, &Wire,-1);";
    Blockly.Arduino.setups_["setup_oled_" + b] = "\toled_" + b + ".begin(SSD1306_SWITCHCAPVCC," + a + ");\n";
    return ""
};
Blockly.Arduino.oled_init_EP = Blockly.Arduino.oled_init;
Blockly.Arduino.oled_clear = function() {
    var a = this.getFieldValue("ID");
    return "oled_" + a + ".clearDisplay(); oled_" + a + ".display();\n"
};
Blockly.Arduino.oled_clear_EP = Blockly.Arduino.oled_clear;
Blockly.Arduino.oled_drawpixel = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "X", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "Y", Blockly.Arduino.ORDER_ATOMIC),
        d = this.getFieldValue("COL");
    return "oled_" + a + ".drawPixel(" + b + "," + c + "," + d + "); oled_" + a + ".display();\n"
};
Blockly.Arduino.oled_drawpixel_EP = Blockly.Arduino.oled_drawpixel;
Blockly.Arduino.oled_drawline = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "X1", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "Y1", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "X2", Blockly.Arduino.ORDER_ATOMIC),
        f = Blockly.Arduino.valueToCode(this, "Y2", Blockly.Arduino.ORDER_ATOMIC),
        e = this.getFieldValue("COL");
    return "oled_" + a + ".drawLine(" + b + "," + c + "," + d + "," + f + "," + e + "); oled_" + a + ".display();\n"
};
Blockly.Arduino.oled_drawline_EP = Blockly.Arduino.oled_drawline;
Blockly.Arduino.oled_drawrectangle = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "X1", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "Y1", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "X2", Blockly.Arduino.ORDER_ATOMIC),
        f = Blockly.Arduino.valueToCode(this, "Y2", Blockly.Arduino.ORDER_ATOMIC),
        e = this.getFieldValue("COL"),
        g = "drawRect";
    "TRUE" == this.getFieldValue("FILL") && (g = "fillRect");
    return "oled_" + a + "." + g + "(" + b + "," + c + "," + d + "," + f + "," + e +
        "); oled_" + a + ".display();\n"
};
Blockly.Arduino.oled_drawrectangle_EP = Blockly.Arduino.oled_drawrectangle;
Blockly.Arduino.oled_drawcircle = function() {
    var a = this.getFieldValue("ID"),
        b = Blockly.Arduino.valueToCode(this, "X", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "Y", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "R", Blockly.Arduino.ORDER_ATOMIC),
        f = this.getFieldValue("COL"),
        e = "drawCircle";
    "TRUE" == this.getFieldValue("FILL") && (e = "fillCircle");
    return "oled_" + a + "." + e + "(" + b + "," + c + "," + d + "," + f + "); oled_" + a + ".display();\n"
};
Blockly.Arduino.oled_drawcircle_EP = Blockly.Arduino.oled_drawcircle;
Blockly.Arduino.oled_drawtext = function() {
    var a = Blockly.Arduino.valueToCode(this, "TXT", Blockly.Arduino.ORDER_ATOMIC) || "''",
        b = this.getFieldValue("ID"),
        c = Blockly.Arduino.valueToCode(this, "X", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "Y", Blockly.Arduino.ORDER_ATOMIC),
        f = this.getFieldValue("SIZE"),
        e = this.getFieldValue("COL");
    return "oled_" + b + ".setTextSize(" + f + "); oled_" + b + ".setTextColor(" + e + "); oled_" + b + ".setCursor(" + c + "," + d + "); oled_" + b + ".print(" + a + "); oled_" + b + ".display();\n"
};
Blockly.Arduino.oled_drawtext_EP = Blockly.Arduino.oled_drawtext;
Blockly.Arduino.oled_drawbitmap = function() {
    var a = Blockly.Arduino.valueToCode(this, "X", Blockly.Arduino.ORDER_ATOMIC),
        b = Blockly.Arduino.valueToCode(this, "Y", Blockly.Arduino.ORDER_ATOMIC),
        c = this.getFieldValue("DATA"),
        d = this.getFieldValue("ID");
    Blockly.Arduino.definitions_["var_oleddata_" + Blockly.Arduino.oled_count] = "esp8266" == profile["default"].micro ? "static const uint8_t oled_data_" + Blockly.Arduino.oled_count + "[] = {" + c + "};" : "static const uint8_t PROGMEM oled_data_" + Blockly.Arduino.oled_count + "[] PROGMEM = {" +
        c + "};";
    a = "oled_" + d + ".clearDisplay(); oled_" + d + ".drawBitmap(" + a + "," + b + ",&oled_data_" + Blockly.Arduino.oled_count + "[2],oled_data_" + Blockly.Arduino.oled_count + "[0], oled_data_" + Blockly.Arduino.oled_count + "[1],WHITE); oled_" + d + ".display();\n";
    Blockly.Arduino.oled_count++;
    return a
};
Blockly.Arduino.oled_drawbitmap_EP = Blockly.Arduino.oled_drawbitmap;
Blockly.Arduino.oled_rotation = function() {
    var a = this.getFieldValue("ID"),
        b = this.getFieldValue("ROT");
    return "oled_" + a + ".setRotation(" + b + ");\n"
};
Blockly.Arduino.oled_rotation_EP = Blockly.Arduino.oled_rotation;

function setupOtto() {
    Blockly.Arduino.definitions_.define_servo = "#include <Servo.h>";
    Blockly.Arduino.definitions_.define_otto = '#include "Otto.h"';
    Blockly.Arduino.definitions_.define_us = '#include "US.h"';
    Blockly.Arduino.definitions_.define_oscillator = '#include "Oscillator.h"';
    Blockly.Arduino.definitions_.var_otto || (Blockly.Arduino.definitions_.var_otto = "Otto robot_otto;");
    Blockly.Arduino.setups_.setup_otto || (Blockly.Arduino.setups_.setup_otto = "robot_otto.init(2,3,4,5,false,A6,13,8,9);")
}
Blockly.Arduino.otto_calibrate = function() {
    setupOtto();
    var a = Blockly.Arduino.valueToCode(this, "LEGL", Blockly.Arduino.ORDER_ATOMIC),
        b = Blockly.Arduino.valueToCode(this, "LEGR", Blockly.Arduino.ORDER_ATOMIC),
        c = Blockly.Arduino.valueToCode(this, "FOOTL", Blockly.Arduino.ORDER_ATOMIC),
        d = Blockly.Arduino.valueToCode(this, "FOOTR", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_.setup_otto_calibrate = "robot_otto.setTrims(" + a + "," + b + "," + c + "," + d + ");";
    return ""
};
Blockly.Arduino.otto_move = function() {
    setupOtto();
    var a = this.getFieldValue("MOV"),
        b = this.getFieldValue("SPEED"),
        c = this.getFieldValue("AMPLITUDE"),
        d = "robot_otto.";
    "home" == a && (d += "home();");
    "walkF" == a && (d += "walk(1," + b + ",1);");
    "walkB" == a && (d += "walk(1," + b + ",-1);");
    "turnL" == a && (d += "turn(1," + b + ",1);");
    "turnR" == a && (d += "turn(1," + b + ",-1);");
    "jump" == a && (d += "jump(1," + b + ");");
    "bendL" == a && (d += "bend(1," + b + ",1);");
    "bendR" == a && (d += "bend(1," + b + ",-1);");
    "shakeL" == a && (d += "shakeLeg(1," + b + ",1);");
    "shakeR" == a && (d += "shakeLeg(1," +
        b + ",-1);");
    "updown" == a && (d += "updown(1," + b + "," + c + ");");
    "moonwalkerL" == a && (d += "moonwalker(1," + b + "," + c + ",1);");
    "moonwalkerR" == a && (d += "moonwalker(1," + b + "," + c + ",-1);");
    "swing" == a && (d += "swing(1," + b + "," + c + ");");
    "crusaito1" == a && (d += "crusaito(1," + b + "," + c + ",1);");
    "crusaito2" == a && (d += "crusaito(1," + b + "," + c + ",-1);");
    "flapping1" == a && (d += "flapping(1," + b + "," + c + ",1);");
    "flapping2" == a && (d += "flapping(1," + b + "," + c + ",-1);");
    "tiptoeswing" == a && (d += "tiptoeSwing(1," + b + "," + c + ");");
    "jitter" == a && (d += "jitter(1," + b + "," + c + ");");
    "ascendingturn" == a && (d += "ascendingTurn(1," + b + "," + c + ");");
    return d + "\n"
};
Blockly.Arduino.otto_sing = function() {
    setupOtto();
    return "robot_otto.sing(" + this.getFieldValue("SOUND") + ");\n"
};
Blockly.Arduino.otto_note = function() {
    setupOtto();
    var a = this.getFieldValue("FREQ"),
        b = Blockly.Arduino.valueToCode(this, "DURATION", Blockly.Arduino.ORDER_ATOMIC);
    return "robot_otto._playNote(" + a + ",(long)" + b + ");\n"
};
Blockly.Arduino.otto_mouth = function() {
    setupOtto();
    var a = this.getFieldValue("MOUTH");
    return 0 > a ? "robot_otto.clearMouth();\n" : "robot_otto.putMouth(" + a + ",true);\n"
};
Blockly.Arduino.otto_gesture = function() {
    setupOtto();
    return "robot_otto.playGesture(" + this.getFieldValue("GESTURE") + ");\n"
};
Blockly.Arduino.otto_distance = function() {
    setupOtto();
    return ["robot_otto.getDistance()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.otto_noise = function() {
    setupOtto();
    return ["robot_otto.getNoise()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.otto_button = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("STATUS");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    Blockly.Arduino.definitions_.define_button_debounced = '#include "ABlocks_Button.h"';
    Blockly.Arduino.definitions_["var_button_debounced_" + a] = "Button button_debounced_" + a + "(" + a + ",50);\n";
    var c = "";
    "pressed" == b && (c = "button_debounced_" + a + ".pressed()");
    "released" == b && (c = "button_debounced_" + a + ".released()");
    return [c, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.rfid = {};
Blockly.Language || (Blockly.Language = {});

function setupRFID() {
    Blockly.Arduino.definitions_.define_rfid || (Blockly.Arduino.definitions_.define_spi = "#include <SPI.h>\n", Blockly.Arduino.definitions_.define_rfid = '#include "ABlocks_MFRC522.h"');
    Blockly.Arduino.definitions_.var_rfid || (Blockly.Arduino.definitions_.var_rfid = "MFRC522 mfrc522(10, 9);\n");
    Blockly.Arduino.setups_.setup_rfid || (Blockly.Arduino.setups_.setup_rfid = "SPI.begin(); mfrc522.PCD_Init();\n");
    Blockly.Arduino.definitions_fnc_.fnc_rfid = 'String fnc_rfid_readID(){\n\tString v="";\n\tif(!mfrc522.PICC_ReadCardSerial()) return v;\n\tfor ( uint8_t i = 0; i < mfrc522.uid.size; i++) {\n\t\tuint8_t _baux=(uint8_t)mfrc522.uid.uidByte[i];\n\t\tv+=String((uint8_t)_baux, HEX);\n\t}\n\tmfrc522.PICC_HaltA();\n\treturn v;\n}\n'
}
Blockly.Arduino.rfid_init = function() {
    setupRFID();
    var a = this.getFieldValue("CS_PIN"),
        b = this.getFieldValue("RST_PIN");
    Blockly.Arduino.definitions_.var_rfid = "MFRC522 mfrc522(" + a + "," + b + ");\n";
    return ""
};
Blockly.Arduino.rfid_newcardpresent = function() {
    setupRFID();
    return ["mfrc522.PICC_IsNewCardPresent()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.rfid_readuid = function() {
    setupRFID();
    return ["fnc_rfid_readID()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.rtc = {};

function setupRtc() {
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_rtc = '#include "ABlocks_DS3231rtc.h"';
    Blockly.Arduino.definitions_.var_rtc = "DS3231rtc rtc;\n";
    Blockly.Arduino.setups_.setup_rtc = "rtc.begin();\n"
}
Blockly.Arduino.rtc_set_time = function() {
    setupRtc();
    var a = Blockly.Arduino.valueToCode(this, "HOUR", Blockly.Arduino.ORDER_ATOMIC) || "0",
        b = Blockly.Arduino.valueToCode(this, "MINUTE", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = Blockly.Arduino.valueToCode(this, "SECOND", Blockly.Arduino.ORDER_ATOMIC) || "0",
        d = Blockly.Arduino.valueToCode(this, "DAY", Blockly.Arduino.ORDER_ATOMIC) || "0",
        f = Blockly.Arduino.valueToCode(this, "MONTH", Blockly.Arduino.ORDER_ATOMIC) || "0",
        e = Blockly.Arduino.valueToCode(this, "YEAR", Blockly.Arduino.ORDER_ATOMIC) ||
        "0";
    2E3 <= e && (e -= 2E3);
    return "rtc.setTime(" + c + "," + b + "," + a + "," + d + "," + f + "," + e + ");\n"
};
Blockly.Arduino.rtc_set_time_EP = Blockly.Arduino.rtc_set_time;
Blockly.Arduino.rtc_set = function() {
    setupRtc();
    var a = this.getFieldValue("FIELD"),
        b = Blockly.Arduino.valueToCode(this, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = "";
    "day" == a && (c = "rtc.setTime(rtc.getSecond(),rtc.getMinute(),rtc.getHour()," + b + ",rtc.getMonth(),rtc.getYear());\n");
    "month" == a && (c = "rtc.setTime(rtc.getSecond(),rtc.getMinute(),rtc.getHour(),rtc.getDay()," + b + ",rtc.getYear());\n");
    "year" == a && (2E3 <= b && (b -= 2E3), c = "rtc.setTime(rtc.getSecond(),rtc.getMinute(),rtc.getHour(),rtc.getDay(),rtc.getMonth()," +
        b + ");\n");
    "hour" == a && (c = "rtc.setTime(rtc.getSecond(),rtc.getMinute()," + b + ",rtc.getDay(),rtc.getMonth(),rtc.getYear());\n");
    "minute" == a && (c = "rtc.setTime(rtc.getSecond()," + b + ",rtc.getHour(),rtc.getDay(),rtc.getMonth(),rtc.getYear());\n");
    "second" == a && (c = "rtc.setTime(" + b + ",rtc.getMinute(),rtc.getHour(),rtc.getDay(),rtc.getMonth(),rtc.getYear());\n");
    return c
};
Blockly.Arduino.rtc_set_EP = Blockly.Arduino.rtc_set;
Blockly.Arduino.rtc_get = function() {
    setupRtc();
    var a = this.getFieldValue("FIELD"),
        b = "";
    "day" == a && (b = "rtc.getDay()");
    "month" == a && (b = "rtc.getMonth()");
    "year" == a && (b = "(2000+rtc.getYear())");
    "hour" == a && (b = "rtc.getHour()");
    "minute" == a && (b = "rtc.getMinute()");
    "second" == a && (b = "rtc.getSecond()");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.rtc_get_EP = Blockly.Arduino.rtc_get;
Blockly.Arduino.rtc_get_time_text = function() {
    setupRtc();
    Blockly.Arduino.definitions_fnc_.rtc_time_text = '\nString rtc_time_text(){\n\tchar rtcbuffer[10];\n\tsprintf(rtcbuffer,"%02d:%02d:%02d", rtc.getHour(), rtc.getMinute(), rtc.getSecond() );\n\treturn String(rtcbuffer);\n}\n';
    return ["rtc_time_text()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.rtc_get_time_text_EP = Blockly.Arduino.rtc_get_time_text;
Blockly.Arduino.rtc_get_date_text = function() {
    setupRtc();
    Blockly.Arduino.definitions_fnc_.rtc_date_text = '\nString rtc_date_text(){\n\tchar rtcbuffer[12];\n\tsprintf(rtcbuffer,"%02d/%02d/%04d", rtc.getDay(), rtc.getMonth(), (2000+rtc.getYear()) );\n\treturn String(rtcbuffer);\n}\n';
    return ["rtc_date_text()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.rtc_get_date_text_EP = Blockly.Arduino.rtc_get_date_text;
Blockly.Arduino.sd = {};
Blockly.Language || (Blockly.Language = {});

function setupSD() {
    Blockly.Arduino.definitions_.define_spi = "#include <SPI.h>\n";
    Blockly.Arduino.definitions_.define_sd = "#include <SD.h>\n";
    Blockly.Arduino.definitions_.var_sdfile || (Blockly.Arduino.definitions_.var_sdfile = "File sd_file;\n");
    Blockly.Arduino.setups_.setup_sd || (Blockly.Arduino.setups_.setup_sd = "\tSD.begin(4);\n")
}
Blockly.Arduino.sd_init = function() {
    setupSD();
    var a = this.getFieldValue("CS");
    Blockly.Arduino.setups_.setup_sd = "\tSD.begin(" + a + ");\n";
    return ""
};
Blockly.Arduino.sd_init_EP = Blockly.Arduino.sd_init;
Blockly.Arduino.sd_print = function() {
    setupSD();
    var a = Blockly.Arduino.valueToCode(this, "FILE", Blockly.Arduino.ORDER_ATOMIC) || "''",
        b = Blockly.Arduino.valueToCode(this, "STRINGOUTPUT", Blockly.Arduino.ORDER_ATOMIC) || "''",
        c = this.getFieldValue("NEWLINE");
    Blockly.Arduino.definitions_fnc_.fnc_sd_print = "void fnc_sd_print(String _f, String _t, boolean _nl){\n\tsd_file = SD.open(_f, FILE_WRITE);\n\tif(sd_file){\n\t\tif(_nl)sd_file.println(_t);\n\t\telse sd_file.print(_t);\n\t\tsd_file.close();\n\t}\n}\n";
    return "fnc_sd_print(" +
        a + ",String(" + b + ")," + ("TRUE" == c ? "true" : "false") + ");\n"
};
Blockly.Arduino.sd_filesize = function() {
    setupSD();
    var a = Blockly.Arduino.valueToCode(this, "FILE", Blockly.Arduino.ORDER_ATOMIC) || "''";
    Blockly.Arduino.definitions_fnc_.fnc_sd_filesize = "unsigned long fnc_sd_filesize(String _f){\n\tunsigned long s=0;\n\tsd_file = SD.open(_f, FILE_READ);\n\tif(sd_file){\n\t\ts=sd_file.size();\n\t\tsd_file.close();\n\t}\n\treturn s;\n}\n";
    return ["fnc_sd_filesize(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sd_readbyte = function() {
    setupSD();
    var a = Blockly.Arduino.valueToCode(this, "FILE", Blockly.Arduino.ORDER_ATOMIC) || "''",
        b = Blockly.Arduino.valueToCode(this, "POS", Blockly.Arduino.ORDER_ATOMIC) || 0;
    Blockly.Arduino.definitions_fnc_.fnc_sd_readbyte = "int fnc_sd_readbyte(String _f, unsigned long _p){\n\tint s=-1;\n\tsd_file = SD.open(_f, FILE_READ);\n\tif(sd_file){\n\t\tif(sd_file.seek(_p)){\n\t\t\ts=sd_file.peek();\n\t\t}\n\t\tsd_file.close();\n\t}\n\treturn s;\n}\n";
    return ["fnc_sd_readbyte(" +
        a + "," + b + ")", Blockly.Arduino.ORDER_ATOMIC
    ]
};
Blockly.Arduino.sd_readloop = function() {
    var a = Blockly.Arduino.valueToCode(this, "FILE", Blockly.Arduino.ORDER_ATOMIC) || "''",
        b = Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        c = Blockly.Arduino.statementToCode(this, "DO");
    a = "int " + b + ";\nsd_file = SD.open(" + (a + ", FILE_READ);\nif(sd_file){\n");
    a += "\twhile(sd_file.available()){\n";
    a = a + ("\t\t" + b + "=sd_file.read();\n") + (c + "\n");
    a += "\t}\n";
    a += "\tsd_file.close();\n";
    return a += "}\n"
};
Blockly.Arduino.sd_writebyte = function() {
    setupSD();
    var a = Blockly.Arduino.valueToCode(this, "FILE", Blockly.Arduino.ORDER_ATOMIC) || "''",
        b = Blockly.Arduino.valueToCode(this, "BYTE", Blockly.Arduino.ORDER_ATOMIC) || 0;
    Blockly.Arduino.definitions_fnc_.fnc_sd_writebyte = "void fnc_sd_writebyte(String _f, int _v){\n\tsd_file = SD.open(_f, FILE_WRITE);\n\tif(sd_file){\n\t\tsd_file.write(_v);\n\t\tsd_file.close();\n\t}\n}\n";
    return "fnc_sd_writebyte(" + a + "," + b + ");\n"
};
Blockly.Arduino.sd_remove = function() {
    setupSD();
    return "SD.remove(" + (Blockly.Arduino.valueToCode(this, "FILE", Blockly.Arduino.ORDER_ATOMIC) || "''") + ");\n"
};
Blockly.Arduino.sd_exists = function() {
    setupSD();
    return ["SD.exists(" + (Blockly.Arduino.valueToCode(this, "FILE", Blockly.Arduino.ORDER_ATOMIC) || "''") + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor = {};
Blockly.Arduino.sensor_adxl335 = function() {
    var a = this.getFieldValue("PINX"),
        b = this.getFieldValue("PINY"),
        c = this.getFieldValue("PINZ");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    Blockly.Arduino.setups_["setup_input_" + b] = "pinMode(" + b + ", INPUT);";
    Blockly.Arduino.setups_["setup_input_" + c] = "pinMode(" + c + ", INPUT);";
    Blockly.Arduino.definitions_fnc_.fnc_adxl335 = "double fnc_adxl335(int _pinx,int _piny,int _pinz,int _type)\n{\n\tint minVal=270;\n\tint maxVal=390;\n\tdouble mvADC=4.8828125; // 5000mV/1024\n\tdouble mvG=550.0; // 3300mV/6g\n\t//raw values\n\tint xRead = analogRead(_pinx);\n\tint yRead = analogRead(_piny);\n\tint zRead = analogRead(_pinz);\n\t//accelerations\n\tdouble aX = ((xRead*mvADC)/mvG)-3.0; // 6 => +-3g\n\tdouble aY = ((yRead*mvADC)/mvG)-3.0;\n\tdouble aZ = ((zRead*mvADC)/mvG)-3.0;\n\tif(_type==0)return aX;\n\tif(_type==1)return aY;\n\tif(_type==2)return aZ;\n\t//angles\n\tint xAng = map(xRead, minVal, maxVal, -90, 90);\n\tint yAng = map(yRead, minVal, maxVal, -90, 90);\n\tint zAng = map(zRead, minVal, maxVal, -90, 90);\n\t//roll, pitch\n\tdouble rX = RAD_TO_DEG * (atan2(-yAng, -zAng) + PI);\n\tdouble pY = RAD_TO_DEG * (atan2(-xAng, -zAng) + PI);\n\tif(_type==3)return rX;\n\tif(_type==4)return pY;\n\treturn 0.0; //invalid type\n}\n";
    var d =
        this.getFieldValue("TYPE");
    return ["fnc_adxl335(" + a + "," + b + "," + c + "," + d + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_potentiometer = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_potentiometer_EP = Blockly.Arduino.sensor_potentiometer;
Blockly.Arduino.sensor_potentiometer_slider_EP = Blockly.Arduino.sensor_potentiometer;
Blockly.Arduino.sensor_button = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("INVERT");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    a = "digitalRead(" + a + ")";
    "TRUE" == b && (a = "(!" + a + ")");
    return [a, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_crash_EP = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_button_debounced = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("STATUS"),
        c = this.getFieldValue("INVERT");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    Blockly.Arduino.definitions_.define_button_debounced = '#include "ABlocks_Button.h"';
    Blockly.Arduino.definitions_["var_button_debounced_" + a] = "Button button_debounced_" + a + "(" + a + ",50);\n";
    var d = "";
    "pressed" == b && (d = "button_debounced_" + a + ".pressed()");
    "released" == b && (d = "button_debounced_" + a + ".released()");
    "TRUE" == c && (d = "(!" + d + ")");
    return [d, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_button_debounced_EP = Blockly.Arduino.sensor_button_debounced;
Blockly.Arduino.sensor_touch = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_touch_EP = Blockly.Arduino.sensor_touch;
Blockly.Arduino.sensor_pir = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_pir_EP = Blockly.Arduino.sensor_pir;
Blockly.Arduino.sensor_dht11 = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("TYPE");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    Blockly.Arduino.setups_["setup_dht11_" + a] = "dht" + a + ".begin();";
    Blockly.Arduino.definitions_.define_dht11 = '#include "ABlocks_DHT.h"';
    Blockly.Arduino.definitions_["var_dht11_" + a] = "DHT dht" + a + "(" + a + ",DHT11);";
    return ["temperature" == b ? "dht" + a + ".readTemperature()" : "dht" + a + ".readHumidity()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_dht11_EP = Blockly.Arduino.sensor_dht11;
Blockly.Arduino.sensor_dht22 = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("TYPE");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    Blockly.Arduino.setups_["setup_dht22_" + a] = "dht" + a + ".begin();";
    Blockly.Arduino.definitions_.define_dht22 = '#include "ABlocks_DHT.h"';
    Blockly.Arduino.definitions_["var_dht22_" + a] = "DHT dht" + a + "(" + a + ",DHT22);";
    return ["temperature" == b ? "dht" + a + ".readTemperature()" : "dht" + a + ".readHumidity()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_dht22_EP = Blockly.Arduino.sensor_dht22;

function setupUltrasonic() {
    Blockly.Arduino.definitions_fnc_.fnc_ultrasonic = "double fnc_ultrasonic_distance(int _t, int _e){\n\tunsigned long dur=0;\n\tdigitalWrite(_t, LOW);\n\tdelayMicroseconds(5);\n\tdigitalWrite(_t, HIGH);\n\tdelayMicroseconds(10);\n\tdigitalWrite(_t, LOW);\n\tdur = pulseIn(_e, HIGH, 18000);\n\treturn (dur/57);\n}\n"
}
Blockly.Arduino.sensor_ultrasonic = function() {
    var a = this.getFieldValue("TRIGGER_PIN"),
        b = this.getFieldValue("ECHO_PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_input_" + b] = "pinMode(" + b + ", INPUT);";
    setupUltrasonic();
    return ["fnc_ultrasonic_distance(" + a + "," + b + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_ultrasonic2 = function() {
    var a = this.getFieldValue("TRIGGER_PIN"),
        b = this.getFieldValue("ECHO_PIN");
    Blockly.Arduino.valueToCode(this, "MAXDISTANCE", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_input_" + b] = "pinMode(" + b + ", INPUT);";
    setupUltrasonic();
    return ["fnc_ultrasonic_distance(" + a + "," + b + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_ultrasonic_EP = function() {
    Blockly.Arduino.setups_.setup_input_3 = "pinMode(3, OUTPUT);";
    Blockly.Arduino.setups_.setup_input_4 = "pinMode(4, INPUT);";
    setupUltrasonic();
    return ["fnc_ultrasonic_distance(3,4)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_ldr = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_ldr_EP = Blockly.Arduino.sensor_ldr;
Blockly.Arduino.sensor_ntc = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    Blockly.Arduino.definitions_.define_math = "#include <math.h>";
    Blockly.Arduino.definitions_fnc_.fnc_ntc = "double fnc_ntc(int _rawval)\n{\n\tdouble temp;\n\ttemp = log(((10240000/_rawval) - 10000));\n\ttemp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * temp * temp ))* temp );\n\ttemp = temp - 273.15;\n\treturn temp;\n}\n";
    return ["fnc_ntc(analogRead(" + a + "))",
        Blockly.Arduino.ORDER_ATOMIC
    ]
};
Blockly.Arduino.sensor_ntc_EP = Blockly.Arduino.sensor_ntc;
Blockly.Arduino.sensor_joystick = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_joystick_EP = function() {
    var a = this.getFieldValue("TYPE"),
        b = this.getFieldValue("RANGE");
    Blockly.Arduino.setups_.setup_input_2 = "pinMode(2, INPUT);";
    Blockly.Arduino.setups_.setup_input_A6 = "pinMode(A6, INPUT);";
    Blockly.Arduino.setups_.setup_input_A7 = "pinMode(A7, INPUT);";
    var c = 2;
    "PRESSED" == a ? a = "digitalRead(2)" : ("X" == a && (c = "A6"), "Y" == a && (c = "A7"), a = "RAW" == b ? "analogRead(" + c + ")" : "map(analogRead(" + c + "),0,1023,0,100)");
    return [a, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_obstacle = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_obstacle_EP = Blockly.Arduino.sensor_obstacle;
Blockly.Arduino.sensor_linetracking = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_photoint = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_lm35 = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["(analogRead(" + a + ")*0.48828125)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_lm35_EP = Blockly.Arduino.sensor_lm35;
Blockly.Arduino.sensor_lm35 = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["(analogRead(" + a + ")*0.48828125)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_tmp36 = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["((analogRead(" + a + ")*0.48828125)-50.0)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_knock = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_knock_EP = Blockly.Arduino.sensor_knock;
Blockly.Arduino.sensor_tilt = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_tilt_EP = Blockly.Arduino.sensor_tilt;
Blockly.Arduino.sensor_hall = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_hall_EP = Blockly.Arduino.sensor_hall;
Blockly.Arduino.sensor_vibration = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_vibration_EP = Blockly.Arduino.sensor_vibration;
Blockly.Arduino.sensor_reed = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["digitalRead(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_reed_EP = Blockly.Arduino.sensor_reed;
Blockly.Arduino.sensor_irremote_keys = function() {
    return ["(" + this.getFieldValue("KEY") + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_irremote_decode = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.irrx = !0;
    Blockly.Arduino.setups_.setup_ir_rx = "ir_rx.enableIRIn();";
    Blockly.Arduino.definitions_.define_ir_rx = "esp8266" == profile["default"].micro ? "#include <IRremoteESP8266.h>\n#include <IRrecv.h>\n#include <IRutils.h>\n" : '#include "IRremote.h"';
    Blockly.Arduino.definitions_.var_ir_rx = "IRrecv ir_rx(" + a + ");\ndecode_results ir_rx_results;";
    Blockly.Arduino.definitions_fnc_.fnc_ir_rx = "unsigned long fnc_ir_rx_decode()\n{\n\tbool decoded=false;\n\tif( ir_rx.decode(&ir_rx_results))\n\t{\n\t\tdecoded=true;\n\t\tir_rx.resume();\n\t}\n\t if(decoded) return ir_rx_results.value; else return 0;\n }\n";
    return ["(unsigned long)fnc_ir_rx_decode()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_irremote_decode_EP = Blockly.Arduino.sensor_irremote_decode;

function setupEncoder(a, b) {
    Blockly.Arduino.definitions_.var_encoder = "volatile long encoder_pos=0;";
    Blockly.Arduino.definitions_.var_encoder_A = "boolean encoder_A_set =false;";
    Blockly.Arduino.definitions_.var_encoder_B = "boolean encoder_B_set =false;";
    Blockly.Arduino.definitions_.var_encoder_rotating = "static boolean encoder_rotating=false;";
    Blockly.Arduino.definitions_fnc_.fnc_encoder_intA = "void fnc_encoder_intA(){\n\tif ( encoder_rotating ) delay (1);\n\tif( digitalRead(2) != encoder_A_set ) {\n\t\tencoder_A_set = !encoder_A_set;\n\t\tif ( encoder_A_set && !encoder_B_set ) encoder_pos += 1;\n\t\tencoder_rotating = false;\n\t}\n}\n\n";
    Blockly.Arduino.definitions_fnc_.fnc_encoder_intB = "void fnc_encoder_intB(){\n\tif ( encoder_rotating ) delay (1);\n\tif( digitalRead(3) != encoder_B_set ) {\n\t\tencoder_B_set = !encoder_B_set;\n\t\tif ( encoder_B_set && !encoder_A_set ) encoder_pos -= 1;\n\t\tencoder_rotating = false;\n\t}\n}\n\n";
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    Blockly.Arduino.setups_["setup_input_" + b] = "pinMode(" + b + ", INPUT);";
    Blockly.Arduino.setups_["setup_pullup_" + a] = "digitalWrite(" + a + ",HIGH);";
    Blockly.Arduino.setups_["setup_pullup_" + b] = "digitalWrite(" + b + ",HIGH);";
    Blockly.Arduino.setups_["setup_encoder_int_" + a] = "attachInterrupt(0, fnc_encoder_intA, CHANGE);";
    Blockly.Arduino.setups_["setup_encoder_int_" + b] = "attachInterrupt(1, fnc_encoder_intB, CHANGE);"
}
Blockly.Arduino.sensor_rotary_encoder = function() {
    var a = this.getFieldValue("CLK"),
        b = this.getFieldValue("DT");
    setupEncoder(a, b);
    return ["encoder_pos", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_rotary_encoder_set = function() {
    setupEncoder(profile["default"].encoder_clk[0][0], profile["default"].encoder_dt[0][0]);
    return "encoder_pos=" + Blockly.Arduino.valueToCode(this, "POS", Blockly.Arduino.ORDER_ATOMIC) + ";"
};
Blockly.Arduino.sensor_flame = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_flame_EP = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    return ["(!digitalRead(" + a + "))", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_sound = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_sound_EP = Blockly.Arduino.sensor_sound;
Blockly.Arduino.sensor_gas = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_gas_EP = function() {
    Blockly.Arduino.setups_.setup_input_A7 = "pinMode(A7, INPUT);";
    var a = "map(analogRead(A7),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (a = "analogRead(A7)");
    return [a, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_alcohol = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_alcohol_EP = function() {
    Blockly.Arduino.setups_.setup_input_A7 = "pinMode(A7, INPUT);";
    var a = "map(analogRead(A7),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (a = "analogRead(A7)");
    return [a, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_air = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_air_EP = function() {
    Blockly.Arduino.setups_.setup_input_A7 = "pinMode(A7, INPUT);";
    var a = "map(analogRead(A7),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (a = "analogRead(A7)");
    return [a, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_TEMT6000 = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_TEMT6000_EP = Blockly.Arduino.sensor_TEMT6000;
Blockly.Arduino.sensor_soilhumidity = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_soilhumidity_EP = Blockly.Arduino.sensor_soilhumidity;
Blockly.Arduino.sensor_water = function() {
    var a = this.getFieldValue("PIN");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", INPUT);";
    var b = "map(analogRead(" + a + "),0,1023,0,100)";
    "RAW" == this.getFieldValue("RANGE") && (b = "analogRead(" + a + ")");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_water_EP = Blockly.Arduino.sensor_water;
Blockly.Arduino.sensor_nunchuk = function() {
    var a = this.getFieldValue("ID");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_nunchuck = '#include "ArduinoNunchuk.h"\n';
    Blockly.Arduino.definitions_.var_nunchuck = "ArduinoNunchuk nunchuk = ArduinoNunchuk();";
    Blockly.Arduino.setups_.setup_nunchuck = "nunchuk.init();";
    Blockly.Arduino.loops_.loop_nunchuck = "\tnunchuk.update();";
    return ["nunchuk." + a, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_adxl345 = function() {
    var a = this.getFieldValue("ID");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_adxl345 = '#include "ADXL345.h"\n';
    Blockly.Arduino.definitions_.var_adxl345 = "ADXL345 adxl345_accel;";
    Blockly.Arduino.setups_.setup_adxl345 = "adxl345_accel.begin(); adxl345_accel.setRange(ADXL345_RANGE_16G);";
    Blockly.Arduino.definitions_fnc_.fnc_adxl345 = "double fnc_adxl345(int _type)\n{\n\tdouble v=0.0;\n\tif(_type>=1 && _type<=3){\n\t\t//raw data\n\t\tVector data_raw = adxl345_accel.readRaw();\n\t\tif(_type==1)v=data_raw.XAxis;\n\t\tif(_type==2)v=data_raw.YAxis;\n\t\tif(_type==3)v=data_raw.ZAxis;\n\t}\n\telse{\n\t\t//noramlized data g=gravity\n\t\tVector data_norm = adxl345_accel.readNormalize();\n\t\tif(_type>=4 && _type<=6){\n\t\t\tif(_type==4)v=data_norm.XAxis;\n\t\t\tif(_type==5)v=data_norm.YAxis;\n\t\t\tif(_type==6)v=data_norm.ZAxis;\n\t\t}\n\t\telse{\n\t\t\t//pitch,roll degrees\n\t\t\tVector data_filtered = adxl345_accel.lowPassFilter(data_norm, 0.5);\n\t\t\tif(_type==7)v=(atan2(data_filtered.YAxis, data_filtered.ZAxis)*180.0)/M_PI;\n\t\t\tif(_type==8)v=-(atan2(data_filtered.XAxis, sqrt(data_filtered.YAxis*data_filtered.YAxis + data_filtered.ZAxis*data_filtered.ZAxis))*180.0)/M_PI;\n\t\t}\n\t}\n\treturn v;\n}\n";
    return ["fnc_adxl345(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_adxl345_EP = Blockly.Arduino.sensor_adxl345;
Blockly.Arduino.sensor_pm25 = function() {
    var a = this.getFieldValue("LED"),
        b = this.getFieldValue("OUT"),
        c = this.getFieldValue("TYPE");
    Blockly.Arduino.setups_["setup_input_" + b] = "pinMode(" + b + ", INPUT);";
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", OUTPUT);";
    Blockly.Arduino.definitions_fnc_.fnc_pm25 = "double fnc_pm25(int _ledpin, int _outpin, int _result)\n{\n\tdigitalWrite(_ledpin,LOW);\n\tdelayMicroseconds(280);\n\tdouble voMeasured = analogRead(_outpin);\n\tdelayMicroseconds(40);\n\tdigitalWrite(_ledpin,HIGH);\n\tdelayMicroseconds(9680);\n\tdouble calcVoltage = voMeasured * (5.0 / 1024.0);\n\tdouble dustDensity = 0.172 * calcVoltage - 0.0999;\n\tdouble particlesM3 = float((voMeasured/1024)-0.0356)*120000*0.035;\n\tif(_result==0)return dustDensity;\n\treturn particlesM3;\n}\n";
    return ["fnc_pm25(" +
        a + "," + b + "," + c + ")", Blockly.Arduino.ORDER_ATOMIC
    ]
};
Blockly.Arduino.sensor_pm25_EP = function() {
    var a = this.getFieldValue("TYPE");
    Blockly.Arduino.setups_.setup_input_A6 = "pinMode(A6, INPUT);";
    Blockly.Arduino.setups_.setup_input_2 = "pinMode(2, OUTPUT);";
    Blockly.Arduino.definitions_fnc_.fnc_pm25 = "double fnc_pm25(int _ledpin, int _outpin, int _result)\n{\n\tdigitalWrite(_ledpin,LOW);\n\tdelayMicroseconds(280);\n\tdouble voMeasured = analogRead(_outpin);\n\tdelayMicroseconds(40);\n\tdigitalWrite(_ledpin,HIGH);\n\tdelayMicroseconds(9680);\n\tdouble calcVoltage = voMeasured * (5.0 / 1024.0);\n\tdouble dustDensity = 0.172 * calcVoltage - 0.0999;\n\tdouble particlesM3 = float((voMeasured/1024)-0.0356)*120000*0.035;\n\tif(_result==0)return dustDensity;\n\treturn particlesM3;\n}\n";
    return ["fnc_pm25(2,A6," +
        a + ")", Blockly.Arduino.ORDER_ATOMIC
    ]
};
Blockly.Arduino.sensor_mics4514 = function() {
    var a = this.getFieldValue("PRE"),
        b = this.getFieldValue("NOX"),
        c = this.getFieldValue("RED"),
        d = this.getFieldValue("TYPE");
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(" + a + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_input_" + b] = "pinMode(" + b + ", INPUT );";
    Blockly.Arduino.setups_["setup_input_" + c] = "pinMode(" + c + ", INPUT);";
    Blockly.Arduino.definitions_fnc_.fnc_mics4514_preheat = "void fnc_mics4514_preheat(int _prepin)\n{\n\tpinMode(_prepin, OUTPUT);\n\tdigitalWrite(_prepin, 1);\n\tdelay(10 * 1000);\n\tdigitalWrite(_prepin, 0);\n}\n";
    Blockly.Arduino.setups_.setup_mics4514 =
        "fnc_mics4514_preheat(" + a + ");";
    Blockly.Arduino.definitions_fnc_.fnc_mics4514 = "double fnc_mics4514(int _prepin, int _noxpin, int _redpin, int _result)\n{\n\tdouble vnox_value = analogRead(_noxpin);\n\tdouble ppbNO2  = -85.26*log(vnox_value*5.0/1023.0)+121.02; \n\tdouble ugm3NO2  = (ppbNO2/1.88); \n\n\tdouble vred_value = analogRead(_redpin)/409.2;\n\tdouble RsCO = 100000/((5/vred_value) - 1);\n\tdouble ppmCO  = 911.19*pow(2.71828,(-8.577*RsCO/100000));\n\n\tif(_result==0)return ppbNO2;\n\tif(_result==1)return ppmCO;\n\tif(_result==2)return ugm3NO2;\n\treturn 0.0;\n}\n";
    return ["fnc_mics4514(" + a + "," + b + "," + c + "," + d + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_mics4514_EP = Blockly.Arduino.sensor_mics4514;

function setupColorSensorTCS34725() {
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_TCS34725 = '#include "Adafruit_TCS34725.h"\n';
    Blockly.Arduino.definitions_.define_colorconverter = '#include "ColorConverterLib.h"\n';
    Blockly.Arduino.definitions_.var_TCS34725 = "Adafruit_TCS34725 tcs34725 = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_1X);";
    Blockly.Arduino.definitions_.var_TCS34725_r = "double  tcs34725_r=0;";
    Blockly.Arduino.definitions_.var_TCS34725_g =
        "double  tcs34725_g=0;";
    Blockly.Arduino.definitions_.var_TCS34725_b = "double  tcs34725_b=0;";
    Blockly.Arduino.definitions_.var_TCS34725_clear = "uint16_t  tcs34725_clear=0;";
    Blockly.Arduino.definitions_.var_TCS34725_h = "double  tcs34725_h=0;";
    Blockly.Arduino.definitions_.var_TCS34725_s = "double  tcs34725_s=0;";
    Blockly.Arduino.definitions_.var_TCS34725_v = "double  tcs34725_v=0;";
    Blockly.Arduino.setups_.setup_TCS34725 = "tcs34725.begin();";
    Blockly.Arduino.definitions_fnc_.fnc_tcs34725 = "void fnc_tcs34725_capturecolor()\n{\n\tuint16_t tcs_red, tcs_green, tcs_blue;\n\ttcs34725.getRawData(&tcs_red, &tcs_green, &tcs_blue, &tcs34725_clear);\n\tif (tcs34725_clear == 0) {\n\t\ttcs34725_r=tcs34725_g=tcs34725_b=0;\n\t\treturn;\n\t}\n\ttcs34725_r = ((float)tcs_red / (float)tcs34725_clear * 255.0);\n\ttcs34725_g = ((float)tcs_green / (float)tcs34725_clear * 255.0);\n\ttcs34725_b = ((float)tcs_blue / (float)tcs34725_clear * 255.0);\n\tColorConverter::RgbToHsv(static_cast<uint8_t>(tcs34725_r), static_cast<uint8_t>(tcs34725_g), static_cast<uint8_t>(tcs34725_b), tcs34725_h, tcs34725_s,tcs34725_v);\n\ttcs34725_h=tcs34725_h*360;\n\ttcs34725_s=tcs34725_s*100;\n\ttcs34725_v=tcs34725_v*100;\n}\n"
}
Blockly.Arduino.sensor_color_tcs34725 = function() {
    setupColorSensorTCS34725();
    this.getFieldValue("TYPE");
    return "fnc_tcs34725_capturecolor();\n"
};
Blockly.Arduino.sensor_color_tcs34725_EP = Blockly.Arduino.sensor_color_tcs34725;
Blockly.Arduino.sensor_color_tcs34725_value = function() {
    setupColorSensorTCS34725();
    var a = this.getFieldValue("TYPE"),
        b = "";
    "0" == a && (b = "tcs34725_r");
    "1" == a && (b = "tcs34725_g");
    "2" == a && (b = "tcs34725_b");
    "3" == a && (b = "tcs34725_clear");
    "4" == a && (b = "tcs34725_h");
    "5" == a && (b = "tcs34725_s");
    "6" == a && (b = "tcs34725_v");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_color_tcs34725_value_EP = Blockly.Arduino.sensor_color_tcs34725_value;
Blockly.Arduino.sensor_color_tcs34725_iscolor = function() {
    setupColorSensorTCS34725();
    var a = this.getFieldValue("COLOR");
    Blockly.Arduino.definitions_fnc_.fnc_tcs34725_iscolor = "bool fnc_tcs34725_iscolor(int _color)\n{\n\tif(tcs34725_h > 340 || tcs34725_h < 20){ if(_color==2) return true; } //red\n\telse if(tcs34725_h < 45){ if(_color==3) return true; }  //orange\n\telse if(tcs34725_h < 70){ if(_color==4) return true; }  //yellow\n\telse if(tcs34725_h < 150){ if(_color==5) return true; } //green\n\telse if(tcs34725_h < 210){ if(_color==6) return true; } //cyan\n\telse if(tcs34725_h < 265){ if(_color==7) return true; } //blue\n \telse if(tcs34725_h < 340){ if(_color==8) return true; } //violet\n\treturn false;\n}\n";
    return ["fnc_tcs34725_iscolor(" + a + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_color_tcs34725_iscolor_EP = Blockly.Arduino.sensor_color_tcs34725_iscolor;
Blockly.Arduino.sensor_bmp180 = function() {
    this.getFieldValue("PIN");
    var a = this.getFieldValue("TYPE");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_bmp180 = "#include <Adafruit_BMP085.h>";
    Blockly.Arduino.definitions_.var_bmp180 = "Adafruit_BMP085 bmp180;\n";
    Blockly.Arduino.setups_.setup_bmp180 = "bmp180.begin();";
    var b = "";
    "PRESSURE" == a && (b = "(bmp180.readPressure()/100.0)");
    "ALTITUDE" == a && (b = "bmp180.readAltitude()");
    "TEMPERATURE" == a && (b = "bmp180.readTemperature()");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_bmp180_EP = Blockly.Arduino.sensor_bmp180;
Blockly.Arduino.sensor_ds18b20 = function() {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("INDEX");
    Blockly.Arduino.definitions_.define_onewire = "#include <OneWire.h>";
    Blockly.Arduino.definitions_.define_ds18b20 = "#include <DallasTemperature.h>";
    Blockly.Arduino.definitions_.var_onewire = "OneWire oneWireBus_" + a + "(" + a + ");\n";
    Blockly.Arduino.definitions_.var_ds18b20 = "DallasTemperature ds18b20_" + a + "(&oneWireBus_" + a + ");\n";
    Blockly.Arduino.setups_.setup_ds18b20 = "ds18b20_" + a + ".begin();";
    Blockly.Arduino.definitions_fnc_.fnc_ds128b20_temp =
        "double fnc_ds128b20_temp(int _index)\n{\n\tds18b20_" + (a + ".requestTemperatures();\n\treturn ds18b20_") + (a + ".getTempCByIndex(_index);\n}\n");
    return ["fnc_ds128b20_temp(" + b + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_ds18b20_EP = Blockly.Arduino.sensor_ds18b20;
Blockly.Arduino.sensor_ccs811 = function() {
    var a = this.getFieldValue("TYPE");
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_ccs811 = "#include <Adafruit_CCS811.h>";
    Blockly.Arduino.definitions_.var_bmp180 = "Adafruit_CCS811 ccs811;\n";
    Blockly.Arduino.setups_.setup_ccs811 = "ccs811.begin();";
    Blockly.Arduino.definitions_fnc_.fnc_ccs811_data = "double fnc_ccs811_data(int _type)\n{\n\tif(ccs811.available()){\n\t\tif(!ccs811.readData()){\n\t\t\tif(_type==0)return ccs811.geteCO2();\n\t\t\tif(_type==1)return ccs811.getTVOC();\n\t\t}\n\t}\n\treturn 0;\n}\n";
    var b = "";
    "CO2" == a && (b = "fnc_ccs811_data(0)");
    "TVOC" == a && (b = "fnc_ccs811_data(1)");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_paj7620 = function() {
    Blockly.Arduino.definitions_.define_wire = "#include <Wire.h>";
    Blockly.Arduino.definitions_.define_ccs811 = "#include <paj7620.h>";
    Blockly.Arduino.setups_.setup_paj7620 = "paj7620Init();";
    return ["paj7620ReadGesture()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.sensor_paj7620_gesture = function() {
    return ["(" + this.getFieldValue("GESTURE") + ")", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.serial = {};

function setupSerial() {
    Blockly.Arduino.setups_.setup_serial || (Blockly.Arduino.setups_.setup_serial = "Serial.begin(9600);\n")
}
Blockly.Arduino.serial_init = function() {
    var a = this.getFieldValue("BAUD");
    Blockly.Arduino.setups_.setup_serial = "Serial.begin(" + a + ");\n";
    return ""
};
Blockly.Arduino.serial_timeout = function() {
    setupSerial();
    return "Serial.setTimeout(" + Blockly.Arduino.valueToCode(this, "MS", Blockly.Arduino.ORDER_ATOMIC) + ");\n"
};
Blockly.Arduino.serial_print = function() {
    setupSerial();
    var a = Blockly.Arduino.valueToCode(this, "STRINGOUTPUT", Blockly.Arduino.ORDER_ATOMIC) || "''";
    return "TRUE" == this.getFieldValue("NEWLINE") ? "Serial.println(" + a + ");\n" : "Serial.print(" + a + ");\n"
};
Blockly.Arduino.serial_println = function() {
    setupSerial();
    return "Serial.println(" + (Blockly.Arduino.valueToCode(this, "STRINGOUTPUT", Blockly.Arduino.ORDER_ATOMIC) || "''") + ");\n"
};
Blockly.Arduino.serial_write_byte = function() {
    setupSerial();
    return "Serial.write((byte)" + (Blockly.Arduino.valueToCode(this, "BYTE", Blockly.Arduino.ORDER_ATOMIC) || "0") + ");\n"
};
Blockly.Arduino.serial_read_float = function() {
    setupSerial();
    return ["TRUE" == this.getFieldValue("NEWLINE") ? "atof((Serial.readStringUntil('\\n')).c_str())" : "Serial.parseFloat()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.serial_read_byte = function() {
    setupSerial();
    return ["Serial.read()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.serial_read_string = function() {
    setupSerial();
    return ["TRUE" == this.getFieldValue("NEWLINE") ? "Serial.readStringUntil('\\n')" : "Serial.readString()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.serial_read_string_line = function() {
    setupSerial();
    code = "Serial.readStringUntil('\\n')";
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.serial_read_available = function() {
    setupSerial();
    return ["(Serial.available()>0)", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.time = {};
Blockly.Arduino.time_delay = function() {
    return "delay(" + (Blockly.Arduino.valueToCode(this, "DELAY_TIME_MILI", Blockly.Arduino.ORDER_ATOMIC) || "0") + ");\n"
};
Blockly.Arduino.time_delaymicros = function() {
    return "delayMicroseconds(" + (Blockly.Arduino.valueToCode(this, "DELAY_TIME_MICRO", Blockly.Arduino.ORDER_ATOMIC) || "0") + ");\n"
};
Blockly.Arduino.time_millis = function() {
    return ["millis()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.time_micros = function() {
    return ["micros()", Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.infinite_loop = function() {
    return "while(true);\n"
};
Blockly.Arduino.time_runeveryms = function() {
    var a = Blockly.Arduino.statementToCode(this, "DO"),
        b = Blockly.Arduino.valueToCode(this, "MS", Blockly.Arduino.ORDER_ATOMIC) || "0",
        c = Blockly.Arduino.variableDB_.getDistinctName("task_time_ms", Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_["var_" + c] = "unsigned long " + c + "=0;\n";
    a = "if((millis()-" + c + ")>=" + b + "){\n\t" + (c + "=millis();\n") + a;
    return a += "}\n"
};
Blockly.Arduino.time_timer = function() {
    var a = this.getFieldValue("TYPE");
    Blockly.Arduino.definitions_.var_time_timer = "unsigned long time_timer=millis();\n";
    var b = "(millis()-time_timer)";
    "s" == a && (b = "((millis()-time_timer)/1000)");
    return [b, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Arduino.time_timer_reset = function() {
    Blockly.Arduino.definitions_.var_time_timer = "unsigned long time_timer=millis();\n";
    return "time_timer=millis();\n"
};
Blockly.Arduino.time_snooze = function() {
    var a = Blockly.Arduino.valueToCode(this, "DELAY_TIME_MILI", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.definitions_.define_snooze = "#include <SnoozeLib.h>";
    return "snoozeLib.snooze(" + a + ");\n"
};
