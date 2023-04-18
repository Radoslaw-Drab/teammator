import { useContext } from 'react'
import { AppContext } from './AppContextWrapper'

function useAppContext() {
	const context = useContext(AppContext)
	return context
}

export default useAppContext
