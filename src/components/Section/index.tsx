import type { PropsWithChildren } from 'react'
import './styles.scss'

export const Section = ({ children, name }: PropsWithChildren & { name: string }) => (
	<div className='section'>
		<span>{name}</span>
		<div>{children}</div>
	</div>
)
