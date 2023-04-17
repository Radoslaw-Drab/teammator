import React from 'react'

import styles from './Input.module.scss'

interface Props {
	type: React.HTMLInputTypeAttribute
	value?: string | number
	defaultValue?: string | number
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
	other?: object
	className?: string
	id?: string
}
function Input(props: Props) {
	const inputClass: string = `${styles.input} ${props.className ?? ''} `
	return (
		<input
			id={props.id}
			onChange={props.onChange}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
			type={props.type}
			defaultValue={props.defaultValue}
			value={props.value}
			{...props.other}
			className={inputClass}
		/>
	)
}

export default Input
