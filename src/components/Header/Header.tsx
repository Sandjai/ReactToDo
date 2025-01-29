import * as React from 'react';
import styles from './styles.module.sass';
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<header className={styles.root}>
			<Link to="/" className={styles.headerLink}>
				<h1 className={styles.title}>TODOS</h1>
			</Link>
		</header>
	);
};
