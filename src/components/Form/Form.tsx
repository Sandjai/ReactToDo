import styles from './styles.module.sass';
import { IState } from '../../types/types';
import { Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, usesearchParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { addTodo, editTodo } from '../../utils/utils';

interface IFormProps {
	state: IState;
	searchParams: any;
	onFinish: (res: Object, todoId: string) => void;
}

export const FormComponent: React.FunctionComponent<IFormProps> = ({ state, dispatch }) => {
	const { todoId } = useParams();

	const [inputVal, setInputVal] = useState(getTodoTitleById(todoId));
	const [form] = Form.useForm();

	function getTodoTitleById(todoid: string): string | undefined {
		return state.todos.find(({ id }) => Number(todoid) === id)?.title;
	}

	function updateValue(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		if (!target) return;
		setInputVal(target.value);
		form.setFieldsValue({ todoTitle: e.target.value });
	}

	const [label, setLabel] = useState(inputVal);

	useEffect(() => {
		if (!todoId) return;

		const title = getTodoTitleById(todoId);
		setLabel(title);
		setInputVal(title);

		form.setFieldsValue({ todoTitle: title });
	}, [state.todos]);

	const navigate = useNavigate();

	const onFinish = ({ todoTitle }) => {
		if (todoId) {
			editTodo(todoTitle, todoId, state, dispatch);
		} else {
			addTodo(todoTitle, state, dispatch);
		}

		navigate('/');
	};

	return (
		<div className={styles.root}>
			<div className={styles.formWrapper}>
				<Form form={form} onFinish={onFinish} onFinishFailed={err => console.error('error: ', err)} layout="vertical" style={{ maxWidth: 600 }}>
					<Form.Item name="todoTitle" label={label ? `Edit ToDo "${label}"` : 'Add new ToDo'}>
						<Input onChange={updateValue} value={inputVal} />
					</Form.Item>

					<Form.Item>
						<Button htmlType="submit" className={styles.submitBtn} type="primary">
							{label ? 'EDIT' : 'ADD'}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
