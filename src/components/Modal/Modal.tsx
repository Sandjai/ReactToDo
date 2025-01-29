import { createPortal } from 'react-dom';
import styles from './styles.module.sass';
import { CloseSquareFilled } from '@ant-design/icons';

interface IModalProps {
	toggleModal: () => void;
	todoid: string | number;
	children: React.ReactNode;
}

export const Modal = ({ toggleModal, todoid, children }: IModalProps) => {
	return createPortal(
		<>
			<div className={styles.modal}>
				<div className={styles.modal__header}>
					<CloseSquareFilled className={styles.closeIcon} onClick={toggleModal} />
				</div>
				<div className={styles.modalContent}>{children}</div>
			</div>
			<div className={styles.modalBgr}></div>
		</>,
		document.body,
	);
};
