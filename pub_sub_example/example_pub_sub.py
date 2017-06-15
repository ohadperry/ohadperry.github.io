from flask import Flask
import json
import os
import time

os.environ['GOOGLE_CLOUD_DISABLE_GRPC'] = 'true'
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.expanduser('~') + '/' + '.certificates/personal/google_cloud_personal.json'
if os.environ.get('PUBSUB_EMULATOR_HOST'):
    del os.environ['PUBSUB_EMULATOR_HOST']
from google.cloud import pubsub #pip install google-cloud-pubsub

app = Flask(__name__)
pubsub_client = pubsub.Client()
payments_topic = pubsub_client.topic('myTopic')

def publish_message(data):

    # gcloud beta pubsub topics create myTopic
    # gcloud beta pubsub subscriptions create --topic myTopic mySubscription
    data = json.dumps(data)
    data = data.encode('utf-8')
    print 'before pushing'
    message_id = payments_topic.publish(data)
    print('Message '+repr(message_id)+'published.')


def process_order_aync(data):
    publish_message(data)


@app.route('/')
def transfer_money_ack_from_paypal():
    print "user paid 10 dollar"
    time1 = time.time()
    process_order_aync({'amount': 10})
    time2 = time.time()
    return '<h1>Payment confirmation.</h1> took ' + repr((time2-time1)) + ' seconds.'

app.run(debug=True, port=5001)

