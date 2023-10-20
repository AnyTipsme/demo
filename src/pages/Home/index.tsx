import { useContext } from 'react'
import { SavingCard, Tips, Rate, Review, Payment, SaveNatural } from '../../components'
import './styles.scss'
import { GlobalContext } from '../../utils/GlobalContext'

export const Home = () => {
	const { isReviewOpen } = useContext(GlobalContext)
	return (
		<div className='home'>
			<SavingCard />
			<Tips />
			<Rate />
			{isReviewOpen && <Review />}
			<Payment />
			<SaveNatural />
		</div>
	)
}
