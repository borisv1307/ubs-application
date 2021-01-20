import React from "react";
import { shallow } from "enzyme";
import HorizontalBarGraph from "./horizontalBarGraph";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Home", () => {
  let wrapper;
  let dataHorizontal = {
    labels: ['Red', 'Orange', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [22, 33, 55],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
        ],
        borderWidth: 1
      }
    ]
  }

  beforeEach(() => (wrapper = shallow(<HorizontalBarGraph inputData = {dataHorizontal}/>)));
  it("Horizontal Bar Graph should exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have Horizontal Bar chart", () => {
    expect(wrapper.find("HorizontalBar").length).toEqual(1);
  });

  it("data state should correspond with input", () => {
    expect(wrapper.state("dataHorizontal")).toEqual(dataHorizontal);
  });
});
