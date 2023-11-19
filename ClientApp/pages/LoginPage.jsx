import * as loginStore from "@Store/loginStore";
import { connect } from "react-redux";
import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import { Redirect, withRouter } from "react-router";
import FormValidator from "@Components/shared/FormValidator";
import Button from "react-bootstrap/Button";
import { Formik, Field, Form } from "formik";
import { FormGroup } from "react-bootstrap";
import SessionManager from "@Core/session";
import "@Styles/login.scss";
import { useState } from "react";

const LoginPage = (props) => {
  const formValidator = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (formValidator.current.isValid()) {
      await props.login(data);
    }
  };

  if (SessionManager.isAuthenticated && props.isLoginSuccess) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="img js-fullheight login-image">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="ftco-section">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Login New</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Have an account?</h3>
                <Formik
                  enableReinitialize
                  initialValues={{}}
                  onSubmit={async (values, { setSubmitting }) => {
                    await onSubmit(values);
                  }}
                >
                  {({ values, handleSubmit }) => {
                    return (
                      <FormValidator ref={(x) => (formValidator.current = x)}>
                        <Form action="#" className="signin-form">
                          <div className="row">
                            <div className="form-group">
                              <Field name="username">
                                {({ field }) => (
                                  <>
                                    <input
                                      className="form-control login-form-control"
                                      placeholder="Username"
                                      type="text"
                                      id="username"
                                      name={field.username}
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
                              <Field name="password">
                                {({ field }) => (
                                  <>
                                    <input
                                      placeholder="Your Password"
                                      type="password"
                                      className="form-control login-form-control"
                                      id="password"
                                      name={field.email}
                                      data-val-required="true"
                                      data-msg-required="Password is required."
                                      value={field.value || ""}
                                      onChange={field.onChange}
                                    />
                                    <span
                                      toggle="#password"
                                      className="fa fa-fw fa-eye field-icon toggle-password"
                                    ></span>
                                  </>
                                )}
                              </Field>
                            </div>
                          </div>
                          <div className="text-center">
                            <Button
                              disabled={submitting}
                              className="form-control btn btn-primary submit px-3 login-button login-form-control"
                              onClick={() => handleSubmit()}
                            >
                              Login
                            </Button>
                          </div>
                        </Form>
                        <p className="w-100 text-center">&mdash; Or &mdash;</p>
                        <div className="form-group">
                          <button
                            type="submit"
                            className="form-control btn btn-primary submit px-3 login-button login-form-control"
                          >
                            Request Demo Account
                          </button>
                        </div>
                      </FormValidator>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Connect component with Redux store.
var connectedComponent = connect(
  (state) => state.login, // Selects which state properties are merged into the component's props.
  loginStore.actionCreators // Selects which action creators are merged into the component's props.
)(LoginPage);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);
