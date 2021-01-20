import React, { Component } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ls from "local-storage";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";


class Login extends Component {
  state = {
    email: "",
    password: "",
    error_show: false,
    error_message: "",
  };

  handleClose = () => {
    this.setState({ error_show: false });
  };
  handleShow = (message) => {
    this.setState({ error_show: true });
    this.setState({ error_message: message });
  };

  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };
  handleLogin = async (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    if (!this.state.email || !this.state.password) {
      this.handleShow("Field/s cannot be blank");
    } else {
      fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/login/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.user_id) {
            ls.set("userid", res.user_id);
            ls.set("name", res.first_name);
            ls.set("token", res.token);
            ls.set("registrationtype", res.registration_type);
            ls.set("email", res.email);
            if(res.email_validation==="False"){
              window.location.href = "/emailValidation";
            }
            else{
            if (
              res.registration_type === "jobSeeker" ||
              res.registration_type === "Job Seeker"
            ) {
              this.handleClose();
              window.location.href = "/home";
            } else {
              this.handleClose();
              window.location.href = "/homehr";
            }
          }
          } else {
            this.handleShow("Incorrect username or password");
          }

        
        });
    }
  };
  render() {
    return (
      <>
        <style type="text/css">
          {`

      .nav-style-title {
        font-size: xx-large;
      }
      .logincard {
        width:600px;
      
        }
          `}
        </style>
        {/* <div className="justify-content-end header"> */}
        {/* <br /> */}
        <Navbar className="header">
          <Navbar.Brand
            className="nav-style-title font-weight-bold "
            href="/login"
          >
            Unconscious Bias Simulation
            </Navbar.Brand>

        </Navbar>
        <br />
        <br />
        <br />
        <br />

        <Container className="containbody justify-content-center logincard">
          <br />
          <h1 className="text-center">Login</h1> <br />
          <Container>

            {/* <div className="login-heading hv-center col-12 col-lg-4">Login</div> */}
            {/* <div className="card col-12 col-lg-4 login-card mt-2 hv-center"> */}

            <Form id="Form">
              <br />
              <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={this.updateField("email")}
                  id="email"
                  aria-describedby="emailHelp"
                  value={this.state.email}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={this.updateField("password")}
                  value={this.state.password}
                  id="password"
                  placeholder="Password"
                />
              </div>
              {this.state.error_show ? (
                <Alert variant="danger">{this.state.error_message}</Alert>
              ) : (
                  " "
                )}
              <div className="form-check"></div>
              <br />
              <Button
                id="submit"
                className="buttonnprimary"
                onClick={this.handleLogin}
              >
                Submit
                </Button>

            </Form>

            <div className="registerMessage">
              <span>Dont have an account? </span>
              <Button
                id="register"
                variant="link"
                onClick={(_event) => (window.location.href = "./register")}
              >
                Register
                </Button>
            </div>


          </Container>
        </Container>
        {/* </div> */}
      </>
    );
  }
}
export default Login;
