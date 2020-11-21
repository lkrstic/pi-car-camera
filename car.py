import requests
import json

import keys


class Car:
    
    def __init__(self, img):
        self.plate = img.carcheck['results'][0]['plate']
        self.make = img.carcheck['vehicles'][0]['details']['make'][0]['name']
        self.image = img.carcheck['image_bytes']
        
    def is_authorized(self):
        response = requests.post(keys.API_URL, data = self.__dict__)
        #TODO add handling for response
        auth_json = response.json()
        if auth_json['authorized'] == 'yes':
            return True
        else:
            return False
        
    
# # Sends the results to our web server for authorization.
# # If there is a match in the db, the vehicle is authorized.
# def AuthorizeVehicle(dataToSend):
#     url = 'https://my-python-project.azurewebsites.net/image/save'
#     response = requests.post(url, data = dataToSend)
#     #TODO add handling for response
#     print(json.dumps(response.json(), indent=2))