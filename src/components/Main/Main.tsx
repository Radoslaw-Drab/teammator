import React, { useEffect, useReducer } from 'react'
import { settingsReducer } from 'components/settingsReducer/settingsReducer'
import { getStateFromLocalStorage } from 'utils'

import PersonsChangeButtonBox from 'components/FormContent/PersonsChangeButtonBox'
import PersonsInputBox from 'components/FormContent/PersonsInputBox'
import GroupCountInput from 'components/FormContent/GroupCountInput'
import ActionBox from 'components/FormContent/ActionBox'
import GroupDisplay from 'components/GroupDisplay/GroupDisplay'

import styles from './Main.module.scss'

function Main() {
	const [state, dispatch] = useReducer(settingsReducer.reducer, settingsReducer.initialState)

	function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
	}
	useEffect(() => {
		const state = getStateFromLocalStorage()

		if (state) {
			dispatch({ type: 'SET_INIT_STATE', state })
		}
	}, [])
	return (
		<main className={styles.main}>
			<form onSubmit={onFormSubmit}>
				<PersonsChangeButtonBox state={state} dispatch={dispatch} />
				<hr />
				<PersonsInputBox state={state} dispatch={dispatch} />
				<hr />
				<GroupCountInput state={state} dispatch={dispatch} />
				<hr />
				<ActionBox state={state} dispatch={dispatch} />
			</form>
			<GroupDisplay state={state} dispatch={dispatch} />
		</main>
	)
}

export default Main
