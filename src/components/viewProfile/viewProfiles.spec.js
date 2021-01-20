import React from "react";
import { shallow } from "enzyme";
import ViewProfiles from "./viewProfiles";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Profile from "./Profile";

configure({ adapter: new Adapter() });

let profiles = {
  count: 3,
  results: [
    {
      profile_id: 1,
      profileName: "Profile J",
      user_id: 1,
      state: "PA",
      zip: "19104",
      city: "Philadelphia",
      email: "test4@gmail.com",
      profileImg:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      first_name: "Jimmy",
      last_name: "Doe",
      position: "Developer",
      aboutMe: "Good",
      education: [
        {
          school: "A School",
          degree: "BS",
          major: "CS",
          eduStartDate: "2020-04",
          eduEndDate: "2020-05",
          gpa: "3",
        },
        {
          school: "B University",
          degree: "MS",
          major: "SE",
          eduStartDate: "2020-08",
          eduEndDate: "2020-12",
          gpa: "3",
        },
      ],
      experience: [
        {
          title: "Intern",
          company: "Y Company",
          location: "PH",
          expStartDate: "2020-03",
          expEndDate: "2020-05",
        },
        {
          title: "Developer",
          company: "Z Company",
          location: "NY",
          expStartDate: "2020-06",
          expEndDate: "2020-12",
        },
      ],
    },
    {
      profile_id: 2,
      profileName: "Profile M",
      user_id: 1,
      state: "PA",
      zip: "19104",
      city: "Philadelphia",
      email: "test4@gmail.com",
      profileImg:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      firstName: "Test",
      lastName: "User",
      position: "Developer",
      aboutMe: "Hello World",
      education: [
        {
          degree: "MA",
          eduEndDate: "0001-01",
          eduStartDate: "0001-01",
          gpa: "3",
          major: "SE",
          school: "Drexel",
        },
      ],
      experience: [
        {
          company: "ABC",
          expEndDate: "0001-01",
          expStartDate: "0001-01",
          location: "PH",
          title: "Developer",
        },
      ],
    },
    {
      profile_id: 3,
      profileName: "Profile N",
      user_id: 1,
      state: "PA",
      zip: "19104",
      city: "Philadelphia",
      email: "test4@gmail.com",
      profileImg:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      firstName: "Test",
      lastName: "User",
      position: "Developer",
      aboutMe: "Hello World",
      education: [
        {
          degree: "MA",
          eduEndDate: "0001-01",
          eduStartDate: "0001-01",
          gpa: "3",
          major: "SE",
          school: "Drexel",
        },
      ],
      experience: [
        {
          company: "ABC",
          expEndDate: "0001-01",
          expStartDate: "0001-01",
          location: "PH",
          title: "Developer",
        },
      ],
    },
  ],
};
describe("ViewProfiles", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<ViewProfiles />)));

  it("ViewProfiles should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("ViewProfiles should include container", () => {
    const container = wrapper.find("Container");
    expect(container.length).toEqual(1);
  });

  it("ViewProfiles should include Accordion", () => {
    const container = wrapper.find("Accordion");
    expect(container.length).toEqual(1);
  });

  it("ViewProfiles should include Modal", () => {
    const Modal = wrapper.find("Modal");
    expect(Modal.length).toEqual(1);
  });

  it("ViewProfiles should include profile name on the Accordion", () => {
    const container = wrapper.find("Accordion.Toggle");
    expect(container.toBe).toEqual(profiles.profileName);
  });

  it("ViewProfiles should have these number of user profiles", () => {
    wrapper.instance().forceUpdate();
    wrapper.instance().setState({ profiles: profiles.results }, () => {
      wrapper.instance().forceUpdate();
      expect(wrapper.find(Profile)).toHaveLength(profiles.count);
    });
  });
});
