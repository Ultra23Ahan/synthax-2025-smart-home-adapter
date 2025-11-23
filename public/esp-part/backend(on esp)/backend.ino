#include <WiFi.h>
#include <WebServer.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7735.h>

/*************** PINS (same as your previous setup) *****************/
#define RELAY_PIN 25
#define ACS_PIN   34
#define ZMPT_PIN  35

#define TFT_CS    27
#define TFT_DC    26
#define TFT_RST   33

Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC, TFT_RST);

/*************** CALIBRATION ***************/
float ACS_ZERO = 1.65;
float ACS_MV_PER_A = 185.0;
float ZMPT_SCALE = 70.0;

/*************** THRESHOLDS ***************/
float VOLT_LOW = 180.0;
float VOLT_HIGH = 260.0;
float CURRENT_HIGH = 5.0;
float POWER_HIGH = 1200.0;

/*************** GRAPH STORAGE ***************/
const int HIST = 120;
float histV[HIST];
float histI[HIST];
float histP[HIST];
int hIndex = 0;

/*************** TIMERS ***************/
unsigned long lastScreenSwitch = 0;
unsigned long SCREEN_TIME = 10000;
int screenID = 0;

/*************** ALERT MEMORY ***************/
String lastAlert = "No Alerts Detected";

/*************** FUNCTIONS ***************/
float adcVolt(int raw) { return (raw / 4095.0f) * 3.3f; }

float readCurrent() {
  long sum = 0;
  for (int i = 0; i < 60; i++) { sum += analogRead(ACS_PIN); delay(1); }
  float v = adcVolt(sum / 60);
  return fabs((v - ACS_ZERO) * 1000.0 / ACS_MV_PER_A);
}

float readVoltage() {
  float minv = 3.3, maxv = 0;
  for (int i = 0; i < 200; i++) {
    float v = adcVolt(analogRead(ZMPT_PIN));
    if (v < minv) minv = v;
    if (v > maxv) maxv = v;
    delay(1);
  }
  float vrms = ((maxv - minv) / 2.0) * ZMPT_SCALE;
  return vrms;
}

void logAlert(String a) {
  lastAlert = a;
}

/*************** SCREEN 1 — LIVE STATUS ***************/
void drawScreenLive(float V, float I, float P, String status) {
  tft.fillScreen(ST77XX_BLACK);
  tft.setTextSize(1);

  tft.setCursor(10, 10);
  tft.setTextColor(ST77XX_CYAN);
  tft.print("Voltage: ");
  tft.setTextColor(ST77XX_YELLOW);
  tft.printf("%.1f V", V);

  tft.setCursor(10, 30);
  tft.setTextColor(ST77XX_CYAN);
  tft.print("Current: ");
  tft.setTextColor(ST77XX_YELLOW);
  tft.printf("%.3f A", I);

  tft.setCursor(10, 50);
  tft.setTextColor(ST77XX_CYAN);
  tft.print("Power:   ");
  tft.setTextColor(ST77XX_YELLOW);
  tft.printf("%.1f W", P);

  // Status
  uint16_t col = ST77XX_GREEN;
  if (status == "BAD") col = ST77XX_RED;
  else if (status == "MODERATE") col = ST77XX_YELLOW;

  tft.setCursor(10, 75);
  tft.setTextColor(col);
  tft.printf("Status: %s", status.c_str());

  // Alerts
  if (lastAlert != "No Alerts Detected") {
    tft.setCursor(10, 110);
    tft.setTextColor(ST77XX_RED);
    tft.print("ALERT: ");
    tft.setCursor(10, 125);
    tft.print(lastAlert);
  }
}

/*************** SCREEN 2 — GRAPH ***************/
void drawScreenGraph() {
  tft.fillScreen(ST77XX_BLACK);

  // Legend
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_RED);
  tft.setCursor(5, 5);  tft.print("V");
  tft.setTextColor(ST77XX_GREEN);
  tft.setCursor(35, 5); tft.print("I");
  tft.setTextColor(ST77XX_YELLOW);
  tft.setCursor(65, 5); tft.print("P");

  int baseY = 150;

  // Draw lines
  for (int i = 1; i < HIST; i++) {
    int x1 = map(i - 1, 0, HIST, 0, 160);
    int x2 = map(i, 0, HIST, 0, 160);

    tft.drawLine(x1, baseY - histV[(hIndex + i - 1) % HIST] / 3,
                 x2, baseY - histV[(hIndex + i) % HIST] / 3,
                 ST77XX_RED);

    tft.drawLine(x1, baseY - histI[(hIndex + i - 1) % HIST] * 20,
                 x2, baseY - histI[(hIndex + i) % HIST] * 20,
                 ST77XX_GREEN);

    tft.drawLine(x1, baseY - histP[(hIndex + i - 1) % HIST] / 10,
                 x2, baseY - histP[(hIndex + i) % HIST] / 10,
                 ST77XX_YELLOW);
  }
}

/*************** SCREEN 3 — ALERTS ***************/
void drawScreenAlerts() {
  tft.fillScreen(ST77XX_BLACK);

  tft.setTextSize(2);
  tft.setCursor(10, 10);
  tft.setTextColor(ST77XX_CYAN);
  tft.print("ALERT LOG");

  tft.setTextSize(1);
  tft.setCursor(10, 50);
  tft.setTextColor(ST77XX_YELLOW);
  tft.print(lastAlert);
}

/*************** MAIN SETUP ***************/
void setup() {
  Serial.begin(115200);

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);

  tft.initR(INITR_BLACKTAB);
  tft.setRotation(1);
  tft.fillScreen(ST77XX_BLACK);

  for (int i = 0; i < HIST; i++) {
    histV[i] = histI[i] = histP[i] = 0;
  }
}

/*************** MAIN LOOP ***************/
void loop() {
  float V = readVoltage();
  float I = readCurrent();
  float P = V * I;

  // Update graph logs
  histV[hIndex] = V;
  histI[hIndex] = I;
  histP[hIndex] = P;
  hIndex = (hIndex + 1) % HIST;

  // Status logic
  String status = "GOOD";
  if (V < VOLT_LOW || V > VOLT_HIGH || I > CURRENT_HIGH || P > POWER_HIGH)
    status = "BAD";
  else if (I > CURRENT_HIGH * 0.6 || P > POWER_HIGH * 0.6)
    status = "MODERATE";

  // Alerts
  if (V < VOLT_LOW) logAlert("Under-Voltage");
  if (V > VOLT_HIGH) logAlert("Over-Voltage");
  if (I > CURRENT_HIGH) logAlert("Over-Current");
  if (P > POWER_HIGH) logAlert("Over-Power");
  if (I > 0.06 && V == 0) logAlert("Leakage");

  // Screen switching
  if (millis() - lastScreenSwitch > SCREEN_TIME) {
    screenID = (screenID + 1) % 3;
    lastScreenSwitch = millis();
  }

  if (screenID == 0) drawScreenLive(V, I, P, status);
  if (screenID == 1) drawScreenGraph();
  if (screenID == 2) drawScreenAlerts();
}