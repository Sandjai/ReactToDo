import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.sass';
import { IFilter, IDispatch, ITodo, IState } from '../../types/types';
import { filterToDo } from '../../utils/filterTodo';

interface ITabProps {
	name: IFilter;
	state: IState;
	dispatch: Function;
}

export const Tab = ({ name, state, dispatch }: ITabProps) => {
	return (
		<div
			className={classnames(styles.tab, {
				[styles.active]: name === state.filter,
			})}
			onClick={() => {
				dispatch({
					type: 'changeFilter',
					payload: {
						filter: name,
						filteredTodos: state.todos.filter((todo: ITodo) => filterToDo(name, todo.completed)),
					},
				});
			}}
		>
			{name}
		</div>
	);
};
