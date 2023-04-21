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

function LanguageHandler(text: string = '', code?: Code) {
	const languageFromLS = getSettingsFromLocalStorage()?.lang

	const lang = code ?? languageFromLS ?? navigator.language.split('-')[0] ?? 'en'

	const translation: any = translations.find((t) => t.en.toLowerCase() === text.toLowerCase())

	const translationCode = Object.keys(translation).find((t) => t === lang) || 'en'

	if (!translation || !translationCode) return 'Translation Not Found'

	return translation[translationCode]
}

export default LanguageHandler
