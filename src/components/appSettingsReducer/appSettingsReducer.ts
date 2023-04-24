import { setSettingsToLocalStorage } from 'utils'
import { Actions, Settings } from './appSettingsReducer.modal'
import { getCurrentLanguage } from 'utils/use-language'

const initialState: Settings = {
	lang: getCurrentLanguage()
}
function reducer(state: Settings, action: Actions): Settings {
	switch (action.type) {
		case 'SET_LANGUAGE': {
			const updatedSettings = { ...state, lang: action.lang }
			setSettingsToLocalStorage(updatedSettings)
			const html = document.querySelector('html')
			if (html) html.lang = action.lang
			return updatedSettings
		}
	}
}

export const appSettingsReducer = { reducer, initialState }
