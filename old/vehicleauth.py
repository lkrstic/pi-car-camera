import requests
import json
import secretkey

ALPR_url = 'https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=us&return_image=1&secret_key=%s' % (secretkey.SECRET_KEY)
application_url = 'https://my-python-project.azurewebsites.net/image/save'

