import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import css from './ModalContactDelete.module.css';
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

const ModalContactDelete = ({ id, name, isOpen, onClose, onDelete }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success('Contact deleted');
        onDelete();
      })
      .catch(() => {
        toast.error('Error deleting contact');
      });
  };

  return (
  <Modal
    className={css.overlay}
    isOpen={isOpen}
    onRequestClose={onClose}
    onClick={onClose}
    closeModal={onClose}
  >
    <div className={css.wrapper}>
      <h3>Delete contact {name}?</h3>
      <div className={css.btns}>
        <button className={css.btn} onClick={onClose}>
          No
        </button>
        <button
          className={css.btn}
          onClick={handleDelete}
        >
          Yes
        </button>
      </div>
    </div>
  </Modal>
);
}

export default ModalContactDelete;