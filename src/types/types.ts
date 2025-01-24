export interface ITodo {
	id: number;
	title: string;
	completed: boolean;
}

export type IFilter = 'all' | 'active' | 'completed';

export interface IFilterMap {
	all: () => Boolean;
	active: (completed: Boolean) => Boolean;
	completed: (completed: Boolean) => Boolean;
}

export interface IDispatch {
	type: string;
	payload: {};
}

export interface IState {
	todos: ITodo[];
	filteredTodos: ITodo[];
	filter: IFilter;
}

export interface IAction {
	type: IActionType;
	payload: {
		todos?: ITodo[];
		filteredTodos?: ITodo[];
		filter?: IFilter;
	};
}

export type IActionType = 'updateTodo' | 'changeFilter' | 'checkCheckbox';
