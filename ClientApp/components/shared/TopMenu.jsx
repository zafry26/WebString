import React, { useState } from "react";
import { withRouter } from "react-router";
import { Redirect, NavLink } from "react-router-dom";
import AccountService from "@Services/AccountService";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import SessionManager from "@Core/session";

//import external JS
import { topBarCollapseHandler} from "@Libs/index"

const TopMenu = () => {

    React.useEffect(() => {
      topBarCollapseHandler()
    }, []);

    const [isLogout, setLogout] = useState(false);

    const onClickSignOut = async () => {
        var accountService = new AccountService();
        await accountService.logout();
        setLogout(true);
    }

    if (isLogout) {
        return <Redirect to="/login" />;
    }

    return (
        <header className="header">
          <a id="btn-collapse">
            <i className="ri-menu-line ri-xl"></i>
          </a>
          <a id="btn-toggle" className="sidebar-toggler break-point-lg">
            <i className="ri-menu-line ri-xl"></i>
          </a>
        </header>
    );
}

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components, 
// have an access to React Router fields in the component's props, etc.
export default withRouter(TopMenu);