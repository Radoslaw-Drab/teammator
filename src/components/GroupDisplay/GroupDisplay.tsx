import useAppContext from 'utils/use-app-context'
import useLanguage from 'utils/use-language'

import styles from './GroupDisplay.module.scss'

function GroupDisplay() {
	const { state } = useAppContext()
	const { translate, translateString } = useLanguage()

	const groups = state.groups.map((group) => {
		const peopleElements = group.people.map((person) => {
			const translated = translateString('Person', person.name)
			const name = person.nameChanged ? person.name : translated
			return <li key={person.id}>{name}</li>
		})
		return (
			<li key={group.groupId}>
				<h2>
					{translate('Group')}
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
