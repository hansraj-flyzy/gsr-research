#define ledPin 2
String nom = "Arduino";
String msg;

void setup() {
  Serial.begin(9600);
  Serial.println("Started listening at baud 9600");
  pinMode(ledPin,OUTPUT);
  testSensor();
}

void readSerialPort() {
  msg = "";
  if (Serial.available()) {
    delay(10);
    while (Serial.available() > 0) {
      msg += (char)Serial.read();
    }
    Serial.println(msg);
    Serial.flush();
  }
}

void sendData() {
  //write data ledState x sensor1 x sensor2
  Serial.print(digitalRead(ledPin));
  Serial.print("x");
  Serial.print(analogRead(A0));
}

void testSensor() {
  for(int j=0; j<3;j++){
    digitalWrite(ledPin,LOW);
    delay(200);
    digitalWrite(ledPin,HIGH);
    delay(200);
    }
}

void loop() {
  readSerialPort();
  
  if (msg == "data") {
    sendData();
  }else if(msg=="led0"){
    Serial.println("Received led0, turning Led OFF");
    digitalWrite(ledPin,HIGH);
  }else if(msg=="led1"){
    Serial.println("Received led0, turning Led ON");
    digitalWrite(ledPin,LOW);
  }else if(msg=="test"){
    testSensor();
  }
  delay(200);
}
