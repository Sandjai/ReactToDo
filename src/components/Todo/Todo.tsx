import React, { useEffect, useState } from 'react';
import styles from './styles.module.sass';
import '@ant-design/v5-patch-for-react-19';
import { Checkbox } from 'antd';
import { ITodo } from '../../types/types';
import './ant-custom.sass';

type TodoProps = {
	todo: ITodo;
	addTodo: (todo: Omit<ITodo, 'id' | 'completed'>) => void;
	checkToDo: (todo: Omit<ITodo, 'title' | 'completed'>) => void;
	deleteToDo: (todo: Omit<ITodo, 'title' | 'completed'>) => void;
};

export const Todo: React.FC<TodoProps> = ({ todo, addTodo, checkToDo, deleteToDo }) => {
	const { title, completed, id } = todo;

	return (
		<div className={styles.root}>
			<Checkbox checked={completed} onChange={() => checkToDo({ id })} />
			<div className={completed ? styles.completed : ''}> {title} </div>
		</div>
	);
};
