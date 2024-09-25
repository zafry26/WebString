import * as React from "react";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";
import "@Styles/webcast/style.scss";
import { connect } from "react-redux";
import * as webcastStore from "@Store/webcastStore";
import * as s3Store from "@Store/s3Store";
import { Redirect, withRouter, useHistory } from "react-router";
import { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import {
  useFormik,
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  getIn,
} from "formik";
//import external JS
import { webCast } from "@WebCastUtils";
import Dropzone from "react-dropzone";
import ImageFiles from "@Components/shared/ImageFiles";

const validateHero = (values) => {
  const errors = {};
  if (values.fullName.length > 100) {
    errors.fullName = "Must be 100 characters or less";
  }

  if (!values.displayName) {
    errors.displayName = "Required";
  } else if (values.displayName.length > 50) {
    errors.displayName = "Must be 50 characters or less";
  }

  if (values.standout.length > 50) {
    errors.standout = "Must be 50 characters or less";
  }

  return errors;
};

const validateSummary = (values) => {
  const errors = {};

  if (!values.heroSummary.email) {
    errors.email = "Required";
  }

  if (values.heroSummary.summary.length > 300) {
    errors.summary = "Must be 300 characters or less";
  }

  if (values.heroSummary.city.length > 20) {
    errors.city = "Must be 20 characters or less";
  }

  if (values.heroSummary.state.length > 20) {
    errors.state = "Must be 20 characters or less";
  }

  if (values.heroSummary.country.length > 20) {
    errors.country = "Must be 20 characters or less";
  }

  return errors;
};

const validateEducation = (values) => {
  const errors = {};

  values.heroEducations.forEach((element) => {
    if (element.qualification.length > 100) {
      errors.qualification = "Must be 100 characters or less";
    }

    if (element.fromYear.length > 5) {
      errors.fromYear = "Must be 5 characters or less";
    }

    if (element.toYear.length > 5) {
      errors.toYear = "Must be 5 characters or less";
    }

    if (element.university.length > 100) {
      errors.university = "Must be 100 characters or less";
    }

    if (element.state.length > 20) {
      errors.state = "Must be 20 characters or less";
    }

    if (element.country.length > 20) {
      errors.country = "Must be 20 characters or less";
    }
  });

  return errors;
};

const validateExperience = (values) => {
  const errors = {};

  values.heroExperiences.forEach((element) => {
    if (element.positionTitle.length > 100) {
      errors.positionTitle = "Must be 100 characters or less";
    }

    if (element.fromYear.length > 5) {
      errors.fromYear = "Must be 5 characters or less";
    }

    if (element.toYear.length > 5) {
      errors.toYear = "Must be 5 characters or less";
    }

    if (element.company.length > 100) {
      errors.company = "Must be 100 characters or less";
    }

    if (element.state.length > 20) {
      errors.state = "Must be 20 characters or less";
    }

    if (element.city.length > 20) {
      errors.city = "Must be 20 characters or less";
    }

    if (element.country.length > 20) {
      errors.country = "Must be 20 characters or less";
    }
  });

  return errors;
};

const validateService = (values) => {
  const errors = {};

  values.heroServices.forEach((element) => {
    if (element.title.length > 100) {
      errors.title = "Must be 100 characters or less";
    }

    if (element.detail.length > 500) {
      errors.detail = "Must be 500 characters or less";
    }
  });

  return errors;
};

const validatePortfolio = (values) => {
  const errors = {};

  values.heroPortfolios.forEach((element) => {
    if (element.category.length > 50) {
      errors.category = "Must be 50 characters or less";
    }

    if (element.title.length > 100) {
      errors.title = "Must be 100 characters or less";
    }
  });

  return errors;
};

const validateTechnical = (values) => {
  const errors = {};

  values.heroTechnicals.forEach((element) => {
    if (element.title.length > 100) {
      errors.title = "Must be 100 characters or less";
    }

    if (element.detail.length > 500) {
      errors.detail = "Must be 500 characters or less";
    }
  });

  return errors;
};

const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
};

const WebCastPage = (props) => {
  const [initialValues, setInitialValues] = React.useState({
    fullName: "",
    displayName: "",
    standout: "",
    fbUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    backgroundImage: "",
    heroSummary: {
      summary: "",
      city: "",
      state: "",
      country: "",
      email: "",
    },
    heroEducations: [
      {
        id: "",
        qualification: "",
        fromYear: "",
        toYear: "",
        university: "",
        state: "",
        country: "",
      },
    ],
    heroExperiences: [
      {
        positionTitle: "",
        fromYear: "",
        toYear: "",
        company: "",
        city: "",
        state: "",
        country: "",
        heroExperienceDetails: [],
      },
    ],
    heroServices: [
      {
        image: "",
        title: "",
        detail: "",
      },
    ],
    heroPortfolios: [
      {
        image: "",
        category: "",
        title: "",
        detail: "",
        heroPortfolioDetails: {
          title: "",
          detail: "",
          heroPortfolioImages: [],
        },
      },
    ],
    heroTechnicals: [
      {
        image: "",
        title: "",
        detail: "",
      },
    ],
  });

  const handleAddition = (e, tag, values) => {
    const heroExperience = values.heroExperiences.map((image, index) =>
      index === e
        ? {
            ...values.heroExperiences[e],
            heroExperienceDetails: [
              ...values.heroExperiences[e].heroExperienceDetails,
              { id: 0, workScope: tag },
            ],
          }
        : { ...values.heroExperiences[index] }
    );

    setInitialValues((prevState) => ({
      ...prevState,
      heroExperiences: heroExperience,
    }));
  };

  const handleDeletion = (e, indexTo, values) => {
    let heroExperienceDetails = values.heroExperiences[
      e
    ].heroExperienceDetails.splice(indexTo, 1);

    const heroExperience = values.heroExperiences.map((image, index) =>
      index === e
        ? {
            ...values.heroExperiences[e],
            heroExperienceDetails:
              values.heroExperiences[e].heroExperienceDetails,
          }
        : { ...values.heroExperiences[index] }
    );

    setInitialValues((prevState) => ({
      ...prevState,
      heroExperiences: heroExperience,
    }));
  };

  useEffect(() => {
    //console.log(initialValues.heroExperiences);
  }, [initialValues.heroExperiences]);

  useEffect(() => {
    async function getHero() {
      await props.getHero().then((response) => {
        if (!response.hasErrors) {
          if (response.value !== null && response.value !== undefined) {
            let responseData = { ...response.value };

            setInitialValues((prevState) => ({
              ...prevState,
              fullName: responseData.fullName,
              displayName: responseData.displayName,
              backgroundImage: responseData.backgroundImage,
              fbUrl: responseData.fbUrl,
              standout: responseData.standout,
              instagramUrl: responseData.instagramUrl,
              linkedInUrl: responseData.linkedInUrl,
            }));

            if (responseData.heroSummary !== null) {
              setInitialValues((prevState) => ({
                ...prevState,
                heroSummary: responseData.heroSummary,
              }));
            }

            if (responseData.heroEducations.length > 0) {
              setInitialValues((prevState) => ({
                ...prevState,
                heroEducations: responseData.heroEducations,
              }));
            }

            if (responseData.heroExperiences.length > 0) {
              setInitialValues((prevState) => ({
                ...prevState,
                heroExperiences: responseData.heroExperiences,
              }));
            }

            if (responseData.heroServices.length > 0) {
              setInitialValues((prevState) => ({
                ...prevState,
                heroServices: responseData.heroServices,
              }));
            }

            if (responseData.heroPortfolios.length > 0) {
              const heroPortfolios = responseData.heroPortfolios.map(
                (value, index) => {
                  return {
                    ...value,
                    heroPortfolioDetails: value.heroPortfolioDetails
                      ? value.heroPortfolioDetails
                      : { title: "", detail: "", heroPortfolioDetails: [] },
                  };
                }
              );
              setInitialValues((prevState) => ({
                ...prevState,
                heroPortfolios: heroPortfolios,
              }));
            }

            if (responseData.heroTechnicals.length > 0) {
              setInitialValues((prevState) => ({
                ...prevState,
                heroTechnicals: responseData.heroTechnicals,
              }));
            }
          }
        }
      });
    }

    getHero();
  }, []);

  const selectFileHandler = async (
    event,
    value,
    module,
    section,
    index,
    detail
  ) => {
    //1. define the array for the file type e.g. png, jpeg
    const fileTypes = ["image/png", "image/jpeg"];

    let file = "";
    let fileName = "";

    if (section == "portfolio" && detail) {
      file = event[0];
      fileName = event[0].name;
    } else {
      file = event.target.files[0];
      fileName = event.target.files[0].name;
    }

    // 3. the message for error if the file type of not matched
    let errMessage = [];

    // 4. to check the file type to match with the fileTypes array iterate
    // through the types array
    // if(fileTypes.every(extension=> file[0].type !=extension)){
    //     errMessage.push(`The file ${file.type} extension is not supported`);
    // } else {}

    // 5. upload to s3 bucket
    await UploadS3(value, file, fileName, module, section, index, detail);
  };

  const UploadS3 = async (
    value,
    file,
    fileName,
    module,
    section,
    index,
    detail
  ) => {
    await props
      .uploadImage(file, fileName, module, section)
      .then((response) => {
        if (!response.hasErrors) {
          if (section === "service") {
            setInitialValues((prevState) => ({
              ...prevState,
              heroServices: prevState.heroServices.map(
                (initialValueCurrent, indexCurrent) => {
                  var returnValue = { ...initialValueCurrent };

                  if (indexCurrent === index) {
                    returnValue.title = value.title;
                    returnValue.image = response.value;
                    returnValue.detail = value.detail;
                  }

                  return returnValue;
                }
              ),
            }));
          }
          if (section === "technical") {
            setInitialValues((prevState) => ({
              ...prevState,
              heroTechnicals: prevState.heroTechnicals.map(
                (initialValueCurrent, indexCurrent) => {
                  var returnValue = { ...initialValueCurrent };

                  if (indexCurrent === index) {
                    returnValue.title = value.title;
                    returnValue.image = response.value;
                    returnValue.detail = value.detail;
                  }

                  return returnValue;
                }
              ),
            }));
          }
          if (section === "portfolio") {
            setInitialValues((prevState) => ({
              ...prevState,
              heroPortfolios: prevState.heroPortfolios.map(
                (initialValueCurrent, indexCurrent) => {
                  var returnValue = { ...initialValueCurrent };

                  if (detail) {
                    if (indexCurrent === index) {
                      returnValue.title = value.title;
                      returnValue.image = value.image;
                      returnValue.category = value.category;
                      returnValue.heroPortfolioDetails.title =
                        value.heroPortfolioDetails.title;
                      returnValue.heroPortfolioDetails.detail =
                        value.heroPortfolioDetails.detail;
                      returnValue.heroPortfolioDetails.heroPortfolioImages.push(
                        { image: response.value }
                      );
                    }
                  } else {
                    if (indexCurrent === index) {
                      returnValue.title = value.title;
                      returnValue.image = response.value;
                      returnValue.category = value.category;
                      returnValue.heroPortfolioDetails.title =
                        value.heroPortfolioDetails.title;
                      returnValue.heroPortfolioDetails.detail =
                        value.heroPortfolioDetails.detail;
                    }
                  }

                  return returnValue;
                }
              ),
            }));
          } else {
            setInitialValues((prevState) => ({
              ...value,
              backgroundImage: response.value,
            }));
          }
        }
      });
  };

  const history = useHistory();

  const routeChange = () => {
    const current = props.location.pathname;
    props.history.replace(`/reload`);
    setTimeout(() => {
      props.history.replace(current);
    });
  };

  return (
    <div>
      <Helmet>
        <title>Web Cask - Manage Casting</title>
      </Helmet>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 text-center p-0 mt-3 mb-2">
            <div className="card px-0 pt-1 pb-0 mt-0 mb-3">
              <h2 id="heading">Create your own Webcast</h2>
              <p>Fill necessary form field to live your own webcast</p>
              <div id="msform">
                {/* <!-- progressbar --> */}
                <ul id="progressbar">
                  <li
                    className="bi bi-person-bounding-box active"
                    id="heroField"
                  >
                    <strong>Hero</strong>
                  </li>
                  <li className="bi bi-person-lines-fill" id="summaryField">
                    <strong>Summary</strong>
                  </li>
                  <li className="bi bi-mortarboard-fill" id="educationField">
                    <strong>Education</strong>
                  </li>
                  <li className="bi bi-briefcase-fill" id="experienceField">
                    <strong>Experience</strong>
                  </li>
                  <li className="ri-service-fill" id="serviceField">
                    <strong>Service</strong>
                  </li>
                  <li className="ri-folder-user-fill" id="portfolioField">
                    <strong>Portfolio</strong>
                  </li>
                  <li className="ri-list-settings-fill" id="skillField">
                    <strong>Skill</strong>
                  </li>
                  <li className="bi bi-check-lg" id="confirm">
                    <strong>Finish</strong>
                  </li>
                </ul>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <br />
                {/* <!-- FORMS --> */}
                <Formik
                  enableReinitialize={true}
                  className="needs-validation"
                  initialValues={initialValues}
                  onSubmit={async (values, event) => {
                    await props.addHero(values).then((response) => {
                      if (!response.hasErrors) {
                        webCast();
                      }
                    });
                  }}
                  validate={validateHero}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-6">
                            <h3 className="fs-title">Hero:</h3>
                          </div>
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="fullName" className="fieldlabels">
                            Full Name:{" "}
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            className={
                              errors.fullName
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fullName}
                          />
                          {errors.fullName ? (
                            <div className="invalid-tooltip">
                              {errors.fullName}
                            </div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="displayName" className="fieldlabels">
                            Display Name: *
                          </label>
                          <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            placeholder="Display Name"
                            className={
                              errors.displayName
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.displayName}
                          />
                          {errors.displayName ? (
                            <div className="invalid-tooltip">
                              {errors.displayName}
                            </div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="standout" className="fieldlabels">
                            Standout Message:{" "}
                          </label>
                          <input
                            id="standout"
                            type="text"
                            name="standout"
                            placeholder="Standout Message"
                            className={
                              errors.standout
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.standout}
                          />
                          {errors.standout ? (
                            <div className="invalid-tooltip">
                              {errors.standout}
                            </div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="fbUrl" className="fieldlabels">
                            FB Link:{" "}
                          </label>
                          <input
                            id="fbUrl"
                            type="text"
                            name="fbUrl"
                            placeholder="FB Link"
                            className={
                              errors.fbUrl
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fbUrl}
                          />
                          {errors.fbUrl ? (
                            <div className="invalid-tooltip">
                              {errors.fbUrl}
                            </div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="instagramUrl" className="fieldlabels">
                            Instagram Link:{" "}
                          </label>
                          <input
                            type="text"
                            name="instagramUrl"
                            id="instagramUrl"
                            placeholder="Instagram Link"
                            className={
                              errors.instagramUrl
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.instagramUrl}
                          />
                          {errors.instagramUrl ? (
                            <div className="invalid-tooltip">
                              {errors.instagramUrl}
                            </div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="linkedinUrl" className="fieldlabels">
                            LinkedIn Link:{" "}
                          </label>
                          <input
                            id="linkedinUrl"
                            type="text"
                            name="linkedinUrl"
                            placeholder="LinkedIn Link"
                            className={
                              errors.linkedinUrl
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.linkedinUrl}
                          />
                          {errors.linkedinUrl ? (
                            <div className="invalid-tooltip">
                              {errors.linkedinUrl}
                            </div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label
                            htmlFor="backgroundImage"
                            className="fieldlabels"
                          >
                            Background Image:{" "}
                          </label>
                          <input
                            id="backgroundImage"
                            type="file"
                            name="backgroundImage"
                            placeholder="Background Image"
                            onChange={(e) =>
                              selectFileHandler(e, values, "webcast", "hero")
                            }
                          />
                          {errors.backgroundImage ? (
                            <div className="invalid-tooltip">
                              {errors.backgroundImage}
                            </div>
                          ) : null}
                        </div>
                        {values.backgroundImage !== "" ? (
                          <div className="webcast-input-field position-relative">
                            <img
                              id="background"
                              style={{ width: "100%" }}
                              src={values.backgroundImage}
                              alt="your image"
                            />
                          </div>
                        ) : null}
                      </div>
                      <input
                        type="submit"
                        name="next"
                        className="next action-button"
                        disabled={isSubmitting}
                        value="Next"
                      />
                    </Form>
                  )}
                </Formik>
                <Formik
                  enableReinitialize={true}
                  className="needs-validation"
                  initialValues={initialValues}
                  onSubmit={async (values, event) => {
                    await props.addHeroSummary(values).then((response) => {
                      if (!response.hasErrors) {
                        webCast();
                      }
                    });
                  }}
                  validate={validateSummary}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-6">
                            <h2 className="fs-title">Summary:</h2>
                          </div>
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="summary" className="fieldlabels">
                            Summary:{" "}
                          </label>
                          <input
                            id="summary"
                            type="text"
                            name="heroSummary.summary"
                            placeholder="Summary"
                            className={
                              errors.summary
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.heroSummary.summary}
                          />
                          {errors.summary ? (
                            <div className="invalid-tooltip">
                              {errors.summary}
                            </div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="city" className="fieldlabels">
                            City:{" "}
                          </label>
                          <input
                            id="city"
                            type="text"
                            name="heroSummary.city"
                            placeholder="City"
                            className={
                              errors.city
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.heroSummary.city}
                          />
                          {errors.city ? (
                            <div className="invalid-tooltip">{errors.city}</div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="state" className="fieldlabels">
                            State:{" "}
                          </label>
                          <input
                            id="state"
                            type="text"
                            name="heroSummary.state"
                            placeholder="State"
                            className={
                              errors.state
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.heroSummary.state}
                          />
                          {errors.state ? (
                            <div className="invalid-tooltip">
                              {errors.state}
                            </div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="country" className="fieldlabels">
                            Country:{" "}
                          </label>
                          <input
                            id="country"
                            type="text"
                            name="heroSummary.country"
                            placeholder="Country"
                            className={
                              errors.country
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.heroSummary.country}
                          />
                          {errors.country ? (
                            <div className="invalid-tooltip">
                              {errors.country}
                            </div>
                          ) : null}
                        </div>
                        <div className="webcast-input-field position-relative">
                          <label htmlFor="email" className="fieldlabels">
                            Email: *{" "}
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="heroSummary.email"
                            placeholder="Email"
                            className={
                              errors.email
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.heroSummary.email}
                          />
                          {errors.email ? (
                            <div className="invalid-tooltip">
                              {errors.email}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <input
                        type="submit"
                        name="next"
                        className="next action-button"
                        disabled={isSubmitting}
                        value="Next"
                      />
                      <input
                        type="button"
                        name="previous"
                        className="previous action-button-previous"
                        value="Previous"
                      />
                    </Form>
                  )}
                </Formik>
                <Formik
                  enableReinitialize={true}
                  className="needs-validation"
                  initialValues={initialValues}
                  onSubmit={async (values, event) => {
                    await props.addHeroEducation(values).then((response) => {
                      if (!response.hasErrors) {
                        if (response.value !== null) {
                          let responseData = { ...response.value };

                          if (responseData.heroEducations.length > 0) {
                            setInitialValues((prevState) => ({
                              ...prevState,
                              heroEducations: responseData.heroEducations,
                            }));
                          }
                        }
                        webCast();
                      }
                    });
                  }}
                  validate={validateEducation}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-6">
                            <h2 className="fs-title">Education:</h2>
                          </div>
                        </div>
                        <FieldArray name="heroEducations">
                          {({ push, remove }) => (
                            <div>
                              {values.heroEducations.map((value, index) => {
                                return (
                                  <div className="row mb-2">
                                    <fieldset
                                      className="border p-2"
                                      key={index}
                                    >
                                      <div className="webcast-input-field position-relative">
                                        {/* <div onClick={() => remove(index)}>x</div> */}
                                        <label className="fieldlabels">
                                          Qualification:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroEducations[${index}].qualification`}
                                          placeholder="Qualification"
                                          className={
                                            errors.qualification
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.qualification}
                                        />
                                        {errors.qualification ? (
                                          <div className="invalid-tooltip">
                                            {errors.qualification}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          From Year:{" "}
                                        </label>
                                        <input
                                          id="fromYear"
                                          type="text"
                                          name={`heroEducations[${index}].fromYear`}
                                          placeholder="From Year"
                                          className={
                                            errors.fromYear
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.fromYear}
                                        />
                                        {errors.fromYear ? (
                                          <div className="invalid-tooltip">
                                            {errors.fromYear}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          To Year:{" "}
                                        </label>
                                        <input
                                          id="toYear"
                                          type="text"
                                          name={`heroEducations[${index}].toYear`}
                                          placeholder="To Year"
                                          className={
                                            errors.toYear
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.toYear}
                                        />
                                        {errors.toYear ? (
                                          <div className="invalid-tooltip">
                                            {errors.toYear}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          University:{" "}
                                        </label>
                                        <input
                                          id="university"
                                          type="text"
                                          name={`heroEducations[${index}].university`}
                                          placeholder="University"
                                          className={
                                            errors.university
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.university}
                                        />
                                        {errors.university ? (
                                          <div className="invalid-tooltip">
                                            {errors.university}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          State:{" "}
                                        </label>
                                        <input
                                          id="state"
                                          type="text"
                                          name={`heroEducations[${index}].state`}
                                          placeholder="State"
                                          className={
                                            errors.state
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.state}
                                        />
                                        {errors.state ? (
                                          <div className="invalid-tooltip">
                                            {errors.state}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Country:{" "}
                                        </label>
                                        <input
                                          id="country"
                                          type="text"
                                          name={`heroEducations[${index}].country`}
                                          placeholder="Country"
                                          className={
                                            errors.country
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.country}
                                        />
                                        {errors.country ? (
                                          <div className="invalid-tooltip">
                                            {errors.country}
                                          </div>
                                        ) : null}
                                      </div>
                                    </fieldset>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="btn btn-primary"
                                    >
                                      <i className="bi bi-dash-circle"></i>
                                      <span>&nbsp;&nbsp;</span>Remove Education
                                    </button>
                                  </div>
                                );
                              })}
                              <div className="row">
                                <button
                                  type="button"
                                  onClick={() =>
                                    push({
                                      qualification: "",
                                      fromYear: "",
                                      toYear: "",
                                      university: "",
                                      state: "",
                                      country: "",
                                    })
                                  }
                                  className="btn btn-primary"
                                >
                                  <i className="bi bi-plus-circle"></i>
                                  <span>&nbsp;&nbsp;</span>Add Education
                                </button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <input
                        type="submit"
                        name="next"
                        className="next action-button"
                        disabled={isSubmitting}
                        value="Next"
                      />
                      <input
                        type="button"
                        name="previous"
                        className="previous action-button-previous"
                        value="Previous"
                      />
                    </Form>
                  )}
                </Formik>
                <Formik
                  enableReinitialize={true}
                  className="needs-validation"
                  initialValues={initialValues}
                  onSubmit={async (values, event) => {
                    await props.addHeroExperience(values).then((response) => {
                      if (!response.hasErrors) {
                        if (response.value !== null) {
                          let responseData = { ...response.value };

                          if (responseData.heroExperiences.length > 0) {
                            setInitialValues((prevState) => ({
                              ...prevState,
                              heroExperiences: responseData.heroExperiences,
                            }));
                          }
                        }
                        webCast();
                      }
                    });
                  }}
                  validate={validateExperience}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-6">
                            <h2 className="fs-title">Experience:</h2>
                          </div>
                        </div>
                        <FieldArray name="heroExperiences">
                          {({ push, remove }) => (
                            <div>
                              {values.heroExperiences.map((value, index) => {
                                return (
                                  <div className="row mb-2">
                                    <fieldset
                                      className="border p-2"
                                      key={index}
                                    >
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          PositionTitle:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroExperiences[${index}].positionTitle`}
                                          placeholder="Position Title"
                                          className={
                                            errors.positiontitle
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.positionTitle}
                                        />
                                        {errors.positionTitle ? (
                                          <div className="invalid-tooltip">
                                            {errors.positionTitle}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          From Year:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroExperiences[${index}].fromYear`}
                                          placeholder="From Year"
                                          className={
                                            errors.fromYear
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.fromYear}
                                        />
                                        {errors.fromYear ? (
                                          <div className="invalid-tooltip">
                                            {errors.fromYear}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          To Year:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroExperiences[${index}].toYear`}
                                          placeholder="To Year"
                                          className={
                                            errors.toYear
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.toYear}
                                        />
                                        {errors.toYear ? (
                                          <div className="invalid-tooltip">
                                            {errors.toYear}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Company:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroExperiences[${index}].company`}
                                          placeholder="Company"
                                          className={
                                            errors.company
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.company}
                                        />
                                        {errors.company ? (
                                          <div className="invalid-tooltip">
                                            {errors.company}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          State:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroExperiences[${index}].state`}
                                          placeholder="State"
                                          className={
                                            errors.state
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.state}
                                        />
                                        {errors.state ? (
                                          <div className="invalid-tooltip">
                                            {errors.state}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          City:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroExperiences[${index}].city`}
                                          placeholder="City"
                                          className={
                                            errors.city
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.city}
                                        />
                                        {errors.city ? (
                                          <div className="invalid-tooltip">
                                            {errors.city}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div>
                                        <label className="fieldlabels">
                                          Work Scope:{" "}
                                        </label>
                                        <ReactTags
                                          className="col-6"
                                          tags={values.heroExperiences[
                                            index
                                          ].heroExperienceDetails.map(
                                            (value) => ({
                                              id: value.id,
                                              text: value.workScope,
                                            })
                                          )}
                                          // suggestions={suggestions}
                                          // delimiters={delimiters}
                                          handleDelete={(e) =>
                                            handleDeletion(index, e, values)
                                          }
                                          handleAddition={(e) =>
                                            handleAddition(index, e, values)
                                          }
                                          // handleDrag={handleDrag}
                                          // handleTagClick={handleTagClick}
                                          //inputFieldPosition="bottom"
                                          //autocomplete
                                        />
                                      </div>
                                    </fieldset>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="btn btn-primary"
                                    >
                                      <i className="bi bi-dash-circle"></i>
                                      <span>&nbsp;&nbsp;</span>Remove Experience
                                    </button>
                                  </div>
                                );
                              })}
                              <div className="row">
                                <button
                                  type="button"
                                  onClick={() => {
                                    let arr = [
                                      ...initialValues.heroExperiences,
                                    ];

                                    arr.push({
                                      positionTitle: "",
                                      fromYear: "",
                                      toYear: "",
                                      company: "",
                                      city: "",
                                      state: "",
                                      country: "",
                                      heroExperienceDetails: [],
                                    });

                                    setInitialValues((prevState) => ({
                                      ...prevState,
                                      heroExperiences: arr,
                                    }));
                                  }}
                                  className="btn btn-primary"
                                >
                                  <i className="bi bi-plus-square-fill"></i>
                                  <span>&nbsp;&nbsp;</span>Add Experience
                                </button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <input
                        type="submit"
                        name="next"
                        className="next action-button"
                        disabled={isSubmitting}
                        value="Next"
                      />
                      <input
                        type="button"
                        name="previous"
                        className="previous action-button-previous"
                        value="Previous"
                      />
                    </Form>
                  )}
                </Formik>
                <Formik
                  enableReinitialize={true}
                  className="needs-validation"
                  initialValues={initialValues}
                  onSubmit={async (values, event) => {
                    await props.addHeroService(values).then((response) => {
                      if (!response.hasErrors) {
                        if (response.value !== null) {
                          let responseData = { ...response.value };

                          if (responseData.heroServices.length > 0) {
                            setInitialValues((prevState) => ({
                              ...prevState,
                              heroServices: responseData.heroServices,
                            }));
                          }
                        }

                        webCast();
                      }
                    });
                  }}
                  validate={validateService}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-6">
                            <h2 className="fs-title">Service:</h2>
                          </div>
                          <div className="col-6"></div>
                        </div>
                        <FieldArray name="heroServices">
                          {({ push, remove }) => (
                            <div>
                              {values.heroServices.map((value, index) => {
                                return (
                                  <div className="row mb-2">
                                    <fieldset
                                      className="border p-2"
                                      key={index}
                                    >
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Image:{" "}
                                        </label>
                                        <input
                                          type="file"
                                          name={`heroServices[${index}].image`}
                                          placeholder="Image"
                                          onChange={(e) =>
                                            selectFileHandler(
                                              e,
                                              value,
                                              "webcast",
                                              "service",
                                              index
                                            )
                                          }
                                        />
                                        {errors.image ? (
                                          <div className="invalid-tooltip">
                                            {errors.image}
                                          </div>
                                        ) : null}
                                      </div>
                                      {value.image !== "" ? (
                                        <div
                                          className="webcast-input-field position-relative"
                                          style={{ textAlign: "center" }}
                                        >
                                          <img
                                            id="background"
                                            style={{
                                              width: "100px",
                                              height: "100px",
                                            }}
                                            src={value.image}
                                            alt="your image"
                                          />
                                        </div>
                                      ) : null}
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Title:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroServices[${index}].title`}
                                          placeholder="Title"
                                          className={
                                            errors.title
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.title}
                                        />
                                        {errors.title ? (
                                          <div className="invalid-tooltip">
                                            {errors.title}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Detail:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroServices[${index}].detail`}
                                          placeholder="Detail"
                                          className={
                                            errors.detail
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.detail}
                                        />
                                        {errors.detail ? (
                                          <div className="invalid-tooltip">
                                            {errors.detail}
                                          </div>
                                        ) : null}
                                      </div>
                                    </fieldset>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="btn btn-primary"
                                    >
                                      <i className="bi bi-dash-circle"></i>
                                      <span>&nbsp;&nbsp;</span>Remove Service
                                    </button>
                                  </div>
                                );
                              })}
                              <div className="row">
                                <button
                                  type="button"
                                  onClick={() => {
                                    let arr = [...values.heroServices];

                                    arr.push({
                                      image: "",
                                      title: "",
                                      detail: "",
                                    });

                                    setInitialValues((prevState) => ({
                                      ...prevState,
                                      heroServices: arr,
                                    }));
                                  }}
                                  className="btn btn-primary"
                                >
                                  <i className="bi bi-plus-square-fill"></i>
                                  <span>&nbsp;&nbsp;</span>Add Service
                                </button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <input
                        type="submit"
                        name="next"
                        className="next action-button"
                        disabled={isSubmitting}
                        value="Next"
                      />
                      <input
                        type="button"
                        name="previous"
                        className="previous action-button-previous"
                        value="Previous"
                      />
                    </Form>
                  )}
                </Formik>
                <Formik
                  enableReinitialize={true}
                  className="needs-validation"
                  initialValues={initialValues}
                  onSubmit={async (values, event) => {
                    await props.addHeroPortfolio(values).then((response) => {
                      if (!response.hasErrors) {
                        if (response.value !== null) {
                          let responseData = { ...response.value };

                          if (responseData.heroPortfolios.length > 0) {
                            setInitialValues((prevState) => ({
                              ...prevState,
                              heroPortfolios: responseData.heroPortfolios,
                            }));
                          }
                        }
                        webCast();
                      }
                    });
                  }}
                  validate={validatePortfolio}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    setFieldValue,
                  }) => (
                    <Form>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-6">
                            <h2 className="fs-title">Portfolio:</h2>
                          </div>
                          <div className="col-6"></div>
                        </div>
                        <FieldArray name="heroPortfolios">
                          {({ push, remove }) => (
                            <div>
                              {values.heroPortfolios.map((value, index) => {
                                return (
                                  <div className="row mb-2">
                                    <fieldset
                                      className="border p-2"
                                      key={index}
                                    >
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Portfolio Image:{" "}
                                        </label>
                                        <input
                                          type="file"
                                          name={`heroPortfolios[${index}].image`}
                                          placeholder="Image"
                                          onChange={(e) =>
                                            selectFileHandler(
                                              e,
                                              value,
                                              "webcast",
                                              "portfolio",
                                              index
                                            )
                                          }
                                        />
                                        {errors.image ? (
                                          <div className="invalid-tooltip">
                                            {errors.image}
                                          </div>
                                        ) : null}
                                      </div>
                                      {value.image !== "" ? (
                                        <div className="webcast-input-field position-relative">
                                          <img
                                            id="background"
                                            style={{ width: "100%" }}
                                            src={value.image}
                                            alt="your image"
                                          />
                                        </div>
                                      ) : null}
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Category:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroPortfolios[${index}].category`}
                                          placeholder="Category"
                                          className={
                                            errors.category
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.category}
                                        />
                                        {errors.category ? (
                                          <div className="invalid-tooltip">
                                            {errors.category}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Title:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroPortfolios[${index}].title`}
                                          placeholder="Title"
                                          className={
                                            errors.title
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.title}
                                        />
                                        {errors.title ? (
                                          <div className="invalid-tooltip">
                                            {errors.title}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Portfolio Images Detail:{" "}
                                        </label>
                                        <Dropzone
                                          style={dropzoneStyle}
                                          name={`heroPortfolios[${index}].image`}
                                          accept="image/*"
                                          onDrop={(acceptedFiles) => {
                                            // do nothing if no files
                                            if (acceptedFiles.length === 0) {
                                              return;
                                            }

                                            // on drop we add to the existing files
                                            selectFileHandler(
                                              acceptedFiles,
                                              value,
                                              "webcast",
                                              "portfolio",
                                              index,
                                              "detail"
                                            );
                                          }}
                                        >
                                          {({
                                            isDragActive,
                                            isDragReject,
                                            acceptedFiles,
                                            rejectedFiles,
                                          }) => {
                                            if (isDragActive) {
                                              return "This file is authorized";
                                            }

                                            if (isDragReject) {
                                              return "This file is not authorized";
                                            }

                                            if (
                                              !value.heroPortfolioDetails
                                                .heroPortfolioImages.length
                                            ) {
                                              return (
                                                <p>
                                                  Try dragging a image here!
                                                </p>
                                              );
                                            }

                                            return value.heroPortfolioDetails.heroPortfolioImages?.map(
                                              (file, i) => (
                                                <img
                                                  id="background"
                                                  style={{
                                                    width: "200",
                                                    height: "200",
                                                  }}
                                                  src={file.image}
                                                  alt="your image"
                                                />
                                              )
                                            );
                                          }}
                                        </Dropzone>
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Detail Title:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroPortfolios[${index}].heroPortfolioDetails.title`}
                                          placeholder="Title"
                                          className={
                                            errors.titleDetail
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={
                                            value.heroPortfolioDetails.title
                                          }
                                        />
                                        {errors.titleDetail ? (
                                          <div className="invalid-tooltip">
                                            {errors.titleDetail}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Detail Content:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroPortfolios[${index}].heroPortfolioDetails.detail`}
                                          placeholder="Title"
                                          className={
                                            errors.contentDetail
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={
                                            value.heroPortfolioDetails?.detail
                                          }
                                        />
                                        {errors.contentDetail ? (
                                          <div className="invalid-tooltip">
                                            {errors.contentDetail}
                                          </div>
                                        ) : null}
                                      </div>
                                    </fieldset>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="btn btn-primary"
                                    >
                                      <i className="bi bi-dash-circle"></i>
                                      <span>&nbsp;&nbsp;</span>Remove Portfolio
                                    </button>
                                  </div>
                                );
                              })}
                              <div className="row">
                                <button
                                  type="button"
                                  onClick={() => {
                                    let arr = [...values.heroPortfolios];

                                    arr.push({
                                      image: "",
                                      category: "",
                                      title: "",
                                      heroPortfolioDetails: {
                                        title: "",
                                        detail: "",
                                        heroPortfolioImages: [],
                                      },
                                    });

                                    setInitialValues((prevState) => ({
                                      ...prevState,
                                      heroPortfolios: arr,
                                    }));
                                  }}
                                  className="btn btn-primary"
                                >
                                  <i className="bi bi-plus-square-fill"></i>
                                  <span>&nbsp;&nbsp;</span>Add Portfolio
                                </button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <input
                        type="submit"
                        name="next"
                        className="next action-button"
                        disabled={isSubmitting}
                        value="Next"
                      />
                      <input
                        type="button"
                        name="previous"
                        className="previous action-button-previous"
                        value="Previous"
                      />
                    </Form>
                  )}
                </Formik>
                <Formik
                  enableReinitialize={true}
                  className="needs-validation"
                  initialValues={initialValues}
                  onSubmit={async (values, event) => {
                    await props.addHeroTechnical(values).then((response) => {
                      if (!response.hasErrors) {
                        let responseData = { ...response.value };

                        if (responseData.heroTechnicals.length > 0) {
                          setInitialValues((prevState) => ({
                            ...prevState,
                            heroTechnicals: responseData.heroTechnicals,
                          }));
                        }
                        webCast();
                      }
                    });
                  }}
                  validate={validateTechnical}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-6">
                            <h2 className="fs-title">Technical:</h2>
                          </div>
                          <div className="col-6"></div>
                        </div>
                        <FieldArray name="heroTechnicals">
                          {({ push, remove }) => (
                            <div>
                              {values.heroTechnicals.map((value, index) => {
                                return (
                                  <div className="row mb-2">
                                    <fieldset
                                      className="border p-2"
                                      key={index}
                                    >
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Image:{" "}
                                        </label>
                                        <input
                                          type="file"
                                          name={`heroTechnicals[${index}].image`}
                                          placeholder="Image"
                                          onChange={(e) =>
                                            selectFileHandler(
                                              e,
                                              value,
                                              "webcast",
                                              "technical",
                                              index
                                            )
                                          }
                                        />
                                        {errors.image ? (
                                          <div className="invalid-tooltip">
                                            {errors.image}
                                          </div>
                                        ) : null}
                                      </div>
                                      {value.image !== "" ? (
                                        <div className="webcast-input-field position-relative">
                                          <img
                                            id="background"
                                            style={{ width: "100%" }}
                                            src={value.image}
                                            alt="your image"
                                          />
                                        </div>
                                      ) : null}
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Title:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroTechnicals[${index}].title`}
                                          placeholder="Title"
                                          className={
                                            errors.title
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.title}
                                        />
                                        {errors.title ? (
                                          <div className="invalid-tooltip">
                                            {errors.title}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="webcast-input-field position-relative">
                                        <label className="fieldlabels">
                                          Detail:{" "}
                                        </label>
                                        <input
                                          type="text"
                                          name={`heroTechnicals[${index}].detail`}
                                          placeholder="Detail"
                                          className={
                                            errors.detail
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={value.detail}
                                        />
                                        {errors.detail ? (
                                          <div className="invalid-tooltip">
                                            {errors.detail}
                                          </div>
                                        ) : null}
                                      </div>
                                    </fieldset>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="btn btn-primary"
                                    >
                                      <i className="bi bi-dash-circle"></i>
                                      <span>&nbsp;&nbsp;</span>Remove Technical
                                    </button>
                                  </div>
                                );
                              })}
                              <div className="row">
                                <button
                                  type="button"
                                  onClick={() => {
                                    let arr = [...values.heroTechnicals];

                                    arr.push({
                                      image: "",
                                      title: "",
                                      detail: "",
                                    });

                                    setInitialValues((prevState) => ({
                                      ...prevState,
                                      heroTechnicals: arr,
                                    }));
                                  }}
                                  className="btn btn-primary"
                                >
                                  <i className="bi bi-plus-square-fill"></i>
                                  <span>&nbsp;&nbsp;</span>Add Technical
                                </button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <input
                        type="submit"
                        name="next"
                        className="next action-button"
                        disabled={isSubmitting}
                        value="Next"
                      />
                      <input
                        type="button"
                        name="previous"
                        className="previous action-button-previous"
                        value="Previous"
                      />
                    </Form>
                  )}
                </Formik>

                <form>
                  <div className="form-card">
                    <div className="row">
                      <div className="col-6">
                        <h2 className="fs-title">Finish:</h2>
                      </div>
                      <div className="col-6"></div>
                    </div>
                    <br></br>
                    <h2 className="purple-text text-center">
                      <strong>SUCCESS !</strong>
                    </h2>
                    <br />
                    <div className="row justify-content-center">
                      <div className="col-3">
                        <img
                          src="https://i.imgur.com/GwStPmg.png"
                          className="fit-image"
                        />
                      </div>
                    </div>
                    <br></br>
                    <div className="row justify-content-center">
                      <div className="col-8 text-center">
                        <h5 className="purple-text text-center">
                          You Have Successfully Created Webcast
                        </h5>
                      </div>
                    </div>
                  </div>
                  <input
                    type="button"
                    name="done"
                    className="next action-button"
                    onClick={routeChange}
                    value="Done"
                  />
                  <input
                    type="button"
                    name="previous"
                    className="previous action-button-previous"
                    value="Previous"
                  />
                </form>
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
  (state) => state.webcast, // Selects which state properties are merged into the component's props.
  { ...s3Store.actionCreators, ...webcastStore.actionCreators } // Selects which action creators are merged into the component's props.
)(WebCastPage);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);
