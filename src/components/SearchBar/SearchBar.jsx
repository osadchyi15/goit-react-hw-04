import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  yupToFormErrors,
  validateYupSchema,
} from "formik";
import css from "./SearchBar.module.css";
import * as Yup from "yup";

const initialValues = {
  query: "",
};

const SearchBar = ({ onSearch }) => {
  const handlSubmit = (values, actions) => {
    onSearch(values.query);
    actions.resetForm();
  };

  return (
    <>
      <header>
        <Formik initialValues={initialValues} onSubmit={handlSubmit}>
          {({ errors }) => (
            <Form className={css.searchForm}>
              <Field
                className={css.searchInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name="query"
              />
              <button className={css.searchButton} type="submit">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </header>
    </>
  );
};

export default SearchBar;
