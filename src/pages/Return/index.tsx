import { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../consts.ts";
import { GlobalContext } from '../../utils/GlobalContext'

import { Heading } from "../../components";

import PhotoPng from '../../assets/photo.png'

import './styles.scss'


export const Return = () => {
	const navigate = useNavigate();
	const {closeReview, changeReviewText, changeAmountTips, changeRate} = useContext(GlobalContext)

	const [status, setStatus] = useState(null);

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const sessionId = urlParams.get('session_id');

		fetch(`${API_URL}/session-status?session_id=${sessionId}`)
			.then((res) => res.json())
			.then((data) => {
				setStatus(data.status);
			});
	}, []);

	useEffect(() => {
		if (status === 'complete') {
			closeReview()
			changeReviewText('')
			changeAmountTips(2)
			changeRate(null)
		}
	}, [status])

	if (status === 'open') {
		navigate('/checkout');
	}

	if (status === 'complete') {
		return (
			<>
				<Heading />
				<div className='page-content success-page' >
					<div className='thank-you' >Thank</div >
					<div className='success-mark' >
						<img src={PhotoPng} alt='photo of man' />
					</div >
				</div >
			</>
		)
	}

	return null;
}