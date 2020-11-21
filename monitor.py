from time import sleep
from datetime import datetime
from signal import pause
from gpiozero import DistanceSensor, LED
from picamera import PiCamera

import image
import car

#Initialize hardware
distance_sensor = DistanceSensor(echo=13, trigger=16, max_distance=4)
redLED = LED(21)
greenLED = LED(26)


def main():
    redLED.blink()
    greenLED.blink()
    sleep(5)
    redLED.off()
    greenLED.off()
    print('Ready to detect...')
    print('Distance: %d' % (distance_sensor.distance * 100))
    distance_sensor.when_in_range = check_car
    pause()


def check_car():
    redLED.blink()
    print('In range...')
    print('Distance: %d' % (distance_sensor.distance * 100))
    
    with PiCamera() as camera:
        print('Capturing image')
        img_name = datetime.now().isoformat() + '.jpg'
        camera.capture(img_name)
        print(img_name + ' captured')
    
#    img_to_check = image.Image(img_name)
    img_to_check = image.Image('cartest.jpg')
    if img_to_check.has_car():
        car_to_auth = car.Car(img_to_check)
        if car_to_auth.is_authorized():
            redLED.off()
            greenLED.on()
            sleep(10)
            greenLED.off()
        else:
            greenLED.off()
            redLED.on()
            sleep(10)
            redLED.off()
        #print(car_to_auth.__dict__)
    else:
        redLED.off()
        greenLED.off()
    
    print('done')


if __name__ == "__main__":
    main()