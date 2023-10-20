import { ChangeEventHandler, memo, useCallback, useContext } from 'react'
import { Section } from '../Section'
import { GlobalContext } from '../../utils/GlobalContext'
import './styles.scss'

export const Review = memo(() => {
	const { reviewText, changeReviewText } = useContext(GlobalContext)

	const changeReview = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(e => {
		changeReviewText(e.target.value)
	}, [])

	return (
		<Section name='Leave your review'>
			<textarea value={reviewText} placeholder='Your review...' rows={3} onChange={changeReview} />
		</Section>
	)
})
