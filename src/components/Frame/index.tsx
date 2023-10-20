import { memo, type PropsWithChildren } from 'react'
import { buildClass } from '../../utils'
import './styles.scss'

type TFrame = PropsWithChildren & {
	className?: string
	color?: 'primary' | 'secondary'
}

export const Frame = memo(({ children, className, color }: TFrame) => {
	const built = buildClass('frame', className, color)
	return <div className={built}>{children}</div>
})
