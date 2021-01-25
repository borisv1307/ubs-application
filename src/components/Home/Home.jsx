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
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          },
          {
            label: 'Rejection',
            data: [],
            fill: false,
            backgroundColor: [],
            borderColor: [],
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
    
    const acceptBgColor = "rgba(98,  182, 239,0.4)"
    const acceptBorderColor = "rgba(98,  182, 239, 1)"
    const rejectBgColor = "rgba(255, 99, 132, 0.2)"
    const rejectBorderColor = "rgb(255, 99, 132)"
    
    const dataHorizontal = this.state.dataHorizontal;

    var acceptance = []
    var rejection = []
    fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/getAcceptanceRate/" + user_id + "/", {
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dataHorizontal.labels = Object.keys(res)

        Object.keys(res).forEach(function(key) {
          acceptance.push(res[key]["accepted"])
          rejection.push(res[key]["declined"])
        });

        dataHorizontal.datasets[0].data = acceptance;
        dataHorizontal.datasets[0].backgroundColor = new Array(acceptance.length).fill(acceptBgColor);
        dataHorizontal.datasets[0].borderColor = new Array(acceptance.length).fill(acceptBorderColor);
      
        dataHorizontal.datasets[1].data = rejection;
        dataHorizontal.datasets[1].backgroundColor = new Array(rejection.length).fill(rejectBgColor);
        dataHorizontal.datasets[1].borderColor = new Array(rejection.length).fill(rejectBorderColor);
      
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
