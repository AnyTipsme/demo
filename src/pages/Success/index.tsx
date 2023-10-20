import { useContext, useEffect } from 'react'
import PhotoPng from '../../assets/photo.png'
// import OkSVG from '../../assets/success-mark.svg?react'
import { GlobalContext } from '../../utils/GlobalContext'
import './styles.scss'

export const Success = () => {
	const { closeReview, changeReviewText, changeAmountTips, changeRate } = useContext(GlobalContext)

	useEffect(() => {
		closeReview()
		changeReviewText('')
		changeAmountTips(2)
		changeRate(null)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='page-content success-page'>
			<div className='thank-you'>Thank</div>
			<div className='success-mark'>
				<img src={PhotoPng} alt='photo of man' />
				{/* <OkSVG /> */}
			</div>
		</div>
	)
}
