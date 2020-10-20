from gpiozero import Button, LED
from signal import pause
from picamera import PiCamera
from datetime import datetime
from time import sleep
import requests
import base64
import json
import secretkey

# Takes an image, saves with current timestamp,
# and passes it to AnalyzeImage()
def CaptureImage():
    imgName = datetime.now().isoformat() + '.jpg'
    print(imgName)
    camera.capture('%s' % imgName)
    AnalyzeImage(imgName)

# Sends the image to OpenALPR for analysis.
# If it contains a license plate and vehicle, call AuthorizeVehicle()
def AnalyzeImage(imgToCheck):
    #TO REMOVE, test image
    print(imgToCheck)
    imgToCheck = 'cartest.jpg'
    print(imgToCheck)
    
    ALPRurl = 'https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=us&return_image=1&secret_key=%s' % (secretkey.SECRET_KEY)
    # ALPRurl = 'https://api.openalpr.com/v3/recognize_bytes?country=us&secret_key=%s' % (SECRET_KEY)
    with open(imgToCheck, 'rb') as imgFile:
        imgBase64 = base64.b64encode(imgFile.read())
        
    response = requests.post(ALPRurl, data = imgBase64)
    jsonResponse = response.json()
    with open('ResponseALPR.json', 'w') as write_file:
         json.dump(response.json(), write_file, indent=2)
         
    if len(jsonResponse["results"]) != 0:
        print("not empty")
        #TODO: prepare object for sending to server
        AuthorizeVehicle()


# Sends the results to our web server for authorization.
# If there is a match in the db, the vehicle is authorized.
def AuthorizeVehicle():
    #TODO add POST to web application
    #TO REMOVE, for testing
    redLED.off()
    greenLED.on()
    sleep(5)
    greenLED.off()
    redLED.on()

def Cleanup():
    pass
    #TODO: delete img and JSON files after they've been handled


# initialize hardware
button = Button(25)
redLED = LED(17)
greenLED = LED(22)
camera = PiCamera()
redLED.on()


button.when_pressed = CaptureImage
pause()

redLED.off()
greenLED.off()
camera.close()