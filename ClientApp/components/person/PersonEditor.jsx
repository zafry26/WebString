import * as React from "react";
import { Formik, Field } from "formik";
import FormValidator from "@Components/shared/FormValidator";

const PersonEditor = (props) => {
  const formValidator = React.useRef(null);

  const onSubmitForm = (values) => {
    if (!formValidator.current.isValid()) {
      // Form is not valid.
      return;
    }
    props.onSubmit(values);
  };

  // This function will be passed to children components as a parameter.
  // It's necessary to build custom markup with controls outside this component.
  const renderEditor = (values) => {
    return (
      <FormValidator className="form" ref={(x) => (formValidator.current = x)}>
        <div className="form-group">
          <Field name="username">
            {({ field }) => (
              <>
                <label className="control-label required" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name={field.username}
                  data-value-type="string"
                  data-val-required="true"
                  data-msg-required="Username is required."
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </>
            )}
          </Field>
        </div>
        <div className="form-group">
          <Field name="email">
            {({ field }) => (
              <>
                <label className="control-label required" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name={field.email}
                  data-value-type="string"
                  data-val-required="true"
                  data-msg-required="Email is required."
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </>
            )}
          </Field>
        </div>
        <div className="form-group">
          <Field name="phoneNumber">
            {({ field }) => (
              <>
                <label className="control-label required" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name={field.email}
                  data-value-type="string"
                  data-val-required="true"
                  data-msg-required="Phone Number is required."
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </>
            )}
          </Field>
        </div>
        <div className="form-group">
          <Field name="skillsets">
            {({ field }) => (
              <>
                <label className="control-label required" htmlFor="skillsets">
                  Skill Sets
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="skillsets"
                  name={field.email}
                  data-value-type="string"
                  data-val-required="true"
                  data-msg-required="Skill Sets is required."
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </>
            )}
          </Field>
        </div>
        <div className="form-group">
          <Field name="hobby">
            {({ field }) => (
              <>
                <label className="control-label required" htmlFor="hobby">
                  Hobby
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="hobby"
                  name={field.email}
                  data-value-type="string"
                  data-val-required="true"
                  data-msg-required="Hobby is required."
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </>
            )}
          </Field>
        </div>
      </FormValidator>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={props.data}
      onSubmit={(values, { setSubmitting }) => {
        onSubmitForm(values);
      }}
    >
      {({ values, handleSubmit }) => {
        // Let's say that the children element is a parametrizable function.
        // So we will pass other elements to this functional component as children
        // elements of this one:
        // <PersonEditor>
        // {(renderEditor, handleSubmit) => <>
        //     {renderEditor()}
        //     <button onClick={x => handleSubmit()}>Submit</button>
        // </>}
        // </PersonEditor>.
        return props.children(() => renderEditor(values), handleSubmit);
      }}
    </Formik>
  );
};

export default PersonEditor;
