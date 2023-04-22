import { getSettingsFromLocalStorage } from 'utils'

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
export const languages = Object.keys(translations[0])

export function getCurrentLanguage() {
	const languageFromLS = getSettingsFromLocalStorage()?.lang
	return languageFromLS ?? navigator.language.split('-')[0] ?? 'en'
}

function LanguageHandler(text: string = '', code?: Code) {
	const lang = code ?? getCurrentLanguage()

	const translation: any = translations.find((t) => t.en.toLowerCase() === text.toLowerCase())

	const translationCode = Object.keys(translation).find((t) => t === lang) || 'en'

	if (!translation || !translationCode) return 'Translation Not Found'

	return translation[translationCode]
}

export default LanguageHandler
