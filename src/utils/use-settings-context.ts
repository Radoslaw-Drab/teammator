import { useContext } from 'react'
import { SettingsContext } from './SettingsContextWrapper'

function useSettingsContext() {
	const cxt = useContext(SettingsContext)
	return cxt
}

export default useSettingsContext
