import "@Styles/guestLayout.scss";
import * as React from "react";
import { ToastContainer } from "react-toastify";

export default class GuestLayout extends React.Component {
    render() {

        return <div id="guestLayout" className="layout">
                    {this.props.children}
                    <ToastContainer />
                </div>;
    }
}