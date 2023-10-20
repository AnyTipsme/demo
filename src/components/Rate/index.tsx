import { memo, type FC, type ComponentProps, useMemo, useCallback, MouseEventHandler, useContext } from 'react'
import { Section } from '../Section'
import { Frame } from '../Frame'
import './styles.scss'

import OkSVG from '../../assets/rate/ok.svg?react'
import BadSVG from '../../assets/rate/bad.svg?react'
import StartSVG from '../../assets/rate/star.svg?react'
import BubbleSVG from '../../assets/rate/bubble.svg?react'
import { buildClass } from '../../utils'
import { GlobalContext } from '../../utils/GlobalContext'

const RATE_ICONS = [
	{ Icon: OkSVG, text: 'Good' },
	{ Icon: BadSVG, text: 'Bad' },
	{ Icon: StartSVG, text: 'Excellent' }
]

export const Rate = memo(() => {
	const { isReviewOpen, closeReview, openReview, rate, changeRate } = useContext(GlobalContext)

	const rateIcons = useMemo(() => {
		return RATE_ICONS.map(props => {
			let isActive = false
			const item = props.text
			if ((item === 'Review' && isReviewOpen) || item === rate) {
				isActive = true
			}
			return <RateButton key={props.text} {...props} isActive={isActive} />
		})
	}, [isReviewOpen, rate])

	const clickRateButton = useCallback<MouseEventHandler>(
		e => {
			const target = e.target as HTMLElement
			const rateElement = target.closest('li')
			if (rateElement) {
				const item = rateElement.dataset.item as typeof rate | 'Review'
				if (item === 'Review') {
					void (isReviewOpen ? closeReview : openReview)()
				} else {
					changeRate(item)
				}
			}
		},
		[changeRate, closeReview, isReviewOpen, openReview]
	)

	return (
		<Section name='Rate the place'>
			<Frame className='rate'>
				<ul onClick={clickRateButton}>
					{rateIcons}
					<ReviewButton isActive={isReviewOpen} />
				</ul>
			</Frame>
		</Section>
	)
})

const REVIEW_ICON = { Icon: BubbleSVG, text: 'Review' }

const ReviewButton = ({ isActive }: Pick<TRateButton, 'isActive'>) => {
	return <RateButton Icon={REVIEW_ICON.Icon} text={REVIEW_ICON.text} isActive={isActive} />
}

type TRateButton = { Icon: FC<ComponentProps<'svg'>>; text: string; isActive: boolean }

const RateButton = ({ Icon, text, isActive }: TRateButton) => {
	const built = buildClass('rate-button', isActive && 'active')
	return (
		<li className={built} data-item={text}>
			<Icon />
			<span>{text}</span>
		</li>
	)
}
