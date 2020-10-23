import React from "react";
import ReactDOM from "react-dom";
//import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.4.0";
//import "assets/css/now-ui-dashboardx.css"
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";

//const hist = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter /* history={hist} */>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);