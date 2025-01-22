import { useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { fakeFetch } from '../../mocks/fakeFetch';
import { ITodo } from '../../types/types';
import { Todo } from '../Todo/Todo';
import { Spin } from 'antd';

interface ITodosMap {
	[key: string]: any;
}
export const Todos = () => {
	const [todosObj, setTodosObj] = useState({});
	const [todosArr, setTodosArr] = useState([]);

	useEffect(() => {
		//TODO: Поменять на настоящий запрос
		async function getTodos() {
			const todos = await fakeFetch();

			if (!todos) return;

			const todosMap: ITodosMap = {};
			todos?.forEach((todo: ITodo) => {
				//делаем маппинг по ключу
				const objKey = todo.id.toString();
				todosMap[objKey] = todo;
			});
			setTodosObj(todosMap);
			setTodosArr(todos);
		}
		getTodos();
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<ul className={styles.todoList}>
					{todosArr.length > 0 ? (
						todosArr.map((todo: ITodo) => (
							<li key={todo.id}>
								<Todo todo={todo}></Todo>
							</li>
						))
					) : (
						<Spin size="large"></Spin>
					)}
				</ul>
			</div>
			<div className={styles.dummyContent_1}></div>
			<div className={styles.dummyContent_2}></div>
		</div>
	);
};
