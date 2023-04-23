import React from 'react'
import useAppSettingsContext from 'utils/use-app-settings-context'
import useLanguage from 'utils/use-language'

import Input from 'components/UI/Input/Input'

import { LanguageIcon } from '@heroicons/react/24/outline'
import styles from './Footer.module.scss'

function Footer() {
	const { state, dispatch } = useAppSettingsContext()
	const { languages } = useLanguage()
	function onLanguageChange(e: any) {
		dispatch({ type: 'SET_LANGUAGE', lang: e.target.value })
	}
	const languageInputs = languages.map((language) => {
		return (
			<React.Fragment key={language.lang}>
				<Input
					id={`${language.lang}-language-input`}
					type="radio"
					onChange={onLanguageChange}
					value={language.lang}
					other={{ name: 'LanguageRadio', checked: language.lang === state.lang }}
				/>
				<label htmlFor={`${language.lang}-language-input`}>
					<img src={language.url} alt={`${language.full} representing flag`} />
				</label>
			</React.Fragment>
		)
	})
	return (
		<footer className={styles.footer}>
			{<LanguageIcon />}
			<fieldset>{languageInputs}</fieldset>
		</footer>
	)
}

export default Footer
