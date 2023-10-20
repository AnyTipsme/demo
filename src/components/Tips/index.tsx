// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { MouseEventHandler, memo, useCallback, useContext } from 'react'
import { Section } from '../Section'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_TIPS, GlobalContext, isCustomTipsFn } from '../../utils/GlobalContext'
import { Button } from '..'
import './styles.scss'

const CUSTOM_AMOUNT = 'custom'

export const Tips = memo(() => {
	const { amountTips, isCustomTips, changeAmountTips } = useContext(GlobalContext)
	const navigate = useNavigate()

	const clickTipsButton = useCallback<MouseEventHandler>(
		e => {
			const target = e.target as HTMLElement
			const tipsElement = target.closest('li')
			if (tipsElement) {
				const { amount } = tipsElement.dataset

				const isValid = isValidNumber(amount!)
				isValid && changeAmountTips(+amount!)

				const isCustom = isCustomTipsFn(+amount!)
				isCustom && navigate('/type-in-tips')
			}
		},
		[changeAmountTips, navigate]
	)

	return (
		<Section name='Tips'>
			<ul className='tips' onClick={clickTipsButton}>
				{DEFAULT_TIPS.map(amount => {
					return <TipsButton key={amount} content={amount} isActive={amountTips === amount} />
				})}
				<TipsButton content={isCustomTips ? amountTips : 'Your tips!'} isActive={isCustomTips} />
			</ul>
		</Section>
	)
})

type TTipsButton = { content: string | number; isActive?: boolean }

const TipsButton = ({ content = CUSTOM_AMOUNT, isActive = false }: TTipsButton) => (
	<li className='tips-button' data-amount={content}>
		<Button filled={isActive} bold>
			{typeof content === 'number' ? toEURO(content) : <span>{content}</span>}
		</Button>
	</li>
)

const toEURO = (amount: number) => {
	return amount.toLocaleString('de-DE', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0
	})
}

const isValidNumber = (value: string) => {
	const isEmpty = value === ''
	const numb = Number(value)
	return (!isNaN(numb) && numb > 0) || isEmpty
}
