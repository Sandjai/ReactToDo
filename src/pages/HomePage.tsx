import { useReducer } from 'react';
import { Todos } from '../components/Todos/Todos';
import { IState } from '../types/types';

interface IHomePage {
	state: IState;
}

export const HomePage = ({ state, dispatch }): IHomePage => {
	return <Todos state={state} dispatch={dispatch} />;
};
