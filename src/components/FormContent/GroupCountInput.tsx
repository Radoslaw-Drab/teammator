import React, { useEffect, useState } from 'react'
import { Actions, State } from 'components/settingsReducer/settingsReducers.model'
import { MinusIcon, PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline'

import Button from 'components/UI/Button/Button'

import styles from './GroupCountInput.module.scss'

interface Props {
	state: State
	dispatch: React.Dispatch<Actions>
}
function GroupCountInput(props: Props) {
	const [count, setCount] = useState(clampWithin(props.state.groupsCount))

	function increase() {
		setCount((value) => clampWithin((value += 1)))
	}
	function decrease() {
		setCount((value) => clampWithin((value -= 1)))
	}
	useEffect(() => {
		props.dispatch({ type: 'SET_GROUP_COUNT', groupsCount: clampWithin(count) })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count])
	function clampWithin(value: number) {
		return Math.min(Math.max(value, 2), Math.max(props.state.people.length, 2))
	}
	return (
		<fieldset className={styles.input}>
			<label>
				<UserGroupIcon />
				<span>Groups</span>
			</label>
			<div>
				<Button onClick={increase}>
					<PlusIcon />
				</Button>
				<span>{count}</span>
				<Button onClick={decrease}>
					<MinusIcon />
				</Button>
			</div>
		</fieldset>
	)
}

export default GroupCountInput
