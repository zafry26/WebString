import * as React from "react";
import { Route, Redirect } from "react-router";
import SessionManager from "@Core/session";
import responseContext from "@Core/responseContext";

const AppRoute =
    ({ component: Component, layout: Layout, statusCode: statusCode, path: Path, ...rest }) => {
        var isLoginPath = Path === "/login";
        var isHome = Path === "/home";
        var isRoot = Path === "/";
        // var isWebCastList = Path === "/test";
        var isCast = Path === "/cast/:id";

        if (!isLoginPath && !isRoot && !isCast && !SessionManager.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        if (isLoginPath && SessionManager.isAuthenticated) {
            return <Redirect to="/home" />;
        }

        if (statusCode == null) {
            responseContext.statusCode = 200;
        } else {
            responseContext.statusCode = statusCode;
        }

        return <Route {...rest} render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )} />;
    };

export default AppRoute;