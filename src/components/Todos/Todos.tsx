'react';
import styles from './styles.module.sass';
import { ITodo, IState } from '../../types/types';
import { Todo } from '../Todo/Todo';
import { Spin } from 'antd';
import { Footer } from '../Footer/Footer';

interface ITodos {
	state: IState;
	dispatch: () => {};
}

export const Todos = ({ state, dispatch }: ITodos) => {
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<ul className={styles.todoList}>
					{state.filteredTodos.length > 0 ? (
						state.filteredTodos.map((todo: ITodo) => (
							<li key={todo.id}>
								<Todo todo={todo} state={state} dispatch={dispatch}></Todo>
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
