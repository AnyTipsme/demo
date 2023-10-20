import { ChangeEventHandler, useCallback, useContext, useState } from 'react'
import { Button } from '../../components'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../utils/GlobalContext'
import './styles.scss'

export const TypeInTips = () => {
	const [amount, setAmount] = useState('')
	const { changeAmountTips } = useContext(GlobalContext)

	const navigate = useNavigate()

	const changeValue = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
		const value = e.target.value.replace(/e/g, '').replace(/-/g, '')
		setAmount(value)
	}, [])

	const clickButton = useCallback(() => {
		amount && +amount > 0 && changeAmountTips(+amount)
		navigate('/')
	}, [amount, changeAmountTips, navigate])

	return (
		<div className='page-content type-in-tips'>
			<h2>Enter the tip amount</h2>
			<input type='number' inputMode='numeric' min={0} value={amount} onChange={changeValue} />
			<Button filled onClick={clickButton}>
				Continue
			</Button>
		</div>
	)
}
