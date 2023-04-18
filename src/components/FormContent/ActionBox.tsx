import React from 'react'
import { Actions, State } from 'components/settingsReducer/settingsReducers.model'

import Button from 'components/UI/Button/Button'

import styles from './ActionBox.module.scss'

interface Props {
	state: State
	dispatch: React.Dispatch<Actions>
}
function ActionBox(props: Props) {
	function createGroups() {
		props.dispatch({ type: 'CREATE_GROUPS', groupsCount: props.state.groupsCount })
	}

	function resetState() {
		props.dispatch({ type: 'RESET_STATE' })
	}
	return (
		<fieldset className={styles.box}>
			<Button onClick={createGroups} disabled={props.state.people.length < 2}>
				Create Groups
			</Button>
			<Button onClick={resetState} disabled={props.state.people.length === 0}>
				Reset
			</Button>
		</fieldset>
	)
}

export default ActionBox
