import { memo } from 'react'
import { Frame } from '../Frame'
import PhotoPNG from '../../assets/photo.png'
import './styles.scss'

export const SavingCard = memo(() => {
	return (
		<Frame className='saving-card' color='primary'>
			<div>
				<h2>Marc</h2>
				<p>Saving for a vacation</p>
				<span>€37 left out of €300</span>
				<Progess amount={80} />
			</div>
			<img src={PhotoPNG} alt='photo of man' />
		</Frame>
	)
})

const Progess = ({ amount }: { amount: number }) => (
	<div className='progress'>
		<div style={{ width: `${amount}%` }} />
	</div>
)
