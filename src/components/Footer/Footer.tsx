import React from 'react'
import useAppSettingsContext from 'utils/use-app-settings-context'
import useLanguage from 'utils/use-language'

import Input from 'components/UI/Input/Input'

import styles from './Footer.module.scss'

function Footer() {
	const { state, dispatch } = useAppSettingsContext()
	const { languages } = useLanguage()
	function onLanguageChange(e: any) {
		dispatch({ type: 'SET_LANGUAGE', lang: e.target.value })
	}
	const languageInputs = languages.map((language) => {
		return (
			<React.Fragment key={language}>
				<label htmlFor={`${language}-language-input`}>{language}</label>
				<Input
					id={`${language}-language-input`}
					type="radio"
					onChange={onLanguageChange}
					value={language}
					other={{ name: 'LanguageRadio', checked: language === state.lang }}
				/>
			</React.Fragment>
		)
	})
	return <footer className={styles.footer}>{languageInputs}</footer>
}

export default Footer
