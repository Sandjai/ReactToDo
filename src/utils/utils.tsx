import { IDispatch, IFilter, IFilterMap, IState, ITodo } from '../types/types';

export function filterToDo(filter: IFilter, completed: Boolean) {
	const filtersMap: IFilterMap = {
		all: () => true,
		active: (completed: Boolean) => {
			return completed === false;
		},
		completed: (completed: Boolean) => {
			return completed === true;
		},
	};

	return filtersMap[filter](completed);
}

export function editTodo(title: string, todoid: string, state: IState, dispatch: (action: IDispatch) => {}) {
	const todo = state.todos.find(({ id }) => id === Number(todoid));

	if (!todo) {
		addTodo(title, state, dispatch);
		return;
	}

	todo.title = title;
	const todosArr = [...state.todos];

	dispatch({
		type: 'updateTodo',
		payload: {
			todos: todosArr,
			filteredTodos: todosArr,
		},
	});
}

export function addTodo(title: string, state: IState, dispatch: (action: IDispatch) => {}) {
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

export function checkToDo({ id }: Omit<ITodo, 'title' | 'completed'>, state: IState, dispatch: (action: IDispatch) => {}) {
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

export function deleteToDo(id: ITodo['id'], state: IState, dispatch: (action: IDispatch) => {}) {
	const todos = state.todos.filter(todo => todo.id !== id);

	dispatch({
		type: 'updateTodo',
		payload: {
			todos,
			filteredTodos: todos,
		},
	});
}
