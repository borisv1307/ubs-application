import React, { Component } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ls from "local-storage";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";


class EmailValidation extends Component {
  state = {
    otp: "",
    error_show: false,
    error_message: "",
    success_show: false,
    success_message: ""
  };

  timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }
  delayState() {
    setTimeout(() => {
      this.setState({
        clicked: false
      })
    }, 5000);
  }

  errorhandleClose = () => {
    this.setState({ error_show: false });
  };
  errorhandleShow = (message) => {
    this.setState({ error_show: true });
    this.setState({ error_message: message });
  };
  successhandleClose = () => {
    this.setState({ success_show: false });
  };
  successhandleShow = (message) => {
    this.setState({ success_show: true });
    this.setState({ success_message: message });
  };

  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };
  handleValidate = async (e) => {
    // const userid= ls.get("userid");
    const data = {
      user_id: ls.get("userid"),
      otp: this.state.otp,
    };

    if (!this.state.otp) {
      this.errorhandleShow("Field/s cannot be blank");
    } else {
      fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/verify_otp/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            this.successhandleShow(res.success);
            this.delayState();
            this.timeout(5000);
            const registration= ls.get("registrationtype");
            if(registration === "jobSeeker" || registration === "Job Seeker"){
              window.location.href = "/home";
            }
            else{
              window.location.href = "/homehr";
            }
            

          } else {
            this.errorhandleShow(res.error);
          }
        });
    }
  };


  resendOTP = (e) => {
    const data = {
      email: ls.get("email"),
    };

    fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/resend_otp/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch(error => {
        this.setState({
          alertMessage: "OTP not sent",
          allSuccessState: false,
          allErrorState: true,
        })
      });

    this.setState({
      alertMessage: "OTP sent successfully",
      allSuccessState: true,
      allErrorState: false,
    });
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

        <div className="text-center">
          {this.state.allErrorState ? (
            <Alert variant="danger">{this.state.alertMessage}</Alert>
          ) : (
              " "
            )}
          {this.state.allSuccessState ? (
            <Alert variant="success">{this.state.alertMessage}</Alert>
          ) : (
              " "
            )}
        </div>
        <br />
        <br />
        <br />
        <br />
        <Container className="containbody justify-content-center logincard">
          <br />
          <h2 className="text-center">Validate OTP(One Time Passcode)</h2> <br />
          <h3 className="text-center">Please enter the OTP to verify</h3> <br />
          <Container>

            {/* <div className="login-heading hv-center col-12 col-lg-4">Login</div> */}
            {/* <div className="card col-12 col-lg-4 login-card mt-2 hv-center"> */}

            <Form id="Form">
              <br />
              <div className="form-group text-left">
                <input
                  type="otp"
                  className="form-control"
                  onChange={this.updateField("otp")}
                  id="otp"
                  aria-describedby="emailHelp"
                  placeholder="OTP"
                />
              </div>
              {this.state.error_show ? (
                <Alert variant="danger">{this.state.error_message}</Alert>
              ) : (
                  " "
                )}
              {this.state.success_show ? (
                <Alert variant="success">
                  {this.state.success_message}
                </Alert>
              ) : (
                  " "
                )}
              <div className="form-check"></div>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button
                id="validate"
                className="buttonnprimary"
                onClick={this.handleValidate}
              >
                Validate OTP
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                id="cancel"
                className="buttonnprimary"
                href="/login"
              >
                Cancel
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                id="resendOTP"
                className="buttonnprimary"
                onClick={this.resendOTP}
              >
                Resend OTP
                </Button>
              <br /><br />
            </Form>




          </Container>
        </Container>
        {/* </div> */}
      </>
    );
  }
}
export default EmailValidation;