from flask import Flask
import time 
app = Flask(__name__)


def process_order():
    time.sleep(3)

@app.route('/')
def transfer_money_ack_from_paypal():
    print 'user paid 10 dollar'
    time1 = time.time()
    process_order()
    time2 = time.time()
    return '<h1>done processing order</h1>. took ' + repr((time2-time1)) + ' seconds.'

app.run(debug=True)

