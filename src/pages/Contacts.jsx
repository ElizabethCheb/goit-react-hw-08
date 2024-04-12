import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../components/ContactForm/ContactForm';
import SearchBar from '../components/SearchBar/SearchBar';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Loader from '../components/Loader/Loader';
import ContactList from '../components/ContactList/ContactList';
import { fetchContacts } from '../redux/contacts/operations';
import { selectLoading } from '../redux/contacts/selectors';
import { selectError } from '../redux/contacts/selectors';

export default function Contacts() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{
        marginBottom: '20px',
        fontSize: '24px'
      }}>Your contacts</h1>
      <ContactForm />
      <SearchBar />
      {error && <ErrorMessage />}
      {loading && <Loader />}
      <ContactList />
    </div>
  );
}