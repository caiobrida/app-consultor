import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import Login from "./pages/LoginPage/Login";
import Dashboard from "./pages/DashboardPage/Dashboard";
import NotFound from "./pages/NotFound";

function MainRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/not_found" component={NotFound} />

        <Redirect exact from="/" to="/login" />
        <Redirect to="/not_found" />
      </Switch>
    </BrowserRouter>
  );
}

export default MainRoutes;
