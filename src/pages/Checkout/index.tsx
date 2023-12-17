import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { API_URL, STRIPE_PK } from "../../consts.ts";
import { GlobalContext } from "../../utils/GlobalContext.tsx";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(STRIPE_PK);

export const CheckoutForm = () => {
	const [clientSecret, setClientSecret] = useState('');
	const {totalSum} = useContext(GlobalContext);

	useEffect(() => {
		fetch(`${API_URL}/create-checkout-session`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({amount: totalSum*100, currency: 'eur', productName: 'Tip'}),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	return (
		<div id="checkout" >
			{clientSecret && (
				<EmbeddedCheckoutProvider
					stripe={stripePromise}
					options={{clientSecret}}
				>
					<EmbeddedCheckout />
				</EmbeddedCheckoutProvider >
			)}
		</div >
	)
}