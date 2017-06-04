// LIBRARYS
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <SPI.h>
#include <MFRC522.h>

// DEFINES
#define RST_PIN 5
#define SS_PIN 4

// VARIABLES
const char* SSID = "YOUR_SSID"; // rede wifi
const char* PASSWORD = "YOUR_PASS"; // senha da rede wifi

const char* BROKER_MQTT = "broker.iot-br.com"; // ip/host do broker
int BROKER_PORT = 1883; // porta do broker

const char* TOPIC_PING = "/empresas/douglaszuqueto/catraca/entrada/ping";

const char* TOPIC_PONG = "/empresas/douglaszuqueto/catraca/entrada/pong";

// PROTOTYPES
void initPins();
void initSerial();
void initRfid();
void initWiFi();
void initMQTT();

// OBJECTS
WiFiClient client;
PubSubClient MQTT(client); // instancia o mqtt
MFRC522 mfrc522(SS_PIN, RST_PIN); // instancia o rfid

// setup
void setup() {
  initSerial();
  initWiFi();
  initMQTT();
  initRfid();

}

void loop() {
  if (!MQTT.connected()) {
    reconnectMQTT();
  }
  recconectWiFi();
  MQTT.loop();

  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    delay(500);
    return;
  }

  if ( ! mfrc522.PICC_ReadCardSerial()) {
    delay(500);
    return;
  }

  rfidProcess();

}

// implementacao dos prototypes

void initSerial() {
  Serial.begin(115200);
}

void initRfid() {
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("Aproxime o seu cartao do leitor...");
  Serial.println();
}

void initWiFi() {
  delay(10);
  Serial.println("Conectando-se em: " + String(SSID));

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Conectado na Rede " + String(SSID) + " | IP => ");
  Serial.println(WiFi.localIP());
}

// Funcão para se conectar ao Broker MQTT
void initMQTT() {
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(mqtt_callback);
}

//Função que recebe as mensagens publicadas
void mqtt_callback(char* topic, byte* payload, unsigned int length) {

  String message;
  for (int i = 0; i < length; i++) {
    char c = (char)payload[i];
    message += c;
  }
  Serial.println("Tópico => " + String(topic) + " | Valor => " + String(message));

  Serial.flush();
}

void reconnectMQTT() {
  while (!MQTT.connected()) {
    Serial.println("Tentando se conectar ao Broker MQTT: " + String(BROKER_MQTT));
    if (MQTT.connect("ESP8266-ESP12-E")) {
      Serial.println("Conectado");
      MQTT.subscribe("/empresas/douglaszuqueto/catraca/entrada/pong");

    } else {
      Serial.println("Falha ao Reconectar");
      Serial.println("Tentando se reconectar em 2 segundos");
      delay(2000);
    }
  }
}

void recconectWiFi() {
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
}

void rfidProcess()
{
  Serial.print("UID da tag : ");
  String conteudo = "";
  byte letra;
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
    conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  char UUID[9];
  conteudo.toCharArray(UUID, 9);
  Serial.println(conteudo);
  MQTT.publish(TOPIC_PING, UUID);
}
