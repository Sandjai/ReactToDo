import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.sass';

interface ITabProps {
	name: string;
	activeIdx: number;
	setIndex: Function;
	index: number;
	callback: (name: string) => {};
}

export const Tab = ({ name, activeIdx, index, callback, setIndex }: ITabProps) => {
	return (
		<div
			className={classnames(styles.root, {
				[styles.active]: index === activeIdx,
			})}
			onClick={() => {
				setIndex(index);
				callback(name);
			}}
		>
			{name}
		</div>
	);
};
