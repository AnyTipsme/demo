import { SavingCard, Tips, Payment } from '../../components'
import { TotalSum } from "../../components/TotalSum";

import './styles.scss'

export const Home = () => {
	return (
		<div className='home' >
			<SavingCard />
			<Tips />
			<TotalSum />
			<Payment />
		</div >
	)
}
