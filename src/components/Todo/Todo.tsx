import React, { useEffect, useState } from 'react';
import styles from './styles.module.sass';
import '@ant-design/v5-patch-for-react-19';
import { Checkbox } from 'antd';
import { ITodo } from '../../types/types';
import './ant-custom.sass';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import { addTodo, checkToDo, deleteToDo, filterToDo } from '../../utils/utils';

type TodoProps = {
	todo: ITodo;
	addTodo: (todo: Omit<ITodo, 'id' | 'completed'>) => void;
	checkToDo: (todo: Omit<ITodo, 'title' | 'completed'>) => void;
	deleteToDo: (todo: Omit<ITodo, 'title' | 'completed'>) => void;
};

export const Todo: React.FC<TodoProps> = ({ todoId, todo, state, dispatch }) => {
	const { title, completed, id } = todo;

	function onDelete() {
		const popupConfirm = window.confirm(`Are you sure you want to delete a ToDo with title ${title}?`);
		if (popupConfirm) {
			deleteToDo(id, state, dispatch);
		}
	}

	return (
		<div className={styles.root}>
			<div className={styles.col1}>
				<Checkbox checked={completed} onChange={() => checkToDo({ id }, state, dispatch)} />
				<div className={completed ? styles.completed : ''}>{title}</div>
			</div>
			<div className={styles.col2}>
				<Link to={'/' + todo.id.toString()}>
					<EditFilled className={styles.editIcon} />
				</Link>

				<DeleteFilled className={styles.editIcon} onClick={onDelete} />
			</div>
		</div>
	);
};
