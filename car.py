import requests
import json

# Contains API URLs and secret keys
import keys


class Car:
    
    def __init__(self, img):
        self.plate = img.carcheck['results'][0]['plate']
        self.make = img.carcheck['vehicles'][0]['details']['make'][0]['name']
        self.image = img.carcheck['image_bytes']
        
    def is_authorized(self):
        response = requests.post(keys.API_URL, data = self.__dict__)
        auth_json = response.json()
        print('authorized: ' + auth_json['authorized'])
        if auth_json['authorized'] == 'yes':
            return True
        else:
            return False