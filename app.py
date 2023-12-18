import os

from flask import Flask, jsonify, redirect, request
from flask_cors import CORS

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

import stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

app = Flask(__name__, static_url_path='', static_folder='public')
CORS(app)

YOUR_DOMAIN = 'http://localhost:5173'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.get_json()

    customer_payment = int(data["amount"] * 100)
    tax = int((data["amount"] * 100 * 0.97) - (data["amount"] * 100 * 0.015) - 25)

    try:
        session = stripe.checkout.Session.create(
            ui_mode = 'embedded',
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
            payment_intent_data={'transfer_data': {"amount": tax, "destination": 'acct_1OKJeYIcB2gw0M83'}},
            return_url=YOUR_DOMAIN + '/return?session_id={CHECKOUT_SESSION_ID}',
        )
    except Exception as e:
        return str(e)

    return jsonify({'clientSecret': session.client_secret})

@app.route('/session-status', methods=['GET'])
def session_status():
  session = stripe.checkout.Session.retrieve(request.args.get('session_id'))

  return jsonify(status=session.status, customer_email=session.customer_details.email)

if __name__ == '__main__':
    app.run(port=4242)