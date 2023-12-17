import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Frame } from '../Frame'
import { Button } from "../Button";
import { PoweredBy } from "../PoweredBy";

import './styles.scss'

export const Payment = memo(() => {
	const navigate = useNavigate()

	return (
		<div className={'payment'} >
			<Frame className='payment' >
				<Button bold filled onClick={() => navigate('/checkout')} >{'Pay'}</Button >
				<PoweredBy />
			</Frame >
		</div >
	)
})
