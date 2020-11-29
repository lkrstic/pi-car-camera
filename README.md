# pi-car-camera

A small python application to be run on Raspberry Pi with a camera module, ultrasonic sensor, and two LEDs (red and green). The device will detect when something is approaching, take an image, send it to OpenALPR to determine if there is a car in the picture. If so, it will communicate with our backend to check whether the car is authorized, and light the corresponding LED. After the car is checked, it sends a notification to Pushbullet using pushbullet.py.

The starting point is **monitor.py** where the hardware is initialized with the correct pins, and the sensor is configured to wait for an approaching vehicle.
