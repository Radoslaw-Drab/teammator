import { State } from 'components/settingsReducer/settingsReducers.model'
import CryptoJS from 'crypto-js'

const decryptionKey = 'RadoslawDrab'
const appLSKey = 'TEAMMATOR-DATA'

export function getStateFromLocalStorage(): State | null {
	const encrypted = localStorage.getItem(appLSKey)
	if (!encrypted) return null

	const decrypted = CryptoJS.AES.decrypt(encrypted, decryptionKey)
	return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
}
export function saveStateToLocalStorage(state: State) {
	const stateStr = JSON.stringify(state)
	const encrypted = CryptoJS.AES.encrypt(stateStr, decryptionKey)
	localStorage.setItem(appLSKey, encrypted.toString())
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
