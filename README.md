# Escape Builder

Design escape room props and shows, and get Arduino / ESP32 code for them.

Open it at **https://escapebuilder.online**

Projects are kept in your browser. Use **Save project** to keep a file of your work (or send it to someone), and **Open project** to load one.

## Boards

Arduino Uno, Nano, Mega, ESP32 DevKit, and the **KinCony B24M** (ESP32-S3, 24 inputs, 24 MOSFET outputs, Ethernet).

On the B24M, buttons, switches, sensors, lights, relays, maglocks and buzzers go on the board's own **Input 1–24** and **Output 1–24** terminals. Dimmers, LED strips, servos, MP3 players and other parts that need a real pin use its free GPIOs (47, 48, 7, 40, 13, 14, 21). The code talks to Escape Runner over the Ethernet cable instead of Wi-Fi. In the Arduino IDE pick **ESP32S3 Dev Module** (Flash Size 16MB, PSRAM OPI); it needs the ESP32 boards package 3.0 or newer.

## Building

The source is in `src/`; `python3 tools/build.py` puts it together into `index.html`. `node tools/genb24m.js src/core.js <folder>` writes B24M test sketches to compile.
