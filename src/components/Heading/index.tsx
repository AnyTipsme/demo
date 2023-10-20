import { memo } from 'react'
import LogoSVG from '../../assets/logo.svg?react'
import BowSVG from '../../assets/bow.svg?react'
import LineSVG from '../../assets/line.svg'
import './styles.scss'

export const Heading = memo(() => {
	return (
		<div className='heading'>
			<LogoSVG />
			<img src={LineSVG} alt='decorative line' />
			<BowSVG />
		</div>
	)
})
