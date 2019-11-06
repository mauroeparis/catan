import React from "react";
import EndTurn from "../../../src/components/EndTurn";

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
    // Expects the app to have one div
    expect(wrapper.find("div")).toHaveLength(1);
  });

  it("should correctly click the button", () => {
    window.confirm = jest.fn();
    const mockCallBack = jest.fn();
    const button = shallow(<EndTurn onClick={mockCallBack} />);
    button.find("input").simulate("click");
    button.find("input").simulate("Ok");
    expect(window.confirm.mock.calls.length).toEqual(1);
  });
});
