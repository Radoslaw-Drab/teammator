import React from 'react'

import { Actions, State } from 'components/settingsReducer/settingsReducers.model'

import styles from './GroupDisplay.module.scss'

interface Props {
	state: State
	dispatch?: React.Dispatch<Actions>
}
function GroupDisplay(props: Props) {
	const { state } = props
	const groups = state.groups.map((group) => {
		const peopleElements = group.people.map((person) => <li key={person.id}>{person.name}</li>)
		return (
			<li key={group.groupId}>
				<h2>
					Group
					<span>{`#${group.groupId + 1}`}</span>
				</h2>
				<ul>{peopleElements}</ul>
			</li>
		)
	})
	if (groups.length === 0) {
		return <></>
	}
	return (
		<section className={styles.display}>
			<ul>{groups}</ul>
		</section>
	)
}

export default GroupDisplay
