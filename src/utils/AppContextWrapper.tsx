import React, { useReducer } from 'react'

import { settingsReducer } from 'components/settingsReducer/settingsReducer'
import { State, Actions } from 'components/settingsReducer/settingsReducers.model'

interface Context {
	state: State
	dispatch: React.Dispatch<Actions>
}
const cxt: Context = { state: settingsReducer.initialState, dispatch: () => null }
export const AppContext = React.createContext<Context>(cxt)

interface Props {
	children?: any
}
function AppContextWrapper(props: Props) {
	const [state, dispatch] = useReducer(settingsReducer.reducer, settingsReducer.initialState)
	return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
}

export default AppContextWrapper
