import { getSettingsFromLocalStorage } from 'utils'
import useAppSettingsContext from './use-app-settings-context'

interface Translation {
	en: string
	pl: string
	de: string
	fr: string
}
export type Code = 'en' | 'pl' | 'de' | 'fr'

const translations: Translation[] = [
	{ en: 'Person', pl: 'Osoba', de: 'Person', fr: 'Personne' },
	{ en: 'Groups', pl: 'Grupy', de: 'Gruppe', fr: 'Groupe' },
	{ en: 'Group', pl: 'Grupa', de: 'Gruppen', fr: 'Grupes' },
	{ en: 'Create Groups', pl: 'Stwórz Grupy', de: 'Gruppen Erstellen', fr: 'Créer des Groupes' },
	{ en: 'Reset', pl: 'Zresetuj', de: 'Zurücksetzen', fr: 'Réinitialiser' }
]
interface AvailableTranslations {
	[key: string]: { full: string; url: string }
}
const availableTranslations: AvailableTranslations = {
	en: {
		full: 'English',
		url: 'https://static.vecteezy.com/system/resources/previews/005/416/914/original/flag-of-united-kingdom-illustration-free-vector.jpg'
	},
	pl: {
		full: 'Polski',
		url: 'https://cdn.countryflags.com/thumbs/poland/flag-400.png'
	},
	de: {
		full: 'Deutsch',
		url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png'
	},
	fr: {
		full: 'Français',
		url: 'https://img.freepik.com/darmowe-wektory/ilustracja-flaga-francji_53876-27099.jpg?q=10&h=200'
	}
}

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
function useLanguage() {
	const { state } = useAppSettingsContext()

	const languages = Object.keys(availableTranslations).map((key) => {
		const data = availableTranslations[key]
		return { lang: key, full: data.full, url: data.url }
	})

	function translateText(text: string) {
		return translate(text, state.lang)
	}
	return { translate: translateText, languages, translations: [...translations] }
}

export default useLanguage
