import * as React from "react";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";
import "@Styles/homepage/styles.scss";
import { connect } from "react-redux";
import * as loginStore from "@Store/loginStore";
import { Redirect, withRouter } from "react-router";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <br />

      {/* <img style={{ "margin": "0 auto", "display": "block", "width": "60%" }} src={logo} /> */}

      <p className="text-center" style={{ fontSize: "3rem" }}>
        Welcome!
      </p>
    </div>
  );
};

// Connect component with Redux store.
var connectedComponent = connect(
  (state) => state.login, // Selects which state properties are merged into the component's props.
  loginStore.actionCreators // Selects which action creators are merged into the component's props.
)(HomePage);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);
