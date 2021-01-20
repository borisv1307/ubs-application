import React from "react";
import { shallow } from "enzyme";
import Login from "./login";
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

describe("Login", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Login />)));

  it("Login should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Login should include container", () => {
    const container = wrapper.find("Container");
    expect(container.length).toEqual(2);
  });

  it("should have a form", () => {
    expect(wrapper.find("Form").length).toEqual(1);
  });

  it("should include inputs for login", () => {
    expect(wrapper.find("#email").length).toEqual(1);
    expect(wrapper.find("#password").length).toEqual(1);
  });

  it("should include buttons for submit and register", () => {
    expect(wrapper.find("Button#submit").length).toEqual(1);
    expect(wrapper.find("Button#register").length).toEqual(1);
  });

  it("render submit button with custom text", () => {
    const button = wrapper.find("Button#submit");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Submit");
  });

  it("render register button with custom text", () => {
    const button = wrapper.find("Button#register");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Register");
  });

  describe("Alerts", () => {
    it("should login when a valid email and password is submitted", () => {
      wrapper.setState(
        { email: "jmaxino@gmail.com", password: "Hello3" },
        () => {
          wrapper.find("#submit").simulate("click"),
            () => {
              //submit form
              wrapper.update();
            };

          expect(wrapper.state("error_message")).toEqual("");
          expect(wrapper.state("error_show")).toEqual(false);
        }
      );
    });

    it("should show an error message when form input is incomplete", () => {
      wrapper.setState({ email: "", password: "" }, () => {
        wrapper.find("#submit").simulate("click"),
          () => {
            //submit form
            wrapper.update();
          };

        expect(wrapper.state("error_message")).toEqual(
          "Field/s cannot be blank"
        );
        expect(wrapper.state("error_show")).toEqual(true);
      });
    });
  });
});
