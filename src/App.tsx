import Header from 'components/Header/Header'
import Main from 'components/Main/Main'
import AppContextWrapper from 'utils/AppContextWrapper'
import SettingsContextWrapper from 'utils/SettingsContextWrapper'

function App() {
	return (
		<SettingsContextWrapper>
		<AppContextWrapper>
			<Header />
			<Main />
		</AppContextWrapper>
		</SettingsContextWrapper>
	)
}

export default App
