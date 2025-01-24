import data from './todosdata.json';
import { ITodo } from '../types/types';

export const fakeFetch = async (): Promise<ITodo[] | void> => {
	return new Promise(resolve => {
		setTimeout(() => resolve(data as ITodo[]), 100);
	});
};
