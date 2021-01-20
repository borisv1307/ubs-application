import React from "react";
import { shallow } from "enzyme";
import CreateProfile from "./createProfile";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Profile", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<CreateProfile />)));

  it("CreateProfile should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

});

