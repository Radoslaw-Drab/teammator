import { State } from 'components/settingsReducer/settingsReducers.model'
import { Settings } from 'components/appSettingsReducer/appSettingsReducer.modal'
import CryptoJS from 'crypto-js'

const decryptionKey = 'RadoslawDrab'
const appLSKey = 'TEAMMATOR-DATA'

export function getStateFromLocalStorage(): State | null {
	return getFromLocalStorage('STATE')
}
export function saveStateToLocalStorage(state: State) {
	saveToLocalStorage(state, 'STATE')
}
export function getSettingsFromLocalStorage(): Settings | null {
	return getFromLocalStorage('SETTINGS')
}
export function setSettingsToLocalStorage(settings: Settings) {
	saveToLocalStorage(settings, 'SETTINGS')
}
export function generateRandomKey(length: number = 10): { number: number; string: string } {
	const digitsCount: number = Math.max(length, 1)
	const digits: number[] = []

	for (let i = 0; i < digitsCount; i++) {
		const randomDigit = Math.round(Math.random() * 9)
		digits.push(randomDigit)
	}
	const key = digits.reduce((acc, digit) => {
		return (acc += digit)
	}, '')
	return { number: +key, string: key }
}

type SaveType = 'STATE' | 'SETTINGS'
function getFromLocalStorage(type: SaveType): any | null {
	const encrypted = localStorage.getItem(appLSKey + '-' + type)
	if (!encrypted) return null

	const decrypted = CryptoJS.AES.decrypt(encrypted, decryptionKey)
	return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
}
export function saveToLocalStorage(data: any, type: SaveType) {
	const stateStr = JSON.stringify(data)
	const encrypted = CryptoJS.AES.encrypt(stateStr, decryptionKey)
	localStorage.setItem(appLSKey + '-' + type, encrypted.toString())
}
