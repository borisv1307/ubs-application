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
        labels: [],
        datasets: [
          {
            label: 'Acceptance',
            data: [],
            fill: false,
            backgroundColor: [
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)"
            ],
            borderColor: [
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)"
            ],
            borderWidth: 1
          },
          {
            label: 'Rejection',
            data: [],
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)'
            ],
            borderWidth: 1
          }
        ]
      },

      barChartOptions: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
      }
      
    };
  }

  componentDidMount() {
    const token = ls.get("token");
    if (token === null || token === "") {
      window.location.href = "/login"
    }

    const user_id = ls.get("userid")
    const dataHorizontal = this.state.dataHorizontal;

    var acceptance = []
    var rejection = []

    fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/getAcceptanceRate/" + user_id)
      .then((res) => res.json())
      .then((res) => {
        dataHorizontal.labels = Object.keys(res)
        console.log(dataHorizontal.labels)

        Object.keys(res).forEach(function(key) {
          acceptance.push(res[key]["accepted"])
          rejection.push(res[key]["declined"])
        });

        console.log(acceptance)
        console.log(rejection)

        dataHorizontal.datasets[0].data = acceptance;
        dataHorizontal.datasets[1].data = rejection;

        this.setState({ dataHorizontal })
        
      })

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
                <h3 className="text-center"> Acceptance and Rejection Rates </h3>
                <HorizontalBarGraph inputData={this.state.dataHorizontal} barChartOptions={this.state.barChartOptions}/>
              </div>
            </Tab>
            <Tab eventKey="donut" title="Donut">
              <div>
                <br />
                <h3 className="text-center"> Donut Graph Example </h3>
                <PieChart inputData={this.state.dataPie} />
              </div>
            </Tab>
          </Tabs>
        </Container>

      </div>

    );
  }
}

export default Home;
