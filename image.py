from base64 import b64encode
import requests
import json

# Contains API URLs and secret keys
import keys


class Image:
    
    def __init__(self, name):
        self.name = name
        self.encoded = None
        self.carcheck = None
            
    def encode(self):
        with open(self.name, 'rb') as img_file:
            print('Encoding image')
            self.encoded = b64encode(img_file.read())
            print('Image encoded')
            
    def has_car(self):
        print('Checking if image contains a car...')
        self.encode()
        #Send image to OpenALPR CarCheck API for analysis
        response = requests.post(keys.ALPR_URL, data = self.encoded)
        self.carcheck = response.json()
        if len(self.carcheck["results"]) != 0:
            print('has car')
            car = True
        else:
            print('no car')
            car = False
        return car
    
    def delete(self):
        #TODO: add cleanup to delete images after processing
        pass