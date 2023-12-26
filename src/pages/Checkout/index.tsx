import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { API_URL, STRIPE_PK } from "../../consts.ts";
import { GlobalContext } from "../../utils/GlobalContext.tsx";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Heading } from "../../components";

import PhotoPng from "../../assets/photo.png";

const stripePromise = loadStripe(STRIPE_PK);

export const CheckoutForm = () => {
	const [clientSecret, setClientSecret] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const {totalSum} = useContext(GlobalContext);

	useEffect(() => {
		fetch(`${API_URL}/create-checkout-session`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({amount: totalSum, currency: 'eur', productName: 'Tip'}),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	return (
		<>
			{isComplete
				? <>
					<Heading />
					<div className='page-content success-page' >
						<div className='thank-you' >Thank</div >
						<div className='success-mark' >
							<img src={PhotoPng} alt='photo of man' />
						</div >
					</div >
				</>
				: <div id="checkout" >
					{clientSecret && (
						<EmbeddedCheckoutProvider
							stripe={stripePromise}
							options={{clientSecret, onComplete: () => setIsComplete(true)}}
						>
							<EmbeddedCheckout />
						</EmbeddedCheckoutProvider >
					)}
				</div >
			}
		</>

	)
}