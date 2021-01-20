import React from "react";
import { shallow } from "enzyme";
import ProfileForm from "./profileForm";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const simulateChangeOnInput = (wrapper, inputSelector, newValue) => {
  const input = wrapper.find(inputSelector);
  input.simulate("change", {
    target: { value: newValue },
  });
  return wrapper.find(inputSelector);
};

describe("ProfileForm", () => {
  let wrapper;
  let state = {
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
  beforeEach(() => (wrapper = shallow(<ProfileForm parent_to_child = {state}/>)));

  it("should include 3 forms for personal details, education and experience", () => {
    expect(wrapper.find("Form").length).toEqual(3);
  });

  it("should include an accordion for inserting edu/exp, editing edu, and editing exp", () => {
    expect(wrapper.find("Accordion").length).toEqual(3);
  });

  it("should include inputs for personal details, education, and experience", () => {
    expect(wrapper.find("#profileName").length).toEqual(1);
    expect(wrapper.find("#first_name").length).toEqual(1);
    expect(wrapper.find("#last_name").length).toEqual(1);
    expect(wrapper.find("#position").length).toEqual(1);
    expect(wrapper.find("#aboutMe").length).toEqual(1);
    expect(wrapper.find("#school").length).toEqual(1);
    expect(wrapper.find("#degree").length).toEqual(1);
    expect(wrapper.find("#major").length).toEqual(1);
    expect(wrapper.find("#eduStartDate").length).toEqual(1);
    expect(wrapper.find("#eduEndDate").length).toEqual(1);
    expect(wrapper.find("#gpa").length).toEqual(1);
    expect(wrapper.find("#title").length).toEqual(1);
    expect(wrapper.find("#company").length).toEqual(1);
    expect(wrapper.find("#location").length).toEqual(1);
    expect(wrapper.find("#expStartDate").length).toEqual(1);
    expect(wrapper.find("#expEndDate").length).toEqual(1);
  });

  it("update input forms ", () => {
    const profileNameInput = simulateChangeOnInput(wrapper, "#profileName", "Profile 1");
    const firstNameInput = simulateChangeOnInput(wrapper, "#first_name", "John");
    const lastNameInput = simulateChangeOnInput(wrapper, "#last_name", "Doe");
    const positionInput = simulateChangeOnInput(wrapper, "#position", "Worker");
    const aboutMeInput = simulateChangeOnInput(wrapper, "#aboutMe", "Good");
    const schoolInput = simulateChangeOnInput(
      wrapper,
      "#school",
      "Drexel University"
    );
    const degreeInput = simulateChangeOnInput(wrapper, "#degree", "BS");
    const majorInput = simulateChangeOnInput(wrapper, "#major", "Science");
    const eduStartDateInput = simulateChangeOnInput(
      wrapper,
      "#eduStartDate",
      "2020-09"
    );
    const eduEndDateInput = simulateChangeOnInput(
      wrapper,
      "#eduEndDate",
      "2020-09"
    );
    const gpaInput = simulateChangeOnInput(wrapper, "#gpa", "3.50");
    const titleInput = simulateChangeOnInput(wrapper, "#title", "Intern");
    const companyInput = simulateChangeOnInput(wrapper, "#company", "DXC");
    const locationInput = simulateChangeOnInput(
      wrapper,
      "#location",
      "Philadelphia"
    );
    const expStartDateInput = simulateChangeOnInput(
      wrapper,
      "#expStartDate",
      "2020-09"
    );
    const expEndDateInput = simulateChangeOnInput(
      wrapper,
      "#expEndDate",
      "2020-09"
    );
    
    expect(profileNameInput.props().value).toEqual("Profile 1");
    expect(firstNameInput.props().value).toEqual("John");
    expect(lastNameInput.props().value).toEqual("Doe");
    expect(positionInput.props().value).toEqual("Worker");
    expect(aboutMeInput.props().value).toEqual("Good");
    expect(schoolInput.props().value).toEqual("Drexel University");
    expect(degreeInput.props().value).toEqual("BS");
    expect(majorInput.props().value).toEqual("Science");
    expect(eduStartDateInput.props().value).toEqual("2020-09");
    expect(eduEndDateInput.props().value).toEqual("2020-09");
    expect(gpaInput.props().value).toEqual("3.50");
    expect(titleInput.props().value).toEqual("Intern");
    expect(companyInput.props().value).toEqual("DXC");
    expect(locationInput.props().value).toEqual("Philadelphia");
    expect(expStartDateInput.props().value).toEqual("2020-09");
    expect(expEndDateInput.props().value).toEqual("2020-09");
  });

  it("should reset form when submit button is clicked", () => {
    wrapper.setState({ "profileName": "Profile 1", 
                       "first_name": "John",
                       "last_name": "Doe",
                       "email": "jdoe@test.com",
                       "position": "Worker",
                       "aboutMe": "Good",
                       "profileImg": "test.com",
                       "school": "Drexel University",
                       "degree": "BS",
                       "major": "Science",
                       "eduStartDate": "2020-09",
                       "eduEndDate": "2020-09",
                       "gpa": "3.50",
                       "title": "Intern",
                       "company": "DXC",
                       "location": "Philadelphia",
                       "expStartDate": "2020-09",
                       "expEndDate": "2020-09" }, () => {

      const submitButton = wrapper.find("#submitButton");
      submitButton.simulate('click');
      wrapper.update();

      expect(wrapper.state("profileName")).toEqual("");
      expect(wrapper.state("first_name")).toEqual("");
      expect(wrapper.state("last_name")).toEqual("");
      expect(wrapper.state("position")).toEqual("");
      expect(wrapper.state("aboutMe")).toEqual("");
      expect(wrapper.state("school")).toEqual("");
      expect(wrapper.state("degree")).toEqual("");
      expect(wrapper.state("major")).toEqual("");
      expect(wrapper.state("eduStartDate")).toEqual("");
      expect(wrapper.state("eduEndDate")).toEqual("");
      expect(wrapper.state("gpa")).toEqual("");
      expect(wrapper.state("title")).toEqual("");
      expect(wrapper.state("company")).toEqual("");
      expect(wrapper.state("location")).toEqual("");
      expect(wrapper.state("expStartDate")).toEqual("");
      expect(wrapper.state("expEndDate")).toEqual("");
    });
  });

  it("should include buttons for submit and adding edu and exp", () => {
    const eduButton = wrapper.find("Button#addEducationButton");
    const expButton = wrapper.find("Button#addExperienceButton");
    const submitButton = wrapper.find("#submitButton");

    expect(eduButton.length).toEqual(1);
    expect(expButton.length).toEqual(1);
    expect(submitButton.length).toEqual(1)

    expect(eduButton.text()).toEqual("Add Education");
    expect(expButton.text()).toEqual("Add Experience");
    expect(submitButton.text()).toEqual("Submit");
  });

  it("should insert education details in education array when button is clicked", () => {
    const educationButton = wrapper.find("#addEducationButton")

    simulateChangeOnInput(wrapper, "#school", "Drexel University");
    simulateChangeOnInput(wrapper, "#degree", "BS");
    simulateChangeOnInput(wrapper, "#major", "Science");
    simulateChangeOnInput(wrapper, "#eduStartDate", "2020-09");
    simulateChangeOnInput(wrapper, "#eduEndDate", "2020-09");
    simulateChangeOnInput(wrapper, "#gpa", "3.50");

    educationButton.simulate('click');
    wrapper.update();
    expect(wrapper.state("education")).toEqual([{"degree": "BS", "eduEndDate": "2020-09", "eduStartDate": "2020-09", "gpa": "3.50", "major": "Science", "school": "Drexel University"}]);
  });

  it("should reset education form when submitting", () => {
    wrapper.setState({ "school": "Drexel University",
                       "degree": "BS",
                       "major": "Science",
                       "eduStartDate": "2020-09",
                       "eduEndDate": "2020-09",
                       "gpa": "3.50" }, () => {

      const educationButton = wrapper.find("#addEducationButton")
      educationButton.simulate('click');
      wrapper.update();
      
      expect(wrapper.state("school")).toEqual("");
      expect(wrapper.state("degree")).toEqual("");
      expect(wrapper.state("major")).toEqual("");
      expect(wrapper.state("eduStartDate")).toEqual("");
      expect(wrapper.state("eduEndDate")).toEqual("");
      expect(wrapper.state("gpa")).toEqual("");
    });    
  });

  it("should insert multiple education details in education array when button is clicked multiple times", () => {
    const educationButton = wrapper.find("#addEducationButton")

    simulateChangeOnInput(wrapper, "#school", "Drexel University");
    simulateChangeOnInput(wrapper, "#degree", "BS");
    simulateChangeOnInput(wrapper, "#major", "Science");
    simulateChangeOnInput(wrapper, "#eduStartDate", "2020-09");
    simulateChangeOnInput(wrapper, "#eduEndDate", "2020-09");
    simulateChangeOnInput(wrapper, "#gpa", "3.50");

    educationButton.simulate('click');
    wrapper.update();

    simulateChangeOnInput(wrapper, "#school", "Drexel University");
    simulateChangeOnInput(wrapper, "#degree", "BS");
    simulateChangeOnInput(wrapper, "#major", "Science");
    simulateChangeOnInput(wrapper, "#eduStartDate", "2020-09");
    simulateChangeOnInput(wrapper, "#eduEndDate", "2020-09");
    simulateChangeOnInput(wrapper, "#gpa", "3.50");
    educationButton.simulate('click');
    wrapper.update();
    expect(wrapper.state("education")).toEqual([{"degree": "BS", "eduEndDate": "2020-09", "eduStartDate": "2020-09", "gpa": "3.50", "major": "Science", "school": "Drexel University"}, {"degree": "BS", "eduEndDate": "2020-09", "eduStartDate": "2020-09", "gpa": "3.50", "major": "Science", "school": "Drexel University"}]);
  });

  it("should insert experience details in experience array when button is clicked", () => {
    const experienceButton = wrapper.find("#addExperienceButton")

    simulateChangeOnInput(wrapper, "#title", "Intern");
    simulateChangeOnInput(wrapper, "#company", "DXC");
    simulateChangeOnInput(wrapper,"#location", "Philadelphia");
    simulateChangeOnInput(wrapper, "#expStartDate", "2020-09");
    simulateChangeOnInput(wrapper, "#expEndDate", "2020-09");

    experienceButton.simulate('click');
    wrapper.update();
    expect(wrapper.state("experience")).toEqual([{"company": "DXC", "expEndDate": "2020-09", "expStartDate": "2020-09", "location": "Philadelphia", "title": "Intern"}]);
  });

  it("should reset experience form when submitting", () => {
    wrapper.setState({ "title": "Intern",
                       "company": "DXC",
                       "location": "Philadelphia",
                       "expStartDate": "2020-09",
                       "expEndDate": "2020-09" }, () => {

      const experienceButton = wrapper.find("#addExperienceButton");
      experienceButton.simulate('click');
      wrapper.update();
      
      expect(wrapper.state("title")).toEqual("");
      expect(wrapper.state("company")).toEqual("");
      expect(wrapper.state("location")).toEqual("");
      expect(wrapper.state("expStartDate")).toEqual("");
      expect(wrapper.state("expEndDate")).toEqual("");
    });
  });

  it("should insert multiple experience details in experience array when button is clicked multiple times", () => {
    const experienceButton = wrapper.find("#addExperienceButton")

    simulateChangeOnInput(wrapper, "#title", "Intern");
    simulateChangeOnInput(wrapper, "#company", "DXC");
    simulateChangeOnInput(wrapper, "#location", "Philadelphia");
    simulateChangeOnInput(wrapper, "#expStartDate",  "2020-09");
    simulateChangeOnInput(wrapper, "#expEndDate", "2020-09");

    experienceButton.simulate('click');
    wrapper.update();

    simulateChangeOnInput(wrapper, "#title", "Intern");
    simulateChangeOnInput(wrapper, "#company", "DXC");
    simulateChangeOnInput(wrapper, "#location", "Philadelphia");
    simulateChangeOnInput(wrapper, "#expStartDate",  "2020-09");
    simulateChangeOnInput(wrapper, "#expEndDate", "2020-09");
    experienceButton.simulate('click');
    wrapper.update();
    expect(wrapper.state("experience")).toEqual([{"company": "DXC", "expEndDate": "2020-09", "expStartDate": "2020-09", "location": "Philadelphia", "title": "Intern"},{"company": "DXC", "expEndDate": "2020-09", "expStartDate": "2020-09", "location": "Philadelphia", "title": "Intern"}]);
  });

  describe("Edit array", () => {
    it("should have an edit button after submitting and turn editState to true when Edit button is clicked for education", () => {
      wrapper.setState({ "school": "Drexel University",
                       "degree": "BS",
                       "major": "Science",
                       "eduStartDate": "2020-09",
                       "eduEndDate": "2020-09",
                       "gpa": "3.50" }, () => {

        wrapper.find("#addEducationButton").simulate('click'), () => { //add education
          wrapper.update();
          wrapper.find("#toggleEditEducationButton").simulate('click'), () => { //display edit
            wrapper.update();
          };
        };
  
        expect(wrapper.find("#toggleEditEducationButton").length).toEqual(1);
        wrapper.find("#toggleEditEducationButton").simulate('click');
        expect(wrapper.state("editState")).toEqual(true);
      
      });
    });

    it("should have an edit button after submitting and turn editState to true when Edit button is clicked for experience", () => {
      wrapper.setState({ "title": "Intern",
                       "company": "DXC",
                       "location": "Philadelphia",
                       "expStartDate": "2020-09",
                       "expEndDate": "2020-09" }, () => {

        wrapper.find("#addExperienceButton").simulate('click'), () => { //add experience
          wrapper.update();
          wrapper.find("#toggleEditExperienceButton").simulate('click'), () => { //display edit
            wrapper.update();
          };
        };

        expect(wrapper.find("#toggleEditExperienceButton").length).toEqual(1);
        wrapper.find("#toggleEditExperienceButton").simulate('click');
        expect(wrapper.state("editState")).toEqual(true);
      });
    });
  });

  describe("Alerts", () => {
    it("Submit form: should show success message when inputs are valid", () => {
      wrapper.setState({ "profileName": "Profile 1", 
                       "first_name": "John",
                       "last_name": "Doe",
                       "email": "jdoe@test.com",
                       "position": "Worker",
                       "aboutMe": "Good",
                       "profileImg": "test.com" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Successfully submitted");
        expect(wrapper.state("allErrorState")).toEqual(false);
        expect(wrapper.state("allSuccessState")).toEqual(true);
      });
    });

    it("Submit form: should show error for incomplete input", () => {
      wrapper.setState({ "profileName": "", 
                       "first_name": "",
                       "last_name": "",
                       "email": "",
                       "position": "",
                       "aboutMe": "",
                       "profileImg": "" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Incomplete input");
        expect(wrapper.state("allErrorState")).toEqual(true);
        expect(wrapper.state("allSuccessState")).toEqual(false);
      });
    });

    it("Submit form: should show error for email without @", () => {
      wrapper.setState({ "profileName": "Profile 1", 
                       "first_name": "John",
                       "last_name": "Doe",
                       "email": "jdoetest.com",
                       "position": "Worker",
                       "aboutMe": "Good",
                       "profileImg": "test.com" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Invalid email");
        expect(wrapper.state("allErrorState")).toEqual(true);
        expect(wrapper.state("allSuccessState")).toEqual(false);
      });
    });

    it("Submit form: should show error for email without .", () => {
      wrapper.setState({ "profileName": "Profile 1", 
                       "first_name": "John",
                       "last_name": "Doe",
                       "email": "jdoe@testcom",
                       "position": "Worker",
                       "aboutMe": "Good",
                       "profileImg": "test.com" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Invalid email");
        expect(wrapper.state("allErrorState")).toEqual(true);
        expect(wrapper.state("allSuccessState")).toEqual(false);
      });
    });

    it("Submit form: should show error for not uploading profileImg", () => {
      wrapper.setState({ "profileName": "Profile 1", 
                       "first_name": "John",
                       "last_name": "Doe",
                       "email": "jdoe@test.com",
                       "position": "Worker",
                       "aboutMe": "Good",
                       "profileImg": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("No image added");
        expect(wrapper.state("allErrorState")).toEqual(true);
        expect(wrapper.state("allSuccessState")).toEqual(false);
      });
    });

    it("Education: should show error for incomplete input", () => {
      wrapper.setState({ "school": "",
                       "degree": "",
                       "major": "",
                       "eduStartDate": "",
                       "eduEndDate": "",
                       "gpa": "" }, () => {

        wrapper.find("#addEducationButton").simulate('click'), () => { //add education
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Incomplete input");
        expect(wrapper.state("eduErrorState")).toEqual(true);
        expect(wrapper.state("eduSuccessState")).toEqual(false);
      });
    });

    it("Education: should show error for invalid date", () => {
      wrapper.setState({ "school": "Drexel University",
                       "degree": "BS",
                       "major": "Science",
                       "eduStartDate": "2020-10",
                       "eduEndDate": "2020-09",
                       "gpa": "3.50" }, () => {

        wrapper.find("#addEducationButton").simulate('click'), () => { //add education
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Invalid dates: End date precedes start date");
        expect(wrapper.state("eduErrorState")).toEqual(true);
        expect(wrapper.state("eduSuccessState")).toEqual(false);
      });
    });

    it("Education: should show error GPA higher than 4", () => {
      wrapper.setState({ "school": "Drexel University",
                       "degree": "BS",
                       "major": "Science",
                       "eduStartDate": "2020-05",
                       "eduEndDate": "2020-09",
                       "gpa": "5" }, () => {

        wrapper.find("#addEducationButton").simulate('click'), () => { //add education
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Invalid GPA: should be between 0 and 4");
        expect(wrapper.state("eduErrorState")).toEqual(true);
        expect(wrapper.state("eduSuccessState")).toEqual(false);
      });
    });

    it("Education: should show error GPA lower than 0", () => {
      wrapper.setState({ "school": "Drexel University",
                       "degree": "BS",
                       "major": "Science",
                       "eduStartDate": "2020-05",
                       "eduEndDate": "2020-09",
                       "gpa": "-1" }, () => {

        wrapper.find("#addEducationButton").simulate('click'), () => { //add education
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Invalid GPA: should be between 0 and 4");
        expect(wrapper.state("eduErrorState")).toEqual(true);
        expect(wrapper.state("eduSuccessState")).toEqual(false);
      });
    });

    it("Education: should show success message when inputs are valid", () => {
      wrapper.setState({ "school": "Drexel University",
                       "degree": "BS",
                       "major": "Science",
                       "eduStartDate": "2020-05",
                       "eduEndDate": "2020-09",
                       "gpa": "3.5" }, () => {

        wrapper.find("#addEducationButton").simulate('click'), () => { //add education
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Successfully submitted");
        expect(wrapper.state("eduErrorState")).toEqual(false);
        expect(wrapper.state("eduSuccessState")).toEqual(true);
      });
    });

    it("Education: should show success message when inputs are valid even if gpa is empty", () => {
      wrapper.setState({ "school": "Drexel University",
                       "degree": "BS",
                       "major": "Science",
                       "eduStartDate": "2020-05",
                       "eduEndDate": "2020-09",
                       "gpa": "" }, () => {

        wrapper.find("#addEducationButton").simulate('click'), () => { //add education
          wrapper.update();
        };
  
        expect(wrapper.state("alertMessage")).toEqual("Successfully submitted");
        expect(wrapper.state("eduErrorState")).toEqual(false);
        expect(wrapper.state("eduSuccessState")).toEqual(true);
      });
    });

    it("Experience: should show error for incomplete input", () => {
      wrapper.setState({ "title": "",
                       "company": "",
                       "location": "",
                       "expStartDate": "",
                       "expEndDate": "" }, () => {

        wrapper.find("#addExperienceButton").simulate('click'), () => { //add experience
          wrapper.update();
        };

        expect(wrapper.state("alertMessage")).toEqual("Incomplete input");
        expect(wrapper.state("expErrorState")).toEqual(true);
        expect(wrapper.state("expSuccessState")).toEqual(false);
      });
    });

    it("Experience: should show error for invalid date", () => {
      wrapper.setState({ "title": "Intern",
                       "company": "DXC",
                       "location": "Philadelphia",
                       "expStartDate": "2020-10",
                       "expEndDate": "2020-09" }, () => {

        wrapper.find("#addExperienceButton").simulate('click'), () => { //add experience
          wrapper.update();
        };

        expect(wrapper.state("alertMessage")).toEqual("Invalid dates: End date precedes start date");
        expect(wrapper.state("expErrorState")).toEqual(true);
        expect(wrapper.state("expSuccessState")).toEqual(false);
      });
    });

    it("Experience: should show success message when inputs are valid", () => {
      wrapper.setState({ "title": "Intern",
                       "company": "DXC",
                       "location": "Philadelphia",
                       "expStartDate": "2020-05",
                       "expEndDate": "2020-09" }, () => {

        wrapper.find("#addExperienceButton").simulate('click'), () => { //add experience
          wrapper.update();
        };

        expect(wrapper.state("alertMessage")).toEqual("Successfully submitted");
        expect(wrapper.state("expErrorState")).toEqual(false);
        expect(wrapper.state("expSuccessState")).toEqual(true);
      });
    });
  });

  describe("UploadImage", () => {
    beforeEach(() => (wrapper = shallow(<ProfileForm parent_to_child = {state}/>)));

    it("should have a button for uploading an image", () =>{
        expect(wrapper.find("input#UploadImageInput").length).toEqual(1);
    });

    it("should render an image", () => {
        expect(wrapper.find("img#profileImage").length).toEqual(1);
    });

    it("should display generic avatar picture when no image is uploaded yet", () => {
        const imgInput = wrapper.find("img#profileImage");
        expect(imgInput.getElement(0).props.src).toEqual("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
    });
  });

});
