import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import toast from "react-hot-toast";

export default function ContactForm() {
  const idName = nanoid();
  const idNumber = nanoid();

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum number of characters - 3!")
      .max(50, "The maximum number of characters is 50!")
      .required("This field is required!"),
    number: Yup.string()
      .min(3, "Minimum number of characters - 3!")
      .max(50, "The maximum number of characters is 50!")
      .required("This field is required!"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ name: "", number: "" }}
      onSubmit={(e, { resetForm }) => {
        dispatch(
          addContact({
            name: e.name,
            number: e.number,
            id: nanoid(),
          })
        )
          .unwrap()
          .then(() => {
            toast.success(
              "The contact has been successfully added to the list!"
            );
          });
        resetForm();
      }}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor={idName}>
          Name
        </label>
        <Field className={css.field} id={idName} name="name" />
        <ErrorMessage
          className={css.error}
          name="name"
          component="p"
        ></ErrorMessage>

        <label className={css.label} htmlFor={idNumber}>
          Number
        </label>
        <Field className={css.field} id={idNumber} name="number" />
        <ErrorMessage
          className={css.error}
          name="number"
          component="p"
        ></ErrorMessage>

        <button className={css.btn} type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
}