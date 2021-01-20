import React, { Component } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import Header from "../Header/Header";
import PieChart from "../graphs/pieChart";
import HorizontalBarGraph from "../graphs/horizontalBarGraph";
import ls from 'local-storage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPie: {
        labels: ["Acceptance", "Rejection"],
        datasets: [
          {
            data: [20, 5],
            backgroundColor: [
              "#46BFBD",
              "#F7464A",
            ],
            hoverBackgroundColor: [
              "#5AD3D1",
              "#FF5A5E",
            ]
          }
        ]
      },

      dataHorizontal: {
        labels: ['Red', 'Orange', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [22, 33, 55],
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
            ],
            borderWidth: 1
          }
        ]
      }
    };
  }

  componentDidMount() {
    const token = ls.get("token");
    if (token === null || token === "") {
      window.location.href = "/login"
    }
  }

  render() {
    let name = ls.get('name');
    return (
      <div>
        <Header />
        <Container className="containbody justify-content-center">
          <br /><h1 className="text-center">{"Welcome " + name}</h1>
          <h4 className="text-center">Job Seeker</h4> <br />

          <h5 className="text-center">Create online job applications and see how they are statistically received by HR Professionals</h5>
          <br />

          <Tabs defaultActiveKey="acceptance" transition={false} id="noanim-tab-example">
            <Tab eventKey="acceptance" title="Acceptance">
              <div>
                <br />
                <h3 className="text-center"> Acceptance and Rejection Rates Example </h3>
                <PieChart inputData={this.state.dataPie} />
              </div>
            </Tab>

            <Tab eventKey="bar" title="Bar Graph">
              <div>
                <br />
                <h3 className="text-center"> Bar Graph Example </h3>
                <HorizontalBarGraph inputData={this.state.dataHorizontal} />
              </div>
            </Tab>
          </Tabs>
        </Container>

      </div>

    );
  }
}

export default Home;
