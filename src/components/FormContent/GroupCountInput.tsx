import { useEffect, useState } from 'react'
import useAppContext from 'utils/use-app-context'

import Button from 'components/UI/Button/Button'

import { MinusIcon, PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import styles from './GroupCountInput.module.scss'

function GroupCountInput() {
	const { state, dispatch } = useAppContext()
	const [count, setCount] = useState(clampWithin(state.groupsCount))

	function increase() {
		setCount((value) => clampWithin((value += 1)))
	}
	function decrease() {
		setCount((value) => clampWithin((value -= 1)))
	}
	useEffect(() => {
		dispatch({ type: 'SET_GROUP_COUNT', groupsCount: clampWithin(count) })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count])
	function clampWithin(value: number) {
		return Math.min(Math.max(value, 2), Math.max(state.people.length, 2))
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
