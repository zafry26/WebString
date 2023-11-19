import React from "react";
import "@Styles/webcast/landing.scss";

// Styles
const bodyStyles = {
  // background: "-webkit-gradient(linear, left top, right top, color-stop(0%, transparent), color-stop(50%,red), color-stop(100%,transparent))",
  // background: "-webkit-linear-gradient(left, transparent 0%,red 50%,transparent 100%)", /* Chrome10+, Safari5.1+ */
  // background: "-moz-linear-gradient(left, transparent 0%,red 50%,transparent 100%)",    /* FF3.6+ */
  // background: "linear-gradient(to bottom right,#ff5555 40%,#5555ff 100%)",
  width: "100%",
  height: "100vh",
};
const headerStyles = {
  textAlign: "center",
  color: "#fff",
};
const cardContainerStyles = {
  width: "300px",
  height: "500px",
  background: "#fff",
  borderRadius: 35,
  boxShadow: "1px 1px 35px #444",
};
const imgContainerStyles = {
  backgroundColor: "#fff",
  height: "35%",
  margin: 0,
  borderTopRightRadius: 35,
  borderTopLeftRadius: 35,
  background: "#444",
  backgroundSize: "cover",
};
const avatarContainerStyles = {
  width: "150px",
  height: "150px",
  zIndex: "9",
  position: "relative",
  top: "-85px",
  left: "65px",
  right: "0",
  margin: "0 auto",
  border: "10px solid #fff",
  background: "#000",
  backgroundSize: "cover",
  display: "inline-block",
  textAlign: "center",
  borderRadius: "50%",
};
const titleStyles = {
  color: "#555",
  fontWeight: "100",
  outline: "none",
  margin: "0px",
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  position: "relative",
  top: "-75px",
};
const subTitleStyles = {
  position: "relative",
  top: "-85px",
  textAlign: "center",
  fontWeight: "100",
  color: "#888",
};
const bioContainerStyles = {
  position: "relative",
  top: "-95px",
};
const bioStyles = {
  color: "#444",
  padding: "10px 30px",
  textAlign: "center",
};
const iconsContainerStyles = {
  position: "relative",
  top: "-85px",
  textAlign: "center",
};
const iconStyles = {
  margin: "0 10px",
  color: "#5C6BC0",
  fontSize: "24px",
};
const cardBackStyles = {
  height: 500,
  width: 300,
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  borderRadius: "35px",
  boxShadow: "1px 1px 35px #444",
  background: "')",
  backgroundSize: "cover",
  backgroundPosition: "right",
};
const madeByStyles = {
  color: "#fff",
  opacity: ".5",
  textAlign: "center",
  padding: "0px",
};

const imgStyles = {
  width: 300,
  borderTopRightRadius: 35,
  borderTopLeftRadius: 35,
};

const avatarImgStyles = {
  width: "100%",
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  borderRadius: "50%",
};

const cardBackImgStyles = {
  height: "100%",
  width: "100%",
  borderRadius: 35,
  position: "absolute",
};

const CardImg = (props) => {
  return (
    <div style={imgContainerStyles} className="imgContainer">
      <img src={props.imgSrc} style={imgStyles} />
    </div>
  );
};

const CardAvatar = (props) => {
  return (
    <div style={avatarContainerStyles} className="infoContainer">
      <img src={props.avatarSrc} style={avatarImgStyles} />
    </div>
  );
};

const CardTitle = (props) => {
  return (
    <div className="titleDiv">
      <h1 id={props.targetId} style={titleStyles} className="title">
        {props.title}
      </h1>
      <h5 style={subTitleStyles} className="subTitle">
        {props.subTitle}
      </h5>
    </div>
  );
};

const CardBio = (props) => {
  return (
    <div style={bioContainerStyles} className="bioContainer">
      <p style={bioStyles} className="bio">
        {props.bio}
      </p>
    </div>
  );
};

const CardSocialIcons = (props) => {
  return (
    <div style={iconsContainerStyles} className="iconContainer">
      <span style={iconStyles} className="icons">
        <i class="fab fa-facebook-square"></i>
      </span>
      <span style={iconStyles} className="icons">
        <i class="fab fa-youtube-square"></i>
      </span>
      <span style={iconStyles} className="icons">
        <i class="fab fa-twitter-square"></i>
      </span>
    </div>
  );
};

const CardBack = (props) => {
  return <div style={cardBackStyles} className="cardBack"></div>;
};

export const Card = (props) => {
  return (
    <div className="flipperContainer">
      <div className="flipper">
        <div style={cardContainerStyles} className="cardFront cardContainer">
          <CardImg imgSrc={props.data.imgSrc} />
          <CardAvatar avatarSrc={props.data.avatarSrc} />
          <CardTitle
            targetId={props.data.targetId}
            title={props.data.title}
            subTitle={props.data.subTitle}
          />
          <CardBio bio={props.data.bio} />
          <CardSocialIcons />
        </div>
        <div style={cardBackStyles} className="cardBack">
          <img
            className="cardBackImg"
            style={cardBackImgStyles}
            src={props.data.cardBackImgSrc}
          />
          <p style={madeByStyles}>@AdamTheWizard</p>
        </div>
      </div>
    </div>
  );
};

export const CardChild = (props) => {
  return (
    <div style={cardContainerStyles} className="cardFront cardContainer">
      <CardImg imgSrc={props.data.imgSrc} />
      <CardAvatar avatarSrc={props.data.avatarSrc} />
      <CardTitle
        targetId={props.data.targetId}
        title={props.data.title}
        subTitle={props.data.subTitle}
      />
      <CardBio bio={props.data.bio} />
      <CardSocialIcons />
    </div>
  );
};

export const CardContainer = (props) => {
  return (
    <div style={bodyStyles} className="body">
      {/* <h1 style={headerStyles} className="header">Hover to flip</h1> */}
      <div className="flex">
        {props.data.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
};
