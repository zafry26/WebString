import React, { useState } from "react";
import { withRouter } from "react-router";
import { Redirect, NavLink } from "react-router-dom";
import AccountService from "@Services/AccountService";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SessionManager from "@Core/session";
import ComingSoon from "../../images/img/coming-soon.png";

//import external JS
import { sideBarHandler } from "@Libs/index";

const SideBarMenu = () => {
  React.useEffect(() => {
    sideBarHandler();
  }, []);

  const [isLogout, setLogout] = useState(false);

  const onClickSignOut = async () => {
    var accountService = new AccountService();
    await accountService.logout();
    setLogout(true);
  };

  if (isLogout) {
    return <Redirect to="/login" />;
  }

  return (
    <aside id="sidebar" className="sidebar break-point-lg has-bg-image">
      {/* <div className="image-wrapper">
          <img src="assets/images/sidebar-bg.jpg" alt="sidebar background" />
        </div> */}
      <div className="sidebar-layout">
        <div className="sidebar-header">
          <NavLink to="/home" style={{ color: "inherit" }}>
            <span
              style={{
                textTransform: "uppercase",
                fontSize: "15px",
                textAlign: "center",
                display: "flex",
              }}
            >
              Complete Developer Network
            </span>
          </NavLink>
        </div>
        <div className="sidebar-content">
          <nav className="menu open-current-submenu">
            <ul>
              <li className="menu-item sub-menu">
                <a>
                  <span className="menu-icon">
                    <i className="ri-team-line"></i>
                  </span>
                  <span className="menu-title">Developers</span>
                  <span className="menu-suffix">&#x1F525;</span>
                </a>
                <div className="sub-menu-list">
                  <ul>
                    <li className="menu-item">
                      <NavLink
                        to="/developers"
                        activeStyle={{ color: "yellow" }}
                      >
                        <span className="menu-title">Manage</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              {/* <li className="menu-item sub-menu">
                <a>
                  <span className="menu-icon">
                    <i className="ri-shopping-cart-fill"></i>
                  </span>
                  <span className="menu-title">WebShop</span>
                  <span className="menu-suffix">&#x1F525;</span>
                </a>
                <div className="sub-menu-list">
                  <ul>
                    <li className="menu-item">
                      <NavLink
                        to="/webshop-insights"
                        activeStyle={{ color: "yellow" }}
                      >
                        <span className="menu-title">Insights</span>
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/webshop-shop"
                        activeStyle={{ color: "yellow" }}
                      >
                        <span className="menu-title">Store</span>
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/webshop-inventory"
                        activeStyle={{ color: "yellow" }}
                      >
                        <span className="menu-title">Inventory</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li> */}
              {/* <li className="menu-item sub-menu">
                  <a style={{ "pointer-events" : "none", "cursor":"default"}}>
                    <span className="menu-icon">
                      <i className="ri-global-fill"></i>
                    </span>
                    <span className="menu-title">WebTour</span>
                    <span style={{ background : "url( "+ ComingSoon + ")", width:"50px", height: "50px", backgroundSize:"cover", backgroundRepeat: "no-repeat" }} className="menu-suffix"></span> 
                  </a>
                  <div className="sub-menu-list">
                    <ul>
                      <li className="menu-item">
                        <a>
                          <span className="menu-title">Google maps</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a>
                          <span className="menu-title">Open street map</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li> */}
              {/* <li className="menu-item sub-menu">
                <a>
                  <span className="menu-icon">
                    <i className="ri-ink-bottle-fill"></i>
                  </span>
                  <span className="menu-title">Theme</span>
                </a>
                <div className="sub-menu-list">
                  <ul>
                    <li className="menu-item">
                      <a>
                        <span className="menu-title">Dark</span>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a>
                        <span className="menu-title">Light</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu-item">
                <a>
                  <span className="menu-icon">
                    <i className="ri-book-2-fill"></i>
                  </span>
                  <span className="menu-title">Documentation</span>
                </a>
              </li>
              <li className="menu-item">
                <a>
                  <span className="menu-icon">
                    <i className="ri-calendar-fill"></i>
                  </span>
                  <span className="menu-title">Calendar</span>
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
        <div className="sidebar-footer">
          <span>Powered By CDN&#8482;</span>
        </div>
      </div>
    </aside>
  );
};

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(SideBarMenu);
