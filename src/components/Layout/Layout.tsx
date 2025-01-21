import * as React from 'react';
import styles from './styles.module.sass';
import { Header } from '../Header/Header';

interface ILayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
	return (
		<>
			{<Header />}
			<main className={styles.content}>{children}</main>
		</>
	);
};
