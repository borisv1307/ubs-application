import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import ProfileForm from "../profileForm/profileForm";
import "bootstrap/dist/css/bootstrap.min.css";
import ls from "local-storage";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: "",
      email: "",
      profileImg:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      first_name: "",
      last_name: "",
      position: "",
      aboutMe: "",
      school: "",
      degree: "",
      major: "",
      eduStartDate: "",
      eduEndDate: "",
      gpa: "",
      title: "",
      company: "",
      location: "",
      expStartDate: "",
      expEndDate: "",
      education: [],
      experience: [],
      formMode: true
    };
  }
  componentDidMount() {
    const token = ls.get("token");
    if(token===null || token===""){
      window.location.href = "/login"
    }
  }
  handleCallback = (childData) =>{
    this.setState({data_from_child: childData})
  }

  render() {
    return (
      <div>
        <Header />
        
        <Container className="containbody justify-content-center">
          <br />
          <h1 className="text-center">Create Presence</h1> <br />
          <ProfileForm parent_to_child = {this.state} parentCallback = {this.handleCallback}/>
          {this.state.data_from_child}
        
    
        </Container>
      </div>
    );
  }
}

export default CreateProfile;
