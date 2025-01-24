import React, { useState } from 'react';
import styles from './styles.module.sass';
import { Tab } from '../Tab/Tab';
import { IFilter, IState, ITodo } from '../../types/types';

export interface ITabsProps {
	options: Array<[key: IFilter, val: string]>;
	dispatch: Function;
	state: IState;
}

export default function Tabs({ options, state, dispatch }: ITabsProps) {
	return (
		<div className={styles.root}>
			{options.map(([key, val]) => (
				<Tab key={key} name={key} state={state} dispatch={dispatch}>
					{val}
				</Tab>
			))}
		</div>
	);
}
