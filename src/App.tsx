import React, { useEffect, useReducer } from 'react';

import './App.sass';
import { Todos } from './components/Todos/Todos';
import { Layout } from './components/Layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Todo } from './components/Todo/Todo';
import { HomePage } from './pages/HomePage';
import { TodoPage } from './pages/TodoPage';
import { IAction, IFilterMap, IState, ITodo } from './types/types';
import { fakeFetch } from './mocks/fakeFetch';
import { filterToDo } from './utils/utils';

const App: React.FC = () => {
	const INITIAL_STATE: IState = {
		todos: [],
		filteredTodos: [],
		filter: 'all',
	};

	const reducer = (state: IState, action: IAction): IState => {
		switch (action.type) {
			case 'updateTodo':
				return { ...state, todos: action.payload.todos as ITodo[], filteredTodos: action.payload.filteredTodos as ITodo[] };
			case 'changeFilter':
				return { ...state, filter: action.payload.filter as IFilterMap, filteredTodos: action.payload.filteredTodos as ITodo[] };
			case 'checkCheckbox':
				return { ...state, todos: action.payload.todos as ITodo[], filteredTodos: action.payload.filteredTodos as ITodo[] };
		}
		return state;
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

	return (
		<div className="App">
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route index element={<HomePage state={state} dispatch={dispatch} />} />
						<Route path=":todoId" element={<TodoPage state={state} dispatch={dispatch} />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</div>
	);
};

export default App;
