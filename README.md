# Automated Vehicle Authorization

The project is a prototype for an IoT system that can automatically detect and approaching vehicle, analyze its specs, and determine whether it matches those stored in the database.

*Raspberry Pi*

This includes a small python application to be run on Raspberry Pi with a camera module, ultrasonic sensor, and two LEDs (red and green). The device will detect when something is approaching, take an image, send it to OpenALPR to determine if there is a car in the picture. If so, it will communicate with our backend to check whether the car is authorized, and light the corresponding LED. After the car is checked, it sends a notification to Pushbullet using pushbullet.py.

The starting point is **monitor.py** where the hardware is initialized with the correct pins, and the sensor is configured to wait for an approaching vehicle.

*Web application*

The web interface can be seen at http://cardetectioncen.web.app/
This site allows a user to signup, login, and see previously detected vehicles. The user can view the details as well as allowing previously unauthorized vehicles to become authorized.
