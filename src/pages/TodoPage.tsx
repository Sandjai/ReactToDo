import { FormComponent } from '../components/Form/Form';
import { IState } from '../types/types';

interface ITodoPage {
	state: IState;
}
export const TodoPage = ({ state, dispatch }: ITodoPage) => {
	return <FormComponent state={state} dispatch={dispatch} />;
};
