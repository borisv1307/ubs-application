import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Pie } from "react-chartjs-2";


class PieChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataPie: this.props.inputData
        }
    }
    
    render() {
    return (
        <Container>
        <br />
        <Row>
            <Col></Col>
            <Col xs={10}>
                <Pie data={this.state.dataPie} options={{ responsive: true }} />
            </Col>
            <Col></Col>
        </Row>
        <br />         
        </Container>
        
        );
    }
}

export default PieChart;
