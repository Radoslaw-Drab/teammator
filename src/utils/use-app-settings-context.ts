import { useContext } from 'react'
import { AppSettingsContext } from './AppSettingsContextWrapper'

function useAppSettingsContext() {
	const cxt = useContext(AppSettingsContext)
	return cxt
}

export default useAppSettingsContext
