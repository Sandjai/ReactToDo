import React from 'react';
import styles from './styles.module.sass';
import { IFilter, IState, ITodo } from '../../types/types';
import { FILTERS } from '../../constants/ui';
import Tabs from '../Tabs/Tabs';

interface FooterProps {
	state: IState;
	className: string;
	dispatch: Function;
}

export const Footer = ({ state, dispatch, className }: FooterProps) => {
	function getCompletedNum(todosArr: ITodo[]) {
		const filteredArr = todosArr.filter((todo: ITodo) => todo.completed === true);
		return filteredArr.length;
	}

	const completed = getCompletedNum(state.todos);
	const left = state.todos.length - completed;

	return (
		<div className={`${styles.root} ${className}`}>
			<div className={styles.content}>
				<div className={styles.col1}>{`${left} items left`}</div>
				<div className={styles.col2}>{<Tabs options={Object.entries(FILTERS)} state={state} dispatch={dispatch}></Tabs>}</div>
				<div className={styles.col3}>{`${completed} items completed`}</div>
			</div>
		</div>
	);
};
