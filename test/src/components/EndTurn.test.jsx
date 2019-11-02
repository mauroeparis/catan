import React from "react";
import sinon from "sinon"
import EndTurn from "../../../src/components/EndTurn";

const clickCallback = sinon.spy();

// TeamPage.test.js
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: 1
  })
}));

describe("<EndTurn /> rendering", () => {
  it("should render one div", () => {
    const wrapper = shallow(<EndTurn />);
    // Expects the app to have exactly 5 hi children
    expect(wrapper.find("div")).toHaveLength(1);
  });

  it("should click something", () => {
    const wrapper = shallow(<EndTurn />);
    // Expects the app to have exactly 5 hi children
    expect(wrapper.find("div").simulate("click"));
  });

  it("t should have the correct value", () => {
    const wrapper = shallow(<EndTurn/>);
    // Expects the app to have exactly 5 hi children
    console.log(wrapper.debug());
    expect(wrapper.find("onClick")).toEqual(true);
  });
});
