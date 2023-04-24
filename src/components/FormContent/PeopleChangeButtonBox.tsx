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
			<fieldset aria-label="fieldset with buttons for changing people count">
				<Button onClick={addPerson} accessibilityLabel="button for adding new person">
					<UserPlusIcon />
				</Button>
				<Button onClick={removePerson} accessibilityLabel="button for removing last person">
					<UserMinusIcon />
				</Button>
			</fieldset>
		</div>
	)
}

export default PeopleChangeButtonBox
