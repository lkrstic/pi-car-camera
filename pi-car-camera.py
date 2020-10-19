from gpiozero import Button, LED
from signal import pause
from picamera import PiCamera
from datetime import datetime
import requests
import base64
import json

# initialize hardware
button = Button(25)
redLED = LED(17)
greenLED = LED(22)
camera = PiCamera()
redLED.on()

# Takes an image, saves with current timestamp,
# and passes it to AnalyzeImage()
def CaptureImage():
    imgName = datetime.now().isoformat() + '.jpg'
    print(imgName)
    camera.capture('%s' % imgName)
    AnalyzeImage(imgName)
    
    #TO REMOVE, for testing
    redLED.off()
    greenLED.on()

# Sends the image to OpenALPR for analysis.
# If it contains a license plate and vehicle, call AuthorizeVehicle()
def AnalyzeImage(imgToCheck):
    print(imgToCheck)
    #TO REMOVE, test image
    imgToCheck = 'nocartest.jpg'
    print(imgToCheck)
    SECRET_KEY = ' sk_fce59eaab37d90ea2d5dc63a'
    ALPRurl = 'https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=us&secret_key=%s' % (SECRET_KEY)
    # ALPRurl = 'https://api.openalpr.com/v3/recognize_bytes?country=us&secret_key=%s' % (SECRET_KEY)
    with open(imgToCheck, 'rb') as imgFile:
        imgBase64 = base64.b64encode(imgFile.read())
        
    response = requests.post(ALPRurl, data = imgBase64)
    jsonResponse = response.json()
    print(jsonResponse["results"])
    if len(jsonResponse["results"]) != 0:
        print("not empty")
        #todo prepare object for sending to server

#OLD        
#     with open('ResponseALPR.json', 'w') as write_file:
#         json.dump(response.json(), write_file, indent=2)


# Sends the results to our web server for authorization.
# If there is a match in the db, the vehicle is authorized.
def AuthorizeVehicle():
    #todo add POST to web application
    pass



button.when_pressed = CaptureImage
pause()

redLED.off()
greenLED.off()
camera.close()