import useAppContext from 'utils/use-app-context'

import Button from 'components/UI/Button/Button'

import { UserMinusIcon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'
import styles from './PeopleChangeButtonBox.module.scss'

function PeopleChangeButtonBox() {
	const { state, dispatch } = useAppContext()

	function addPerson() {
		dispatch({ type: 'ADD_NEW_PERSON' })
	}
	function removePerson() {
		dispatch({ type: 'REMOVE_LAST_PERSON' })
	}
	return (
		<div className={styles.box}>
			<div>
				<UsersIcon />
				<span>{state.people.length}</span>
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
