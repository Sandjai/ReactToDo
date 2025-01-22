import { useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { fakeFetch } from '../../mocks/fakeFetch';
import { ITodo } from '../../types/types';
import { Todo } from '../Todo/Todo';
import { Spin } from 'antd';
import { Footer } from '../Footer/Footer';

export const Todos = () => {
	const [todos, setTodos] = useState<ITodo[]>([]);

	useEffect(() => {
		//TODO: Поменять на настоящий запрос
		async function getTodos() {
			const todos = await fakeFetch();

			if (!todos) return;
			setTodos(todos);
		}

		getTodos();
	}, []);

	function getCompletedNum(todosArr: ITodo[]) {
		const filteredArr = todosArr.filter((todo: ITodo) => todo.completed === true);
		return filteredArr.length;
	}

	function addTodo({ title }: Omit<ITodo, 'id' | 'completed'>) {
		const todo = {
			title,
			id: todos.length + 1,
			completed: false,
		};
		const todosArr = [...todos, todo];

		setTodos(todosArr);
	}

	function checkToDo({ id }: Omit<ITodo, 'title' | 'completed'>) {
		const todosArr = todos.map((todo: ITodo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodos(todosArr);
	}

	function deleteToDo(id: ITodo['id']) {
		return setTodos(todos.filter(todo => todo.id !== id));
	}

	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<ul className={styles.todoList}>
					{todos.length > 0 ? (
						todos.map((todo: ITodo) => (
							<li key={todo.id}>
								<Todo todo={todo} addTodo={addTodo} checkToDo={checkToDo}>
									{' '}
									deleteToDo={deleteToDo}
								</Todo>
							</li>
						))
					) : (
						<Spin size="large"></Spin>
					)}
				</ul>
			</div>
			<Footer total={todos.length} completed={getCompletedNum(todos)} className={styles.footer}></Footer>
			<div className={styles.dummyContent_1}></div>
			<div className={styles.dummyContent_2}></div>
		</div>
	);
};
