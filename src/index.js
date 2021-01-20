import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Home from "./components/Home/Home";
import HomeHR from "./components/Home/HomeHR";
import Register from "./components/register/register";
import CreateProfile from "./components/createProfile/createProfile";
import ViewProfile from "./components/viewProfile/viewProfiles";
import Login from "./components/Login/login";
import EmailValidation from "./components/Login/EmailValidation";
import ViewApplications from "./components/viewApplications/viewApplications";

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/emailValidation">
        <EmailValidation />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/homehr">
        <HomeHR />
      </Route>
      <Route path="/createProfile">
        <CreateProfile />
      </Route>
      <Route path="/viewProfile">
        <ViewProfile />
      </Route>
      <Route path="/viewApplications">
        <ViewApplications />
      </Route>
    </div>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
