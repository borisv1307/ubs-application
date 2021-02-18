import React, { Component } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Accordion,
  Card,
  Alert,
  OverlayTrigger,
  Badge,
  Popover,
  Modal
} from "react-bootstrap";
import ls from "local-storage";

class ProfileForm extends Component{
    constructor(props){
        super(props);

        this.state = {
           profileName: this.props.parent_to_child.profileName,
           email: this.props.parent_to_child.email,
           profileImg: this.props.parent_to_child.profileImg,
           first_name: this.props.parent_to_child.first_name,
           last_name: this.props.parent_to_child.last_name,
           position: this.props.parent_to_child.position,
           aboutMe: this.props.parent_to_child.aboutMe,
           school: this.props.parent_to_child.school,
           degree: this.props.parent_to_child.degree,
           major: this.props.parent_to_child.major,
           eduStartDate: this.props.parent_to_child.eduStartDate,
           eduEndDate: this.props.parent_to_child.eduEndDate,
           gpa: this.props.parent_to_child.gpa,
           title: this.props.parent_to_child.title,
           company: this.props.parent_to_child.company,
           location: this.props.parent_to_child.location,
           expStartDate: this.props.parent_to_child.expStartDate,
           expEndDate: this.props.parent_to_child.expEndDate,
           education: this.props.parent_to_child.education,
           experience: this.props.parent_to_child.experience,
           formMode: this.props.parent_to_child.formMode,
           gender: "",
           ethnicity: "",

           editState: false,

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
           alertMessage: "",
           eduErrorState: false,
           expErrorState: false,
           allErrorState: false,
           eduSuccessState: false,
           expSuccessState: false,
           allSuccessState: false,
           
           image_validation: 0
        }
    }

    sendHideSignal = (mode) => (e) => {
        this.props.modal_hide(mode);
        e.preventDefault()
    };


    reset() {
        this.setState({
            profileName: "",
            email: "",
            profileImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
            gender: "",
            ethnicity: "",

            editState: false,
 
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
            alertMessage: "",
            eduErrorState: false,
            expErrorState: false,
            allErrorState: false,
            eduSuccessState: false,
            expSuccessState: false,
            allSuccessState: false,

            image_validation: 0
            
         });
      }

    componentDidMount() {
        const token = ls.get("token");
        if(token===null || token===""){
          window.location.href = "/login"
        }
    }

    updateField = (stateKey) => (e) => {
        this.setState({ [stateKey]: e.target.value });
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

    imageHandler = async (e) => {
        const files = e.target.files;
    
        if (files[0].size < 2000000) {
          const data = new FormData();
          data.append("file", files[0]);
          data.append("upload_preset", "unconsciousbias");
          const res = await fetch(
            "	https://api.cloudinary.com/v1_1/unconsciousbiassimulator/image/upload",
            {
              method: "POST",
              body: data,
            }
          );
          const file = await res.json();
    
          this.setState(
            {
              profileImg: file.secure_url,
            },
            () => {
              console.log("profileImg State:", this.state.profileImg);
            }
          );
        } else {
          console.log("File is too large");
        }
      };

      checkEditedValue = (value, Id) => {
        if(value){
          return value
        }
        else{
          return document.getElementById(Id).value
        }
      };

      validateSubmit = () => {
        var message = "";
        var isError = false;
        var isValid = true;
    
        if (
          !this.state.profileName ||
          !this.state.email ||
          !this.state.first_name ||
          !this.state.last_name ||
          !this.state.position ||
          !this.state.aboutMe
        ) {
          message = "Incomplete input";
          isError = true;
          isValid = false;
        } else if (
          !this.state.email.includes("@") ||
          !this.state.email.includes(".")
        ) {
          message = "Invalid email";
          isError = true;
          isValid = false;
        } else if (
          this.state.profileImg ===
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        ) {
          message = "No image added";
          isError = true;
          isValid = false;
        } else {
          this.setState({
            alertMessage: "Successfully submitted",
            allErrorState: false,
            allSuccessState: false,
          });
        }
    
        if (isError) {
          this.setState({
            alertMessage: message,
            allErrorState: isError,
            allSuccessState: false,
          });
        }
    
        return isValid;
      };

      check_image_validity = async () => {
            const token = ls.get("token")
            const userId = ls.get("userid")
            const profile_image_data =  {
              user_id: userId,
              profileImg: this.state.profileImg
            };
            const response = await fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/uploadImage/", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Authorization": token
            },
            body: JSON.stringify(profile_image_data),
          })
          const json = await response.json();
          console.log("async/await based");
          console.log(json);

          this.setState({
            image_validation: json['Code'],
          });
      }

      handleSubmit = async (e) => {
        const userId = ls.get("userid")
        const gender = ls.get("gender")
        const ethnicity = ls.get("ethnicity")
        const token = ls.get("token")
        console.log(userId)
        const isValid = this.validateSubmit();
        if (isValid) {
          const data = {
            email: this.state.email,
            profileName: this.state.profileName,
            profileImg: this.state.profileImg,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            position: this.state.position,
            aboutMe: this.state.aboutMe,
            education: this.state.education,
            experience: this.state.experience,
            user_id: userId,
            gender: gender,
            ethnicity: ethnicity
          };

          var response = await this.check_image_validity();
          if(this.state.image_validation === 1){
            console.log(JSON.stringify(data));
            fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/createProfile/", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                "Authorization": token
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((res) => console.log(res))
              .then(() => {
                this.reset();
                this.setState({
                  alertMessage: "Successfully submitted presence",
                  allSuccessState: true,
            });
              })
          }
          else{
            this.setState({
              alertMessage: "Invalid image used. Please upload another image.",
              allErrorState: true,
              allSuccessState: false
            });
          }

        }
      };

      handleEditSubmit = (mode) => (e) => {
        const token = ls.get("token")
        const userId = ls.get("userid")
        const gender = ls.get("gender")
        const ethnicity = ls.get("ethnicity")
        const isValid = this.validateSubmit();
        const profile_id = this.props.parent_to_child.profile_id;
        if (isValid) {
          const data = {
            email: this.state.email,
            profileName: this.state.profileName,
            profileImg: this.state.profileImg,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            position: this.state.position,
            aboutMe: this.state.aboutMe,
            education: this.state.education,
            experience: this.state.experience,
            user_id: userId,
            profile_id: profile_id,
            gender: gender,
            ethnicity: ethnicity
          };
    
          console.log(JSON.stringify(data));
          fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/editProfile/", {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              "Authorization": token
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((res) => console.log(res));
    
          this.setState({
            alertMessage: "Successfully submitted",
            allSuccessState: true,
          });
          this.props.modal_hide(mode);
          e.preventDefault()

        }
      };
      
      validateAddingEducation = () => {
        var message = "";
        var isError = false;
        var isValid = true;
    
        if (
          !this.state.school ||
          !this.state.degree ||
          !this.state.major ||
          !this.state.eduStartDate ||
          !this.state.eduEndDate
        ) {
          message = "Incomplete input";
          isError = true;
          isValid = false;
        } else if (this.state.gpa > 4 || this.state.gpa < 0) {
          message = "Invalid GPA: should be between 0 and 4";
          isError = true;
          isValid = false;
        } else if (this.state.eduEndDate < this.state.eduStartDate) {
          message = "Invalid dates: End date precedes start date";
          isError = true;
          isValid = false;
        } else {
          this.setState({
            alertMessage: "Successfully submitted",
            eduErrorState: false,
            eduSuccessState: true,
          });
        }
    
        if (isError) {
          this.setState({
            alertMessage: message,
            eduErrorState: isError,
            eduSuccessState: false,
          });
        }
    
        return isValid;
      };

      validateAddingExperience = () => {
        var message = "";
        var isError = false;
        var isValid = true;
    
        if (
          !this.state.title ||
          !this.state.company ||
          !this.state.location ||
          !this.state.expStartDate ||
          !this.state.expEndDate
        ) {
          message = "Incomplete input";
          isError = true;
          isValid = false;
        } else if (this.state.expEndDate < this.state.expStartDate) {
          message = "Invalid dates: End date precedes start date";
          isError = true;
          isValid = false;
        } else {
          this.setState({
            alertMessage: "Successfully submitted",
            expErrorState: false,
            expSuccessState: true,
          });
        }
    
        if (isError) {
          this.setState({
            alertMessage: message,
            expErrorState: isError,
            expSuccessState: false,
          });
        }
    
        return isValid;
      };

      addEducation = (e) => {
        const isValid = this.validateAddingEducation();
        if (isValid) {
          const educationData = {
            school: this.state.school,
            degree: this.state.degree,
            major: this.state.major,
            eduStartDate: this.state.eduStartDate,
            eduEndDate: this.state.eduEndDate,
            gpa: this.state.gpa,
          };
    
          this.setState({
            education: [...this.state.education, educationData],
            school: "",
            degree: "",
            major: "",
            eduStartDate: "",
            eduEndDate: "",
            gpa: "",
          });
        }
      };

      addExperience = (e) => {
        const isValid = this.validateAddingExperience();
        if (isValid) {
          const experienceData = {
            title: this.state.title,
            company: this.state.company,
            location: this.state.location,
            expStartDate: this.state.expStartDate,
            expEndDate: this.state.expEndDate,
          };
    
          this.setState({
            experience: [...this.state.experience, experienceData],
            title: "",
            company: "",
            location: "",
            expStartDate: "",
            expEndDate: "",
          });
        }
      };


      editEducation = (index) => (e) => {
        const editEducationData = {
          school: this.checkEditedValue(this.state.editSchool, this.setElementID("editSchool", index)),
          degree: this.checkEditedValue(this.state.editDegree, this.setElementID("editDegree", index)),
          major: this.checkEditedValue(this.state.editMajor, this.setElementID("editMajor", index)),
          eduStartDate: this.checkEditedValue(this.state.editEduStartDate, this.setElementID("editEduStartDate", index)),
          eduEndDate: this.checkEditedValue(this.state.editEduEndDate, this.setElementID("editEduEndDate", index)),
          gpa: this.checkEditedValue(this.state.editGpa, this.setElementID("editGpa", index))
        };
        
    
        const newEducation = this.state.education.slice();
        newEducation[index] = editEducationData;
    
        this.setState(
          {
            education: newEducation,
            editState: false,
          },
          () => {
            console.log(this.state.education);
          }
        );
      };
    
      editExperience = (index) => (e) => {
        const editExperienceData = {
          title: this.checkEditedValue(this.state.editTitle, this.setElementID("editTitle", index)),
          company: this.checkEditedValue(this.state.editCompany, this.setElementID("editCompany", index)),
          location: this.checkEditedValue(this.state.editLocation, this.setElementID("editLocation", index)),
          expStartDate: this.checkEditedValue(this.state.editExpStartDate, this.setElementID("editExpStartDate", index)),
          expEndDate: this.checkEditedValue(this.state.editExpEndDate, this.setElementID("editExpEndDate", index))
        };
    
        const newExperience = this.state.experience.slice();
        newExperience[index] = editExperienceData;
    
        this.setState(
          {
            experience: newExperience,
            editState: false,
          },
          () => {
            console.log(this.state.experience);
          }
        );
      };

      deleteEducation = (index) => (e) => {  
        var edu = this.state.education.slice();
        var newEducation = [];

        if(edu.length > 1){
          edu.splice(index, 1);
          newEducation = edu.slice();
        }
    
        this.setState(
          {
            education: newEducation,
            editState: false,
          }
        );
      };

      deleteExperience = (index) => (e) => {   
        var exp = this.state.experience.slice();
        var newExperience = [];

        if(exp.length > 1){
          exp.splice(index, 1);
          newExperience = exp.slice();
        }
    
        this.setState(
          {
            experience: newExperience,
            editState: false,
          }
        );
      };


      setElementID = (name, index) => {
        return name + index
      };
    
      getOptionalValue = (value, check) => {
        if(value){
          return value
        }
        else{
          return check
        }
      }

render() {
    const { profileImg } = this.state;
    return (
        <div>
            

        <Container>
          <Row>
            <Col>
              <Container>
                <Form>

                    <Form.Group>
                        <Form.Label>Profile Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.profileName}
                            onChange={this.updateField("profileName")}
                            id="profileName"
                            name="profileName"
                            placeholder="Profile Name"
                            defaultValue={this.state.profileName}
                            />
                    </Form.Group>
                    
                    


                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={this.state.email}
                      onChange={this.updateField("email")}
                      id="email"
                      name="email"
                      placeholder="Email"
                      defaultValue={this.state.email}
                    />
                  </Form.Group>


                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.first_name}
                      onChange={this.updateField("first_name")}
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      defaultValue={this.state.first_name}
                    />
                  </Form.Group>


                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.last_name}
                      onChange={this.updateField("last_name")}
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      defaultValue={this.state.last_name}
                    />
                  </Form.Group>


                  <Form.Group>
                    <Form.Label>Position Sought</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.position}
                      onChange={this.updateField("position")}
                      id="position"
                      name="position"
                      placeholder="Ex: Developer"
                      defaultValue={this.state.position}
                    />
                  </Form.Group>
                </Form>
            </Container>
            </Col>

            <Col>
                <Container className="text-center">
                  <OverlayTrigger
                    placement="right"
                    delay={{ show:250, hide: 400}}
                    overlay={
                      <Popover id="popover-basic">
                      <Popover.Title as="h3"><strong>Image</strong> requirements</Popover.Title>
                      <Popover.Content>
                        <strong>Image</strong> should be less than 2 MB in size
                      </Popover.Content>
                      </Popover>
                        }>
                      <Form.Label>
                        <h3>Add your Image{' '}
                        <Badge pill variant="info">
                          ?
                        </Badge></h3> 
                      </Form.Label>
                    </OverlayTrigger>
                    
                    <br />

                    <div className="page">
                        <div className="container">
                            <img
                            src={profileImg}
                            width="200"
                            alt=""
                            id="profileImage"
                            className="img"
                            />{" "}
                                <br /> <br />
                            <input
                            type="file"
                            accept="image/*"
                            name="image-upload"
                            id="UploadImageInput"
                            onChange={this.imageHandler}
                            />
                        </div>
                    </div>
              </Container>
            </Col>
          </Row>


          <Container>
            <Form.Group>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show:250, hide: 400}}
                      overlay={
                        <Popover id="popover-basic">
                        <Popover.Title as="h3">What's an <strong>Objective</strong>?</Popover.Title>
                        <Popover.Content>
                          An <strong>Objective</strong> consists of 1-2 sentences explaining what your goal is and why
                          you are suited for the position.
                        </Popover.Content>
                        </Popover>

                      }>
                      <Form.Label>Objective {' '}
                        <Badge pill variant="info">
                          ?
                        </Badge></Form.Label>
                      </OverlayTrigger>
                      
                      <Form.Control
                        type="text"
                        value={this.state.aboutMe}
                        onChange={this.updateField("aboutMe")}
                        id="aboutMe"
                        name="aboutMe"
                        placeholder=""
                        rows={2}
                        as="textarea"
                        defaultValue={this.state.aboutMe}
                      />
              </Form.Group>
          </Container>
        
        <Container>

            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle
                            as={Card.Header}
                            variant="link"
                            eventKey="0"
                        >
                            <h4>Education</h4>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Row>
                            <Col>
                                <Container>
                                     <br />
                                     <Form>
                                        <Form.Group>
                                            <Form.Label>School</Form.Label>
                                            <Form.Control
                                            type="text"
                                            value={this.state.school}
                                            onChange={this.updateField("school")}
                                            id="school"
                                            name="school"
                                            placeholder="Ex: Drexel"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Degree</Form.Label>
                                            <Form.Control
                                            type="text"
                                            value={this.state.degree}
                                            onChange={this.updateField("degree")}
                                            id="degree"
                                            name="degree"
                                            placeholder="Ex: Bachelor's"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Major</Form.Label>
                                            <Form.Control
                                            type="text"
                                            value={this.state.major}
                                            onChange={this.updateField("major")}
                                            id="major"
                                            name="major"
                                            placeholder="Ex: Software Engineering"
                                            />
                                        </Form.Group>

                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Start Date</Form.Label>
                                                    <Form.Control
                                                        type="month"
                                                        value={this.state.eduStartDate}
                                                        onChange={this.updateField("eduStartDate")}
                                                        id="eduStartDate"
                                                        name="eduStartDate"
                                                    />
                                            </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Label>End Date</Form.Label>
                                                    <Form.Control
                                                        type="month"
                                                        value={this.state.eduEndDate}
                                                        onChange={this.updateField("eduEndDate")}
                                                        id="eduEndDate"
                                                        name="eduEndDate"
                                                    />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Group>
                                            <Form.Label>GPA (Optional)</Form.Label>
                                            <Form.Control
                                            type="number"
                                            step="0.01"
                                            value={this.state.gpa}
                                            onChange={this.updateField("gpa")}
                                            id="gpa"
                                            name="gpa"
                                            placeholder="4"
                                            />
                                        </Form.Group>

                                        <div className="text-center">
                                            {this.state.eduErrorState ? (
                                            <Alert variant="danger">
                                                {this.state.alertMessage}
                                            </Alert>
                                            ) : (
                                            " "
                                            )}
                                            {this.state.eduSuccessState ? (
                                            <Alert variant="success">
                                                {this.state.alertMessage}
                                            </Alert>
                                            ) : (
                                            " "
                                            )}
                                            <Button
                                            id="addEducationButton"
                                            onClick={this.addEducation}
                                            >
                                            Add Education
                                            </Button>
                                        </div>
                                     </Form>
                                     <br />
                                </Container>
                            </Col>
                            <Col>
                                <br />
                                <h4>Education Added</h4>
                                <Container>
                                    <Accordion>
                                        {this.state.education.map((edu, index) => {
                                        return (
                                        <Card>
                                            <Card.Header>
                                            <Accordion.Toggle
                                                as={Card.Header}
                                                variant="link"
                                                eventKey={"edu" + index + 1}
                                                onClick={this.toggleEditForm(false)}
                                            >
                                                {edu.school}: {edu.degree} in {edu.major}
                                            </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse
                                            eventKey={"edu" + index + 1}
                                            >
                                        <Card.Body>
                                            
                                            {!this.state.editState ? (
                                            <div>
                                              {edu.eduStartDate} to {edu.eduEndDate}
                                              <br />
                                              {edu.gpa ? (
                                                <div>GPA: {edu.gpa}</div>
                                              ) : ("")}
                                              <br />
                                              <Row>
                                                <Col xs={1}></Col>
                                                <Col>
                                                <Button
                                                  id="toggleEditEducationButton"
                                                  onClick={this.toggleEditForm(true)}
                                                  block
                                                >
                                                    Edit
                                                </Button>
                                                </Col>
                                                <Col xs={1}></Col>
                                                <Col>
                                                <Button
                                                  id="deleteEducationButton"
                                                  onClick={this.deleteEducation(
                                                      index
                                                  )}
                                                  variant="danger"
                                                  block
                                                >
                                                Delete
                                                </Button>
                                                </Col>
                                                <Col xs={1}></Col>
                                              </Row>
                                            </div>
                                            ) : ("")}

                                        {this.state.editState ? (
                                        <div>
                                            <Form>
                                            <Form.Group>
                                                <Form.Label>School</Form.Label>
                                                <Form.Control
                                                type="text"
                                                onChange={this.updateField(
                                                    "editSchool"
                                                )}
                                                id={this.setElementID("editSchool", index)}
                                                name="editSchool"
                                                defaultValue={edu.school}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Degree</Form.Label>
                                                <Form.Control
                                                type="text"
                                                onChange={this.updateField(
                                                    "editDegree"
                                                )}
                                                id={this.setElementID("editDegree", index)}
                                                name="editDegree"
                                                defaultValue={edu.degree}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Major</Form.Label>
                                                <Form.Control
                                                type="text"
                                                onChange={this.updateField(
                                                    "editMajor"
                                                )}
                                                id={this.setElementID("editMajor", index)}
                                                name="editMajor"
                                                defaultValue={edu.major}
                                                />
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                <Form.Label>
                                                    Start Date
                                                </Form.Label>
                                                <Form.Control
                                                    type="month"
                                                    onChange={this.updateField(
                                                    "editEduStartDate"
                                                    )}
                                                    id={this.setElementID("editEduStartDate", index)}
                                                    name="editEduStartDate"
                                                    defaultValue={edu.eduStartDate}
                                                />
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Label>End Date</Form.Label>
                                                        <Form.Control
                                                            type="month"
                                                            onChange={this.updateField(
                                                            "editEduEndDate"
                                                            )}
                                                            id={this.setElementID("editEduEndDate", index)}
                                                            name="editEduEndDate"
                                                            defaultValue={edu.eduEndDate}
                                                        />
                                                        </Form.Group>
                                            </Form.Row>

                                            <Form.Group>
                                                <Form.Label>GPA (Optional)</Form.Label>
                                                <Form.Control
                                                type="number"
                                                step="0.01"
                                                onChange={this.updateField(
                                                    "editGpa"
                                                )}
                                                id={this.setElementID("editGpa", index)}
                                                name="editGpa"
                                                value={this.getOptionalValue(this.state.editGpa, edu.gpa)}
                                                />
                                            </Form.Group>
                                            <div className="text-center"></div>
                                            </Form>
                                            <Row>
                                              <Col xs={1}></Col>
                                                <Col>
                                                    <Button
                                                      id="editEducationButton"
                                                      onClick={this.editEducation(index)}
                                                      block
                                                    >
                                                    Save
                                                    </Button>
                                                </Col>
                                                <Col xs={1}></Col>
                                                <Col>
                                                    <Button
                                                      id="cancelEditEducationButton"
                                                      onClick={this.toggleEditForm(
                                                          false
                                                      )}
                                                      variant="danger"
                                                      block
                                                    >
                                                    Cancel
                                                    </Button>
                                                </Col>
                                                <Col xs={1}></Col>
                                            </Row>
                                        </div>
                                        ) : ("")}
                                        </Card.Body>
                                      </Accordion.Collapse>
                                        </Card>
                                        );
                                        })}
                                    </Accordion>
                                </Container>
                                <br />
                            </Col>
                        </Row>
                    </Accordion.Collapse>
                </Card>

            <Card>
                <Card.Header>
                    <Accordion.Toggle 
                    as={Card.Header}
                    variant="link"
                    eventKey="1">
                        <h4>Experience</h4>
                    </Accordion.Toggle>
                </Card.Header>

                <Accordion.Collapse eventKey="1">
                    <Row>
                        <Col>
                            <Container>
                                <br />
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                            <Form.Control
                                            type="text"
                                            value={this.state.title}
                                            onChange={this.updateField("title")}
                                            id="title"
                                            name="title"
                                            placeholder="Ex: Developer"
                                            />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Company</Form.Label>
                                            <Form.Control
                                            type="text"
                                            value={this.state.company}
                                            onChange={this.updateField("company")}
                                            id="company"
                                            name="company"
                                            placeholder="Ex: IBM"
                                            />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Location</Form.Label>
                                            <Form.Control
                                            type="text"
                                            value={this.state.location}
                                            onChange={this.updateField("location")}
                                            id="location"
                                            name="location"
                                            placeholder="Ex: Philadelphia"
                                            />
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="month"
                                            value={this.state.expStartDate}
                                            onChange={this.updateField("expStartDate")}
                                            id="expStartDate"
                                            name="expStartDate"
                                        />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="month"
                                            value={this.state.expEndDate}
                                            onChange={this.updateField("expEndDate")}
                                            id="expEndDate"
                                            name="expEndDate"
                                        />
                                        </Form.Group>
                                    </Form.Row>
                                    <div className="text-center">
                                        {this.state.expErrorState ? (
                                        <Alert variant="danger">
                                            {this.state.alertMessage}
                                        </Alert>
                                        ) : (" ")}
                                        {this.state.expSuccessState ? (
                                        <Alert variant="success">
                                            {this.state.alertMessage}
                                        </Alert>
                                        ) : (" ")}
                                        <Button
                                          id="addExperienceButton"
                                          onClick={this.addExperience}
                                        >
                                        Add Experience
                                        </Button>
                                    </div>
                                </Form>
                                <br />
                            </Container>
                        </Col>

                        <Col>
                        <br />
                        <h4>Experience Added</h4>
                        <Container>
                                <Accordion>
                                    {this.state.experience.map((exp, index) => {
                                        return (
                                        <Card>
                                            <Card.Header>
                                            <Accordion.Toggle
                                                as={Card.Header}
                                                variant="link"
                                                eventKey={"exp" + index + 1}
                                                onClick={this.toggleEditForm(false)}
                                            >
                                                {exp.company} {exp.title}
                                            </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse
                                            eventKey={"exp" + index + 1}
                                            >
                                            <Card.Body>
                                                
                                                {!this.state.editState ? (
                                                <div>
                                                  {exp.location} <br />
                                                  {exp.expStartDate} to {exp.expEndDate}<br /> <br />
                                                  <Row>
                                                    <Col xs={1}></Col>
                                                    <Col>
                                                    <Button
                                                      id="toggleEditExperienceButton"
                                                      onClick={this.toggleEditForm(true)}
                                                      block
                                                    >
                                                        Edit
                                                    </Button>
                                                    </Col>
                                                    <Col xs={1}></Col>
                                                    <Col>
                                                      <Button
                                                        id="deleteExperienceButton"
                                                        onClick={this.deleteExperience(index)}
                                                        variant="danger"
                                                        block
                                                      >
                                                        Delete
                                                      </Button>
                                                    </Col>
                                                    <Col xs={1}></Col>
                                                  </Row>
                                                </div>
                                                ) : (
                                                ""
                                                )}
                                                {this.state.editState ? (
                                                <div>
                                                    <Form>
                                                    <Form.Group>
                                                        <Form.Label>Title</Form.Label>
                                                        <Form.Control
                                                        type="text"
                                                        onChange={this.updateField(
                                                            "editTitle"
                                                        )}
                                                        id={this.setElementID("editTitle", index)} 
                                                        name="editTitle"
                                                        defaultValue={exp.title}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group>
                                                        <Form.Label>Company</Form.Label>
                                                        <Form.Control
                                                        type="text"
                                                        onChange={this.updateField(
                                                            "editCompany"
                                                        )}
                                                        id={this.setElementID("editCompany", index)}
                                                        name="editCompany"
                                                        defaultValue={exp.company}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group>
                                                        <Form.Label>Location</Form.Label>
                                                        <Form.Control
                                                        type="text"
                                                        onChange={this.updateField(
                                                            "editLocation"
                                                        )}
                                                        id={this.setElementID("editLocation", index)}
                                                        name="editLocation"
                                                        defaultValue={exp.location}
                                                        />
                                                    </Form.Group>

                                                    <Form.Row>
                                                        <Form.Group as={Col}>
                                                        <Form.Label>
                                                            Start Date
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="month"
                                                            onChange={this.updateField(
                                                            "editExpStartDate"
                                                            )}
                                                            id={this.setElementID("editExpStartDate", index)}
                                                            name="editExpStartDate"
                                                            defaultValue={exp.expStartDate}
                                                        />
                                                        </Form.Group>
                                                        <Form.Group as={Col}>
                                                        <Form.Label>End Date</Form.Label>
                                                        <Form.Control
                                                            type="month"
                                                            onChange={this.updateField(
                                                            "editExpEndDate"
                                                            )}
                                                            id={this.setElementID("editExpEndDate", index)}
                                                            name="editExpEndDate"
                                                            defaultValue={exp.expEndDate}
                                                        />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    </Form>
                                                    <Row>
                                                    <Col xs={1}></Col>
                                                    <Col>
                                                        <Button
                                                          id="editExperienceButton"
                                                          onClick={this.editExperience(index)}
                                                          block
                                                        >
                                                        Save
                                                        </Button>
                                                    </Col>
                                                    <Col xs={1}></Col>
                                                    <Col>
                                                        <Button
                                                          id="cancelEditExperienceButton"
                                                          onClick={this.toggleEditForm(false)}
                                                          variant="danger"
                                                          block
                                                        >
                                                        Cancel
                                                        </Button>
                                                    </Col>
                                                    <Col xs={1}></Col>
                                                    </Row>
                                                </div>
                                                ) : (
                                                ""
                                                )}
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        );
                                    })}
                                </Accordion>
                            </Container>
                            <br />
                        </Col>
                    </Row>
                </Accordion.Collapse>
            </Card>        
        </Accordion>
    </Container>
    <br />
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

            {this.state.formMode ? 
            (
            <Button
                id="submitButton"
                className="submit"
                onClick={this.handleSubmit}
              >
                Submit
            </Button>
            ) 
            : 

            <Modal.Footer>
              <Button variant="primary" onClick={this.handleEditSubmit("edit")}>
                Confirm Edit
              </Button>
              <Button variant="danger" onClick={this.sendHideSignal("cancel")}>
                Cancel
              </Button>
            </Modal.Footer>

            }
            
          </div>
          <br />
    </Container>
    </div>
    );
}
}


export default ProfileForm;