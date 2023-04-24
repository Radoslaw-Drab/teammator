import useAppContext from 'utils/use-app-context'
import useLanguage from 'utils/use-language'

import Button from 'components/UI/Button/Button'

import { MinusIcon, PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import styles from './GroupCountInput.module.scss'

function GroupCountInput() {
	const { state, dispatch } = useAppContext()
	const { translate } = useLanguage()

	function increase() {
		dispatch({ type: 'SET_GROUP_COUNT', groupsCount: clampWithin(state.groupsCount + 1) })
	}
	function decrease() {
		dispatch({ type: 'SET_GROUP_COUNT', groupsCount: clampWithin(state.groupsCount - 1) })
	}
	function clampWithin(value: number) {
		return Math.min(Math.max(value, 2), Math.max(state.people.length, 2))
	}
	return (
		<fieldset className={styles.input} aria-label="fieldset for changing groups count">
			<label>
				<UserGroupIcon />
				<span>{translate('Groups')}</span>
			</label>
			<div>
				<Button onClick={increase} accessibilityLabel="button for increasing number of groups">
					<PlusIcon />
				</Button>
				<span>{state.groupsCount}</span>
				<Button onClick={decrease} accessibilityLabel="button for decreasing number of groups">
					<MinusIcon />
				</Button>
			</div>
		</fieldset>
	)
}

export default GroupCountInput
