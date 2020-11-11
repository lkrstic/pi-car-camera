from picamera import PiCamera
from datetime import datetime
import base64

def CaptureImage():
    print('Capturing image')
    with PiCamera() as camera:
        img_name = datetime.now().isoformat() + '.jpg'
        print(img_name)
        camera.capture(img_name)
        print(img_name + ' saved')
        
    with open(img_name, 'rb') as img:
        print('Encoding image')
        img_base64 = base64.b64encode(img.read())
        print('Image encoded')
        
    return img_base64