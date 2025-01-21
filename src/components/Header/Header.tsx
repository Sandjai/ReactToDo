import * as React from 'react';
import styles from './styles.module.sass';

export const Header = () => {
	return (
		<header>
			<h1 className={styles.title}>TODOS</h1>
		</header>
	);
};
