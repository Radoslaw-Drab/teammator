import React from 'react'
import { Code } from './LanguageHandler'

export interface Settings {
	lang: Code
}
export const SettingsContext = React.createContext<Settings>({ lang: 'en' })

interface Props {
	children?: any
}
function SettingsContextWrapper(props: Props) {
	return <SettingsContext.Provider value={{ lang: 'en' }}>{props.children}</SettingsContext.Provider>
}

export default SettingsContextWrapper
