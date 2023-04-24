import React from 'react'
import useAppContext from 'utils/use-app-context'

import Button from 'components/UI/Button/Button'
import Input from 'components/UI/Input/Input'

import styles from './PeopleInputBox.module.scss'
import { XMarkIcon } from '@heroicons/react/24/outline'

function PeopleInputBox() {
	const { state, dispatch } = useAppContext()

	function onRemovePerson(event: React.MouseEvent<HTMLButtonElement>) {
		const id = +(event.currentTarget.dataset.personId ?? -1)
		dispatch({ type: 'REMOVE_PERSON', removePersonId: id })
	}
	function onUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
		const id = +(event.currentTarget.dataset.personId ?? -1)
		dispatch({ type: 'CHANGE_NAME', person: { id: id, name: event.target.value } })
	}
	function onBlur() {
		dispatch({ type: 'SAVE_STATE' })
	}

	const inputFields = state.people.map((person) => {
		const dataset = { 'data-person-id': person.id }
		return (
			<React.Fragment key={person.id}>
				<Input
					type="text"
					defaultValue={person.name}
					onChange={onUserNameChange}
					onBlur={onBlur}
					other={{ ...dataset, maxLength: '13' }}
					accessibilityLabel="input where user can change person's name"
				/>
				<Button
					onClick={onRemovePerson}
					other={dataset}
					className={styles['remove-button']}
					accessibilityLabel="button for removing person">
					<XMarkIcon />
				</Button>
			</React.Fragment>
		)
	})
	return <div className={styles.inputs}>{inputFields}</div>
}

export default PeopleInputBox
