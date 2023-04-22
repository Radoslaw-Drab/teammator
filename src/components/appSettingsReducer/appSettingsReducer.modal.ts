import { Code } from 'utils/use-language'
export interface Settings {
	lang: Code
}

export type Actions = SetLanguage

interface SetLanguage {
	type: 'SET_LANGUAGE'
	lang: Code
}
