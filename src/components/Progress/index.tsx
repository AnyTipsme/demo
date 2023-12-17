import './styles.scss'

export const Progress = ({amount}: { amount: number }) => (
	<div className='progress' >
		<div style={{width: `${amount}%`}} />
	</div >
)