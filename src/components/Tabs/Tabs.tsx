import React, { useState } from 'react';
import styles from './styles.module.sass';
import { Tab } from '../Tab/Tab';

export interface ITabsProps {
	options: [];
	callback: () => {};
}

export default function Tabs({ options, callback }: ITabsProps) {
	const [active, setActive] = useState(0);

	return (
		<div className={styles.root}>
			{options.map((option, index) => (
				<Tab name={option} activeIdx={active} index={index} callback={callback} setIndex={setActive}></Tab>
			))}
		</div>
	);
}
