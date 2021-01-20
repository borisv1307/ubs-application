import React, { Component } from "react";
import { Image, Container, Button, Col, Row, Alert, Modal, Card, Accordion } from "react-bootstrap";
import ProfileForm from "../profileForm/profileForm";
import { MDBIcon } from "mdbreact";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile,
      profile_id: this.props.profile.profile_id,
      profileName: this.props.profile.profileName,
      email: this.props.profile.email,
      profileImg: this.props.profile.profileImg,
      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name,
      position: this.props.profile.position,
      aboutMe: this.props.profile.aboutMe,
      school: this.props.profile.school,
      degree: this.props.profile.degree,
      major: this.props.profile.major,
      eduStartDate: this.props.profile.eduStartDate,
      eduEndDate: this.props.profile.eduEndDate,
      gpa: this.props.profile.gpa,
      title: this.props.profile.title,
      company: this.props.profile.company,
      location: this.props.profile.location,
      expStartDate: this.props.profile.expStartDate,
      expEndDate: this.props.profile.expEndDate,
      education: this.props.profile.education,
      experience: this.props.profile.experience,
      formMode: false,
      modal_message: "",
      modal_show: false,

      edit_modal_show: false,
      edit_modal_message: "",

      mode: this.props.mode
    };
  }

  setProfile(profile) {
    this.setState({
      profile: profile.profile,
      profile_id: profile.profile.profile_id,
      profileName: profile.profile.profileName,
      email: profile.profile.email,
      profileImg: profile.profile.profileImg,
      first_name: profile.profile.first_name,
      last_name: profile.profile.last_name,
      position: profile.profile.position,
      aboutMe: profile.profile.aboutMe,
      school: profile.profile.school,
      degree: profile.profile.degree,
      major: profile.profile.major,
      eduStartDate: profile.profile.eduStartDate,
      eduEndDate: profile.profile.eduEndDate,
      gpa: profile.profile.gpa,
      title: profile.profile.title,
      company: profile.profile.company,
      location: profile.profile.location,
      expStartDate: profile.profile.expStartDate,
      expEndDate: profile.profile.expEndDate,
      education: profile.profile.education,
      experience: profile.profile.experience,
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.profile !== this.props.profile) {
      this.setProfile(this.props);
    }
  }

  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };

  modalHide = () => {
    this.setState({ modal_show: false });
  };


  editSuccessModalHide = () => {
    this.setState({ edit_modal_show: false });
  };

  editSuccessModalShow = (message) => {
    this.setState({ edit_modal_show: true, edit_modal_message: message });
  };

  redirectToViewProfile = () => {
    window.location.href = "/viewProfile"
  };


  handleModalHide = (childSignal) => {
    if (childSignal === "cancel") {
      this.modalHide();
    }
    else if (childSignal === "edit") {
      this.modalHide();
      this.editSuccessModalShow("Successfully Edited Profile")
    }
  };

  modalShow = () => {
    this.setState({ modal_show: true });
  };

  toggleEditForm = (input) => (e) => {
    this.setState({
      editSchool: "",
      editDegree: "",
      editMajor: "",
      editEduStartDate: "",
      editEduEndDate: "",
      editGpa: "",

      editTitle: "",
      editCompany: "",
      editLocation: "",
      editExpStartDate: "",
      editExpEndDate: "",
    });
    this.setState({ editState: input });
  };


  yearsDiff(d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let yearsDiff = date2.getFullYear() - date1.getFullYear();
    return yearsDiff;
  }
  monthsDiff(d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let yeardiff = this.yearsDiff(d1, d2);
    let months = yeardiff * 12 + date2.getMonth() - date1.getMonth();
    return months;
  }

  componentDidMount() {
    var profile = this.state.profile;
    var exp = profile.experience;
    exp.forEach((e, i) => {
      var months = this.monthsDiff(
        e.expStartDate,
        e.expEndDate !== "" ? e.expEndDate : new Date().toString()
      );
      var yeardiff = parseInt(months / 12);
      var monthDiff = months % 12;
      exp[i]["duration"] =
        yeardiff > 1
          ? yeardiff + " years "
          : yeardiff === 0
            ? ""
            : yeardiff + " year ";
      exp[i]["duration"] +=
        monthDiff > 1 ? monthDiff + " months" : monthDiff + " month";
    });

    profile.experience = exp;
    this.setState({ profile });
  }

  handleSubmit = (e) => {
    var profile = this.state.profile;
    fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/addPresence/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((res) => res);

    this.setState({
      alertMessage: "Successfully Sent",
      allSuccessState: true,
      allErrorState: false,
    });
  };

  render() {
    return (
      <>
        <style type="text/css">
          {`
            .card-title {
              margin-bottom: 0rem;
            }
            .h5 {
              margin-bottom: 0rem;
            }
          `}
        </style>

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
        <Container className="containbody justify-content-center">
          <div>
            <h1>
              {" "}
              {this.state.profile.first_name} {this.state.profile.last_name}
            </h1>
            <h5> Position sought: {this.state.profile.position}</h5>
            <h5> Email: {this.state.profile.email} </h5>
          </div>

          <Row>
            <Col>
              <Card.Title className="card-heading card-title h5 font-weight-bold">
                ABOUT ME
              </Card.Title>
              <Card bg="Light">
                <Card.Body>
                  <Row>
                    <Col sm={8}>
                      <h5>
                        {" "}
                        Location: {this.state.profile.city},{" "}
                        {this.state.profile.state}, {this.state.profile.zip}
                      </h5>
                      <br />
                      <label id="aboutMe">{this.state.profile.aboutMe}</label>
                    </Col>
                    <Col sm={3}>
                      <Image
                        className="image-style"
                        src={this.state.profile.profileImg}
                        roundedCircle
                      ></Image>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Accordion defaultActiveKey="0">
                <Card.Title className="card-heading">EDUCATION</Card.Title>
                {this.state.profile.education.map((edu, i) => (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                      <Row>
                        <Col >
                          <strong> {edu.school} </strong> <br /> {edu.degree} in{" "}
                          {edu.major}
                        </Col>
                        
                        <Col xs lg="2">
                          <div
                            style={{
                              position: 'absolute', left: '50%', top: '50%',
                              transform: 'translate(-50%, -50%)'
                          }}>
                              <MDBIcon icon="angle-down" size="2x" />
                          </div>
                        </Col>
                      </Row>                      
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body>
                        <Card.Text>
                          {edu.eduStartDate} to {edu.eduEndDate} <br />
                          GPA: {edu.gpa}
                        </Card.Text>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </Col>

            <Col>
              <Accordion defaultActiveKey="0">
                <Card.Title className="card-heading">EXPERIENCE</Card.Title>
                {this.state.profile.experience.map((exp, i) => (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                      <Row>
                        <Col >
                          <strong>
                          {" "}
                          {exp.company} {exp.title}{" "}
                          </strong>{" "}
                          <br />
                          {exp.duration}
                        </Col>
                        
                        <Col xs lg="2">
                          <div
                            style={{
                              position: 'absolute', left: '50%', top: '50%',
                              transform: 'translate(-50%, -50%)'
                          }}>
                              <MDBIcon icon="angle-down" size="2x" />
                          </div>
                        </Col>
                      </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body>
                        <Card.Text>
                          {exp.expStartDate} to {exp.expEndDate} <br />
                          Location: {exp.location}
                        </Card.Text>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </Col>
          </Row>
          <br />
          <br />

          { this.state.mode === 'jobseeker' ?

          <Row>
            <Col></Col>
            <Col>
            <Button id="Send" className="submit" onClick={this.handleSubmit} size="lg" block>Send</Button>
            </Col>
            <Col>
            </Col>
            <Col> 
              <Button id="Edit" onClick={this.modalShow} size="lg" block>Edit</Button>
            </Col>
            <Col></Col>
          </Row>  

          : null }

          <br />
        </Container>

        <Modal show={this.state.modal_show} onHide={this.modalHide} backdrop="static" keyboard={false} size="lg">
          <Modal.Header>
            <h3> Presence Edit Form </h3>
          </Modal.Header>
          <Modal.Body>
            <ProfileForm parent_to_child={this.state} modal_hide={this.handleModalHide} />
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.edit_modal_show}
          onHide={this.editSuccessModalHide}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header><h5>{this.state.edit_modal_message}</h5></Modal.Header>
          <Modal.Footer>
            <Button variant="primary" onClick={this.redirectToViewProfile}>
              Continue to view profiles
              </Button>
          </Modal.Footer>
        </Modal>

      </>
    );
  }
}

export default Profile;
