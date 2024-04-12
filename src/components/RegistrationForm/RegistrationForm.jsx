import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { toast } from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import css from './RegistrationForm.module.css';
const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (values, actions) => {
    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
        throw new Error('Please fill out all required fields');
      } else if (formData.password.length < 6) {
        throw new Error('The password should be at least 6 characters long');
      }
      await dispatch(register(formData));
      toast.success('Registration successful!');
      setFormData({ name: '', email: '', password: '' });
      actions.resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Formik
      initialValues={formData}
      onSubmit={handleSubmit}
      validateOnMount={true}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          User name
          <Field type="text" name="name" onChange={handleChange} value={formData.name} />
        </label>
        <label className={css.label}>
          Email
          <Field type="email" name="email" onChange={handleChange} value={formData.email} />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" onChange={handleChange} value={formData.password} />
        </label>
        <button className={css.btn} type="submit">Register</button>
      </Form>
    </Formik>
  );
};
export default RegistrationForm;