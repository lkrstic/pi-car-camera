from pushbullet import Pushbullet

# Contains API URLs and secret keys
import keys

def send_notification(img_name, message):
    print('preparing push')
    pb = Pushbullet(keys.PUSHBULLET_KEY)
    
    body_data = message + ' Visit https://cardetectioncen.web.app/ for details.'
    
    with open(img_name, 'rb') as pic:
        file_data = pb.upload_file(pic, img_name)
    
    push = pb.push_file(**file_data, body=body_data)
    print('push sent')

