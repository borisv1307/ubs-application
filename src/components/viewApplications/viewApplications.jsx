import React, { Component } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import HeaderHR from "../Header/HeaderHR";
import ls from "local-storage";
import Profile from "../viewProfile/Profile";

class viewApplications extends Component {
  constructor() {
    super();
    this.state = {
      applications: [],
      index: 0,
      view: [],
      started: false,
      completed: false,
      modal_message: "",
      modal_show: false
    };
  }

  componentDidMount() {
    const userId = ls.get("userid")
    const token = ls.get("token");
    if(token===null || token===""){
      window.location.href = "/login"
    }
    console.log(token)
    fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/getAllPresence/" + userId + "/",
      {
        headers: {
          "Content-type": "application/json",
          "Authorization": token
        }
      })
      .then((response) => response.json())
      .then((res) => {

        if (res["results"]) {
          this.setState({ applications: res["results"] });
        }
      });
  }

  modalShow = (message) => {
    this.setState({ modal_show: true, modal_message: message });
  };

  next = () => {
    if (this.state.index < (this.state.applications.length - 1)) {
      const newIndex = this.state.index + 1;
      const newApplication = this.state.applications[newIndex];

      const newView = []
      newView[0] = newApplication

      this.setState({
        index: newIndex,
        view: newView
      });

    } else {
      const newView = []
      this.setState({
        view: newView,
        completed: true
      })
    }
  }

  updateReviewerDetails(status) {
    const reviewerDetails = {
      reviewer_id: ls.get("userid"),
      application_status: status,
    };
    const data = {
      user_id: this.state.applications[this.state.index].user_id,
      profile_id: this.state.applications[this.state.index].profile_id,
      feedback: reviewerDetails,
    };
    fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/savePresenceReview/", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  handleAccept = (e) => {
    this.updateReviewerDetails("Accepted");
    this.next();
    console.log("Accepting application");
  };

  handleDecline = (e) => {
    this.updateReviewerDetails("Declined");
    this.next();
    console.log("Declining application");
  };

  start = (e) => {
    if (this.state.applications.length > 0) {
      const newApplication = this.state.applications[this.state.index];

      const newView = []
      newView[0] = newApplication

      this.setState({
        view: newView,
        started: true
      });
    }
    else {
      const newView = []
      this.setState({
        view: newView,
        started: true,
        completed: true
      })
    }
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
        <div>
          <HeaderHR />
          {this.state.started ? "" :
            (
              <Container>
                <h4 className="text-center">A set of applications will be displayed. You will choose to accept or decline them.</h4> <br />

                <h5 className="text-center">Press Start to begin processing applications</h5>
                <br />
                <div class="d-flex justify-content-center">
                  <Button id="start" variant="success" size="lg" onClick={this.start} class="btn btn-default">Start</Button>
                </div>
              </Container>
            )}

          {this.state.completed ?
            (
              <Container>
                <h3> Completed. No more applications to assess. </h3>
              </Container>
            )
            : ""}

          {this.state.view.map((a) => (
            <Container>
              <Profile profile={a} mode={"hr"} />
              <br />
              <Row>
                <Col></Col>
                <Col>
                  <Button id="accept" variant="success" size="lg" onClick={this.handleAccept} block>Accept</Button>
                </Col>
                <Col>
                </Col>
                <Col>
                  <Button id="decline" variant="danger" size="lg" onClick={this.handleDecline} block>Decline</Button>
                </Col>
                <Col></Col>
              </Row>
              <br />
            </Container>
          ))}
          <br />

        </div>

      </>
    );
  }
}
export default viewApplications;
