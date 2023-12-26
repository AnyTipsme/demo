import os
from logging import getLogger
from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe
from dotenv import load_dotenv, find_dotenv

logger = getLogger()

load_dotenv(find_dotenv())
#DOMAIN = 'http://localhost:5173'
DOMAIN = 'https://anywire-driver-app-production.ew.r.appspot.com/'
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

app = Flask(__name__, static_url_path='', static_folder='public')
CORS(app)


@app.route('/')
def root_url():
    return '<p>Hello my dear friend!</p>'


@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.get_json()

    customer_payment = int(data["amount"] * 100)
    tax = int(
        (data["amount"] * 100 * 0.97) - (data["amount"] * 100 * 0.015) - 25
    )

    try:
        payment_intent_data = {
            'transfer_data': {
                "amount": tax,
                "destination": 'acct_1OKIBgINS7Rvve2N'
            }
        }
        return_url = DOMAIN + '/return?session_id={CHECKOUT_SESSION_ID}'

        session = stripe.checkout.Session.create(
            ui_mode='embedded',
            line_items=[
                {
                    'price_data': {
                        'currency': data["currency"],
                        'unit_amount': customer_payment,
                        'product_data': {'name': data["productName"]},
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            payment_intent_data=payment_intent_data,
            return_url=return_url
        )
    except Exception as e:
        logger.error(str(e))
        return str(e)

    return jsonify({'clientSecret': session.client_secret})


@app.route('/session-status', methods=['GET'])
def session_status():
    session = stripe.checkout.Session.retrieve(request.args.get('session_id'))

    return jsonify(
      status=session.status,
      customer_email=session.customer_details.email
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4242)
