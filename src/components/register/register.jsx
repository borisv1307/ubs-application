import React, { Component } from "react";
import {
  Container,
  Button,
  Col,
  Row,
  Form,
  Alert,
  Modal,
} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    ethnicity: "",
    date_of_birth: "",
    registration_type: "",
    contact_details: [],
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    contact_number: "",
    error_message: "",
    error_show: false,
    modal_message: "",
    modal_show: false,

    chose_a_registration_type: false,
  };

  redirectToLogin = () => {
    window.location.href = "/login";
  };

  modalHide = () => {
    this.setState({ modal_show: false });
  };

  modalShow = (message) => {
    this.setState({ modal_show: true, modal_message: message });
  };

  handleClose = () => {
    this.setState({ error_show: false });
  };
  handleShow = (message) => {
    this.setState({ error_show: true, error_message: message });
  };

  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };

  updateRegistrationType = (registrationType) => (e) => {
    this.setState({ [registrationType]: e.target.value });

    if(registrationType.localeCompare("Job Seeker")){
      this.setState({chose_a_registration_type: true})
    }
    else{
      this.setState({chose_a_registration_type: false})
    }
  };


  collectContactDetails = (e) => {
    const contactDetailsData = {
      address: this.state.address,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      contact_number: this.state.contact_number,
    };

    this.setState({
      contact_details: [...this.state.contact_details, contactDetailsData],
    });

    return contactDetailsData;
  };

  stitchData = (contactInfo) => {
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      registration_type: this.state.registration_type,
      gender: this.state.gender,
      ethnicity: this.state.ethnicity,
      date_of_birth: this.state.date_of_birth,
      contact_details: [contactInfo],
    };

    return data;
  };

  checkIfInvalidInput = (input) => {
    var invalid_Input = [null, undefined];
    if (
      invalid_Input.includes(input) ||
      this.state[input].trim().length === 0
    ) {
      return true;
    }
    return false;
  };

  handleSubmit = (e) => {
    var contactInfo = this.collectContactDetails();
    var data = this.stitchData(contactInfo);
    var containsLetters = /[a-zA-Z]/g;

    if (
      ((!this.state.first_name ||
      !this.state.last_name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.gender ||
      !this.state.ethnicity ||
      !this.state.date_of_birth ||
      !this.state.address ||
      !this.state.address2 ||
      !this.state.city ||
      !this.state.state ||
      !this.state.zip ||
      !this.state.contact_number) && this.state.registration_type === 'Job Seeker') || 
      ((!this.state.first_name ||
        !this.state.last_name ||
        !this.state.email ||
        !this.state.password ||
        !this.state.gender ||
        !this.state.date_of_birth) && this.state.registration_type === 'HR Professional') ||
        !this.state.registration_type
    ) {
      this.handleShow("Incomplete input");
    } else if (
      (containsLetters.test(this.state.contact_number) ||
      this.state.contact_number.length < 10) &&
      this.state.registration_type === 'Job Seeker'
    ) {
      this.handleShow("Invalid phone number");
    } else if (containsLetters.test(this.state.zip) && this.state.registration_type === 'Job Seeker') {
      this.handleShow("Invalid zip code");
    } else if (
      !this.state.email.includes("@") ||
      !this.state.email.includes(".")
    ) {
      this.handleShow("Invalid email");
    } else {
      this.handleClose();
      fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/createUser/", {
        method: "POST",
        action: "/login",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(this.modalShow("An OTP will be sent to your email. It is required for your first login."));

      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        gender: "",
        ethnicity: "",
        date_of_birth: "",
        registration_type: "",
        contact_details: [],
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        contact_number: "",
      });
    }
  };

  render() {
    const options = [
      { abbr: "AL", name: "Alabama" },
      { abbr: "AK", name: "Alaska" },
      { abbr: "AS", name: "American Samoa" },
      { abbr: "AZ", name: "Arizona" },
      { abbr: "AR", name: "Arkansas" },
      { abbr: "CA", name: "California" },
      { abbr: "CO", name: "Colorado" },
      { abbr: "CT", name: "Connecticut" },
      { abbr: "DE", name: "Delaware" },
      { abbr: "DC", name: "District Of Columbia" },
      { abbr: "FM", name: "Federated States Of Micronesia" },
      { abbr: "FL", name: "Florida" },
      { abbr: "GA", name: "Georgia" },
      { abbr: "GU", name: "Guam" },
      { abbr: "HI", name: "Hawaii" },
      { abbr: "ID", name: "Idaho" },
      { abbr: "IL", name: "Illinois" },
      { abbr: "IN", name: "Indiana" },
      { abbr: "IA", name: "Iowa" },
      { abbr: "KS", name: "Kansas" },
      { abbr: "KY", name: "Kentucky" },
      { abbr: "LA", name: "Louisiana" },
      { abbr: "ME", name: "Maine" },
      { abbr: "MH", name: "Marshall Islands" },
      { abbr: "MD", name: "Maryland" },
      { abbr: "MA", name: "Massachusetts" },
      { abbr: "MI", name: "Michigan" },
      { abbr: "MN", name: "Minnesota" },
      { abbr: "MS", name: "Mississippi" },
      { abbr: "MO", name: "Missouri" },
      { abbr: "MT", name: "Montana" },
      { abbr: "NE", name: "Nebraska" },
      { abbr: "NV", name: "Nevada" },
      { abbr: "NH", name: "New Hampshire" },
      { abbr: "NJ", name: "New Jersey" },
      { abbr: "NM", name: "New Mexico" },
      { abbr: "NY", name: "New York" },
      { abbr: "NC", name: "North Carolina" },
      { abbr: "ND", name: "North Dakota" },
      { abbr: "MP", name: "Northern Mariana Islands" },
      { abbr: "OH", name: "Ohio" },
      { abbr: "OK", name: "Oklahoma" },
      { abbr: "OR", name: "Oregon" },
      { abbr: "PW", name: "Palau" },
      { abbr: "PA", name: "Pennsylvania" },
      { abbr: "PR", name: "Puerto Rico" },
      { abbr: "RI", name: "Rhode Island" },
      { abbr: "SC", name: "South Carolina" },
      { abbr: "SD", name: "South Dakota" },
      { abbr: "TN", name: "Tennessee" },
      { abbr: "TX", name: "Texas" },
      { abbr: "UT", name: "Utah" },
      { abbr: "VT", name: "Vermont" },
      { abbr: "VI", name: "Virgin Islands" },
      { abbr: "VA", name: "Virginia" },
      { abbr: "WA", name: "Washington" },
      { abbr: "WV", name: "West Virginia" },
      { abbr: "WI", name: "Wisconsin" },
      { abbr: "WY", name: "Wyoming" },
    ];

    return (
      <>
        <style type="text/css">
          {`

    .nav-style-title {
      font-size: xx-large;
    }
    .nav-style {
      font-size: x-large;
    }
        `}
        </style>
        <div>
          <Navbar className="header">
            <Navbar.Brand
              className="nav-style-title font-weight-bold "
              href="/home"
            >
              Unconscious Bias Simulation
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {/* <Nav.Link href="/home">Home</Nav.Link> */}
              <Nav.Link className="justify-content-end nav-style" href="/login">
                Login
              </Nav.Link>
            </Navbar.Collapse>
          </Navbar>
          <br />
          <br />

          <Container className="containbody justify-content-center">
            <br />
            <h1 className="text-center">Register</h1> <br />
            <Container>
              <Form>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.first_name}
                      onChange={this.updateField("first_name")}
                      id="first_name"
                      name="first_name"
                      placeholder="John"
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.last_name}
                      onChange={this.updateField("last_name")}
                      id="last_name"
                      name="last_name"
                      placeholder="Doe"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={this.state.email}
                    onChange={this.updateField("email")}
                    id="email"
                    name="email"
                    placeholder="test@test.com"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={this.state.password}
                    onChange={this.updateField("password")}
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        value={this.state.gender}
                        onChange={this.updateField("gender")}
                        id="gender"
                        name="gender"
                      >
                        <option value="" selected disabled hidden>
                          {" "}
                          Gender{" "}
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer Not To Say">
                          Prefer Not To Say
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Ethnicity</Form.Label>
                      <Form.Control
                        as="select"
                        value={this.state.ethnicity}
                        onChange={this.updateField("ethnicity")}
                        id="ethnicity"
                        name="ethnicity"
                      >
                        <option value="" selected disabled hidden>
                          {" "}
                          Ethnicity{" "}
                        </option>
                        <option value="American Indian">American Indian</option>
                        <option value="Asian">Asian</option>
                        <option value="Black or African American">Black or African American</option>
                        <option value="Hispanic or Latino">Hispanic or Latino</option>
                        <option value="Pacific Islander">Pacific Islander</option>
                        <option value="White">White</option>
                        <option value="Other">Other</option>
                        <option value="Prefer Not To Say">Prefer Not To Say</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Birth Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={this.state.date_of_birth}
                        onChange={this.updateField("date_of_birth")}
                        id="date_of_birth"
                        name="date_of_birth"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label>Registration Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.registration_type}
                    onChange={this.updateField("registration_type")}
                    id="registration_type"
                    name="registration_type"
                  >
                    <option value="" selected disabled hidden>
                      {" "}
                      Type{" "}
                    </option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="HR Professional">HR Professional</option>
                  </Form.Control>
                </Form.Group>
                
                {
                this.state.registration_type === 'Job Seeker' ?
                  <div>
                    <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.address}
                    onChange={this.updateField("address")}
                    id="address"
                    name="address"
                    placeholder="1234 Test Street"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.address2}
                    onChange={this.updateField("address2")}
                    id="address2"
                    name="address2"
                    placeholder="Apartment, studio, or floor"
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.city}
                      onChange={this.updateField("city")}
                      id="city"
                      name="city"
                      placeholder=""
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.state}
                      onChange={this.updateField("state")}
                      id="state"
                      name="state"
                    >
                      <option value="" selected disabled hidden>
                        {" "}
                        State{" "}
                      </option>
                      {options.map((option, index) => {
                        return (
                          <option key={index} value={option.abbr}>
                            {option.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="numeric"
                      value={this.state.zip}
                      onChange={this.updateField("zip")}
                      id="zip"
                      name="zip"
                      placeholder="00000"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={this.state.contact_number}
                    onChange={this.updateField("contact_number")}
                    id="contact_number"
                    name="contact_number"
                    placeholder="contact_number"
                  />
                </Form.Group>
                  </div>
                : null}
                
                
              </Form>
            </Container>
            <br />
            <div className="text-center">
              {this.state.error_show ? (
                <Alert variant="danger">{this.state.error_message}</Alert>
              ) : (
                " "
              )}
              <Row>
                <Col></Col>
                <Col>
                  <Button
                    id="submitButton"
                    className="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Button
                    id="cancelButton"
                    className="cancel"
                    href="/login"
                    variant="danger"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col></Col>
              </Row>
            </div>
            <br />
          </Container>
          <Modal
            show={this.state.modal_show}
            onHide={this.modalHide}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
            <Modal.Title>Successful Registration</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>{this.state.modal_message}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.redirectToLogin}>
                Continue to Login
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

export default Register;
