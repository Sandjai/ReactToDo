import { IFilter, IFilterMap } from '../../types/types';

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
