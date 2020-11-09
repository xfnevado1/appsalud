import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
//import "assets/scss/now-ui-dashboard.scss?v1.4.0";
import "assets/css/now-ui-dashboardx.css"
//import "assets/css/now-ui-dashboard.minaa26.css"
//import "assets/css/demo.css";

import Login from "components/core/Login.js"
import store from "components/Redux/store.js"
//import ProtectedRoute from "components/Login/ProtectedRoute"
//<Route path="/admin" component={(props) => <DashBoard {...props} />} />
import DashBoard from "App.js";

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={DashBoard} />
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);