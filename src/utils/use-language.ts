import { getSettingsFromLocalStorage } from 'utils'
import useAppSettingsContext from './use-app-settings-context'

interface Translation {
	en: string
	pl: string
}
export type Code = 'en' | 'pl'

const translations: Translation[] = [
	{ en: 'Person', pl: 'Osoba' },
	{ en: 'Groups', pl: 'Grupy' },
	{ en: 'Group', pl: 'Grupa' },
	{ en: 'Create Groups', pl: 'Stwórz Grupy' },
	{ en: 'Reset', pl: 'Resetuj' }
]

export function getCurrentLanguage(): Code {
	return getSettingsFromLocalStorage()?.lang || 'en'
}

export function translate(text: string, code?: Code): string {
	const lang = code || getCurrentLanguage() || 'en'

	const translation: any = translations.find((t) => t.en.toLowerCase() === text.toLowerCase())

	const translationCode = Object.keys(translation).find((t) => t === lang) || 'en'

	if (!translation || !translationCode) return 'Translation Not Found'

	return translation[translationCode]
}
export function translateString(text: string, str: string) {
	return str.replaceAll(text, translate(text))
}
function useLanguage() {
	const { state } = useAppSettingsContext()

	const languages = Object.keys(translations[0])

	function translateText(text: string) {
		return translate(text, state.lang)
	}
	function translateString(text: string, str: string) {
		return str.replaceAll(text, translateText(text))
	}
	return { translate: translateText, translateString, languages, translations: [...translations] }
}

export default useLanguage
