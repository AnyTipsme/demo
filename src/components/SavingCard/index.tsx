import { memo } from 'react'

import { Frame } from '../Frame'

import PhotoPNG from '../../assets/photo.png'

import './styles.scss'

export const SavingCard = memo(() => {
	return (
		<Frame className='saving-card' color='primary' >
			<div >
				<h2 >Marc</h2 >
				<p >Saving for a vacation</p >
			</div >
			<img src={PhotoPNG} alt='photo of man' />
		</Frame >
	)
})
