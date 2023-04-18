import React from 'react'
import { UserMinusIcon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Actions, State } from 'components/settingsReducer/settingsReducers.model'

import Button from 'components/UI/Button/Button'

import styles from './PeopleChangeButtonBox.module.scss'

interface Props {
	state: State
	dispatch: React.Dispatch<Actions>
}
function PeopleChangeButtonBox(props: Props) {
	function addPerson() {
		props.dispatch({ type: 'ADD_NEW_PERSON' })
	}
	function removePerson() {
		props.dispatch({ type: 'REMOVE_LAST_PERSON' })
	}
	return (
		<div className={styles.box}>
			<div>
				<UsersIcon />
				<span>{props.state.people.length}</span>
			</div>
			<fieldset>
				<Button onClick={addPerson}>
					<UserPlusIcon />
				</Button>
				<Button onClick={removePerson}>
					<UserMinusIcon />
				</Button>
			</fieldset>
		</div>
	)
}

export default PeopleChangeButtonBox
