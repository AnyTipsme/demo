import { memo, MouseEventHandler, type PropsWithChildren } from 'react'

import { buildClass } from '../../utils'

import './styles.scss'

type TButton = PropsWithChildren & {
	filled?: boolean
	fitContent?: boolean
	bold?: boolean
	onClick?: MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
}

export const Button = memo(({ children, onClick, fitContent = false, filled = false, bold = false, disabled = false }: TButton) => {
	const built = buildClass('button', filled && 'filled', fitContent && 'content', bold && 'bold')

	return (
		<button className={built} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
})
