import React from 'react'
import { Code } from './LanguageHandler'

export interface Settings {
	lang: Code
}
export const AppSettingsContext = React.createContext<Settings>({ lang: 'en' })

interface Props {
	children?: any
}
function AppSettingsContextWrapper(props: Props) {
	return <AppSettingsContext.Provider value={{ lang: 'en' }}>{props.children}</AppSettingsContext.Provider>
}

export default AppSettingsContextWrapper
