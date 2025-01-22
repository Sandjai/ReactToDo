import React from 'react';
import styles from './styles.module.sass';

interface FooterProps {
	total: number;
	completed: number;
	className: string;
}

export const Footer = ({ total, completed, className }: FooterProps) => {
	const left = total - completed;

	return (
		<div className={`${styles.root} ${className}`}>
			<div className={styles.content}>
				<div className={styles.col1}>{`${left} items left`}</div>
				<div className={styles.col2}></div>
				<div className={styles.col3}>{`${completed} items completed`}</div>
			</div>
		</div>
	);
};
