import { createPortal } from 'react-dom';
import styles from './styles.module.sass';

interface IModalProps {
	children: React.ReactNode;
}

export const Modal = ({ children }: IModalProps) => {
	return createPortal(
		<>
			<div className={styles.modal}>
				<div className={styles.modalContent}>{children}</div>
			</div>
			<div className={styles.modalBgr}></div>
		</>,
		document.body,
	);
};
