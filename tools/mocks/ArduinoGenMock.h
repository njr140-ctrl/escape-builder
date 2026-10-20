#include <cstdio>
#include <cstdlib>
#include <stdint.h>
typedef uint8_t byte;
#define max(a,b) ((a)>(b)?(a):(b))
#define HIGH 1
#define LOW 0
#define INPUT 0
#define OUTPUT 1
#define INPUT_PULLUP 2
#define SERIAL_8N1 0
#define HEX 16
#define constrain(a,l,h) ((a)<(l)?(l):((a)>(h)?(h):(a)))
static const uint8_t A0=14,A1=15,A2=16,A3=17,A4=18,A5=19,A6=20,A7=21,A8=62,A9=63,A10=64,A11=65,A12=66,A13=67,A14=68,A15=69;
void pinMode(int,int); void digitalWrite(int,int); int digitalRead(int); int analogRead(int); void analogWrite(int,int); unsigned long millis(); long random(long,long); void randomSeed(unsigned long); unsigned long micros();
struct String { String(const char* = ""); explicit String(int); explicit String(long); bool operator==(const String&) const; String& operator=(const char*); String(int, int); String& operator+=(const String&); String& operator+=(char); bool operator==(const char*) const; bool operator!=(const char*) const; bool operator!=(const String&) const; unsigned length() const; void toUpperCase(); bool startsWith(const String&) const; const char* c_str() const; int indexOf(char, int = 0) const; String substring(int) const; String substring(int, int) const; long toInt() const; };
class __FlashStringHelper;
#define F(s) (reinterpret_cast<const __FlashStringHelper *>(s))
struct SerialT { void begin(long); void println(); void println(const char*); void println(const String&); void println(int); void println(char); void println(unsigned long); void println(const __FlashStringHelper*);
  void print(const char*); void print(const String&); void print(char); void print(int); void print(unsigned long); void print(const __FlashStringHelper*); } Serial;
struct Servo { void attach(int); void write(int); int read(); };
struct Stream {};
struct HardwareSerial : Stream { HardwareSerial(int); void begin(long,int,int,int); };
struct SoftwareSerial : Stream { SoftwareSerial(int,int); void begin(long); bool listen(); };
struct DFRobotDFPlayerMini { bool begin(Stream&, bool=true, bool=true); void volume(int); void play(int); void loop(int); void stop(); void enableLoop(); void disableLoop(); void playMp3Folder(int); };
struct MFRC522 { enum StatusCode : byte { STATUS_OK }; struct Uid { byte size; byte uidByte[10]; } uid; MFRC522(byte, byte); void PCD_Init(); StatusCode PICC_WakeupA(byte*, byte*); bool PICC_ReadCardSerial(); StatusCode PICC_HaltA(); };
struct SPIClass { void begin(); } SPI;
#define makeKeymap(x) ((char*)x)
struct Keypad { Keypad(char*, byte*, byte*, byte, byte); char getKey(); };
#define NEO_GRB 0x52
#define NEO_KHZ800 0x0000
struct Adafruit_NeoPixel { Adafruit_NeoPixel(uint16_t, int16_t, uint16_t); void begin(); void setBrightness(uint8_t); void setPixelColor(uint16_t, uint32_t); void show(); void clear(); static uint32_t ColorHSV(uint16_t, uint8_t=255, uint8_t=255); static uint32_t gamma32(uint32_t); void fill(uint32_t = 0, uint16_t = 0, uint16_t = 0); };
struct TwoWire {} Wire;
#define SSD1306_SWITCHCAPVCC 2
#define SSD1306_WHITE 1
struct Adafruit_SSD1306 { Adafruit_SSD1306(uint8_t, uint8_t, TwoWire*, int8_t); bool begin(uint8_t, uint8_t); void clearDisplay(); void setTextSize(uint8_t); void setTextColor(uint16_t); void setCursor(int16_t,int16_t); void print(const char*); void display(); };
struct LiquidCrystal_I2C { LiquidCrystal_I2C(uint8_t, uint8_t, uint8_t); void init(); void backlight(); void clear(); void setCursor(uint8_t, uint8_t); void print(char); };
struct TM1637Display { TM1637Display(uint8_t, uint8_t); void setBrightness(uint8_t, bool = true); void clear(); void showNumberDec(int, bool = false); void showNumberDecEx(int, uint8_t, bool = false, uint8_t = 4, uint8_t = 0); void setSegments(const uint8_t*, uint8_t = 4, uint8_t = 0); uint8_t encodeDigit(uint8_t); };
struct AccelStepper { enum { DRIVER = 1, FULL4WIRE = 4 }; AccelStepper(uint8_t, uint8_t = 2, uint8_t = 3, uint8_t = 4, uint8_t = 5, bool = true); void setMaxSpeed(float); void setAcceleration(float); void move(long); void moveTo(long); long currentPosition(); bool run(); void stop(); bool isRunning(); void enableOutputs(); void disableOutputs(); };
#define WL_CONNECTED 3
#define WIFI_STA 1
struct IPAddressMock {}; SerialT& operator<<(SerialT&, int);
struct WiFiClass { void mode(int); void setAutoReconnect(bool); void begin(const char*, const char*); int status(); void persistent(bool); void setSleep(bool); void disconnect(); const char* localIP(); int RSSI(); } WiFi;
struct WiFiClient {};
struct PubSubClient { PubSubClient(WiFiClient&); void setServer(const char*, int); void setCallback(void (*)(char*, byte*, unsigned int)); bool connected(); bool loop(); bool connect(const char*); bool connect(const char*, const char*, uint8_t, bool, const char*); bool subscribe(const char*); bool publish(const char*, const char*); bool publish(const char*, const char*, bool); bool setBufferSize(uint16_t); };

struct ArduinoOTAClass { void setHostname(const char*); void setPassword(const char*); void onStart(void (*)()); void begin(); void handle(); } ArduinoOTA;

void delayMicroseconds(unsigned int);
void delay(unsigned long);
#include <ctime>
bool getLocalTime(struct tm*, uint32_t = 5000);
void configTzTime(const char*, const char*);
String operator+(const String&, const String&); String operator+(const String&, const char*); String operator+(const char*, const String&);
void tone(uint8_t, unsigned int, unsigned long = 0);
void noTone(uint8_t);
