import Header from "./Header";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Header", () => {
  const wrapper = shallow(<Header />);
  it("should include a Navbar", () => {
    expect(wrapper.find("Navbar").length).toEqual(1);
  });
  it("should include button for logout", () => {
    expect(wrapper.find("Button#logout").length).toEqual(1);
  });

  it("render Logout button with custom text", () => {
    const button = wrapper.find("Button#logout");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Logout");
  });

  it("Header should exist", () => {
    const links = [
      { link: "http://localhost:3000/createProfile", text: "Create Profile" },
      { link: "http://localhost:3000/viewProfile", text: "View Profile" },
    ];
    const wrapper = shallow(<Header links={links} />);
    expect(wrapper.exists()).toBe(true);
  });
});
