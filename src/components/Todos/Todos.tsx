import { useEffect, useState, useReducer } from 'react';
import styles from './styles.module.sass';
import { fakeFetch } from '../../mocks/fakeFetch';
import { ITodo, IFilter, IFilterMap, IState, IAction, IActionType } from '../../types/types';
import { Todo } from '../Todo/Todo';
import { Spin } from 'antd';
import { Footer } from '../Footer/Footer';
import { FILTERS } from '../../constants/ui';
import { filterToDo } from '../../utils/filterTodo';

const reducer = (state: IState, action: IAction): IState => {
	switch (action.type) {
		case 'updateTodo':
			return { ...state, todos: action.payload.todos as ITodo[], filteredTodos: action.payload.filteredTodos as ITodo[] };
		case 'changeFilter':
			return { ...state, filter: action.payload.filter as IFilter, filteredTodos: action.payload.filteredTodos as ITodo[] };
		case 'checkCheckbox':
			return { ...state, todos: action.payload.todos as ITodo[], filteredTodos: action.payload.filteredTodos as ITodo[] };
	}
	return state;
};

export const Todos = () => {
	const INITIAL_STATE: IState = {
		todos: [],
		filteredTodos: [],
		filter: 'all',
	};

	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	useEffect(() => {
		//TODO: Поменять на настоящий запрос
		async function getTodos() {
			const todos = await fakeFetch();

			if (!todos) return;

			dispatch({
				type: 'updateTodo',
				payload: {
					todos: todos,
					filteredTodos: todos.filter((todo: ITodo) => filterToDo(state.filter, todo.completed)),
				},
			});
		}

		getTodos();
	}, []);

	function addTodo({ title }: Omit<ITodo, 'id' | 'completed'>) {
		const todo = {
			title,
			id: state.todos.length + 1,
			completed: false,
		};
		const todosArr = [...state.todos, todo];

		dispatch({
			type: 'updateTodo',
			payload: {
				todos: todosArr,
				filteredTodos: todosArr,
			},
		});
	}

	function checkToDo({ id }: Omit<ITodo, 'title' | 'completed'>) {
		const todos = state.todos.map((todo: ITodo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});

		const filteredTodos = state.filteredTodos
			.map((todo: ITodo) => {
				if (todo.id === id) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			})
			.filter((todo: ITodo) => filterToDo(state.filter, todo.completed));

		dispatch({
			type: 'updateTodo',
			payload: {
				todos,
				filteredTodos: filteredTodos,
			},
		});
	}

	function deleteToDo(id: ITodo['id']) {
		const todos = state.todos.filter(todo => todo.id !== id);

		dispatch({
			type: 'updateTodo',
			payload: {
				todos,
				filteredTodos: todos,
			},
		});
	}

	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<ul className={styles.todoList}>
					{state.filteredTodos.length > 0 ? (
						state.filteredTodos.map((todo: ITodo) => (
							<li key={todo.id}>
								<Todo todo={todo} addTodo={addTodo} checkToDo={checkToDo} deleteToDo={deleteToDo}></Todo>
							</li>
						))
					) : (
						<Spin size="large"></Spin>
					)}
				</ul>
			</div>
			<Footer state={state} dispatch={dispatch} className={styles.footer}></Footer>
			<div className={styles.dummyContent_1}></div>
			<div className={styles.dummyContent_2}></div>
		</div>
	);
};
