import React from "react";
import { shallow } from "enzyme";
import PieChart from "./pieChart";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Home", () => {
  let wrapper;
  let dataPie = {
    labels: ["Acceptance", "Rejection"],
    datasets: [
      {
        data: [20, 5],
        backgroundColor: [
          "#46BFBD",
          "#F7464A",
        ],
        hoverBackgroundColor: [
          "#5AD3D1",
          "#FF5A5E",
        ]
      }
    ]
  }

  beforeEach(() => (wrapper = shallow(<PieChart inputData = {dataPie}/>)));
  it("Home should exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have Pie chart", () => {
    expect(wrapper.find("Pie").length).toEqual(1);
  });

  it("data state should correspond with input", () => {
    expect(wrapper.state("dataPie")).toEqual(dataPie);
  });
});
