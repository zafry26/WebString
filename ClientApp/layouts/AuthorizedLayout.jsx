import TopMenu from "@Components/shared/TopMenu";
import SideBarMenu from "@Components/shared/SideBarMenu";
import * as React from "react";
import "@Styles/authorizedLayout.scss";
import { ToastContainer } from "react-toastify";
import Footer from "@Components/shared/Footer";
import '@Styles/homepage/styles.scss';

export default class AuthorizedLayout extends React.Component {
    render() {
        return (
        <div id="authorizedLayout" className="layout">
            <div className="layout has-sidebar fixed-sidebar fixed-header">
                <SideBarMenu />
                <div id="overlay" className="overlay"></div>
                <div className="layout">
                    <TopMenu />
                    <main className="content">
                        {this.props.children}
                    </main>
                    <div id="overlay" className="overlay"></div>
                </div>
                <ToastContainer />
                {/* <Footer /> */}
            </div>
        </div>
        );
    }
}