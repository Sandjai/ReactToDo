import React, { useEffect, useState } from 'react';
import styles from './styles.module.sass';

import { ITodo } from '../../types/types';

type TodoProps = {
	todo: ITodo;
};

export const Todo: React.FC<TodoProps> = ({ todo }) => {
	return <div className={styles.root}>{todo.title}</div>;
};
