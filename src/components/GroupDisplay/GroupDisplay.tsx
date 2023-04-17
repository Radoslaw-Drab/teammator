import React from 'react'

import { Actions, State } from 'components/settingsReducer/settingsReducers.model'

// import styles from './GroupDisplay.module.scss';

interface Props {
	state: State
	dispatch?: React.Dispatch<Actions>
}
function GroupDisplay(props: Props) {
	const { state } = props
	const groups = state.groups.map((group) => {
		const peopleElements = group.persons.map((person) => <li key={person.id}>{person.name}</li>)
		return (
			<React.Fragment key={group.groupId}>
				<h2>{`Group #${group.groupId + 1}`}</h2>
				<ul>{peopleElements}</ul>
			</React.Fragment>
		)
	})
	return <>{groups}</>
}

export default GroupDisplay
