import { SavingCard, Tips, Payment, Heading } from '../../components'
import { TotalSum } from "../../components/TotalSum";

import './styles.scss'

export const Home = () => {
	return (
		<div className='home' >
			<Heading />
			<SavingCard />
			<Tips />
			<TotalSum />
			<Payment />
		</div >
	)
}
