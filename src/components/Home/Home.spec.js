import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Home", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Home />)));
  it("Home should exists", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("should have h1", () => {
    expect(wrapper.find("h1").length).toEqual(1);
  });
  it("should have h4", () => {
    expect(wrapper.find("h4").length).toEqual(1);
  });
  it("should have h5", () => {
    expect(wrapper.find("h5").length).toEqual(1);
  });
});
