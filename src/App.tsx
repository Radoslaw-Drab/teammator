import Header from 'components/Header/Header'
import Main from 'components/Main/Main'
import AppContextWrapper from 'utils/AppContextWrapper'

function App() {
	return (
		<AppContextWrapper>
			<Header />
			<Main />
		</AppContextWrapper>
	)
}

export default App
