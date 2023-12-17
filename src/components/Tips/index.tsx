// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { MouseEventHandler, memo, useCallback, useContext } from 'react'

import { DEFAULT_TIPS, GlobalContext, isCustomTipsFn } from '../../utils/GlobalContext'
import { isValidNumber } from "../../utils";

import { Section } from '../Section'
import { TypeInTips } from "../TypeInTips";
import { TipsButton } from "../TipsButton";

import './styles.scss'

export const Tips = memo(() => {
	const {amountTips, isCustomTips, changeAmountTips, showTipInput, isTipInputShow} = useContext(GlobalContext)

	const clickTipsButton = useCallback<MouseEventHandler>(
		e => {
			const target = e.target as HTMLElement
			const tipsElement = target.closest('li')
			if (tipsElement) {
				const {amount} = tipsElement.dataset

				const isValid = isValidNumber(amount!)
				isValid && changeAmountTips(+amount!)

				const isCustom = isCustomTipsFn(+amount!)
				isCustom && showTipInput();
			}
		},
		[changeAmountTips, showTipInput]
	)

	const content = isTipInputShow ?
		<TypeInTips /> :
		<TipsButtonsRow amountTips={amountTips} isCustomTips={isCustomTips} onClick={clickTipsButton} />


	return (
		<div className={'tipsWrapper'} >
			<Section name='Tips' >
				{content}
			</Section >
		</div >
	)
})

type TTipsButtonsRow = {
	amountTips: number;
	isCustomTips: boolean;
	onClick: MouseEventHandler;
}

const TipsButtonsRow = ({amountTips, isCustomTips, onClick}: TTipsButtonsRow) => {
	const defaultTips = DEFAULT_TIPS.map(amount => {
		return <TipsButton key={amount} content={amount} isActive={amountTips === amount} />
	})

	return <ul className='tips' onClick={onClick} >
		{defaultTips}
		<TipsButton content={isCustomTips ? amountTips : 'Add your tip!'} isActive={isCustomTips} fitContent />
	</ul >
}
