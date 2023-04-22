import useAppContext from 'utils/use-app-context'
import LanguageHandler from 'utils/LanguageHandler'

import Button from 'components/UI/Button/Button'

import styles from './ActionBox.module.scss'

function ActionBox() {
	const { state, dispatch } = useAppContext()

	function createGroups() {
		dispatch({ type: 'CREATE_GROUPS', groupsCount: state.groupsCount })
	}

	function resetState() {
		dispatch({ type: 'RESET_STATE' })
	}
	return (
		<fieldset className={styles.box}>
			<Button onClick={createGroups} disabled={state.people.length < 2}>
				{LanguageHandler('Create Groups')}
			</Button>
			<Button onClick={resetState} disabled={state.people.length === 0}>
				{LanguageHandler('Reset')}
			</Button>
		</fieldset>
	)
}

export default ActionBox
