#define ledPin LED_BUILTIN
String nom = "Arduino";
String msg;
int ind = 0;

void setup()
{
  Serial.begin(9600);
  // Serial.println("Started listening at baud 9600");
  pinMode(ledPin, OUTPUT);
  testSensor();
}

void readSerialPort()
{
  msg = "";
  if (Serial.available())
  {
    delay(10);
    while (Serial.available() > 0)
    {
      msg += (char)Serial.read();
    }
    Serial.flush();
  }
}

void sendData()
{
  Serial.println(analogRead(A0));
}

void testSensor()
{
  int prevStatus = digitalRead(ledPin);
  for (int j = 0; j < 3; j++)
  {
    digitalWrite(ledPin, HIGH);
    delay(200);
    digitalWrite(ledPin, LOW);
    delay(200);
  }
  digitalWrite(ledPin, prevStatus);
  Serial.println("ok");
}

void loop()
{
  readSerialPort();
  if (msg == "reading" || msg == "reading\n")
  {
    sendData();
  }
  else if (msg == "led0" || msg == "led0\n")
  {
    // Serial.println("Received led0, turning Led OFF");
    digitalWrite(ledPin, LOW);
  }
  else if (msg == "led1" || msg == "led1\n")
  {
    // Serial.println("Received led1, turning Led ON");
    digitalWrite(ledPin, HIGH);
  }
  else if (msg == "test" || msg == "test\n")
  {
    testSensor();
  }
  delay(1000);
}
