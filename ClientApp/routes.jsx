import * as React from "react";
import GuestLayout from "@Layouts/GuestLayout";
import AuthorizedLayout from "@Layouts/AuthorizedLayout";
import LoginPage from "@Pages/LoginPage";
import AppRoute from "@Components/shared/AppRoute";
import HomePage from "@Pages/HomePage";
import WebCast from "@Pages/WebCastPage";
import ExamplesPage from "@Pages/ExamplesPage";
import { Switch } from "react-router-dom";
import NotFoundPage from "@Pages/NotFoundPage";
import StandOutPage from "@Pages/StandOutPage";
import WebCastLanding from "@Pages/WebCastLanding";
import WebshopInsights from "@Pages/WebCastPage";
import WebShopStore from "@Pages/WebShopStore";
import WebShopInventory from "@Pages/WebShopInventory";

export const routes = (
  <Switch>
    <AppRoute layout={GuestLayout} path="/cast/:id" component={StandOutPage} />
    <AppRoute layout={GuestLayout} exact path="/login" component={LoginPage} />
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/home"
      component={HomePage}
    />
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/webcast-manage"
      component={WebCast}
    />
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/webshop-insights"
      component={WebshopInsights}
    />
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/webshop-shop"
      component={WebShopStore}
    />
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/webshop-inventory"
      component={WebShopInventory}
    />
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/developers"
      component={ExamplesPage}
    />
    <AppRoute layout={GuestLayout} exact path="/" component={LoginPage} />
    <AppRoute layout={GuestLayout} component={NotFoundPage} statusCode={404} />
  </Switch>
);
