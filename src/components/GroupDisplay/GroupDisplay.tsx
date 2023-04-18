import useAppContext from 'utils/use-app-context'

import styles from './GroupDisplay.module.scss'

function GroupDisplay() {
	const { state } = useAppContext()

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
