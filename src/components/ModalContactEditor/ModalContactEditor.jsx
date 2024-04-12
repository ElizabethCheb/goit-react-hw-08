import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { editContact } from '../../redux/contacts/operations';
import css from './ModalContactEditor.module.css';

Modal.setAppElement('#root');

const ModalContactEditor = ({ id, name: initialName, number: initialNumber, isOpen, onClose, onUpdateContact }) => {
  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        editContact({
          id: id,
          name: values.name,
          number: values.number,
        })
      );
      onUpdateContact(values.name, values.number);
      actions.resetForm();
      onClose();
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };

  return (
    <Modal
      className={css.overlay}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className={css.wrapper}>
        <h3>Edit contact {initialName}</h3>
        <Formik
          initialValues={{ name: initialName, number: initialNumber }}
          onSubmit={handleSubmit}
          validationSchema={ContactSchema}
        >
          <Form className={css.form}>
            <div className={css.field}>
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
              />
              <ErrorMessage
                name="name"
                component="span"
              />
            </div>
            <div className={css.field}>
              <label htmlFor="number">Number</label>
              <Field
                type="text"
                name="number"
              />
              <ErrorMessage
                name="number"
                component="span"
              />
            </div>
            <div>
              <button className={css.btnCancel} type="button" onClick={onClose}>
                Cancel
              </button>
              <button className={css.btnSave} type="submit">
                Save
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}

export default ModalContactEditor;