import Header from 'components/Header/Header'
import Main from 'components/Main/Main'
import Footer from 'components/Footer/Footer'
import AppContextWrapper from 'utils/AppContextWrapper'
import AppSettingsContextWrapper from 'utils/AppSettingsContextWrapper'

function App() {
	return (
		<AppSettingsContextWrapper>
			<AppContextWrapper>
				<Header />
				<Main />
				<Footer />
			</AppContextWrapper>
		</AppSettingsContextWrapper>
	)
}

export default App
