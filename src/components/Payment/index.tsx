import { memo, useCallback, useMemo, type FC, type MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { Section } from '../Section'
import { Frame } from '../Frame'
import './styles.scss'

import AppleSVG from '../../assets/payment/apple.svg?react'
import GoogleSVG from '../../assets/payment/google.svg?react'
import AddSVG from '../../assets/payment/add.svg?react'

const METHOD_ICONS = [
	{ Icon: AppleSVG, text: 'Pay' },
	{ Icon: GoogleSVG, text: 'Pay' },
	{ Icon: AddSVG, text: 'Add a new method' }
]

export const Payment = memo(() => {
	const navigate = useNavigate()

	const methods = useMemo(() => METHOD_ICONS.map((props, index) => <PaymentMethod key={index} {...props} />), [])

	const clickMethod = useCallback<MouseEventHandler>(
		e => {
			const target = e.target as HTMLElement
			const methodElement = target.closest('li')
			methodElement && navigate('/success')
		},
		[navigate]
	)

	return (
		<Section name='Choose a payment method'>
			<Frame className='payment'>
				<ul onClick={clickMethod}>{methods}</ul>
			</Frame>
		</Section>
	)
})

type TPaymentMethod = { Icon: FC; text: string }

const PaymentMethod = ({ Icon, text }: TPaymentMethod) => {
	return (
		<li className='payment-method'>
			<Icon />
			<span>{text}</span>
		</li>
	)
}
