import React from "react";
import EndTurn from "../../../src/components/EndTurn";

jest.mock("react", () => {
  const ActualReact = require.requireActual("react");
  return {
    ...ActualReact,
    useContext: () => ({ gameId: 1, showModal: () => {} }) // what you want to return when useContext get fired goes here
  };
});

describe("<EndTurn /> rendering", () => {
  it("should render one input", () => {
    const wrapper = shallow(<EndTurn />);
    // Expects the app to have one input
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("should correctly click the button", () => {
    window.showModal = jest.fn();
    const mockCallBack = jest.fn();
    const button = shallow(<EndTurn onClick={mockCallBack} />);
    button.find("input").simulate("click");
    button.find("input").simulate("Ok");
    expect(window.showModal.mock.calls.length).toEqual(1);
  });
});
