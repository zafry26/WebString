import * as emailStore from "@Store/emailStore";
import * as webcastStore from "@Store/webcastStore";
import * as s3Store from "@Store/s3Store";
import { connect } from "react-redux";
import React, { useRef, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Redirect, withRouter } from "react-router";
import { useParams } from "react-router-dom";
import FormValidator from "@Components/shared/FormValidator";
import Button from "react-bootstrap/Button";
import { Formik, Field, Form } from "formik";
import { FormGroup } from "react-bootstrap";
import SessionManager from "@Core/session";
import "@Styles/style.scss";
import "@Styles/extra.scss";
import standOut from "@Images/img/portfolio/StandOut.png";
import {
  scrolltoTopClick,
  navbarlinksActive,
  buttonBackToTop,
  onScrollTo,
  mobileToggle,
  skillAnimation,
  onPageLoad,
  aosInit,
} from "@WebCastUtils";
import { useState } from "react";
import PortfolioDetail from "@Components/shared/PortfolioDetail";
import PortfolioHover from "@Components/shared/PortfolioHover";
import { hero as HeroTyped } from "@WebCastUtils";

const StandOutPage = (props) => {
  const { id } = useParams();

  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  const [isFetch, setIsFetch] = useState(true);

  const formValidator = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const [detailData, setDetailData] = useState(null);
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

  useEffect(() => {
    async function getHero(id) {
      await props.getHero(id).then((response) => {
        if (!response.hasErrors) {
          setInitialValues((initialValues) => ({
            ...initialValues,
            ...response.value.value,
          }));
        }
      });

      setIsFetch(false);
    }

    getHero(id);
  }, []);

  useEffect(() => {
    if (isFetch) {
      aosInit();
      buttonBackToTop();
      onScrollTo();
      skillAnimation();
      mobileToggle();
      onPageLoad();

      return;
    }

    navbarlinksActive();
    HeroTyped(typed, el, initialValues.standout);
  }, [isFetch]);

  const onSubmit = async (data) => {
    if (formValidator.current.isValid()) {
      setSubmitting(true);

      await props.sendEmail(data);

      if (!props.isFetching) {
        setSubmitting(false);
      }
    }
  };

  const showDetail = (value) => {
    setDetailData(value);
    setShow(true);
  };

  return (
    <div>
      <Helmet>
        <title>WebCast</title>
      </Helmet>
      <i className="bi bi-list mobile-nav-toggle d-xl-none"></i>

      <header id="header" className="d-flex flex-column justify-content-center">
        <nav id="navbar" className="navbar nav-menu">
          <ul>
            <li>
              <a href="#hero" className="nav-link scrollto active">
                <i className="bx bx-home"></i> <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#experience" className="nav-link scrollto">
                <i className="bx bx-file-blank"></i> <span>Experience</span>
              </a>
            </li>
            <li>
              <a href="#services" className="nav-link scrollto">
                <i className="bx bx-server"></i> <span>Services</span>
              </a>
            </li>
            <li>
              <a href="#portfolio" className="nav-link scrollto">
                <i className="bx bx-book-content"></i> <span>Portfolio</span>
              </a>
            </li>
            <li>
              <a href="#technical" className="nav-link scrollto">
                <i className="bx bx-user"></i> <span>Technical Expertise</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link scrollto">
                <i className="bx bx-envelope"></i> <span>Contact</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section
        id="hero"
        className="d-flex flex-column justify-content-center hero"
        style={{
          background:
            "url( " + initialValues.backgroundImage + ") top right no-repeat",
        }}
      >
        <div className="container" data-aos="zoom-in" data-aos-delay="100">
          <h1>{initialValues.displayName}</h1>
          {initialValues.standout != "" ? (
            <p>
              I'm <span ref={el}></span>
            </p>
          ) : null}
          <div className="social-links">
            <a
              href={initialValues.fbUrl}
              style={{ display: initialValues.fbUrl != "" ? "block" : "none" }}
              className="facebook"
            >
              <i className="bx bxl-facebook"></i>
            </a>
            <a
              href={initialValues.linkedinUrl}
              style={{
                display: initialValues.linkedinUrl != "" ? "block" : "none",
              }}
              className="linkedin"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="experience" className="resume">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Experience</h2>
              <div className="container">
                <div
                  className="stack"
                  style={{ "--stacks": "3", textAlign: "center" }}
                >
                  <span style={{ "--index": "0" }}>
                    {initialValues.heroSummary.summary}
                  </span>
                  <span style={{ "--index": "1" }}>
                    {initialValues.heroSummary.summary}
                  </span>
                  <span style={{ "--index": "2" }}>
                    {initialValues.heroSummary.summary}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <h3 className="resume-title">Summary</h3>
                <div className="resume-item pb-0">
                  <h4>{initialValues.fullName}</h4>
                  <p>
                    <em>{initialValues.heroSummary.summary}</em>
                  </p>
                  <ul>
                    <li>
                      {initialValues.heroSummary.state},{" "}
                      {initialValues.heroSummary.country}
                    </li>
                    <li>{initialValues.heroSummary.email}</li>
                  </ul>
                </div>
                <h3 className="resume-title">Education</h3>
                {initialValues.heroEducations.map((value, index) => {
                  return (
                    <div className="resume-item" key={index}>
                      <h4>{value.qualification}</h4>
                      <h5>
                        {value.fromYear} - {value.toYear}
                      </h5>
                      <p>
                        <em>{value.university}</em>
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="col-lg-6">
                <h3 className="resume-title">Professional Experience</h3>
                {initialValues.heroExperiences.map((value, index) => {
                  return (
                    <div className="resume-item" key={index}>
                      <h4>{value.positionTitle}</h4>
                      <h5>
                        {value.fromYear} - {value.toYear}
                      </h5>
                      <p>
                        <em>
                          {value.state}, {value.city}{" "}
                        </em>
                      </p>
                      <ul>
                        {value.heroExperienceDetails.map((work, index) => {
                          return <li>{work.workScope}</li>;
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Services</h2>
              <p>
                Offering best services and solutions to potential client to gain
                client trust and loyalty
              </p>
            </div>
            <div className="row">
              {initialValues.heroServices.map((value, index) => {
                return (
                  <div
                    className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 justify-content-center"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                    key={index}
                  >
                    <div className="icon-box iconbox-blue">
                      <div className="col-lg-12">
                        <div className="icon">
                          <i>
                            <img
                              src={value.image}
                              className="img-fluid"
                              alt=""
                            />
                          </i>
                        </div>
                        <h4>
                          <a href="">{value.title}</a>
                        </h4>
                        <p>{value.detail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Portfolio</h2>
              <p>
                Well, as a Software Engineer, I've experienced with all stages
                of the software developement life cycle and client needs and
                expectation.
              </p>
            </div>
            <div className="row">
              <div
                className="col-lg-12 d-flex justify-content-center"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <ul id="portfolio-flters">
                  <li data-filter="*" className="filter-active">
                    All
                  </li>
                  <li data-filter=".filter-app">App</li>
                  <li data-filter=".filter-web">Web</li>
                </ul>
              </div>
            </div>
            <div
              className="row portfolio-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {initialValues.heroPortfolios.map((value, index) => {
                return (
                  <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                    <div className="portfolio-wrap">
                      <img src={value.image} className="img-fluid" alt="" />
                      <div className="portfolio-info">
                        <h4>{value.title}</h4>
                        <p>{value.category}</p>
                        <div className="portfolio-links">
                          <a
                            href="assets/img/portfolio/portfolio-1.jpg"
                            data-gallery="portfolioGallery"
                            className="portfolio-lightbox"
                            title="App 1"
                          >
                            <i className="bx bx-plus"></i>
                          </a>
                          <a
                            onClick={() => showDetail(value)}
                            className="portfolio-details-lightbox"
                            data-glightbox="type: external"
                            title="Portfolio Details"
                          >
                            <i className="bx bx-link"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {show && (
          <div>
            <PortfolioDetail status={show} detail={detailData} />
          </div>
        )}

        <section id="technical" className="technical">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Technical Expertise</h2>
            </div>
            <div className="row">
              {initialValues.heroTechnicals.map((value, index) => {
                return (
                  <div
                    className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 justify-content-center"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                    key={index}
                  >
                    <div className="icon-box iconbox-blue">
                      <div className="col-lg-12">
                        <img src={value.image} className="img-fluid" alt="" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* <!-- End Technical Section --> */}
        {/* <!-- ======= Testimonials Section ======= -->
                    <!-- <section id="testimonials" className="testimonials section-bg">
                        <div className="container" data-aos="fade-up">

                            <div className="section-title">
                                <h2>Testimonials</h2>
                            </div>

                            <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                                <div className="swiper-wrapper">

                                    <div className="swiper-slide">
                                        <div className="testimonial-item">
                                            <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img" alt="">
                                                <h3>Saul Goodman</h3>
                                                <h4>Ceo &amp; Founder</h4>
                                                <p>
                                                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium
                                                    quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                                                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                        </div>
                                    </div>

                                    <div className="swiper-slide">
                                        <div className="testimonial-item">
                                            <img src="assets/img/testimonials/testimonials-2.jpg" className="testimonial-img" alt="">
                                                <h3>Sara Wilsson</h3>
                                                <h4>Designer</h4>
                                                <p>
                                                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis
                                                    quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
                                                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                        </div>
                                    </div>

                                    <div className="swiper-slide">
                                        <div className="testimonial-item">
                                            <img src="assets/img/testimonials/testimonials-3.jpg" className="testimonial-img" alt="">
                                                <h3>Jena Karlis</h3>
                                                <h4>Store Owner</h4>
                                                <p>
                                                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim
                                                    tempor labore quem eram duis noster aute amet eram fore quis sint minim.
                                                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                        </div>
                                    </div>

                                    <div className="swiper-slide">
                                        <div className="testimonial-item">
                                            <img src="assets/img/testimonials/testimonials-4.jpg" className="testimonial-img" alt="">
                                                <h3>Matt Brandon</h3>
                                                <h4>Freelancer</h4>
                                                <p>
                                                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit
                                                    minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                                                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                        </div>
                                    </div>

                                    <div className="swiper-slide">
                                        <div className="testimonial-item">
                                            <img src="assets/img/testimonials/testimonials-5.jpg" className="testimonial-img" alt="">
                                                <h3>John Larson</h3>
                                                <h4>Entrepreneur</h4>
                                                <p>
                                                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa
                                                    labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                                                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="swiper-pagination"></div>
                            </div>

                        </div>
                </section> -->
                <!-- End Testimonials Section --> */}

        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Contact</h2>
            </div>
            <div className="row mt-1">
              <div className="col-lg-4">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>
                      {initialValues.heroSummary.city},{" "}
                      {initialValues.heroSummary.country}
                    </p>
                  </div>
                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>{initialValues.heroSummary.email}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 mt-5 mt-lg-0">
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
                        <Form className="php-email-form">
                          <div className="row">
                            <div className="col-md-6 form-group">
                              <Field name="fullname">
                                {({ field }) => (
                                  <>
                                    <input
                                      className="form-control"
                                      placeholder="Your Name"
                                      type="text"
                                      id="fullname"
                                      name={field.name}
                                      data-val-required="true"
                                      data-msg-required="Name is required."
                                      value={field.value || ""}
                                      onChange={field.onChange}
                                    />
                                  </>
                                )}
                              </Field>
                            </div>
                            <div className="col-md-6 form-group">
                              <Field name="email">
                                {({ field }) => (
                                  <>
                                    <input
                                      placeholder="Your Email"
                                      type="email"
                                      className="form-control"
                                      id="email"
                                      name={field.email}
                                      data-val-required="true"
                                      data-msg-required="Email is required."
                                      value={field.value || ""}
                                      onChange={field.onChange}
                                    />
                                  </>
                                )}
                              </Field>
                            </div>
                          </div>
                          <div className="form-group mt-3">
                            <Field name="subject">
                              {({ field }) => (
                                <>
                                  <input
                                    placeholder="Subject"
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    name={field.subject}
                                    data-val-required="true"
                                    data-msg-required="Subject is required."
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                  />
                                </>
                              )}
                            </Field>
                          </div>
                          <div className="form-group mt-3">
                            <Field name="message">
                              {({ field }) => (
                                <>
                                  <textarea
                                    placeholder="Message"
                                    type="text"
                                    rows="5"
                                    className="form-control"
                                    id="message"
                                    name={field.subject}
                                    data-val-required="true"
                                    data-msg-required="Message is required."
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                  />
                                </>
                              )}
                            </Field>
                          </div>
                          <div className="my-3">
                            <div className="loading">Loading</div>
                            <div className="error-message"></div>
                            <div className="sent-message">
                              Your message has been sent. Thank you!
                            </div>
                          </div>
                          <div className="text-center">
                            <Button
                              disabled={submitting}
                              className="buttonSubmit"
                              onClick={() => handleSubmit()}
                            >
                              Send Message
                            </Button>
                          </div>
                        </Form>
                      </FormValidator>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="container">
          <div className="social-links">
            {initialValues.fbUrl != "" ? (
              <a href={initialValues.fbUrl} className="facebook">
                <i className="bx bxl-facebook"></i>
              </a>
            ) : null}
            {initialValues.linkedInUrl != "" ? (
              <a href={initialValues.linkedInUrl} className="linkedin">
                <i className="bx bxl-linkedin"></i>
              </a>
            ) : null}
          </div>
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>
                WebCast<span>&#8482;</span>
              </span>
            </strong>{" "}
            All Rights Reserved {new Date().getFullYear()}
          </div>
          <div className="credits">
            Service offered by{" "}
            <strong>
              CDN<span>&#8482;</span>
            </strong>
          </div>
        </div>
      </footer>

      <div id="preloader"></div>
      <a
        onClick={scrolltoTopClick}
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

// Connect component with Redux store.
var connectedComponent = connect(
  (state) => state.sendEmail, // Selects which state properties are merged into the component's props.
  {
    ...emailStore.actionCreators,
    ...webcastStore.actionCreators,
    ...s3Store.actionCreators,
  } // Selects which action creators are merged into the component's props.
)(StandOutPage);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);
