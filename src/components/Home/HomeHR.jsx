import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import ls from "local-storage";
import { Container, Tab, Tabs } from "react-bootstrap";
import HeaderHR from "../Header/HeaderHR";
import HorizontalBarGraph from "../graphs/horizontalBarGraph";
import DoughnutChart from "../graphs/doughnutChart";

class HomeHR extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataDoughnut: {
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
        datasets: [
          {
            data: [300, 50, 100, 40, 120],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774"
            ]
          }
        ]
      },
      dataHorizontal: {
        labels: ['Accepted', 'Rejected'],
        datasets: [
          {
            label: 'Value',
            data: [0, 0],
            fill: false,
            backgroundColor: [
              '#46BFBD',
              '#F7464A'

            ],
            borderColor: [
              '#46BFBD',
              '#F7464A'

            ],
            borderWidth: 1
          }
        ]
      }
    };

  }

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          barPercentage: 0.5,
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          },
          ticks: {
            beginAtZero: true,
            max: 100
          }
        }
      ]
    }
  };

  componentDidMount() {
    const token = ls.get("token");
    if (token === null || token === "") {
      window.location.href = "/login"
    }

    const reviewer_id = ls.get("userid")
    const dataHorizontal = this.state.dataHorizontal;
    fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/getCount/" + reviewer_id)
      .then((res) => res.json())
      .then((res) => {
        dataHorizontal.datasets[0].data = [res.accepted_count, res.declined_count];
        this.setState({ dataHorizontal })
      })


  }
  render() {
    let name = ls.get("name");
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
          <HeaderHR />

          <br />
          <Container className="containbody justify-content-center">
            <br />
            <h1 className="text-center">{"Welcome " + name}</h1>
            <h4 className="text-center">HR Professional</h4> <br />
            <h5 className="text-center">
              View real applications and see where your biases lie statistically
            </h5>
            <br />
            <br /> 
            <Tabs defaultActiveKey="ApplicationInsight" transition={false} id="noanim-tab-example">
              <Tab eventKey="ApplicationInsight" title=" Application Insight ">
                <div>
                  <br />
                  <h3 className="text-center"> Application Insight </h3>
                  <HorizontalBarGraph inputData={this.state.dataHorizontal} barChartOptions={this.barChartOptions} height={450} />
                </div>
              </Tab>

              <Tab eventKey="Rate" title=" Categories Rate% ">
                <Row>
                  <Col>
                    <br /><br />     <br /><br />

                    <h3 className="text-center">Acceptance Categories</h3>
                    <br />
                    <DoughnutChart inputData={this.state.dataDoughnut} height={220} />

                  </Col>
                  <Col>
                    <br /><br />     <br /><br />

                    <h3 className="text-center">Rejection Categories</h3>
                    <br />
                    <DoughnutChart inputData={this.state.dataDoughnut} height={220} />

                  </Col>
                </Row>
                <br />
              </Tab>
            </Tabs>

          </Container>
        </div>
      </>
    );
  }
}

export default HomeHR;
