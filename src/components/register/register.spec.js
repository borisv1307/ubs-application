import React from "react";
import { shallow } from "enzyme";
import Register from "./register";
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

describe("Register", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Register />)));

  it("should have a form", () => {
    expect(wrapper.find("Form").length).toEqual(1);
  });

  it("should include the base number of inputs for registration where a registration type has not been chosen yet", () => {
    expect(wrapper.find("#first_name").length).toEqual(1);
    expect(wrapper.find("#last_name").length).toEqual(1);
    expect(wrapper.find("#email").length).toEqual(1);
    expect(wrapper.find("#password").length).toEqual(1);
    expect(wrapper.find("#registration_type").length).toEqual(1);
    expect(wrapper.find("#gender").length).toEqual(1);
    expect(wrapper.find("#ethnicity").length).toEqual(1);
    expect(wrapper.find("#date_of_birth").length).toEqual(1);
  });

  it("should include an extended number of inputs from the default number when choosing Job Seeker as the registration type", () => {
    const registrationTypeInput = simulateChangeOnInput(wrapper, "#registration_type", "Job Seeker");

    expect(wrapper.find("#first_name").length).toEqual(1);
    expect(wrapper.find("#last_name").length).toEqual(1);
    expect(wrapper.find("#email").length).toEqual(1);
    expect(wrapper.find("#password").length).toEqual(1);
    expect(wrapper.find("#registration_type").length).toEqual(1);
    expect(wrapper.find("#gender").length).toEqual(1);
    expect(wrapper.find("#ethnicity").length).toEqual(1);
    expect(wrapper.find("#date_of_birth").length).toEqual(1);
    expect(wrapper.find("#address").length).toEqual(1);
    expect(wrapper.find("#address2").length).toEqual(1);
    expect(wrapper.find("#city").length).toEqual(1);
    expect(wrapper.find("#state").length).toEqual(1);
    expect(wrapper.find("#zip").length).toEqual(1);
    expect(wrapper.find("#contact_number").length).toEqual(1);
  });


  it("should include the same number of inputs from the default form when choosing HR Professional as the registration type", () => {
    const registrationTypeInput = simulateChangeOnInput(wrapper, "#registration_type", "HR Professional");

    expect(wrapper.find("#first_name").length).toEqual(1);
    expect(wrapper.find("#last_name").length).toEqual(1);
    expect(wrapper.find("#email").length).toEqual(1);
    expect(wrapper.find("#password").length).toEqual(1);
    expect(wrapper.find("#registration_type").length).toEqual(1);
    expect(wrapper.find("#gender").length).toEqual(1);
    expect(wrapper.find("#ethnicity").length).toEqual(1);
    expect(wrapper.find("#date_of_birth").length).toEqual(1);
  });

  it("should update input forms ", () => {
    const firstNameInput = simulateChangeOnInput(wrapper, "#first_name", "John");
    const lastNameInput = simulateChangeOnInput(wrapper, "#last_name", "Doe");
    const emailInput = simulateChangeOnInput(wrapper, "#email", "test@test.com");
    const passwordInput = simulateChangeOnInput(wrapper, "#password", "Test123!");
    const registrationTypeInput = simulateChangeOnInput(wrapper, "#registration_type", "Job Seeker");
    const genderInput = simulateChangeOnInput(wrapper, "#gender", "Male");
    const ethnicityInput = simulateChangeOnInput(wrapper, "#ethnicity", "Asian");
    const dateOfBirthInput = simulateChangeOnInput(wrapper, "#date_of_birth", "2000-01-01")
    const address1Input = simulateChangeOnInput(wrapper, "#address", "1234 Test Street");
    const address2Input = simulateChangeOnInput(wrapper, "#address2", "Apartment 1");
    const cityInput = simulateChangeOnInput(wrapper, "#city", "Philadelphia");
    const stateInput = simulateChangeOnInput(wrapper, "#state", "Pennsylvania");
    const zipInput = simulateChangeOnInput(wrapper, "#zip", "00000");
    const phoneNumberInput = simulateChangeOnInput(wrapper, "#contact_number", "1234567890");

    expect(firstNameInput.props().value).toEqual("John");
    expect(lastNameInput.props().value).toEqual("Doe");
    expect(emailInput.props().value).toEqual("test@test.com");
    expect(passwordInput.props().value).toEqual("Test123!");
    expect(registrationTypeInput.props().value).toEqual("Job Seeker");
    expect(genderInput.props().value).toEqual("Male");
    expect(ethnicityInput.props().value).toEqual("Asian");
    expect(dateOfBirthInput.props().value).toEqual("2000-01-01");
    expect(address1Input.props().value).toEqual("1234 Test Street");
    expect(address2Input.props().value).toEqual("Apartment 1");
    expect(cityInput.props().value).toEqual("Philadelphia");
    expect(stateInput.props().value).toEqual("Pennsylvania");
    expect(zipInput.props().value).toEqual("00000");
    expect(phoneNumberInput.props().value).toEqual("1234567890");
  });

  describe("Alerts", () => {
    it("should show success message when inputs are valid for a JOBSEEKER", () => {
      wrapper.setState({ "first_name": "John",
                        "last_name": "Doe",
                        "email": "jdoe@test.com",
                        "password": "12345",
                        "gender": "Male",
                        "ethnicity": "Asian",
                        "date_of_birth": "2020-01-01",
                        "registration_type": "Job Seeker",
                        "address": "1234 Test Street",
                        "address2": "Apartment 1",
                        "city": "Philadelphia",
                        "state": "Pennsylvania",
                        "zip": "10000",
                        "contact_number": "1234567890" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("error_message")).toEqual("");
        expect(wrapper.state("error_show")).toEqual(false);
        expect(wrapper.state("modal_message")).toEqual("An OTP will be sent to your email. It is required for your first login.");
        expect(wrapper.state("modal_show")).toEqual(true);
      });
    });

    it("should show success message when inputs are valid for a HR PROFESSIONAL", () => {
      wrapper.setState({ "first_name": "John",
                        "last_name": "Doe",
                        "email": "jdoe@test.com",
                        "password": "12345",
                        "gender": "Male",
                        "ethnicity": "Asian",
                        "date_of_birth": "2020-01-01",
                        "registration_type": "HR Professional" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("error_message")).toEqual("");
        expect(wrapper.state("error_show")).toEqual(false);
        expect(wrapper.state("modal_message")).toEqual("An OTP will be sent to your email. It is required for your first login.");
        expect(wrapper.state("modal_show")).toEqual(true);
      });
    });

    it("should show error when form in incomplete", () => {
      wrapper.setState({ "first_name": "",
                        "last_name": "",
                        "email": "",
                        "password": "",
                        "gender": "",
                        "ethnicity": "",
                        "date_of_birth": "",
                        "registration_type": "",
                        "address": "",
                        "address2": "",
                        "city": "",
                        "state": "",
                        "zip": "",
                        "contact_number": "" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("error_message")).toEqual("Incomplete input");
        expect(wrapper.state("error_show")).toEqual(true);
      });
    });

    it("should show error when phone number is not the right amount of digits", () => {
      wrapper.setState({ "first_name": "John",
                        "last_name": "Doe",
                        "email": "jdoe@test.com",
                        "password": "12345",
                        "gender": "Male",
                        "ethnicity": "Asian",
                        "date_of_birth": "2020-01-01",
                        "registration_type": "Job Seeker",
                        "address": "1234 Test Street",
                        "address2": "Apartment 1",
                        "city": "Philadelphia",
                        "state": "Pennsylvania",
                        "zip": "10000",
                        "contact_number": "1" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("error_message")).toEqual("Invalid phone number");
        expect(wrapper.state("error_show")).toEqual(true);
      });
    });

    it("should show error when phone number includes letters", () => {
      wrapper.setState({ "first_name": "John",
                        "last_name": "Doe",
                        "email": "jdoe@test.com",
                        "password": "12345",
                        "gender": "Male",
                        "ethnicity": "Asian",
                        "date_of_birth": "2020-01-01",
                        "registration_type": "Job Seeker",
                        "address": "1234 Test Street",
                        "address2": "Apartment 1",
                        "city": "Philadelphia",
                        "state": "Pennsylvania",
                        "zip": "10000",
                        "contact_number": "a" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("error_message")).toEqual("Invalid phone number");
        expect(wrapper.state("error_show")).toEqual(true);
      });
    });

    it("should show error when zip code includes letters", () => {
      wrapper.setState({ "first_name": "John",
                        "last_name": "Doe",
                        "email": "jdoe@test.com",
                        "password": "12345",
                        "gender": "Male",
                        "ethnicity": "Asian",
                        "date_of_birth": "2020-01-01",
                        "registration_type": "Job Seeker",
                        "address": "1234 Test Street",
                        "address2": "Apartment 1",
                        "city": "Philadelphia",
                        "state": "Pennsylvania",
                        "zip": "a",
                        "contact_number": "1234567890" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("error_message")).toEqual("Invalid zip code");
        expect(wrapper.state("error_show")).toEqual(true);
      });
    });

    it("should show error when email does not have @", () => {
      wrapper.setState({ "first_name": "John",
                        "last_name": "Doe",
                        "email": "jdoetest.com",
                        "password": "12345",
                        "gender": "Male",
                        "ethnicity": "Asian",
                        "date_of_birth": "2020-01-01",
                        "registration_type": "Job Seeker",
                        "address": "1234 Test Street",
                        "address2": "Apartment 1",
                        "city": "Philadelphia",
                        "state": "Pennsylvania",
                        "zip": "10000",
                        "contact_number": "1234567890" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("error_message")).toEqual("Invalid email");
        expect(wrapper.state("error_show")).toEqual(true);
      });
    });

    it("should show error when email does not have .", () => {
      wrapper.setState({ "first_name": "John",
                        "last_name": "Doe",
                        "email": "jdoe@testcom",
                        "password": "12345",
                        "gender": "Male",
                        "ethnicity": "Asian",
                        "date_of_birth": "2020-01-01",
                        "registration_type": "Job Seeker",
                        "address": "1234 Test Street",
                        "address2": "Apartment 1",
                        "city": "Philadelphia",
                        "state": "Pennsylvania",
                        "zip": "10000",
                        "contact_number": "1234567890" }, () => {

        wrapper.find("#submitButton").simulate('click'), () => { //submit form
          wrapper.update();
        };
  
        expect(wrapper.state("error_message")).toEqual("Invalid email");
        expect(wrapper.state("error_show")).toEqual(true);
      });
    });

  });
});
