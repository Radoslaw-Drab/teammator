import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import Button from 'components/UI/Button/Button'
import Input from 'components/UI/Input/Input'
import { Actions, State } from 'components/settingsReducer/settingsReducers.model'

import styles from './PersonsInputBox.module.scss'
interface Props {
	state: State
	dispatch: React.Dispatch<Actions>
}

function PersonsInputBox(props: Props) {
	const { state, dispatch } = props

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

	const inputFields = state.persons.map((person) => {
		const dataset = { 'data-person-id': person.id }
		return (
			<React.Fragment key={person.id}>
				<Input type="text" defaultValue={person.name} onChange={onUserNameChange} onBlur={onBlur} other={dataset} />
				<Button onClick={onRemovePerson} other={dataset} className={styles['remove-button']}>
					<XMarkIcon />
				</Button>
			</React.Fragment>
		)
	})
	return <div className={styles.inputs}>{inputFields}</div>
}

export default PersonsInputBox
