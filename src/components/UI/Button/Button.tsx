import React from 'react'
import styles from './Button.module.scss'

interface Props {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
	className?: string
	children?: any
	other?: object
	disabled?: boolean
	accessibilityLabel?: string
}
function Button(props: Props) {
	const className = `${styles.button} ${props.className ?? ''}`
	return (
		<button
			className={className}
			onClick={props.onClick}
			disabled={props.disabled}
			aria-label={props.accessibilityLabel}
			{...props.other}>
			{props.children ?? 'Button'}
		</button>
	)
}

export default Button
