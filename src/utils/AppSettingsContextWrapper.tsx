import React, { useReducer } from 'react'
import { Settings, Actions } from 'components/appSettingsReducer/appSettingsReducer.modal'
import { appSettingsReducer } from 'components/appSettingsReducer/appSettingsReducer'

interface Context {
	state: Settings
	dispatch: React.Dispatch<Actions>
}
export const AppSettingsContext = React.createContext<Context>({ state: appSettingsReducer.initialState, dispatch: () => null })

interface Props {
	children?: any
}
function AppSettingsContextWrapper(props: Props) {
	const [state, dispatch] = useReducer(appSettingsReducer.reducer, appSettingsReducer.initialState)

	return <AppSettingsContext.Provider value={{ state, dispatch }}>{props.children}</AppSettingsContext.Provider>
}

export default AppSettingsContextWrapper
