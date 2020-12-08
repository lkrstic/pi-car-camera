from time import sleep
from datetime import datetime
from signal import pause
from gpiozero import DistanceSensor, LED
from picamera import PiCamera

import image
import car
import notifications

#Initialize hardware
distance_sensor = DistanceSensor(echo=13, trigger=16, max_distance=4, threshold_distance=0.9)
redLED = LED(21)
greenLED = LED(26)


def main():
    print('Ready to detect...')
    print('Distance: %d' % (distance_sensor.distance * 100))
    distance_sensor.when_in_range = check_car
    pause()


def check_car():
    #blink lights to indicate that something has been detected
    redLED.blink()
    greenLED.blink()
    print('In range...')
    print('Distance: %d' % (distance_sensor.distance * 100))
    
    with PiCamera() as camera:
        print('Capturing image')
        img_name = datetime.now().isoformat() + '.jpg'
        camera.capture(img_name)
        print(img_name + ' captured')
    
    img_to_check = image.Image(img_name)
    
    if img_to_check.has_car():
        car_to_auth = car.Car(img_to_check)
        if car_to_auth.is_authorized():
            redLED.off()
            greenLED.on()
            sleep(10)
            greenLED.off()
            message = "Authorized vehicle detected."
        else:
            greenLED.off()
            redLED.on()
            sleep(10)
            redLED.off()
            message = "Unauthorized vehicle detected."
        notifications.send_notification(img_to_check.name, message)
    else:
        redLED.off()
        greenLED.off()
    
    #TODO: delete image


if __name__ == "__main__":
    main()
