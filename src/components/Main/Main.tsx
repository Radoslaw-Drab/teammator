import React, { useEffect } from 'react'
import { getStateFromLocalStorage } from 'utils'
import useAppContext from 'utils/use-app-context'

import PeopleChangeButtonBox from 'components/FormContent/PeopleChangeButtonBox'
import PeopleInputBox from 'components/FormContent/PeopleInputBox'
import GroupCountInput from 'components/FormContent/GroupCountInput'
import ActionBox from 'components/FormContent/ActionBox'
import GroupDisplay from 'components/GroupDisplay/GroupDisplay'

import styles from './Main.module.scss'

function Main() {
	const { dispatch } = useAppContext()
	function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
	}
	useEffect(() => {
		const state = getStateFromLocalStorage()

		if (state) {
			dispatch({ type: 'SET_INIT_STATE', state })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<main className={styles.main}>
			<form onSubmit={onFormSubmit}>
				<PeopleChangeButtonBox />
				<hr />
				<PeopleInputBox />
				<hr />
				<GroupCountInput />
				<hr />
				<ActionBox />
			</form>
			<GroupDisplay />
		</main>
	)
}

export default Main
