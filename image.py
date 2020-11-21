from base64 import b64encode
import requests
import json

# Contains API URLs and secret key
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


#     with open('ResponseALPR.json', 'w') as write_file:
#          json.dump(response.json(), write_file, indent=2)

#     if len(jsonResponse["results"]) != 0:
#         trimmedResponse = {}
#         trimmedResponse["plate"] = jsonResponse['results'][0]['plate']
#         trimmedResponse["make"] = jsonResponse['vehicles'][0]['details']['make'][0]['name']
#         trimmedResponse["image"] = jsonResponse['image_bytes']
#         print(trimmedResponse)
#         AuthorizeVehicle(trimmedResponse)


# # Sends the results to our web server for authorization.
# # If there is a match in the db, the vehicle is authorized.
# def AuthorizeVehicle(dataToSend):
#     url = 'https://my-python-project.azurewebsites.net/image/save'
#     response = requests.post(url, data = dataToSend)
#     #TODO add handling for response
#     print(json.dumps(response.json(), indent=2))


            
#img = Image('cartest.jpg')
#img.check_for_car()


# img.encode_image()
# with open("testencoded.txt", "wb") as file:
#     file.write(img.encoded)