import React from 'react'
import styles from './Header.module.scss'
import utilityStyles from '../../styles/utility.module.scss'

function Header() {
	return (
		<header className={styles.header}>
			<h1 className={utilityStyles.anim}>Teammator</h1>
		</header>
	)
}

export default Header
