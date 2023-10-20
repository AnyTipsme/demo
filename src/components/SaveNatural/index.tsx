import { memo } from 'react'
import NaturalLogoSVG from '../../assets/natural-logo.svg?react'
import './styles.scss'

export const SaveNatural = memo(() => {
	return (
		<div className='save-natural'>
			<NaturalLogoSVG />
			<p>
				AnyTips will contribute <strong>1% of your purchase</strong> to remove CO2 from the atmosphere.
			</p>
		</div>
	)
})
