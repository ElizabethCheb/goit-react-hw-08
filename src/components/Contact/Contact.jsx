import { useState } from 'react';
import css from "./Contact.module.css";
import { AiFillContacts } from "react-icons/ai";
import { AiFillPhone } from "react-icons/ai";
import ModalContactEditor from "../ModalContactEditor/ModalContactEditor";
import ModalContactDelete from "../ModalContactDelite/ModalContactDelite";

const Contact = ({ contact }) => {
  const { name: initialName, number: initialNumber, id } = contact;
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [name, setName] = useState(initialName);
  const [number, setNumber] = useState(initialNumber);

  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleDelete = () => {
    closeDeleteModal();
  };

  const handleUpdateContact = (updatedName, updatedNumber) => {
    setName(updatedName);
    setNumber(updatedNumber);
  };

  return (
    <>
      <li className={css.listItem}>
        <div className={css.iconContainer}>
          <AiFillContacts size={22} />
          <AiFillPhone size={22} />
        </div>
        <div className={css.textContainer}>
          <p className={css.text}>{name}</p>
          <p className={css.text}>{number}</p>
        </div>
        <button className={css.btn} onClick={openEditModal}>
          Edit
        </button>
        <button className={css.btn} onClick={openDeleteModal}>
          Delete
        </button>
      </li>
      {editModal && (
        <ModalContactEditor
          isOpen={editModal}
          id={id}
          name={name}
          number={number}
          onClose={closeEditModal}
          onUpdateContact={handleUpdateContact}
        />
      )}
      {deleteModal && (
        <ModalContactDelete
          isOpen={deleteModal}
          id={id}
          name={name}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Contact;