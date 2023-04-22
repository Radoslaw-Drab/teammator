import Header from 'components/Header/Header'
import Main from 'components/Main/Main'
import AppContextWrapper from 'utils/AppContextWrapper'
import AppSettingsContextWrapper from 'utils/AppSettingsContextWrapper'

function App() {
	return (
		<AppSettingsContextWrapper>
		<AppContextWrapper>
			<Header />
			<Main />
		</AppContextWrapper>
		</AppSettingsContextWrapper>
	)
}

export default App
