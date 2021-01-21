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
      dataDoughnutMale: {
        labels: ["Accepted", "Rejected"],
        datasets: [
          {
            data: [300, 50],
            backgroundColor: ["#F7464A", "#FDB45C"],
            hoverBackgroundColor: [
              "#FF5A5E",

              "#FFC870"

            ]
          }
        ]
      },
      dataDoughnutFemale: {
        labels: ["Accepted", "Rejected"],
        datasets: [
          {
            data: [300, 50],
            backgroundColor: ["#F7464A", "#FDB45C"],
            hoverBackgroundColor: [
              "#FF5A5E",

              "#FFC870"

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
    const dataDoughnutMale = this.state.dataDoughnutMale;
    const dataDoughnutFemale = this.state.dataDoughnutFemale;
    fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/getCount/" + reviewer_id)
      .then((res) => res.json())
      .then((res) => {

        dataHorizontal.datasets[0].data = [res.accepted_count, res.declined_count];
        dataDoughnutMale.datasets[0].data = [res.accepted_male_count, res.declined_male_count];
        dataDoughnutFemale.datasets[0].data = [res.accepted_female_count, res.declined_female_count];

        this.setState({ dataHorizontal, dataDoughnutMale, dataDoughnutFemale })

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
            <Tabs defaultActiveKey="Rate" transition={false} id="noanim-tab-example">


              <Tab eventKey="Rate" title=" Categories Rate% ">
                <Row>
                  <Col>
                    <br /><br />     <br /><br />

                    <h3 className="text-center">Male Application Analysis</h3>
                    <br />
                    <DoughnutChart inputData={this.state.dataDoughnutMale} height={220} />

                  </Col>
                  <Col>
                    <br /><br />     <br /><br />

                    <h3 className="text-center">Female Application Analysis</h3>
                    <br />
                    <DoughnutChart inputData={this.state.dataDoughnutFemale} height={220} />

                  </Col>
                </Row>
                <br />
              </Tab>
              <Tab eventKey="ApplicationInsight" title=" Application Insight ">
                <div>
                  <br />
                  <h3 className="text-center"> Application Insight </h3>
                  <HorizontalBarGraph inputData={this.state.dataHorizontal} barChartOptions={this.barChartOptions} height={450} />
                </div>
              </Tab>
            </Tabs>

          </Container>
        </div>
      </>
    );
  }
}

export default HomeHR;
