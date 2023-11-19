import { CardContainer } from "@Components/webCastLanding/Card";
import { connect } from "react-redux";
import * as emailStore from "@Store/emailStore";
import { Redirect, withRouter } from "react-router";
import React, { useRef } from "react";
import { useState } from "react";

const WebCastLanding = (props) => {
  const [initialValues, setInitialValues] = useState([
    {
      avatarSrc:
        "https://66.media.tumblr.com/3d3f6bb97ca2507b4aa679c205b7ae4d/tumblr_pitd3ejkzw1wcgykbo1_640.jpg",
      cardBackImgSrc:
        "https://i.pinimg.com/736x/b1/2d/9f/b12d9f259a178fc9dc7bfb6447be7a1c.jpg",
      imgSrc:
        "http://1.bp.blogspot.com/-tso_pF4jEdU/UPC4zDXEY6I/AAAAAAAAAhE/Vb2Cd8nRZEo/s1600/a.jpg",
      title: "Jake Sully",
      subTitle: "@Na'vi_4_Lyf",
      bio: "Sick of doctors telling me what I couldn't do. I was a marine. A warrior... of the uh... Jarhead Clan. My cup is empty.",
      direction: "forwards",
    },
  ]);

  return (
    <div>
      <CardContainer data={initialValues} />
    </div>
  );
};

// Connect component with Redux store.
var connectedComponent = connect(
  (state) => state.sendEmail, // Selects which state properties are merged into the component's props.
  emailStore.actionCreators // Selects which action creators are merged into the component's props.
)(WebCastLanding);

export default withRouter(connectedComponent);
