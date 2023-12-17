import { ChangeEventHandler, useCallback, useContext, useState } from 'react'

import { GlobalContext } from '../../utils/GlobalContext.tsx'

import { TipsButton } from "../TipsButton";

import LeftArrowSVG from '../../assets/left-arrow.svg?react'
import CheckMarkSVG from '../../assets/checkmark.svg?react'

import './styles.scss'

export const TypeInTips = () => {
	const {changeAmountTips, hideTipInput} = useContext(GlobalContext)
	const [amount, setAmount] = useState('')

	const changeValue = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
		const value = e.target.value.replace(/e/g, '').replace(/-/g, '')
		value.length <= 4 && setAmount(value);
	}, [])

	const handleSubmit = useCallback(() => {
		amount && +amount > 0 && changeAmountTips(+amount);
		hideTipInput();
	}, [amount, changeAmountTips])

	return (
		<div className={'type-in-tips'} >
			<TipsButton content={<LeftArrowSVG />} onClick={hideTipInput} />
			<input type='number' inputMode='numeric' min={0} value={amount} onChange={changeValue} autoFocus />
			<TipsButton content={<CheckMarkSVG />} onClick={handleSubmit} disabled={!amount || +amount <= 0} />
		</div >
	)
}
