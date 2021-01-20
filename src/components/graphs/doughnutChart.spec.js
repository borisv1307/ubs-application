import React from "react";
import { shallow } from "enzyme";
import DoughnutChart from "./doughnutChart";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("DoughnutChart", () => {
  let wrapper;
  let dataDoughnut = {
    labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
    datasets: [
      {
        data: [300, 50, 100, 40, 120],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774"
        ]
      }
    ]
  }

  beforeEach(() => (wrapper = shallow(<DoughnutChart inputData={dataDoughnut} />)));
  it("DoughnutChart should exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have Doughnut chart", () => {
    expect(wrapper.find("Doughnut").length).toEqual(1);
  });

  it("data state should correspond with input", () => {
    expect(wrapper.state("dataDoughnut")).toEqual(dataDoughnut);
  });
});
