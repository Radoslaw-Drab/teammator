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
