import React from "react";
import { shallow } from "enzyme";
import Profile from "./Profile";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Profile", () => {
  let wrapper;
  let profile = {
    profileName: "Profile J",
    profile_id: 1,
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
  };

  var durations = ["2", "6"];

  beforeEach(() => (wrapper = shallow(<Profile profile={profile} mode={"jobseeker"}/>)));

  it("Profile should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Profile should include container", () => {
    const container = wrapper.find("Container");
    expect(container.length).toEqual(1);
  });

  it("Profile should include card", () => {
    const container = wrapper.find("Card");
    expect(container.length).toEqual(5);
  });

  it("Profile should include image", () => {
    const container = wrapper.find("Image");
    expect(container.length).toEqual(1);
  });

  it("renders the respective image", () => {
    const fig = wrapper.find("Image");
    expect(fig.prop("src")).toEqual(profile.profileImg);
  });

  it("ViewProfiles should include Accordion", () => {
    const accordian = wrapper.find("Accordion");
    expect(accordian.length).toEqual(2);
  });

  it("Profile should include labels", () => {
    expect(wrapper.find("label").length).toEqual(1);
  });

  it("Profile should include h5 tags", () => {
    expect(wrapper.find("h5").length).toEqual(4);
  });

  it("Profile should include 4 Row tags", () => {
    expect(wrapper.find("Row").length).toEqual(8);
  });

  it("Profile should include 14 Col tags", () => {
    expect(wrapper.find("Col").length).toEqual(18);
  });

  it("Submit presence: should show success message", () => {
    wrapper.setState({ profile }, () => {
      wrapper.find("#Send").simulate("click"),
        () => {
          wrapper.update();
        };

      expect(wrapper.state("alertMessage")).toEqual("Successfully Sent");
      expect(wrapper.state("allErrorState")).toEqual(false);
      expect(wrapper.state("allSuccessState")).toEqual(true);
    });
  });

  it("should include buttons for send and edit profile", () => {
    expect(wrapper.find("Button#Send").length).toEqual(1);
    expect(wrapper.find("Button#Edit").length).toEqual(1);
  });

  it("render Send button with custom text", () => {
    const button = wrapper.find("Button#Send");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Send");
  });

  it("render Edit button with custom text", () => {
    const button = wrapper.find("Button#Edit");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Edit");
  });

});

