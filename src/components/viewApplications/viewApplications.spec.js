import React from "react";
import { shallow } from "enzyme";
import ViewApplications from "./viewApplications";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("ViewApplications", () => {
  let wrapper;
  let application1 = [{
    profileName: "Profile 1",
    profile_id: 1,
    user_id: 1,
    state: "PA",
    zip: "19104",
    city: "Philadelphia",
    email: "test1@gmail.com",
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
  }];

  let application2 = [{
    profileName: "Profile 2",
    profile_id: 2,
    user_id: 2,
    state: "NY",
    zip: "11111",
    city: "New York",
    email: "test2@gmail.com",
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    first_name: "John",
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
  }];

  let applications = []

  applications[0] = application1[0]
  applications[1] = application2[0]

  beforeEach(() => (wrapper = shallow(<ViewApplications />)));

  it("viewApplications should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have a start button", () => {
    expect(wrapper.find("#start").length).toEqual(1);
    expect(wrapper.state("started")).toEqual(false);
  });

  it("should set started to true when start is pressed and view is initialized to first application", () => {
    wrapper.setState({ "applications": applications }, () => {
        wrapper.find("#start").simulate('click'), () => { 
          wrapper.update();
        };
  
        expect(wrapper.state("started")).toEqual(true);
        expect(wrapper.state("view")).toEqual(application1);
      });
  });

  it("should have accept and decline button when viewing an application", () => {
    wrapper.setState({ "applications": applications }, () => {
      wrapper.find("#start").simulate('click'), () => { 
        wrapper.update();
      };

      expect(wrapper.find("#accept").length).toEqual(1);
      expect(wrapper.find("#decline").length).toEqual(1);
    });
  });

  it("should iterate index and change view to application2 when accept is clicked", () => {
    wrapper.setState({ "applications": applications }, () => {
      wrapper.find("#start").simulate('click'), () => { 
        wrapper.update();
      };

      wrapper.find("#accept").simulate('click'), () => {
        wrapper.update();
      };

      expect(wrapper.state("index")).toEqual(1);
      expect(wrapper.state("view")).toEqual(application2);
    });
  });

  it("should iterate index and change view to application2 when decline is clicked", () => {
    wrapper.setState({ "applications": applications }, () => {
      wrapper.find("#start").simulate('click'), () => { 
        wrapper.update();
      };

      wrapper.find("#decline").simulate('click'), () => {
        wrapper.update();
      };

      expect(wrapper.state("index")).toEqual(1);
      expect(wrapper.state("view")).toEqual(application2);
    });
  });

  it("should set completed to true when all applications have been accepted/declined", () => {
    wrapper.setState({ "applications": applications }, () => {
      wrapper.find("#start").simulate('click'), () => { 
        wrapper.update();
      };

      wrapper.find("#decline").simulate('click'), () => {
        wrapper.update();
      };

      wrapper.find("#decline").simulate('click'), () => {
        wrapper.update();
      };

      expect(wrapper.state("completed")).toEqual(true);
    });
  });

});
